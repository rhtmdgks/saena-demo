# SEO 체크리스트

## 📋 출고 전 필수 체크리스트

### 1. IG Engine (Information Gain)

- [ ] IG_novel ≥ 0.35 (상위 SERP 대비 새로움)
- [ ] IG_evidence ≥ 0.25 (정량적 근거 비율)
- [ ] IG_score ≥ 0.40 (종합 점수)
- [ ] 표/그래프/차트 포함
- [ ] 코드 샘플 포함 (기술 문서의 경우)
- [ ] 외부 레퍼런스 링크 포함
- [ ] 독점 데이터/실험 결과 명시 (있는 경우)

### 2. Core Web Vitals

- [ ] LCP p75 ≤ 2.0s
- [ ] CLS p75 ≤ 0.1
- [ ] INP p75 ≤ 200ms
- [ ] 모든 이미지에 width/height 속성
- [ ] Hero 이미지 preload
- [ ] AVIF/WebP 포맷 사용
- [ ] 이미지 lazy loading (첫 화면 제외)
- [ ] 폰트 preconnect 및 font-display: swap

### 3. EEAT (Expertise, Authoritativeness, Trustworthiness)

- [ ] 저자 이름 명시
- [ ] 저자 자격/소속 명시
- [ ] 조직 정보 포함
- [ ] 발행일 명시
- [ ] 수정일 명시
- [ ] 리뷰어 명시 (있는 경우)
- [ ] 데이터 출처 명시
- [ ] 편집 정책 링크

### 4. 구조화된 데이터 (JSON-LD)

- [ ] Article 스키마
- [ ] Organization 스키마
- [ ] Author 스키마
- [ ] Breadcrumb 스키마
- [ ] FAQ 스키마 (FAQ 페이지의 경우)
- [ ] HowTo 스키마 (튜토리얼의 경우)
- [ ] Dataset 스키마 (데이터 공개 시)
- [ ] 스키마 유효성 검증 통과

### 5. 메타 태그

- [ ] Title (≤60자, 키워드 포함)
- [ ] Description (≤160자, 명확한 요약)
- [ ] Canonical URL
- [ ] Open Graph 태그 (title, description, image, url)
- [ ] Twitter Card 태그
- [ ] Keywords (관련성 높은 키워드)
- [ ] Robots (index,follow 또는 noindex,nofollow)

### 6. 콘텐츠 품질

- [ ] 최소 800단어 이상 (가이드/튜토리얼)
- [ ] 명확한 헤딩 구조 (H1 → H2 → H3)
- [ ] 목차 포함 (긴 문서의 경우)
- [ ] 내부 링크 6-14개
- [ ] 외부 레퍼런스 링크
- [ ] 이미지 alt 텍스트
- [ ] 문법/맞춤법 검사 완료
- [ ] 가독성 점수 양호

### 7. 내부 링크 그래프

- [ ] 죽은 링크 없음
- [ ] 동일 앵커 텍스트 ≤2회/페이지
- [ ] 동일 대상 페이지 ≤3회/사이트
- [ ] 앵커 텍스트 다양화
- [ ] 관련성 높은 페이지 링크
- [ ] 링크 예산 6-14개 범위

### 8. 기술적 SEO

- [ ] Sitemap에 포함
- [ ] Robots.txt 허용
- [ ] HTTPS 사용
- [ ] 모바일 친화적
- [ ] 페이지 속도 최적화
- [ ] 404 에러 없음
- [ ] 리다이렉트 체인 없음
- [ ] 캐노니컬 태그 올바름

### 9. 접근성

- [ ] WCAG 2.1 AA 준수
- [ ] 키보드 네비게이션 가능
- [ ] 스크린 리더 호환
- [ ] 색상 대비 충분
- [ ] 포커스 표시 명확
- [ ] ARIA 레이블 적절

### 10. 보안 및 개인정보

- [ ] HTTPS 강제
- [ ] 민감 정보 노출 없음
- [ ] GDPR/CCPA 준수
- [ ] 쿠키 정책 명시
- [ ] 개인정보 처리방침 링크

## 🔄 정기 점검 (월간)

- [ ] 죽은 링크 스캔
- [ ] CWV 지표 확인
- [ ] GSC 인덱싱 상태 확인
- [ ] 순위 변동 모니터링
- [ ] 콘텐츠 업데이트 필요 여부
- [ ] 경쟁사 SERP 분석
- [ ] 백링크 프로필 확인

## 🚨 긴급 점검 (이슈 발생 시)

- [ ] 트래픽 급감 원인 분석
- [ ] 인덱싱 문제 확인
- [ ] 페널티 여부 확인
- [ ] 기술적 오류 확인
- [ ] 보안 취약점 확인

## 📊 자동화 도구

### 실행 명령어

\`\`\`bash
# SEO 감사
npm run seo:audit

# Lighthouse CI
npm run lighthouse:ci

# 이미지 최적화
npm run optimize:images

# SEO 지표 확인
npm run seo:metrics
\`\`\`

### CI/CD 통합

- GitHub Actions: `.github/workflows/seo-audit.yml`
- PR마다 자동 실행
- 실패 시 머지 차단

## 📈 성공 지표

### 단기 (1-3개월)

- [ ] 인덱싱 페이지 수 증가
- [ ] CWV 점수 개선
- [ ] 크롤 빈도 증가
- [ ] 내부 링크 그래프 최적화

### 중기 (3-6개월)

- [ ] 타겟 키워드 순위 상승
- [ ] 오가닉 트래픽 증가
- [ ] CTR 개선
- [ ] 백링크 증가

### 장기 (6-12개월)

- [ ] 도메인 권위 상승
- [ ] 브랜드 검색 증가
- [ ] Featured Snippet 획득
- [ ] 전환율 개선

## 🎯 우선순위

### P0 (즉시 수정)
- IG 임계값 미달
- CWV 위반
- 죽은 링크
- 스키마 오류

### P1 (1주 내)
- 메타 태그 누락
- 내부 링크 부족
- 이미지 최적화
- 콘텐츠 품질 개선

### P2 (1개월 내)
- 콘텐츠 업데이트
- 백링크 구축
- 소셜 시그널
- 브랜드 멘션

## 📚 참고 자료

- [SEO Implementation Guide](seo-implementation-guide.md)
- [Editorial Policy](editorial-policy.md)
- [Google Search Central](https://developers.google.com/search)
- [Web Vitals](https://web.dev/vitals/)
- [Schema.org](https://schema.org/)
