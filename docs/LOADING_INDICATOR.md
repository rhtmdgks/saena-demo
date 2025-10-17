# 로딩 인디케이터 가이드

## 📦 사용된 라이브러리

- **ldrs** - 경량 로딩 애니메이션 라이브러리
- 웹 컴포넌트 기반으로 프레임워크 독립적
- 다양한 애니메이션 스타일 제공

## 🎨 구현된 로딩 인디케이터

### Bouncy Loader
현재 프로젝트에서 사용 중인 로딩 애니메이션입니다.

```tsx
<l-bouncy
  size="45"
  speed="1.75"
  color="rgb(198, 255, 58)"
/>
```

#### 속성
- **size**: 로더 크기 (픽셀)
- **speed**: 애니메이션 속도 (초)
- **color**: 로더 색상 (CSS 색상 값)

## 📁 파일 구조

```
components/
  └── loading-spinner.tsx   # 재사용 가능한 로딩 컴포넌트

app/
  └── admin/
      └── loading.tsx       # Admin 페이지 로딩

types/
  └── ldrs.d.ts            # TypeScript 타입 정의
```

## 🔧 구현 방법

### 1. 재사용 가능한 로딩 컴포넌트

`components/loading-spinner.tsx`를 사용하여 필요한 곳에서만 로딩 인디케이터를 표시합니다.

```tsx
import { LoadingSpinner } from "@/components/loading-spinner"

// 기본 사용
<LoadingSpinner />

// 커스터마이징
<LoadingSpinner 
  size="60"
  speed="2.0"
  color="rgb(198, 255, 58)"
  text="Loading data..."
/>

// 전체 화면 오버레이
<LoadingSpinner fullScreen text="Loading..." />
```

### 2. 페이지별 로딩

각 페이지 디렉토리에 `loading.tsx`를 추가하여 해당 페이지의 로딩 상태를 표시합니다.

```tsx
// app/some-page/loading.tsx
import { LoadingSpinner } from "@/components/loading-spinner"

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoadingSpinner text="Loading page..." />
    </div>
  )
}
```

### 3. 조건부 로딩

컴포넌트 내에서 조건부로 로딩을 표시합니다.

```tsx
"use client"

import { useState } from 'react'
import { LoadingSpinner } from "@/components/loading-spinner"

export function MyComponent() {
  const [isLoading, setIsLoading] = useState(false)

  if (isLoading) {
    return <LoadingSpinner fullScreen text="Processing..." />
  }

  return <div>Content</div>
}
```

## 🎨 커스터마이징

### 색상 변경

프로젝트의 accent 색상을 사용합니다:

```tsx
// 라이트 모드
color="rgb(65, 140, 15)"

// 다크 모드
color="rgb(198, 255, 58)"

// CSS 변수 사용
color="var(--accent-green-rgb)"
```

### 크기 조정

```tsx
// 작은 크기
<l-bouncy size="30" speed="1.75" color="rgb(198, 255, 58)" />

// 기본 크기
<l-bouncy size="45" speed="1.75" color="rgb(198, 255, 58)" />

// 큰 크기
<l-bouncy size="60" speed="1.75" color="rgb(198, 255, 58)" />
```

### 속도 조정

```tsx
// 느린 속도
<l-bouncy size="45" speed="2.5" color="rgb(198, 255, 58)" />

// 기본 속도
<l-bouncy size="45" speed="1.75" color="rgb(198, 255, 58)" />

// 빠른 속도
<l-bouncy size="45" speed="1.0" color="rgb(198, 255, 58)" />
```

## 🔄 다른 로더 스타일

ldrs는 다양한 로더 스타일을 제공합니다:

### Ring Loader
```tsx
import { ring } from 'ldrs'
ring.register()

<l-ring size="40" speed="2" color="rgb(198, 255, 58)" stroke="5" />
```

### Dot Spinner
```tsx
import { dotSpinner } from 'ldrs'
dotSpinner.register()

<l-dot-spinner size="40" speed="0.9" color="rgb(198, 255, 58)" />
```

### Spiral
```tsx
import { spiral } from 'ldrs'
spiral.register()

<l-spiral size="40" speed="0.9" color="rgb(198, 255, 58)" />
```

## 💡 사용 예제

### 데이터 페칭 시
```tsx
"use client"

import { useState, useEffect } from 'react'
import { LoadingSpinner } from "@/components/loading-spinner"

export function DataComponent() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData().then(result => {
      setData(result)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <LoadingSpinner text="Loading data..." />
  }

  return <div>{/* Render data */}</div>
}
```

### 폼 제출 시
```tsx
"use client"

import { useState } from 'react'
import { LoadingSpinner } from "@/components/loading-spinner"

export function FormComponent() {
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    setSubmitting(true)
    await submitForm()
    setSubmitting(false)
  }

  return (
    <>
      {submitting && <LoadingSpinner fullScreen text="Submitting..." />}
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
      </form>
    </>
  )
}
```

### 페이지 전환 시
```tsx
// app/dashboard/loading.tsx
import { LoadingSpinner } from "@/components/loading-spinner"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner text="Loading dashboard..." />
    </div>
  )
}
```

## 🎯 베스트 프랙티스

### 1. 로딩 시간 최적화
```tsx
// 너무 짧은 로딩은 깜빡임 효과를 줄 수 있음
// 최소 표시 시간을 설정하여 부드러운 UX 제공
const [loading, setLoading] = useState(true)

useEffect(() => {
  const minLoadTime = 300 // 최소 300ms 표시
  const startTime = Date.now()
  
  fetchData().then(() => {
    const elapsed = Date.now() - startTime
    const remaining = Math.max(0, minLoadTime - elapsed)
    
    setTimeout(() => setLoading(false), remaining)
  })
}, [])
```

### 2. 접근성
```tsx
<div role="status" aria-live="polite" aria-label="Loading content">
  <l-bouncy size="45" speed="1.75" color="rgb(198, 255, 58)" />
  <span className="sr-only">Loading...</span>
</div>
```

### 3. 성능
```tsx
// 동적 import로 번들 크기 최적화
useEffect(() => {
  import('ldrs').then(({ bouncy }) => {
    bouncy.register()
  })
}, [])
```

### 4. 사용자 경험
```tsx
// 배경 블러 및 반투명 오버레이
<div className="fixed inset-0 bg-black/30 backdrop-blur-sm">
  <l-bouncy ... />
</div>
```

## 🐛 문제 해결

### 로더가 표시되지 않음
1. `bouncy.register()`가 호출되었는지 확인
2. 컴포넌트가 클라이언트 컴포넌트인지 확인 (`"use client"`)
3. TypeScript 타입이 올바르게 설정되었는지 확인

### 타입 에러
```bash
# types/ldrs.d.ts 파일이 있는지 확인
# tsconfig.json에 types 폴더가 포함되었는지 확인
```

### 스타일 문제
```tsx
// z-index 확인
className="z-[9999]"

// 배경 오버레이 확인
className="fixed inset-0 bg-black/30"
```

## 📚 참고 자료

- [ldrs 공식 문서](https://uiball.com/ldrs/)
- [Next.js Loading UI](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

---

**마지막 업데이트**: 2025년 1월
