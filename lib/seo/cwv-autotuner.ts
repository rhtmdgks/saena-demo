/**
 * CWV Autotuner
 * RUM p75 수집 → 예산 자동 조정
 */

import type { CWVMetrics, CWVViolation, CWVConfig } from "./types";

/**
 * p75 계산 (75th percentile)
 * 선형 보간법으로 정확한 백분위수 산출
 */
export function calculateP75(values: number[]): number {
  if (values.length === 0) return 0;
  if (values.length === 1) return values[0];

  const sorted = [...values].sort((a, b) => a - b);
  const pos = (sorted.length - 1) * 0.75;
  const base = Math.floor(pos);
  const rest = pos - base;

  // 선형 보간
  if (base + 1 < sorted.length) {
    return sorted[base] + (sorted[base + 1] - sorted[base]) * rest;
  }

  return sorted[base];
}

/**
 * CWV 위반 감지
 */
export function detectViolations(
  metrics: CWVMetrics,
  config: CWVConfig
): CWVViolation[] {
  const violations: CWVViolation[] = [];

  // LCP 체크
  if (metrics.lcp_p75 > config.lcp_threshold_ms) {
    violations.push({
      metric: "LCP",
      current_value: metrics.lcp_p75,
      threshold: config.lcp_threshold_ms,
      url: metrics.url,
      suggested_fixes: generateLCPFixes(metrics, config),
    });
  }

  // CLS 체크
  if (metrics.cls_p75 > config.cls_threshold) {
    violations.push({
      metric: "CLS",
      current_value: metrics.cls_p75,
      threshold: config.cls_threshold,
      url: metrics.url,
      suggested_fixes: generateCLSFixes(metrics, config),
    });
  }

  // INP 체크
  if (metrics.inp_p75 > config.inp_threshold_ms) {
    violations.push({
      metric: "INP",
      current_value: metrics.inp_p75,
      threshold: config.inp_threshold_ms,
      url: metrics.url,
      suggested_fixes: generateINPFixes(metrics, config),
    });
  }

  return violations;
}

/**
 * LCP 개선 제안 생성
 */
function generateLCPFixes(metrics: CWVMetrics, config: CWVConfig): string[] {
  const fixes: string[] = [];

  const overage = metrics.lcp_p75 - config.lcp_threshold_ms;
  // NaN 방어: 임계값이 0이거나 유효하지 않으면 0으로 처리
  const overagePercent =
    config.lcp_threshold_ms > 0 ? (overage / config.lcp_threshold_ms) * 100 : 0;

  if (overagePercent > 50) {
    fixes.push("Hero 이미지 픽셀 면적을 256k px 이하로 축소");
    fixes.push("AVIF 포맷으로 변환 (WebP fallback 포함)");
  }

  if (overagePercent > 30) {
    fixes.push('<link rel="preload"> 를 1장으로 제한');
    fixes.push('fetchpriority="high" 속성 추가');
  }

  if (overagePercent > 20) {
    fixes.push("이미지 lazy loading 최적화 (첫 화면 제외)");
    fixes.push("CDN 캐싱 전략 재검토");
  }

  fixes.push("Next.js Image 컴포넌트 사용 확인");
  fixes.push("서버 응답 시간(TTFB) 최적화");

  return fixes;
}

/**
 * CLS 개선 제안 생성
 */
function generateCLSFixes(metrics: CWVMetrics, config: CWVConfig): string[] {
  const fixes: string[] = [];

  fixes.push("모든 이미지/비디오에 명시적 width/height 속성 추가");
  fixes.push("폰트 로딩 시 font-display: swap 사용");
  fixes.push("광고/임베드 컨테이너에 고정 높이 자리표시자 적용");
  fixes.push("동적 콘텐츠 삽입 시 transform 속성 사용");
  fixes.push("웹폰트 preload 및 subset 최적화");

  return fixes;
}

/**
 * INP 개선 제안 생성
 */
function generateINPFixes(metrics: CWVMetrics, config: CWVConfig): string[] {
  const fixes: string[] = [];

  const overage = metrics.inp_p75 - config.inp_threshold_ms;
  // NaN 방어: 임계값이 0이거나 유효하지 않으면 0으로 처리
  const overagePercent =
    config.inp_threshold_ms > 0 ? (overage / config.inp_threshold_ms) * 100 : 0;

  if (overagePercent > 50) {
    fixes.push("Hydration 분할 (React.lazy, dynamic import)");
    fixes.push("Critical JS를 60KB 이하로 축소");
  }

  if (overagePercent > 30) {
    fixes.push("이벤트 핸들러 debounce/throttle 적용");
    fixes.push("Long Task 분할 (requestIdleCallback)");
  }

  fixes.push("Third-party 스크립트 지연 로딩");
  fixes.push("폰트 preconnect 및 subset 재생성");
  fixes.push("불필요한 리렌더링 최적화 (React.memo, useMemo)");

  return fixes;
}

/**
 * 자동 수정 PR 템플릿 생성
 */
export function generateFixPR(
  violations: CWVViolation[],
  template: string
): string {
  const metrics = violations.map((v) => v.metric).join(", ");
  const prTitle = `feat(cwv): ${metrics} 최적화 - ${template}`;

  const prBody = `
## CWV 위반 감지

${violations
  .map(
    (v) => `
### ${v.metric} 위반
- **현재 값**: ${v.current_value.toFixed(2)}${v.metric === "CLS" ? "" : "ms"}
- **임계값**: ${v.threshold}${v.metric === "CLS" ? "" : "ms"}
- **URL**: ${v.url}

#### 제안된 수정사항
${v.suggested_fixes.map((fix) => `- [ ] ${fix}`).join("\n")}
`
  )
  .join("\n---\n")}

## 템플릿
\`${template}\`

## 측정 방법
1. 수정 적용 후 Lighthouse CI 실행
2. RUM 데이터 24시간 수집
3. p75 값이 임계값 이하인지 확인

## 참고
- [Web Vitals](https://web.dev/vitals/)
- [CWV 최적화 가이드](https://web.dev/optimize-cwv/)
`;

  return prBody;
}

/**
 * RUM 데이터 수집 (Web Vitals API)
 */
export function collectRUMData(): string {
  return `
// app/layout.tsx 또는 _app.tsx에 추가

import { onCLS, onFID, onLCP, onINP } from 'web-vitals';

function sendToAnalytics(metric: any) {
  // Google Analytics, Datadog, 또는 자체 엔드포인트로 전송
  fetch('/api/seo/rum', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
      url: window.location.href,
      timestamp: Date.now()
    })
  });
}

// 클라이언트 사이드에서 실행
if (typeof window !== 'undefined') {
  onCLS(sendToAnalytics);
  onLCP(sendToAnalytics);
  onINP(sendToAnalytics);
}
`;
}

/**
 * Lab 데이터 수집 (Lighthouse CI)
 */
export function generateLighthouseConfig(): string {
  return `
// lighthouserc.json

{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "url": [
        "http://localhost:3000/",
        "http://localhost:3000/about",
        "http://localhost:3000/prototype"
      ],
      "settings": {
        "preset": "desktop",
        "throttling": {
          "rttMs": 40,
          "throughputKbps": 10240,
          "cpuSlowdownMultiplier": 1
        }
      }
    },
    "assert": {
      "assertions": {
        "largest-contentful-paint": ["error", { "maxNumericValue": 1800 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.08 }],
        "max-potential-fid": ["error", { "maxNumericValue": 100 }],
        "total-blocking-time": ["error", { "maxNumericValue": 200 }],
        "speed-index": ["error", { "maxNumericValue": 2000 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
`;
}

/**
 * 이미지 최적화 스크립트 생성
 */
export function generateImageOptimizationScript(): string {
  return `
// scripts/optimize-images.ts

import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';

const MAX_PIXELS = 256000; // 256k pixels
const QUALITY = 80;

async function optimizeImage(filePath: string) {
  const image = sharp(filePath);
  const metadata = await image.metadata();
  
  if (!metadata.width || !metadata.height) return;
  
  const pixels = metadata.width * metadata.height;
  
  if (pixels > MAX_PIXELS) {
    const scale = Math.sqrt(MAX_PIXELS / pixels);
    const newWidth = Math.round(metadata.width * scale);
    const newHeight = Math.round(metadata.height * scale);
    
    console.log(\`Resizing \${filePath}: \${metadata.width}x\${metadata.height} → \${newWidth}x\${newHeight}\`);
    
    await image
      .resize(newWidth, newHeight)
      .avif({ quality: QUALITY })
      .toFile(filePath.replace(/\\.[^.]+$/, '.avif'));
    
    await image
      .resize(newWidth, newHeight)
      .webp({ quality: QUALITY })
      .toFile(filePath.replace(/\\.[^.]+$/, '.webp'));
  }
}

async function main() {
  const images = await glob('public/**/*.{jpg,jpeg,png}');
  
  for (const image of images) {
    await optimizeImage(image);
  }
  
  console.log(\`Optimized \${images.length} images\`);
}

main();
`;
}
