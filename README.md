# GOODWILL(KE) - 3D Animation Platform

고품질 3D 애니메이션 서비스를 제공하는 Next.js 기반 웹 플랫폼입니다.

## 🚀 빠른 시작

### 필수 요구사항

- Node.js 18.17 이상
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
# .env.local 파일을 편집하여 필요한 값을 설정하세요

# 개발 서버 실행
npm run dev
```

개발 서버가 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

## 📁 프로젝트 구조

```
.
├── app/                    # Next.js App Router 페이지
│   ├── admin/             # 관리자 페이지
│   ├── api/               # API 라우트
│   └── ...                # 기타 페이지
├── components/            # React 컴포넌트
│   ├── dashboard/         # 대시보드 컴포넌트
│   ├── ui/                # UI 기본 컴포넌트
│   └── ...                # 기타 컴포넌트
├── hooks/                 # 커스텀 React 훅
├── lib/                   # 유틸리티 함수 및 설정
├── public/                # 정적 파일
├── docs/                  # 프로젝트 문서
└── ...
```

## 🛠️ 주요 기능

- ✅ 3D 애니메이션 포트폴리오 쇼케이스
- ✅ 가격 플랜 및 견적 시스템
- ✅ 관리자 대시보드
- ✅ 반응형 디자인
- ✅ 다크 모드 지원
- ✅ SEO 최적화
- ✅ 성능 최적화
- ✅ 접근성 준수 (WCAG 2.1 AA)

## 📚 문서

자세한 문서는 [docs](./docs) 폴더를 참조하세요:

- [코드 품질 개선](./docs/CODE_QUALITY_IMPROVEMENTS.md)
- [보안 정책](./docs/SECURITY.md)
- [성능 최적화](./docs/PERFORMANCE.md)

## 🔧 개발 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린트 검사
npm run lint
```

## 🔒 보안

보안 취약점을 발견하셨나요? [보안 정책](./docs/SECURITY.md)을 참조하여 신고해주세요.

⚠️ **중요**: 현재 인증 시스템은 프로토타입입니다. 프로덕션 배포 전에 반드시 서버 사이드 인증으로 교체해야 합니다.

## 🌐 배포

### Vercel (권장)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/yourrepo)

### 기타 플랫폼

- Netlify
- AWS Amplify
- Docker

자세한 배포 가이드는 [Next.js 배포 문서](https://nextjs.org/docs/deployment)를 참조하세요.

## 🤝 기여

기여를 환영합니다! 다음 가이드라인을 따라주세요:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 비공개 라이선스입니다.

## 📞 연락처

- 웹사이트: [https://theskitbit.com](https://theskitbit.com)
- 이메일: support@the-saena.ai
- Twitter: [@theskitbit](https://twitter.com/theskitbit)

## 🙏 감사의 말

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

Made with ❤️ by GOODWILL(KE)
