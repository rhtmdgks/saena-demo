# R1-OS SEO Engine - SAENA

## 🚀 개요

R1-OS는 SAENA의 전사 운영 체계 기반 SEO 엔진으로, Next.js 15 App Router와 완전히 통합되어 **SERP 상위 노출을 자동화**합니다.

### 핵심 특징

✅ **품질 게이트**: IG 임계값 미달 시 자동 draft+noindex  
✅ **CWV 자동 최적화**: p75 기준 위반 시 PR 자동 생성  
✅ **링크 그래프**: TF-IDF × PageRank 기반 자동 배분  
✅ **EEAT 레이어**: 신뢰성 스키마 자동 탑재  
✅ **Intent Router**: SERP 분석 → 템플릿 자동 분기  
✅ **Snippet Bandit**: Thompson Sampling CTR 최적화  

## 📁 프로젝트 구조

\`\`\`
lib/seo/
├── types.ts                 # 타입 정의
├── ig.ts                    # IG Engine (정보 가치 정량화)
├── intent-router.ts         # SERP 레이아웃 분석
├── snippet-bandit.ts        # CTR 최적화 (Thompson Sampling)
├── link-graph.ts            # 내부 링크 그래프
├── indexation.ts            # Sitemap/캐노니컬 관리
├── cwv-autotuner.ts         # CWV 자동 최적화
├── eeat.tsx                 # EEAT 스키마
├── utils.ts                 # 유틸리티 함수
└── index.ts                 # 메인 export

app/
├── sitemap.ts               # 동적 sitemap 생성
├── robots.ts                # robots.txt
├── api/seo/
│   ├── metrics/route.ts     # SEO 지표 API
│   └── rum/route.ts         # RUM 데이터 수집
└── example-seo-page/        # 샘플 페이지

components/seo/
└── web-vitals-reporter.tsx  # RUM 리포터

scripts/
└── seo_audit.ts             # 자동 감사 스크립트

configs/
└── seo.policy.json          # SEO 정책 설정

docs/
├── seo-implementation-guide.md  # 구현 가이드
└── editorial-policy.md          # 편집 정책
\`\`\`

## 🎯 품질 임계값

### IG Engine
- **IG_novel** ≥ 0.35 (상위 SERP 대비 새로움)
- **IG_evidence** ≥ 0.25 (정량적 근거 비율)
- **IG_score** ≥ 0.40 (종합 점수)

### Core Web Vitals
- **LCP p75** ≤ 2.0s
- **CLS p75** ≤ 0.1
- **INP p75** ≤ 200ms

### 링크 그래프
- 죽은 링크 = 0
- 동일 앵커 ≤ 2/페이지
- 동일 대상 ≤ 3/사이트

## 🛠️ 설치 및 설정

### 1. 의존성 설치

\`\`\`bash
npm install
\`\`\`

### 2. 환경 변수 설정

\`\`\`.env
NEXT_PUBLIC_SITE_URL=https://the-saena.ai
OPENAI_API_KEY=your_openai_key  # 임베딩용 (선택)
GOOGLE_SEARCH_API_KEY=your_google_key  # SERP 분석용 (선택)
\`\`\`

### 3. SEO 감사 실행

\`\`\`bash
npm run seo:audit
\`\`\`

## 📊 사용 예시

### 페이지에 EEAT 적용

\`\`\`tsx
import { JSONLD, EEATMetaTags, createDefaultEEATMetadata, generateArticleSchema } from '@/lib/seo/eeat';

export default function MyPage() {
  const eeatMetadata = createDefaultEEATMetadata();
  
  return (
    <>
      <EEATMetaTags metadata={eeatMetadata} />
      <JSONLD data={generateArticleSchema(eeatMetadata, {
        headline: "Your Title",
        description: "Your description",
        url: "https://the-saena.ai/your-page"
      })} />
      
      {/* Your content */}
    </>
  );
}
\`\`\`

### RUM 데이터 수집

\`\`\`tsx
// app/layout.tsx
import { WebVitalsReporter } from '@/components/seo/web-vitals-reporter';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <WebVitalsReporter debug={process.env.NODE_ENV === 'development'} />
        {children}
      </body>
    </html>
  );
}
\`\`\`

### IG 점수 계산

\`\`\`typescript
import { calculateIGScore, generateDocumentEmbeddings, fetchSERPEmbeddings } from '@/lib/seo/ig';
import seoPolicy from '@/configs/seo.policy.json';

const docEmbeddings = await generateDocumentEmbeddings(content);
const serpEmbeddings = await fetchSERPEmbeddings(keyword);

const igResult = calculateIGScore(
  docEmbeddings,
  serpEmbeddings,
  content,
  seoPolicy.ig_engine
);

if (!igResult.passes_threshold) {
  console.log('개선 필요:', igResult.improvement_todos);
}
\`\`\`

## 🔍 SEO 감사

### 자동 체크리스트

- ✅ IG 임계값 충족
- ✅ CWV 위반 없음
- ✅ 내부 링크 그래프 유효
- ✅ JSON-LD 스키마 유효
- ✅ Sitemap 유효성

### CI/CD 통합

\`\`\`yaml
# .github/workflows/seo-audit.yml
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
      - run: npm run lighthouse:ci
\`\`\`

## 📈 모니터링

### SEO 지표 API

\`\`\`bash
# 전체 지표
curl http://localhost:3000/api/seo/metrics

# 특정 지표
curl http://localhost:3000/api/seo/metrics?metric=ctr
curl http://localhost:3000/api/seo/metrics?metric=cwv
\`\`\`

### 대시보드 지표

- CTR (쿼리별, 페이지별)
- Position (평균, 추세)
- Impressions
- CWV p75 (LCP, CLS, INP)
- RUM 샘플 수
- Index coverage

## 🎨 샘플 페이지

완전히 최적화된 샘플 페이지를 확인하세요:

\`\`\`
/example-seo-page
\`\`\`

이 페이지는 다음을 포함합니다:
- ✅ EEAT 메타데이터
- ✅ Article/FAQ/Breadcrumb JSON-LD
- ✅ 표/그래프/코드 샘플 (증거)
- ✅ 독점 데이터 명시
- ✅ 구조화된 헤딩
- ✅ 내부 링크

## 🔧 고급 설정

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

## 📚 문서

- [구현 가이드](docs/seo-implementation-guide.md)
- [편집 정책](docs/editorial-policy.md)

## 🚨 트러블슈팅

### IG 점수가 낮을 때
1. 상위 SERP 분석
2. 표/그래프/코드/레퍼런스 추가
3. 독점 데이터 포함

### CWV 위반 시
1. Lighthouse CI 결과 확인
2. CWV Autotuner 제안 적용
3. 이미지 최적화 실행
4. 24시간 후 RUM 재확인

## 📞 지원

- 이메일: seo@the-saena.ai
- 문서: https://the-saena.ai/docs/seo

## 📄 라이선스

Proprietary - SAENA © 2025
