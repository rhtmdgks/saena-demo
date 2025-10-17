# Performance Optimization Guide

## 현재 성능 최적화 현황

### ✅ 구현된 최적화

#### 1. 이미지 최적화
- Next.js Image 컴포넌트 사용
- AVIF 및 WebP 포맷 지원
- 반응형 이미지 크기 설정
- Lazy loading 구현
- 적절한 이미지 크기 설정

#### 2. 코드 분할
- Next.js 자동 코드 분할
- Dynamic imports 사용
- Route-based 코드 분할

#### 3. 리소스 로딩
- 비디오 lazy loading
- Intersection Observer 사용
- 뷰포트 밖 리소스 일시정지

#### 4. 캐싱 전략
- API 응답 캐싱 (Geo API: 1시간)
- Static 페이지 생성
- 브라우저 캐싱 헤더

#### 5. 스크립트 최적화
- Google Analytics lazy loading
- GTM deferred loading
- 중요하지 않은 스크립트 지연 로딩

## 성능 메트릭 목표

### Core Web Vitals

| 메트릭 | 목표 | 현재 상태 |
|--------|------|-----------|
| LCP (Largest Contentful Paint) | < 2.5s | 측정 필요 |
| FID (First Input Delay) | < 100ms | 측정 필요 |
| CLS (Cumulative Layout Shift) | < 0.1 | 측정 필요 |
| FCP (First Contentful Paint) | < 1.8s | 측정 필요 |
| TTFB (Time to First Byte) | < 600ms | 측정 필요 |

### 추가 메트릭

| 메트릭 | 목표 |
|--------|------|
| Total Bundle Size | < 200KB (gzipped) |
| Time to Interactive | < 3.8s |
| Speed Index | < 3.4s |

## 성능 측정 방법

### 1. 로컬 측정

```bash
# Lighthouse 실행
npm run build
npm start
# Chrome DevTools > Lighthouse 탭에서 실행

# Bundle 분석
npm run build
npx @next/bundle-analyzer
```

### 2. 프로덕션 측정

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- [GTmetrix](https://gtmetrix.com/)

### 3. 실시간 모니터링

```typescript
// usePerformance 훅 사용
import { usePerformance } from '@/hooks/usePerformance';

function MyComponent() {
  usePerformance(); // 자동으로 메트릭 측정
  // ...
}
```

## 최적화 체크리스트

### 이미지
- [x] Next.js Image 컴포넌트 사용
- [x] 적절한 이미지 포맷 (AVIF, WebP)
- [x] Lazy loading 구현
- [ ] 이미지 CDN 사용
- [ ] 이미지 압축 자동화

### 폰트
- [x] Google Fonts 최적화 (display: swap)
- [ ] 폰트 서브셋팅
- [ ] 로컬 폰트 호스팅 고려
- [ ] 폰트 preload

### JavaScript
- [x] 코드 분할
- [x] Tree shaking
- [x] Dynamic imports
- [ ] 불필요한 의존성 제거
- [ ] Bundle 크기 모니터링

### CSS
- [x] Tailwind CSS 최적화
- [x] 사용하지 않는 CSS 제거
- [ ] Critical CSS 인라인
- [ ] CSS 압축

### 네트워크
- [x] HTTP/2 사용
- [x] 캐싱 헤더 설정
- [ ] CDN 사용
- [ ] Brotli 압축
- [ ] Resource hints (preconnect, dns-prefetch)

### 렌더링
- [x] Static Generation 사용
- [x] Incremental Static Regeneration
- [ ] Streaming SSR
- [ ] React Server Components

## 성능 개선 전략

### 단기 (1-2주)
1. 이미지 최적화 완료
2. 불필요한 의존성 제거
3. Bundle 크기 분석 및 최적화
4. Critical CSS 인라인

### 중기 (1-2개월)
1. CDN 설정
2. 서비스 워커 구현
3. 캐싱 전략 고도화
4. 데이터베이스 쿼리 최적화

### 장기 (3-6개월)
1. PWA 기능 추가
2. 오프라인 지원
3. 백그라운드 동기화
4. 푸시 알림

## 성능 예산

### JavaScript
- 메인 번들: < 100KB (gzipped)
- 페이지별 번들: < 50KB (gzipped)
- 총 JavaScript: < 200KB (gzipped)

### CSS
- 메인 CSS: < 30KB (gzipped)
- 페이지별 CSS: < 10KB (gzipped)

### 이미지
- Hero 이미지: < 200KB
- 썸네일: < 50KB
- 아이콘: < 10KB

### 폰트
- 총 폰트 크기: < 100KB

## 모니터링 및 알림

### 설정할 알림
1. LCP > 2.5s
2. FID > 100ms
3. CLS > 0.1
4. Bundle 크기 > 200KB
5. API 응답 시간 > 1s

### 모니터링 도구
- Google Analytics (Web Vitals)
- Vercel Analytics
- Sentry Performance
- Custom Performance API

## 성능 테스트 자동화

```json
// package.json에 추가
{
  "scripts": {
    "perf:lighthouse": "lighthouse https://theskitbit.com --view",
    "perf:bundle": "ANALYZE=true npm run build",
    "perf:audit": "npm run perf:lighthouse && npm run perf:bundle"
  }
}
```

## 베스트 프랙티스

### 1. 이미지 로딩
```typescript
// ✅ Good
<OptimizedImage
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  loading="lazy"
/>

// ❌ Bad
<img src="/image.jpg" />
```

### 2. 컴포넌트 로딩
```typescript
// ✅ Good
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false
});

// ❌ Bad
import HeavyComponent from './HeavyComponent';
```

### 3. API 호출
```typescript
// ✅ Good
const data = await fetch('/api/data', {
  cache: 'force-cache',
  next: { revalidate: 3600 }
});

// ❌ Bad
const data = await fetch('/api/data', {
  cache: 'no-store'
});
```

### 4. 상태 관리
```typescript
// ✅ Good - 필요한 곳에서만 리렌더링
const value = useMemo(() => expensiveCalculation(a, b), [a, b]);

// ❌ Bad - 매번 계산
const value = expensiveCalculation(a, b);
```

## 문제 해결

### 느린 페이지 로드
1. Lighthouse 실행하여 병목 지점 확인
2. Network 탭에서 큰 리소스 확인
3. Performance 탭에서 긴 작업 확인
4. Bundle 분석으로 큰 의존성 확인

### 높은 CLS
1. 이미지에 width/height 지정
2. 폰트 로딩 최적화
3. 동적 콘텐츠 공간 예약
4. 광고/임베드 크기 지정

### 느린 상호작용
1. JavaScript 실행 시간 확인
2. 불필요한 리렌더링 제거
3. 이벤트 핸들러 최적화
4. Debounce/Throttle 사용

## 참고 자료

- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Web.dev Performance](https://web.dev/performance/)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

**마지막 업데이트**: 2025년 1월
