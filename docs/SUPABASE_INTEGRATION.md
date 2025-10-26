# Supabase Integration

SAENA 프로젝트의 Supabase 통합 문서입니다.

## 📊 데이터베이스 테이블

### 1. waitlist
사용자 대기자 명단을 관리하는 테이블입니다.

**컬럼:**
- `id` (UUID) - Primary Key
- `email` (TEXT) - 사용자 이메일 (unique)
- `created_at` (TIMESTAMPTZ) - 생성 시간
- `status` (TEXT) - 상태: pending, contacted, converted
- `source` (TEXT) - 가입 경로 (기본값: 'website')
- `metadata` (JSONB) - 추가 메타데이터 (user agent, referrer, IP 등)

**API 엔드포인트:**
- `POST /api/waitlist` - 대기자 명단 추가
- `GET /api/waitlist` - 대기자 명단 조회 (관리자용)

**사용 위치:**
- `/waitlist` 페이지
- `components/waitlist-form-floating.tsx`

---

### 2. onboarding_demo
사용자 온보딩 데모 데이터를 저장하는 테이블입니다.

**컬럼:**
- `id` (UUID) - Primary Key
- `name` (TEXT) - 사용자 이름 (필수)
- `email` (TEXT) - 사용자 이메일 (필수, unique)
- `company` (TEXT) - 회사명 (선택)
- `role` (TEXT) - 직책 (선택)
- `goals` (TEXT) - 사용 목표 (선택)
- `created_at` (TIMESTAMPTZ) - 생성 시간
- `metadata` (JSONB) - 추가 메타데이터 (user agent, referrer, IP 등)

**API 엔드포인트:**
- `POST /api/onboarding` - 온보딩 데이터 저장
- `GET /api/onboarding` - 온보딩 데이터 조회 (관리자용)

**사용 위치:**
- `components/onboarding-modal.tsx`
- `/prototype` 페이지 (온보딩 모달)

---

## 🔐 보안 설정

### Row Level Security (RLS)
두 테이블 모두 RLS가 활성화되어 있습니다.

**waitlist 정책:**
- Public insert 허용 (누구나 가입 가능)
- Authenticated read 허용 (인증된 사용자만 조회)

**onboarding_demo 정책:**
- Public insert 허용 (누구나 데이터 제출 가능)
- Authenticated read 허용 (인증된 사용자만 조회)

---

## 🧪 테스트 방법

### 1. Waitlist 테스트
```bash
# 대기자 추가
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'

# 대기자 조회 (개발 환경)
curl http://localhost:3000/api/waitlist
```

### 2. Onboarding 테스트
```bash
# 온보딩 데이터 저장
curl -X POST http://localhost:3000/api/onboarding \
  -H "Content-Type: application/json" \
  -d '{
    "name": "홍길동",
    "email": "hong@example.com",
    "company": "테스트 회사",
    "role": "마케팅 매니저",
    "goals": "AI 검색에서 브랜드 노출 상승"
  }'

# 온보딩 데이터 조회 (개발 환경)
curl http://localhost:3000/api/onboarding
```

### 3. Supabase MCP로 직접 조회
```bash
# 테이블 목록 확인
# Kiro에서: "supabase 테이블 목록 보여줘"

# 데이터 조회
# Kiro에서: "waitlist 테이블 데이터 조회해줘"
```

---

## 📝 마이그레이션 히스토리

### create_onboarding_demo_table
- 생성일: 2025-10-26
- 설명: onboarding_demo 테이블 생성
- 내용:
  - 테이블 생성 및 컬럼 정의
  - RLS 활성화
  - 인덱스 생성 (email, created_at)
  - 정책 설정 (public insert, authenticated read)

---

## 🚀 향후 개선 사항

1. **인증 시스템 추가**
   - Supabase Auth 통합
   - 관리자 대시보드 접근 제어

2. **알림 시스템**
   - 새로운 가입자 이메일 알림
   - Resend 또는 SendGrid 통합

3. **데이터 분석**
   - 가입 추이 대시보드
   - 전환율 추적

4. **데이터 내보내기**
   - CSV/Excel 내보내기 기능
   - 관리자 대시보드에서 데이터 관리
