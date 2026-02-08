# CI/CD 프로젝트 작업 현황

## 완료된 작업

### CI (지속적 통합)
- [x] React + Vite 기본 프로젝트 세팅
- [x] CLAUDE.md 생성 (프로젝트 규칙: yarn 사용, 한국어 응답)
- [x] CI 워크플로우 구성 (.github/workflows/ci.yml)
  - Lint (ESLint)
  - Build (Vite)
- [x] Gemini AI 리뷰 워크플로우 구성 (.github/workflows/gemini-review.yml)
  - GitHub Secrets에 GEMINI_API_KEY 등록
  - gemini-2.5-flash 모델 사용 (무료 티어)
  - GitHub MCP 서버 연결 (PR 읽기/리뷰 작성)
- [x] PR 템플릿 생성 (.github/pull_request_template.md)
- [x] GitHub Actions PR approve 권한 활성화
- [x] README 업데이트

### CD (지속적 배포)
- [x] GitHub Pages 선택
- [x] Vite base 경로 설정 (`/ci-cd-test/`)
- [x] 배포용 GitHub Actions 워크플로우 생성 (.github/workflows/deploy.yml)
  - main 브랜치에 push되면 자동 배포
- [x] GitHub Pages 소스를 GitHub Actions로 설정
- [x] README의 CD 섹션 업데이트
- [x] 배포 URL: https://gowelleast.github.io/ci-cd-test/

### 기타
- [x] 페이지를 단순한 CI/CD 테스트 페이지로 변경
