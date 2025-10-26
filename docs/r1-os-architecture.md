# R1-OS SEO Engine - 아키텍처 문서

## 시스템 개요

R1-OS는 SAENA의 전사 운영 체계(Operating System) 기반 SEO 엔진으로, **품질 임계치 기반 자동 출고 관리**와 **SERP 상위 노출 최적화**를 핵심으로 합니다.

## 설계 원칙

### 1. 품질 우선 (Quality First)
- IG 임계값 미달 콘텐츠는 **무조건 draft+noindex**
- 검색엔진 정책 위반 절대 금지
- 모든 주장은 검증 가능한 근거로 뒷받침

### 2. 자동화 (Automation)
- 수동 개입 최소화
- CI/CD 파이프라인 통합
- 실시간 모니터링 및 알림

### 3. 투명성 (Transparency)
- 모든 임계값과 가중치는 설정 파일로 관리
- 데이터 출처 명시
- 편집 정책 공개

## 핵심 모듈

### 1. IG Engine (Information Gain)

**목적**: 상위 SERP 대비 정보 가치 정량화

**알고리즘**:
```
IG_novel = (1/|D|) * Σ_{d∈D} 1[ min_{s∈S} cos(d, s) < τ_n ]
IG_evidence = (표+그래프+코드+레퍼런스) / (문단수 * 2)
IG_exclusive = {자사 데이터 포함 여부} ∈ {0,1}

IG_score = 0.55*IG_novel + 0.25*IG_evidence + 0.20*IG_exclusive
```

**임계값**:
- IG_novel ≥ 0.35
- IG_evidence ≥ 0.25
- IG_score ≥ 0.40

**출고 규칙**:
```typescript
if (IG_score < 0.40 || IG_novel < 0.35 || IG_evidence < 0.25) {
  status = 'draft';
  meta_robots = 'noindex,nofollow';
  sitemap_exclude = true;
  generate_improvement_todos();
}
```

### 2. Intent Router

**목적**: SERP 레이아웃 분석 → 템플릿 자동 분기

**프로세스**:
1. 상위 10개 SERP HTML 스냅샷
2. 블록 구조 추출 (FAQ/비디오/토론/뉴스/제품)
3. 레이아웃 벡터화
4. 템플릿 확률 계산
5. argmax로 최적 템플릿 선택

**템플릿 종류**:
- FAQ: FAQ 블록 밀도 높음
- Guide: 일반 정보성
- Comparison: 제품 비교
- HowTo: 비디오 밀도 높음
- NewsAware: 뉴스 블록 존재
- Review: 제품 + 토론
- Docs: 기술 문서

### 3. Snippet Bandit

**목적**: 타이틀/디스크립션 CTR 최적화

**알고리즘**: Thompson Sampling (Multi-Armed Bandit)

**파라미터**:
- 초기: α=1, β=1 (Beta 분포)
- 업데이트 주기: 7일 또는 200 impressions
- 변형안 수: 3-6개
- Prune 임계: 하위 30%

**안전장치**:
- 클릭베이트 금지어 필터링
- 과도한 대문자/특수문자 차단
- 길이 제한 (title ≤60자, description ≤160자)

### 4. Internal Link Graph

**목적**: TF-IDF × PageRank 기반 링크 자동 배분

**알고리즘**:
```
sim(a,b) = TFIDF_cosine(a,b)
PR(u) = PageRank(u; damping=0.85)
LinkScore(u→v) = 0.65*sim(u,v) + 0.35*PR(v)

B(u) = clip( round( 6 + 4 * rank_norm(u) ), 6, 14 )
```

**제약 조건**:
- 동일 앵커 ≤ 2/페이지
- 동일 대상 ≤ 3/사이트
- 링크 예산 ∈ [6, 14]

### 5. Indexation Orchestrator

**목적**: Sitemap 분할/우선순위 큐/캐노니컬 클러스터링

**기능**:

1. **Sitemap Sharding**
   - 50,000 URL/파일
   - 섹션별 분할 (sitemap-insights-N.xml)

2. **우선순위 큐**
   ```
   priority(u) = EMA(fetch_freq(u), 0.6) + bonus
   bonus = 0.2*is_new + 0.15*is_updated + 0.1*is_hub
   ```

3. **캐노니컬 클러스터링**
   - SimHash + Jaccard 유사도
   - τ_canonical = 0.82
   - 군집 대표만 index

4. **URL 정규화**
   - UTM 파라미터 제거
   - 파라미터 정렬
   - 트레일링 슬래시 제거

### 6. CWV Autotuner

**목적**: Core Web Vitals 자동 최적화

**임계값** (p75):
- LCP ≤ 2.0s
- CLS ≤ 0.1
- INP ≤ 200ms

**자동 수정 규칙**:

| 위반 | 조치 |
|------|------|
| LCP > 2.0s | Hero 이미지 ≤256k px, AVIF 변환, preload 1장 |
| CLS > 0.1 | width/height 강제, 자리표시자 적용 |
| INP > 200ms | Hydration 분할, Critical JS <60KB |

**프로세스**:
1. RUM 데이터 수집 (Web Vitals API)
2. p75 계산
3. 위반 감지
4. 수정 제안 생성
5. PR 자동 생성

### 7. EEAT Layer

**목적**: 신뢰성 스키마 자동 탑재

**필수 요소**:
- Author (이름, 자격, 소속)
- Organization (이름, URL, 로고)
- datePublished
- dateModified
- editorialPolicyUrl

**스키마 종류**:
- Article
- Organization
- Person
- FAQ
- Breadcrumb
- Dataset
- HowTo

### 8. Authority Engine

**목적**: 자연 링크 어닝 자동화

**전략**:
1. 벤치마크 데이터 공개
2. 리서치 결과 발표
3. 샘플 데이터/API 제공
4. 재현 실험 노트

**측정 지표**:
- 참조 도메인 증가율
- Anchor 다양성
- DoFollow/NoFollow 비율
- Citation 스키마 노출

## 데이터 흐름

```
┌─────────────┐
│   Content   │
└──────┬──────┘
       │
       ▼
┌─────────────┐     ┌──────────────┐
│  IG Engine  │────▶│ Quality Gate │
└──────┬──────┘     └──────┬───────┘
       │                   │
       │ PASS              │ FAIL
       ▼                   ▼
┌─────────────┐     ┌──────────────┐
│Intent Router│     │draft+noindex │
└──────┬──────┘     └──────────────┘
       │
       ▼
┌─────────────┐
│   EEAT +    │
│  JSON-LD    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Link Graph  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Indexation  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Sitemap    │
└─────────────┘
```

## 설정 관리

### configs/seo.policy.json

모든 임계값과 가중치는 이 파일에서 중앙 관리:

```json
{
  "ig_engine": {
    "tau_novel": 0.82,
    "threshold_novel": 0.35,
    "threshold_evidence": 0.25,
    "threshold_score": 0.40,
    "weights": {
      "novel": 0.55,
      "evidence": 0.25,
      "exclusive": 0.20
    }
  },
  "link_graph": {
    "lambda": 0.65,
    "damping": 0.85,
    "budget_min": 6,
    "budget_max": 14
  },
  "cwv": {
    "lcp_threshold_ms": 2000,
    "cls_threshold": 0.1,
    "inp_threshold_ms": 200
  }
}
```

### 환경별 오버라이드

```
configs/seo.policy.json          # 기본값
configs/seo.policy.staging.json  # staging 오버라이드
configs/seo.policy.production.json  # production 오버라이드
```

## 모니터링 및 알림

### 실시간 지표

- CTR (쿼리별, 페이지별)
- Position (평균, 추세)
- Impressions
- CWV p75 (LCP, CLS, INP)
- RUM 샘플 수
- Index coverage
- Fetch frequency

### 알림 트리거

| 조건 | 알림 |
|------|------|
| IG_score < 0.40 | Slack: 품질 미달 |
| CWV 위반 | Slack: 성능 저하 |
| 크롤 오류 증가 | Email: 인덱싱 이슈 |
| 순위 급락 | Slack: 긴급 점검 |

## 보안 및 컴플라이언스

### 하드 가드레일

1. **검색엔진 정책 준수**
   - 클로킹 금지
   - 숨김 텍스트 금지
   - 링크 스팸 금지

2. **개인정보 보호**
   - GDPR/CCPA 준수
   - 민감 정보 익명화
   - 쿠키 정책 명시

3. **접근성**
   - WCAG 2.1 AA 준수
   - 스크린 리더 호환
   - 키보드 네비게이션

## 성능 목표

### Lab 데이터 (Lighthouse)
- Performance ≥ 90
- Accessibility ≥ 90
- Best Practices ≥ 90
- SEO ≥ 95

### Field 데이터 (RUM)
- LCP p75 ≤ 1.8s
- CLS p75 ≤ 0.08
- INP p75 ≤ 180ms

### SEO 지표
- 인덱싱 커버리지 ≥ 95%
- 크롤 오류율 < 1%
- 평균 CTR ≥ 4%
- 평균 Position ≤ 10

## 확장성

### 수평 확장
- Sitemap sharding (50,000 URL/파일)
- 분산 임베딩 계산
- 캐시 레이어 (Redis)

### 수직 확장
- 임베딩 모델 업그레이드
- 더 정교한 Intent Router
- 실시간 A/B 테스트

## 유지보수

### 정기 작업
- 월간: 죽은 링크 스캔
- 주간: CWV 지표 리뷰
- 일간: 크롤 로그 분석

### 업데이트 정책
- 기술 문서: 분기별
- 가이드: 반기별
- 뉴스: 필요시

## 참고 문서

- [Implementation Guide](seo-implementation-guide.md)
- [Editorial Policy](editorial-policy.md)
- [SEO Checklist](seo-checklist.md)
- [API Documentation](api-documentation.md)

---

**버전**: 1.0.0  
**최종 업데이트**: 2025-10-26  
**작성자**: SAENA Engineering Team
