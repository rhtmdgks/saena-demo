# R1-OS SEO Engine Implementation Guide

## 개요

R1-OS는 SAENA의 전사 운영 체계 기반 SEO 엔진으로, Next.js 15 App Router와 완전히 통합되어 SERP 상위 노출을 자동화합니다.

## 아키텍처

### 핵심 모듈

1. **IG Engine**: 정보 가치 정량화
2. **Intent Router**: SERP 레이아웃 분석 → 템플릿 분기
3. **Snippet Bandit**: CTR 최적화 (Thompson Sampling)
4. **Link Graph**: TF-IDF × PageRank 링크 배분
5. **Indexation Orchestrator**: Sitemap/캐노니컬 관리
6. **CWV Autotuner**: 성능 자동 최적화
7. **EEAT Layer**: 신뢰성 스키마
8. **Authority Engine**: 링크 어닝

## 빠른 시작

### 1. 설치

\`\`\`bash
npm install
\`\`\`

### 2. 환경 변수 설정

\`\`\`.env
NEXT_PUBLIC_SITE_URL=https://the-saena.ai
OPENAI_API_KEY=your_openai_key  # 임베딩용
GOOGLE_SEARCH_API_KEY=your_google_key  # SERP 분석용
\`\`\`

### 3. SEO 정책 설정

\`configs/seo.policy.json\`에서 임계값 조정:

\`\`\`json
{
  "ig_engine": {
    "threshold_score": 0.40,
    "threshold_novel": 0.35,
    "threshold_evidence": 0.25
  }
}
\`\`\`

### 4. 페이지에 EEAT 적용

\`\`\`tsx
// app/your-page/page.tsx
import { JSONLD, EEATMetaTags, createDefaultEEATMetadata } from '@/lib/seo/eeat';

export default function YourPage() {
  const eeatMetadata = createDefaultEEATMetadata();
  
  return (
    <>
      <EEATMetaTags metadata={eeatMetadata} />
      <JSONLD data={generateArticleSchema(eeatMetadata, {
        headline: "Your Article Title",
        description: "Your description",
        url: "https://the-saena.ai/your-page"
      })} />
      
      {/* Your content */}
    </>
  );
}
\`\`\`

### 5. SEO 감사 실행

\`\`\`bash
npm run seo:audit
\`\`\`

## 주요 기능

### IG Engine 사용

\`\`\`typescript
import { calculateIGScore, generateDocumentEmbeddings } from '@/lib/seo/ig';
import seoPolicy from '@/configs/seo.policy.json';

// 문서 임베딩 생성
const docEmbeddings = await generateDocumentEmbeddings(content);

// SERP 임베딩 가져오기
const serpEmbeddings = await fetchSERPEmbeddings(keyword);

// IG 점수 계산
const igResult = calculateIGScore(
  docEmbeddings,
  serpEmbeddings,
  content,
  seoPolicy.ig_engine
);

if (!igResult.passes_threshold) {
  console.log('개선 필요:', igResult.improvement_todos);
  // draft 상태로 저장
}
\`\`\`

### Intent Router 사용

\`\`\`typescript
import { routeIntent } from '@/lib/seo/intent-router';

const result = await routeIntent('how to use saena ai');
console.log(result.template); // 'HowTo'

// 템플릿에 따라 페이지 구조 분기
switch (result.template) {
  case 'HowTo':
    return <HowToTemplate />;
  case 'FAQ':
    return <FAQTemplate />;
  // ...
}
\`\`\`

### Snippet Bandit 사용

\`\`\`typescript
import { generateVariants, selectVariant, updateBanditState } from '@/lib/seo/snippet-bandit';
import seoPolicy from '@/configs/seo.policy.json';

// 변형안 생성
const variants = generateVariants(
  'SAENA AI Platform',
  'Build intelligent applications with SAENA',
  'saena ai',
  seoPolicy.snippet_bandit
);

// Thompson Sampling으로 선택
const selected = selectVariant(variants);

// 메타 태그에 적용
export const metadata = {
  title: selected.title,
  description: selected.description
};
\`\`\`

### CWV Autotuner 사용

\`\`\`typescript
import { detectViolations, generateFixPR } from '@/lib/seo/cwv-autotuner';
import seoPolicy from '@/configs/seo.policy.json';

// RUM 데이터에서 위반 감지
const violations = detectViolations(cwvMetrics, seoPolicy.cwv);

if (violations.length > 0) {
  // 자동 수정 PR 생성
  const prBody = generateFixPR(violations, 'home');
  // GitHub API로 PR 생성
}
\`\`\`

## 품질 게이트

### 출고 기준

모든 콘텐츠는 다음 기준을 충족해야 출고됩니다:

✅ **IG 임계값**
- IG_novel ≥ 0.35
- IG_evidence ≥ 0.25
- IG_score ≥ 0.40

✅ **CWV 임계값**
- LCP p75 ≤ 2.0s
- CLS p75 ≤ 0.1
- INP p75 ≤ 200ms

✅ **링크 그래프**
- 죽은 링크 = 0
- 동일 앵커 ≤ 2/페이지
- 동일 대상 ≤ 3/사이트

✅ **스키마**
- JSON-LD 유효성 통과
- 필수 필드 모두 포함

### 자동 처리

임계값 미달 시:
1. 상태 → draft
2. meta robots → noindex,nofollow
3. sitemap에서 제외
4. 개선 TODO 자동 생성

## CI/CD 통합

### GitHub Actions

\`\`\`.github/workflows/seo-audit.yml
name: SEO Audit

on:
  pull_request:
    branches: [main]

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run seo:audit
      - name: Lighthouse CI
        run: npm run lighthouse:ci
\`\`\`

### package.json 스크립트

\`\`\`json
{
  "scripts": {
    "seo:audit": "tsx scripts/seo_audit.ts",
    "seo:metrics": "curl http://localhost:3000/api/seo/metrics",
    "lighthouse:ci": "lhci autorun"
  }
}
\`\`\`

## 모니터링

### 대시보드

\`/api/seo/metrics\` 엔드포인트에서 다음 지표 확인:

- CTR (쿼리별, 페이지별)
- Position (평균, 추세)
- Impressions
- CWV p75 (LCP, CLS, INP)
- RUM 샘플 수
- Index coverage

### 주간 리포트

자동 생성되는 리포트:
- IG 미달 문서 리스트
- Snippet 밴딧 arm 성과
- 링크 허브 변화
- CWV 추세

## 트러블슈팅

### IG 점수가 낮을 때

1. 상위 SERP 분석: 어떤 정보가 부족한가?
2. 증거 추가: 표, 그래프, 코드, 레퍼런스
3. 독점 데이터: 자사 실험/벤치마크 포함

### CWV 위반 시

1. Lighthouse CI 결과 확인
2. CWV Autotuner 제안 적용
3. 이미지 최적화 스크립트 실행
4. 24시간 후 RUM 데이터 재확인

### 링크 그래프 오류

1. 죽은 링크 수정
2. 앵커 텍스트 다양화
3. 링크 예산 재조정

## 고급 설정

### 환경별 정책 오버라이드

\`\`\`json
// configs/seo.policy.staging.json
{
  "ig_engine": {
    "threshold_score": 0.30  // staging에서는 낮은 임계값
  }
}
\`\`\`

### 커스텀 임베딩 모델

\`\`\`typescript
// lib/seo/embeddings/custom.ts
export async function customEmbedding(text: string): Promise<number[]> {
  // 자체 임베딩 모델 사용
}
\`\`\`

## 참고 자료

- [Editorial Policy](/docs/editorial-policy.md)
- [Google Search Central](https://developers.google.com/search)
- [Web Vitals](https://web.dev/vitals/)
- [Schema.org](https://schema.org/)

## 지원

- 이메일: seo@the-saena.ai
- GitHub Issues: https://github.com/saena/r1-os-seo/issues
