# 프로젝트 구조

## 📁 디렉토리 구조

```
.
├── app/                          # Next.js App Router
│   ├── admin/                   # 관리자 페이지
│   │   ├── login/              # 로그인 페이지
│   │   └── prototype/          # 프로토타입 대시보드
│   ├── api/                    # API 라우트
│   │   └── geo/                # 지역 감지 API
│   ├── About/                  # 회사 소개
│   ├── checkout/               # 결제 페이지
│   ├── faq/                    # FAQ
│   ├── manifesto/              # 매니페스토
│   ├── waitlist/               # 대기자 명단
│   ├── globals.css             # 전역 스타일
│   ├── layout.tsx              # 루트 레이아웃
│   └── page.tsx                # 홈페이지
│
├── components/                  # React 컴포넌트
│   ├── dashboard/              # 대시보드 컴포넌트
│   │   ├── analytics-*.tsx    # 분석 컴포넌트
│   │   ├── layout.tsx         # 대시보드 레이아웃
│   │   ├── sidebar.tsx        # 사이드바
│   │   └── ...                # 기타 대시보드 컴포넌트
│   ├── ui/                     # 기본 UI 컴포넌트 (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── error-boundary.tsx      # 에러 바운더리
│   ├── hero.tsx                # 히어로 섹션
│   ├── pricing.tsx             # 가격 섹션
│   ├── providers.tsx           # Context Providers
│   ├── skeleton.tsx            # 로딩 스켈레톤
│   ├── structured-data.tsx     # SEO 구조화된 데이터
│   └── ...                     # 기타 컴포넌트
│
├── hooks/                       # 커스텀 React 훅
│   ├── useAccessibility.ts     # 접근성 훅
│   ├── usePerformance.ts       # 성능 측정 훅
│   ├── use-mobile.ts           # 모바일 감지 훅
│   └── use-toast.ts            # 토스트 알림 훅
│
├── lib/                         # 유틸리티 및 설정
│   ├── api-error.ts            # API 에러 클래스
│   ├── csp.ts                  # Content Security Policy
│   ├── env-validation.ts       # 환경 변수 검증
│   └── utils.ts                # 공통 유틸리티
│
├── public/                      # 정적 파일
│   ├── icons/                  # 아이콘
│   └── images/                 # 이미지
│
├── docs/                        # 프로젝트 문서
│   ├── CODE_QUALITY_IMPROVEMENTS.md
│   ├── PERFORMANCE.md
│   ├── SECURITY.md
│   └── PROJECT_STRUCTURE.md    # 이 문서
│
├── .env.example                 # 환경 변수 예제
├── .eslintrc.json              # ESLint 설정
├── .gitignore                  # Git 무시 파일
├── components.json             # shadcn/ui 설정
├── env.d.ts                    # 환경 변수 타입
├── middleware.ts               # Next.js 미들웨어
├── next.config.mjs             # Next.js 설정
├── package.json                # 프로젝트 의존성
├── README.md                   # 프로젝트 README
├── tailwind.config.ts          # Tailwind CSS 설정
└── tsconfig.json               # TypeScript 설정
```

## 📝 주요 디렉토리 설명

### `/app`
Next.js 13+ App Router를 사용하는 페이지 디렉토리입니다.
- 각 폴더는 라우트를 나타냅니다
- `page.tsx`는 해당 라우트의 페이지 컴포넌트
- `layout.tsx`는 레이아웃 컴포넌트
- `loading.tsx`는 로딩 상태 컴포넌트

### `/components`
재사용 가능한 React 컴포넌트들입니다.
- `dashboard/`: 대시보드 전용 컴포넌트
- `ui/`: shadcn/ui 기반 기본 UI 컴포넌트
- 나머지: 페이지별 또는 기능별 컴포넌트

### `/hooks`
커스텀 React 훅들입니다.
- 로직 재사용을 위한 훅
- 상태 관리 훅
- 유틸리티 훅

### `/lib`
유틸리티 함수와 설정 파일들입니다.
- 공통 함수
- API 관련 유틸리티
- 타입 정의
- 설정 파일

### `/public`
정적 파일들입니다.
- 이미지, 아이콘, 폰트 등
- 빌드 시 그대로 복사됨

### `/docs`
프로젝트 문서들입니다.
- 개발 가이드
- API 문서
- 아키텍처 문서

## 🎯 명명 규칙

### 파일명
- **컴포넌트**: PascalCase (예: `Button.tsx`, `UserProfile.tsx`)
- **훅**: camelCase with 'use' prefix (예: `useAuth.ts`, `useLocalStorage.ts`)
- **유틸리티**: kebab-case (예: `api-error.ts`, `date-utils.ts`)
- **페이지**: kebab-case (예: `about/page.tsx`, `user-profile/page.tsx`)

### 변수명
- **컴포넌트**: PascalCase
- **함수/변수**: camelCase
- **상수**: UPPER_SNAKE_CASE
- **타입/인터페이스**: PascalCase

### 폴더명
- **일반**: kebab-case (예: `user-profile`, `api-routes`)
- **컴포넌트 그룹**: kebab-case (예: `dashboard`, `auth-forms`)

## 🔄 컴포넌트 구조

### 기본 컴포넌트 구조
```typescript
// 1. Imports
import React from 'react';
import { cn } from '@/lib/utils';

// 2. Types/Interfaces
interface ComponentProps {
  // props
}

// 3. Component
export function Component({ ...props }: ComponentProps) {
  // 4. Hooks
  const [state, setState] = useState();

  // 5. Effects
  useEffect(() => {
    // effect logic
  }, []);

  // 6. Handlers
  const handleClick = () => {
    // handler logic
  };

  // 7. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

## 📦 모듈 구조

### Import 순서
1. React 및 Next.js
2. 외부 라이브러리
3. 내부 컴포넌트
4. 내부 훅
5. 내부 유틸리티
6. 타입
7. 스타일

```typescript
// 1. React/Next.js
import React from 'react';
import { useRouter } from 'next/navigation';

// 2. 외부 라이브러리
import { motion } from 'framer-motion';

// 3. 내부 컴포넌트
import { Button } from '@/components/ui/button';

// 4. 내부 훅
import { useAuth } from '@/hooks/useAuth';

// 5. 내부 유틸리티
import { cn } from '@/lib/utils';

// 6. 타입
import type { User } from '@/types';

// 7. 스타일
import './styles.css';
```

## 🎨 스타일 구조

### Tailwind CSS
- 주요 스타일링 방법
- `app/globals.css`에 전역 스타일
- 컴포넌트별 인라인 클래스

### CSS Modules (필요시)
- 컴포넌트별 스타일 격리
- `ComponentName.module.css`

## 🔧 설정 파일

### `next.config.mjs`
- Next.js 설정
- 보안 헤더
- 이미지 최적화
- 환경별 설정

### `tailwind.config.ts`
- Tailwind CSS 설정
- 커스텀 색상
- 커스텀 유틸리티

### `tsconfig.json`
- TypeScript 설정
- Path aliases
- 컴파일 옵션

## 📚 추가 리소스

- [Next.js 문서](https://nextjs.org/docs)
- [React 문서](https://react.dev)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [TypeScript 문서](https://www.typescriptlang.org/docs)

---

**마지막 업데이트**: 2025년 1월
