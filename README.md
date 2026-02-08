# CI/CD Test

GitHub Actions를 활용한 CI/CD 파이프라인 학습 및 테스트 프로젝트

## 목표

PR 생성 시 자동으로 실행되는 CI와, main 브랜치 push 시 자동 배포되는 CD를 구성한다.

## CI (완료)

PR이 생성되면 아래 3가지가 자동 실행됩니다.

| 체크 | 설명 | 워크플로우 |
|------|------|-----------|
| Lint | ESLint로 코드 품질 검사 | `ci.yml` |
| Build | Vite 빌드 성공 여부 확인 | `ci.yml` |
| Gemini AI Review | Gemini AI가 코드 변경사항을 분석하고 리뷰 코멘트 작성 | `gemini-review.yml` |

## CD (완료)

main 브랜치에 push되면 GitHub Pages에 자동 배포됩니다.

- 배포 URL: https://gowelleast.github.io/ci-cd-test/
- 워크플로우: `deploy.yml`

## 기술 스택

- React + Vite
- GitHub Actions
- Google Gemini API (AI 코드 리뷰)
