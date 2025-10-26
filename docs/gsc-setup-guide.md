# Google Search Console 소유권 인증 가이드

## 📋 준비물
- Google 계정
- 배포된 사이트 URL (예: https://the-saena.ai)

## 🔧 설정 방법

### 방법 1: HTML 파일 업로드 (권장)

1. **GSC 접속**
   ```
   https://search.google.com/search-console
   ```

2. **속성 추가**
   - 좌측 상단 "속성 추가" 클릭
   - "URL 접두어" 선택
   - 사이트 URL 입력: `https://the-saena.ai`

3. **HTML 파일 방법 선택**
   - "HTML 파일" 탭 클릭
   - 파일 다운로드 (예: `google1234567890abcdef.html`)

4. **파일 배포**
   ```bash
   # 다운로드한 파일을 public 폴더에 복사
   cp ~/Downloads/google1234567890abcdef.html public/
   
   # 배포
   git add public/google*.html
   git commit -m "Add GSC verification file"
   git push
   ```

5. **확인**
   - 브라우저에서 접속 테스트: `https://the-saena.ai/google1234567890abcdef.html`
   - GSC에서 "확인" 버튼 클릭

---

### 방법 2: HTML 메타 태그 (간편)

1. **GSC에서 메타 태그 복사**
   - "HTML 태그" 방법 선택
   - 제공된 메타 태그 복사
   ```html
   <meta name="google-site-verification" content="YOUR-CODE-HERE" />
   ```

2. **app/layout.tsx 수정**
   ```typescript
   export const metadata: Metadata = {
     verification: {
       google: 'YOUR-CODE-HERE', // content 값만 입력
     },
   }
   ```

3. **배포 및 확인**
   ```bash
   git add app/layout.tsx
   git commit -m "Add GSC meta tag"
   git push
   ```

---

### 방법 3: DNS TXT 레코드 (도메인 전체)

1. **GSC에서 TXT 레코드 복사**
   - "도메인 이름 공급업체" 방법 선택
   - TXT 레코드 값 복사

2. **DNS 설정 (Vercel/Cloudflare 등)**
   ```
   Type: TXT
   Name: @
   Value: google-site-verification=YOUR-CODE
   ```

3. **전파 대기 (최대 48시간)**
   ```bash
   # DNS 확인
   dig TXT the-saena.ai
   ```

---

## ✅ 인증 완료 후

### 1. Sitemap 제출
```
https://search.google.com/search-console
→ 색인 생성 → Sitemaps
→ 새 사이트맵 추가: https://the-saena.ai/sitemap.xml
```

### 2. URL 검사
```
상단 검색창에 URL 입력
→ "색인 생성 요청" 클릭
```

### 3. 성능 모니터링
```
실적 → 검색결과
→ CTR, 노출수, 클릭수 확인
```

---

## 🔗 다음 단계: GSC API 연동

인증 완료 후 API 연동으로 자동화 가능:

```bash
# 1. Google Cloud Console에서 프로젝트 생성
https://console.cloud.google.com

# 2. Search Console API 활성화
API 및 서비스 → 라이브러리 → "Google Search Console API" 검색 → 사용 설정

# 3. OAuth 2.0 인증 정보 생성
API 및 서비스 → 사용자 인증 정보 → OAuth 2.0 클라이언트 ID 생성

# 4. 환경 변수 설정
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback/google
```

---

## 📊 확인 사항

- [ ] GSC 소유권 인증 완료
- [ ] Sitemap 제출 완료
- [ ] robots.txt 확인
- [ ] 주요 페이지 색인 요청
- [ ] 실적 데이터 수집 시작 (24-48시간 소요)

---

## 🆘 문제 해결

### "파일을 찾을 수 없습니다"
```bash
# public 폴더 확인
ls -la public/google*.html

# Next.js 재시작
npm run build
npm start
```

### "메타 태그를 찾을 수 없습니다"
```bash
# 페이지 소스 확인
curl https://the-saena.ai | grep google-site-verification

# 캐시 클리어 후 재배포
```

### "DNS 레코드를 찾을 수 없습니다"
```bash
# DNS 전파 확인
nslookup -type=TXT the-saena.ai

# 최대 48시간 대기
```

---

## 📞 지원

- Google Search Console 고객센터: https://support.google.com/webmasters
- SAENA 팀: seo@the-saena.ai
