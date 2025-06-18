# Recommender App (추천 시스템 클라이언트)

이 폴더는 독립적인 추천 시스템 웹 애플리케이션의 클라이언트 측 코드를 포함합니다. 이 애플리케이션은 사용자에게 AI 도구를 추천하고 관련 정보를 표시하는 데 중점을 둡니다.

## 주요 기능
- **데이터 로딩**: 추천에 필요한 데이터를 로드하고 처리
- **추천 알고리즘 실행**: 클라이언트 측에서 추천 알고리즘을 실행하여 도구 추천
- **UI 렌더링**: 사용자 인터페이스를 통해 추천 결과를 시각적으로 표시

## 기술 스택
- **Vite**: 빠른 개발 환경을 위한 빌드 도구
- **React**: 사용자 인터페이스 구축을 위한 JavaScript 라이브러리
- **TypeScript**: 타입 안정성을 위한 프로그래밍 언어
- **Tailwind CSS**: 효율적인 UI 스타일링
- **WebLLM**: 클라이언트 측 AI 모델 실행을 위한 라이브러리

이 애플리케이션은 AI 도구 추천의 핵심 로직을 담당하며, 독립적으로 실행될 수 있도록 설계되었습니다.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
