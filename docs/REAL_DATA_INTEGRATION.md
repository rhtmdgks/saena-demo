# 실제 데이터 통합 가이드

## 개요

prototype 페이지의 임시 데이터를 실제 데이터로 교체했습니다. 현재 **Brand Visibility**와 **Citation Analysis** 두 섹션이 실제 데이터를 사용하도록 업데이트되었습니다.

## 구조

```
types/
  └── dashboard.ts              # 데이터 타입 정의

lib/
  └── api/
      └── dashboard-data.ts     # 데이터 fetching 함수

components/
  └── dashboard/
      ├── brand-visibility.tsx  # 브랜드 가시성 컴포넌트 (업데이트됨)
      ├── citation-analysis.tsx # 인용 분석 컴포넌트 (업데이트됨)
      ├── home-content.tsx      # 홈 콘텐츠 (업데이트됨)
      ├── content.tsx           # 메인 콘텐츠 래퍼 (업데이트됨)
      └── citation-content.tsx  # 인용 콘텐츠 래퍼 (업데이트됨)
```

## 적용된 실제 데이터

### 1. Brand Visibility (브랜드 가시성) ✅

**데이터 구조:**
```typescript
{
  currentScore: 89.8,           // 현재 가시성 점수
  changePercent: 1.0,           // 변화율
  changeTrend: "up",            // 트렌드 방향
  timeSeriesData: [             // 21일간의 시계열 데이터
    { date: "2025-09-28", score: 79.2 },
    // ... 더 많은 데이터
  ],
  brandRankings: [              // 15개 브랜드 순위
    {
      rank: 6,
      brandName: "suelo",       // 우리 브랜드
      visibilityScore: 89,
      changePercent: 1.0,
      trending: "up"
    },
    // ... 경쟁사 데이터
  ]
}
```

**적용된 브랜드:**
- Beauty of Joseon (1위)
- Round Lab (2위)
- Aestura (3위)
- La Roche-Posay (4위)
- Anessa (5위)
- **suelo (6위)** ← 우리 브랜드
- 그 외 9개 경쟁 브랜드

### 2. Citation Analysis (인용 분석) ✅

**데이터 구조:**
```typescript
{
  totalCitations: 26400,        // 총 인용 수
  citationsByType: {
    earned: { count: 22440, percentage: 85.0 },
    operated: { count: 2640, percentage: 10.0 },
    owned: { count: 1320, percentage: 5.0 }
  },
  domains: [                    // 20개 도메인 데이터
    {
      rank: 1,
      domainName: "global.oliveyoung.com",
      mentionCount: 3100,
      type: "earned",
      percentage: 11.7,
      authorityScore: 88,
      url: "https://global.oliveyoung.com"
    },
    // ... 더 많은 도메인
  ]
}
```

**주요 도메인:**
- global.oliveyoung.com (3,100 mentions)
- vogue.com (1,960 mentions)
- allure.com (1,740 mentions)
- amazon.com (1,480 mentions)
- instagram.com (800 mentions - operated)
- **suelo.kr (520 mentions - owned)** ← 우리 도메인

## 실제 API로 전환하는 방법

현재는 `lib/api/dashboard-data.ts` 파일에 하드코딩된 데이터를 사용하고 있습니다. 실제 API로 전환하려면:

### 1. API 엔드포인트 생성

```typescript
// app/api/brand-visibility/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // 실제 데이터베이스나 외부 API에서 데이터 가져오기
  const data = await fetchFromDatabase();
  
  return NextResponse.json(data);
}
```

### 2. dashboard-data.ts 수정

```typescript
// lib/api/dashboard-data.ts
export async function getBrandVisibilityData(): Promise<BrandVisibilityData> {
  const response = await fetch('/api/brand-visibility');
  
  if (!response.ok) {
    throw new Error('Failed to fetch brand visibility data');
  }
  
  return response.json();
}
```

### 3. 환경 변수 설정

```env
# .env.local
NEXT_PUBLIC_API_BASE_URL=https://your-api.com
API_SECRET_KEY=your-secret-key
```

### 3. Topic Visibility (토픽 가시성) ✅

**데이터 구조:**
```typescript
{
  topThemes: [                  // 10개 주요 테마
    {
      rank: 1,
      themeName: "No White Cast Sunscreens",
      frequency: 96
    },
    // ... 더 많은 테마
  ],
  keywords: [                   // 20개 키워드
    {
      text: "PA++++",
      frequency: 82,
      size: "large",            // large, medium, small
      color: "primary",         // primary, secondary, tertiary
      category: "high"          // high, medium, low
    },
    // ... 더 많은 키워드
  ]
}
```

**주요 테마:**
- No White Cast Sunscreens (96 mentions)
- PA++++ / UVA Protection (91 mentions)
- Sensitive & Acne-Prone Skin (88 mentions)
- Lightweight Water-Gel Textures (83 mentions)
- Makeup Compatibility (79 mentions)

**주요 키워드:**
- PA++++ (82 mentions - high)
- No White Cast (78 mentions - high)
- UVA/UVB (72 mentions - high)
- Niacinamide (68 mentions - medium)
- Centella (66 mentions - medium)

### 4. Home Content Data (홈 대시보드 데이터) ✅

**데이터 구조:**
```typescript
{
  keyMetrics: {
    totalScore: { value: 89, change: "+12.3%", trend: "up" },
    competitiveRank: { value: 2, change: "+1", trend: "up", totalCompetitors: 50 },
    strongestCategory: { 
      categoryName: "Sunscreen (No-White-Cast)", 
      score: 95, 
      trend: "up" 
    },
    weakestCategory: { 
      categoryName: "Customer Support (KR/EN FAQ depth)", 
      score: 72, 
      trend: "down" 
    }
  },
  insights: [                   // 5개 인사이트
    {
      type: "positive",
      title: "Strong Presence in Editor Picks",
      description: "에디터 픽 키워드와의 공명도가 높아 추천 노출률이 증가 추세.",
      timestamp: "2025-10-18T00:30:00Z"
    },
    // ... 더 많은 인사이트
  ],
  platformCoverage: [           // 10개 플랫폼
    { platformName: "ChatGPT", coveragePercent: 95, isActive: true },
    // ... 더 많은 플랫폼
  ]
}
```

**주요 지표:**
- Total Score: 89 (vs industry average)
- Competitive Rank: #2 out of 50 brands
- Strongest: Sunscreen (No-White-Cast) - 95점
- Weakest: Customer Support - 72점

**플랫폼 커버리지:**
- ChatGPT: 95%
- Perplexity: 92%
- Claude: 90%
- Gemini: 88%
- Bing Copilot: 86%

### 5. Marketing Strategy (4P/4E) ✅

**데이터 구조:**
```typescript
{
  fourP: {
    product: {
      score: 92,
      change: 8.5,
      trend: "up",
      metrics: { uspShare, featureMentions, productClarity, innovationScore },
      topMentions: [{ text, sentimentScore }],
      trendData: [{ month, value }]
    },
    // price, place, promotion 동일 구조
  },
  fourE: {
    experience: {
      score: 89,
      change: 12.4,
      trend: "up",
      ratio: 0.67,
      description: "Experience-based sentence ratio",
      formula: "Experience sentences / Total sentences",
      insights: ["메이크업 호환성 리뷰 증가", ...]
    },
    // exchange, evangelism, everyplace 동일 구조
  },
  emotionDistribution: [
    { emotion: "Joy", value: 45 },
    // ... 8개 감정
  ]
}
```

**4P 점수:**
- Product: 92점 (↑8.5%)
- Place: 88점 (↑5.1%)
- Price: 86점 (↑4.2%)
- Promotion: 84점 (↑6.3%)

**4E 점수:**
- Experience: 89점 (↑12.4%)
- Exchange: 83점 (↑5.2%)
- Evangelism: 81점 (↑9.0%)
- Everyplace: 78점 (↑7.1%)

**주요 인사이트:**
- "No white cast even on deeper tones" (93% sentiment)
- "Lightweight water-gel finish" (91% sentiment)
- "메이크업 호환성 리뷰 증가"
- "민감성 커뮤니티 내 추천 확산"

### 6. STP Content (세분화/타겟팅/포지셔닝) ✅

**데이터 구조:**
```typescript
{
  segments: [
    {
      name: "Sensitive-Skin Seekers",
      sizePercent: 26,
      characteristics: ["All ages", "Barrier-focused", ...],
      keywords: ["Hypoallergenic", "No White Cast", ...]
    },
    // ... 5개 세그먼트
  ],
  targeting: {
    primary: {
      segmentName: "Sensitive-Skin Seekers",
      score: 92,
      rationale: ["무향·저자극·무백탁 포지션과 적합", ...]
    },
    secondary: { ... }
  },
  positioning: {
    statement: "suelo is a PA++++, no-white-cast daily sunscreen...",
    attributes: [
      { name: "Innovation", yourScore: 95, competitorAvg: 72 },
      // ... 5개 속성
    ],
    differentiators: ["No-white-cast on broader tones", ...],
    positioningMap: {
      yourBrand: { x: 350, y: 120 },
      competitors: [...]
    }
  }
}
```

**세그먼트:**
1. Tech-Savvy Professionals (34%)
2. Sensitive-Skin Seekers (26%) ← Primary Target
3. Makeup Enthusiasts (18%) ← Secondary Target
4. Outdoor & Sports (12%)
5. Value Shoppers (10%)

**포지셔닝 속성:**
- Innovation: 95 vs 72 (경쟁사 평균)
- Sensitivity Safe: 93 vs 78
- Makeup Compatibility: 92 vs 75
- Texture/Finish: 90 vs 76
- Value for Money: 86 vs 80

**차별화 요소:**
- No-white-cast on broader tones
- Primer-friendly, no pilling
- Clear PA++++ education content
- Consistent KR/EN messaging

## 다음 단계

아직 임시 데이터를 사용하는 컴포넌트들:

1. **Shopping Content** (쇼핑 분석)
3. **STP Content** (세분화/타겟팅/포지셔닝)
4. **Shopping Content** (쇼핑 분석)
5. **Model Content** (AI 모델 성과)
6. **Industry Content** (산업 벤치마킹)
7. **Analytics Brand Content** (쇼핑 가시성)

각 컴포넌트에 대한 데이터 스펙은 이전 대화에서 정의되어 있습니다.

## 테스트

업데이트된 컴포넌트를 테스트하려면:

1. 개발 서버 실행:
   ```bash
   npm run dev
   ```

2. 브라우저에서 확인:
   - 홈 대시보드: `http://localhost:3000/admin/prototype`
   - Citation 페이지: `http://localhost:3000/admin/prototype/citation`

3. 데이터 확인:
   - Brand Visibility 차트에 21일간의 데이터가 표시됨
   - 브랜드 순위에 suelo가 6위로 표시됨
   - Citation 분석에 실제 도메인 데이터가 표시됨

## 주의사항

- 모든 컴포넌트는 데이터가 없을 때 "Loading..." 메시지를 표시합니다
- 에러 처리는 console.error로 로깅됩니다
- 프로덕션 환경에서는 적절한 에러 핸들링과 로딩 상태 UI를 추가해야 합니다
