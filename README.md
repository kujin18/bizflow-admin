# BizFlow Admin

Spring Boot와 React를 활용한 고객 관리 관리자 대시보드 프로젝트입니다.

고객 정보를 등록·조회·수정·삭제하고, 대시보드에서 고객 현황과 월별 신규 고객 추이를 확인할 수 있습니다.

## 주요 기능

### 1. 관리자 대시보드
- 전체 고객 수 및 이번 달 신규 고객 수 표시
- 최근 6개월 신규 고객 추이 차트
- 최근 등록 고객 목록
- 백엔드 API 연결 상태 표시
- 데이터 새로고침

### 2. 고객 관리
- 고객 등록, 조회, 수정, 삭제 (CRUD)
- 이름, 이메일, 전화번호, 회사명 관리
- 이름·이메일·회사명 검색
- 이메일 형식 및 필수 입력값 검증
- 중복 이메일 등록 방지
- 작업 성공 및 오류 메시지 표시

### 3. 반응형 UI
- 데스크톱 관리자 레이아웃
- 모바일 화면에 맞춘 고객 카드 UI
- 모바일 메뉴 및 고객 등록·수정 모달

## 기술 스택

| 구분 | 기술 |
|---|---|
| Frontend | React, TypeScript, Vite |
| UI | Tailwind CSS, Lucide Icons |
| Chart | Recharts |
| Backend | Java, Spring Boot, Spring Data JPA |
| Database | PostgreSQL |
| Migration | Flyway |
| Infrastructure | Docker Compose |
| Version Control | Git, GitHub |

## 프로젝트 구조

```text
bizflow-admin/
├── backend/          # Spring Boot REST API
├── frontend/         # React 관리자 화면
├── docs/             # 프로젝트 문서
├── docker-compose.yml
└── README.md
```

## API 기능

| Method | Endpoint | 설명 |
|---|---|---|
| GET | /api/customers | 고객 목록 조회 |
| GET | /api/customers/{id} | 고객 상세 조회 |
| POST | /api/customers | 고객 등록 |
| PUT | /api/customers/{id} | 고객 정보 수정 |
| DELETE | /api/customers/{id} | 고객 삭제 |

## 로컬 실행

### 1. 프로젝트 복제

```bash
git clone https://github.com/kujin18/bizflow-admin.git
cd bizflow-admin
```

### 2. 환경변수 설정

프로젝트 루트에 `.env` 파일을 생성합니다.

```env
DB_PASSWORD=your_local_password
```

### 3. PostgreSQL 실행

```bash
docker compose up -d
```

### 4. 백엔드 실행

Windows:

```powershell
cd backend
.\gradlew.bat bootRun
```

### 5. 프론트엔드 실행

별도의 터미널에서 실행합니다.

```powershell
cd frontend
npm install
npm run dev
```

프론트엔드: http://localhost:5173

백엔드 API: http://localhost:8080/api/customers

## 향후 개선 계획

- 관리자 로그인 및 권한 관리
- 고객 목록 페이지네이션
- 고객 데이터 CSV/Excel 내보내기
- 테스트 자동화 및 배포 환경 구축

## 프로젝트 정보

개인 풀스택 웹 개발 포트폴리오 프로젝트입니다.

GitHub: https://github.com/kujin18/bizflow-admin
