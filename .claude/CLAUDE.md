# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 참고하는 가이드 문서입니다.

## 언어 규칙

- 모든 문서, 주석, 설명은 반드시 **한글**로 작성한다.

---

## 1. 커맨드 라인

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 (포트 3000, 브라우저 자동 열림) |
| `npm run build` | 프로덕션 빌드 (`tsc -b && vite build`) |
| `npm run lint` | ESLint 코드 검사 |
| `npm run preview` | 프로덕션 빌드 미리보기 |

---

## 2. 아키텍처

- Vite React-TS 템플릿 기반의 싱글 페이지 애플리케이션(SPA)
- 진입점: `src/main.tsx` → `#root` 엘리먼트에 `<App />` 컴포넌트 렌더링

---

## 3. 디렉토리 구조

```
src/
├── features/
│   ├── components/     # 재사용 컴포넌트
│   └── pages/          # 화면 단위 페이지 컴포넌트
├── service/
│   └── apis/           # API 연동 모듈 (axios 기반)
├── datas/
│   └── mock/           # Mock 데이터 (목적별 하위 폴더 분류)
├── commons/
│   ├── utils/          # 공통 유틸 함수
│   └── routers/        # 라우터 목록 및 설정
└── main.tsx
```

- Mock 데이터는 `datas/mock/` 하위에 작성하며, 데이터 목적에 따라 하위 폴더를 분류하여 생성한다.
- 위 구조에 명시되지 않은 항목은 기존 코드 패턴을 참고하여 적절한 위치에 생성한다.

---

## 4. 코드 스타일

### 컴포넌트

- 함수형 컴포넌트만 사용한다.
- 익명 화살표 함수 방식으로 작성한다.

  ```tsx
  // 올바른 예
  const MyComponent = () => {
    return <div>...</div>;
  };
  ```

- props가 없는 경우 타입 선언을 생략한다.
- 컴포넌트 이름은 **PascalCase**로 작성한다.
- 변수, 함수 등 그 외 식별자는 **camelCase**로 작성한다.

### CSS / 스타일

- **Tailwind CSS**를 기본 스타일링 도구로 사용한다.
- Tailwind로 처리하기 어려운 경우에만 CSS Module(`.module.css`)을 사용한다.

### 라우터

- React Router는 항상 **최신 버전**을 사용한다.
- **Data Mode** 방식으로 작성한다 (`createBrowserRouter` 사용).
- 라우터 **목록(routes 배열)**과 **설정(createBrowserRouter 호출)**은 파일을 분리하여 관리한다.
- 라우터 설정 파일은 `commons/routers/` 하위에서 별도로 관리한다.
- 링크 컴포넌트는 기본적으로 `NavLink`를 사용한다.

  ```
  commons/routers/
  ├── index.tsx       # createBrowserRouter 설정
  └── routes.tsx      # routes 배열 목록
  ```

### API

- HTTP 요청은 **axios** 라이브러리를 사용한다.
- API 호출 함수는 `service/apis/` 하위에 도메인별로 파일을 분리하여 관리한다.

---

## 5. 설정 정보

- **Vite** (`vite.config.ts`): 개발 서버 포트 3000, 브라우저 자동 열림 설정
- **TypeScript** (`tsconfig.app.json`): ES2023 타겟, bundler 모듈 해석, JSX는 `react-jsx` 사용
- **ESLint** (`eslint.config.js`): `no-unused-vars` 규칙 비활성화, typescript-eslint·react-hooks·react-refresh 플러그인 적용