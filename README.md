# AI 블랙 가이드 웹사이트 개발 가이드

이 문서는 'AI 블랙 가이드' 웹사이트의 구조와 콘텐츠를 동적으로 관리하는 방법에 대한 가이드를 제공합니다.

## 1. 프로젝트 구조

프로젝트는 다음과 같은 주요 파일 및 디렉토리로 구성됩니다.

-   `index.html`: 웹사이트의 메인 페이지 (AI 쌀먹지수 랭킹, 도구 비교, AI 호갱방지 등 주요 탭 포함).
-   `review-detail.html`: 각 AI 도구의 상세 리뷰를 표시하는 페이지 템플릿.
-   `data/`: 웹사이트에 필요한 모든 JSON 형식의 데이터를 담고 있는 디렉토리입니다.
    -   `data/reviewData.js`: 'AI 쌀먹지수'에 표시될 AI 도구 리뷰 정보.
    -   `data/comparisonData.js`: '도구 비교' 섹션에 사용될 AI 도구 비교 정보.
    -   `data/hogaengData.js`: 'AI 호갱방지 가이드' 섹션에 사용될 유료 플랜 분석 정보.

## 2. 데이터 포맷 정의 및 샘플 데이터

웹사이트의 모든 동적 콘텐츠는 `data/` 디렉토리 내의 JavaScript 파일에 정의된 변수에서 가져옵니다.

### 2.1. `reviewData` (AI 쌀먹지수)

개별 AI 도구에 대한 리뷰 정보를 담습니다.

**데이터 포맷:**

-   `id`: (Number) 각 리뷰의 고유 식별 번호 (중복되지 않아야 함).
-   `title`: (String) AI 도구의 이름 (예: "Gamma AI").
-   `category`: (String) 도구의 분류 ("developer", "ai-tool", "student", "website" 중 하나).
-   `tag`: (String) 카드에 표시될 짧은 핵심 태그 (예: "업무자동화").
-   `description`: (String) 카드에 표시될 한두 문장의 짧은 설명.
-   `score`: (Number) 'AI 쌀먹지수' 점수 (0~10 사이).
-   `date`: (String) 리뷰 발행일 ("YYYY-MM-DD" 형식).
-   `summary`: (Array<String>) 상세 리뷰 페이지의 '세 줄 요약' 섹션에 표시될 항목 배열. (추후 추가될 필드)
-   `full_content`: (Object) 상세 리뷰 페이지의 본문 콘텐츠 (추후 추가될 필드)
    -   `advantages`: (Array<Object>) 장점 섹션
        -   `heading`: (String) 소제목
        -   `body`: (String) 내용
        -   `image`: (String, optional) 이미지 URL
    -   `disadvantages`: (Array<Object>) 단점 섹션
        -   `heading`: (String) 소제목
        -   `body`: (String) 내용
    -   `tips`: (Array<String>) 실무 팁 목록
    -   `conclusion`: (String) 결론 문단

**샘플 데이터 (reviewData.js):**

```javascript
const reviewData = [
  {
    "id": 1,
    "title": "Gamma AI",
    "category": "ai-tool",
    "tag": "업무자동화",
    "description": "발표자료, PPT 생성을 5분 안에 끝내고 싶나요? Gamma AI가 텍스트만으로 전문가 수준의 프레젠테이션을 자동으로 만들어 줍니다.",
    "score": 8.5,
    "date": "2025-06-24",
    "summary": [
        "디자인 고민 없이 텍스트만으로 고퀄리티 발표자료(PPT)를 순식간에 만들 수 있다.",
        "템플릿이 다양하고 AI 이미지 생성 기능까지 내장되어 표현력이 매우 풍부하다.",
        "무료 크레딧이 넉넉해서 가끔 사용하는 사람이라면 굳이 유료 결제할 필요는 없다."
    ],
    "full_content": {
        "advantages": [
            { "heading": "압도적인 시간 단축", "body": "가장 큰 장점은 역시 속도입니다. 기획서 초안이나 발표 개요만 있으면, 디자인이나 레이아웃 고민 없이 5분에서 10분 만에 그럴듯한 발표자료 한 세트가 뚝딱 만들어집니다. 특히 정기적인 주간 보고나 내부 발표처럼 내용이 중요하고 디자인에 많은 시간을 쏟기 아까운 업무에서 진가를 발휘합니다.", "image": "https://placehold.co/800x450/e0e7ff/3730a3?text=Gamma+AI+%EC%9E%91%EC%97%85+%ED%99%94%EB%A9%B4" },
            { "heading": "초보자도 전문가처럼", "body": "PPT 디자인에 영 소질이 없는 '디알못'도 전문가 수준의 결과물을 만들 수 있습니다. 미리 만들어진 세련된 템플릿과 색상 조합을 제공하고, AI가 텍스트 길이에 맞춰 레이아웃을 자동으로 조정해 주기 때문에 디자인에 신경 쓸 필요가 전혀 없습니다." }
        ],
        "disadvantages": [
            { "heading": "디테일한 수정의 한계", "body": "템플릿 기반이다 보니, 아주 세밀한 디자인 수정(예: 특정 개체의 위치를 1mm 옮기기)은 어렵습니다. 정해진 틀 안에서 작업해야 하므로, 아주 독창적이거나 브랜드 가이드가 엄격한 디자인 작업에는 부적합할 수 있습니다." },
            { "heading": "느린 반응 속도", "body": "AI가 콘텐츠를 생성하고 레이아웃을 바꿀 때 약간의 딜레이가 있습니다. 성격 급한 한국인이라면 조금 답답하게 느껴질 수 있는 부분입니다. 하지만 이 정도의 기다림은 압도적인 생산성 향상에 비하면 충분히 감수할 만합니다." }
        ],
        "tips": [
            "기획서 초안 시각화: 텍스트로만 된 기획서를 팀원들에게 공유하기 전, Gamma로 빠르게 시각화해서 보여주면 이해도를 훨씬 높일 수 있습니다.",
            "아이디어 브레인스토밍: 특정 주제를 입력하고 AI가 제안하는 목차와 내용을 보면서 발표 아이디어를 구체화하는 용도로도 매우 유용합니다.",
            "강의 자료 제작: 강의나 스터디 자료를 만들 때, 핵심 내용만 정리해두면 Gamma가 보기 좋은 교육 자료로 재탄생시켜 줍니다."
        ],
        "conclusion": "Gamma AI는 모든 직장인의 PPT 제작 고민을 해결해 줄 수 있는 강력한 도구입니다. 특히 디테일한 디자인보다 '빠른 속도'와 '내용 전달'이 중요한 업무 환경에 있는 분들이라면, 'AI 쌀먹지수' 8.5점이 아깝지 않은 최고의 선택이 될 것입니다. 지금 바로 무료로 시작해 보세요!"
    }
  },
  // ... (다른 리뷰 데이터)
];
```

### 2.2. `comparisonData` (도구 비교)

두 개의 경쟁 AI 도구를 비교 분석하는 콘텐츠의 데이터를 담습니다.

**데이터 포맷:**

-   `id`: (Number) 비교 콘텐츠의 고유 식별 번호.
-   `title`: (String) 비교 콘텐츠의 제목 (예: "Vercel v0 vs Replit Ghostwriter").
-   `description`: (String) 페이지 상단에 표시될 짧은 설명.
-   `winner_id`: (Number) 비교 대상 중 더 우세한 도구의 `id` (`reviewData`의 `id`).
-   `tools`: (Array) 비교할 두 도구의 정보를 담는 배열.
    -   `id`: (Number) `reviewData`에 있는 도구의 `id`.
    -   `subtitle`: (String) 카드에 표시될 도구의 짧은 부제.
-   `final_verdict`: (Object) 최종 결론 부분의 내용을 담습니다.
    -   `headline`: (String) 최종 결론의 헤드라인.
    -   `body`: (String) 최종 결론에 대한 상세 설명.

**샘플 데이터 (comparisonData.js):**

```javascript
const comparisonData = [
  {
    "id": 101,
    "title": "Vercel v0 vs Replit Ghostwriter",
    "description": "AI 프론트엔드 코드 생성, 어떤 도구가 당신의 개발 속도를 더 빠르게 만들어줄까요? 두 거인의 장단점을 낱낱이 파헤쳐 봅니다.",
    "winner_id": 6,
    "tools": [
      {
        "id": 6,
        "subtitle": "React + Tailwind UI 생성의 최강자"
      },
      {
        "id": 2,
        "subtitle": "풀스택 개발을 돕는 만능 AI 비서"
      }
    ],
    "final_verdict": {
      "headline": "프론트엔드 UI만 빠르게 만들고 싶다면 Vercel v0, 풀스택 개발 전반에 AI의 도움을 받고 싶다면 Replit Ghostwriter",
      "body": "두 도구 모두 훌륭하지만, 사용 목적에 따라 선택이 갈립니다.\n\nVercel v0는 오직 UI 생성에만 집중하여 매우 직관적이고 고품질의 결과물을 보여줍니다. 디자이너 없이 빠르게 프로토타입을 만들거나, 기존 프로젝트에 새로운 컴포넌트를 추가해야 하는 프론트엔드 개발자에게 최고의 선택입니다.\n\n반면 Replit Ghostwriter는 Replit이라는 강력한 클라우드 IDE 안에서 프론트엔드는 물론 백엔드 로직, 데이터베이스 연동, 버그 수정까지 도와주는 만능 조수에 가깝습니다. 혼자서 풀스택 프로젝트를 진행하는 개발자나 코딩 학습자에게 훌륭한 파트너가 될 것입니다."
    }
  }
];
```

### 2.3. `hogaengData` (AI 호갱방지 가이드)

유료 구독 플랜의 가치를 분석하는 '호갱방지 가이드'의 데이터를 담습니다.

**데이터 포맷:**

-   `id`: (Number) 유료 플랜 분석 콘텐츠의 고유 식별 번호.
-   `title`: (String) 제품 이름 (예: "ChatGPT Plus").
-   `subtitle`: (String) 제품의 짧은 부제.
-   `hogaeng_score`: (Number) '호갱탈출 지수' 점수 (0~10 사이).
-   `verdict_quote`: (String) 점수 아래에 표시될 짧고 강력한 한 줄 평.
-   `plan_name`: (String) 분석 대상 유료 플랜의 이름 (예: "Plus").
-   `price`: (String) 플랜의 가격 (예: "$20/월").
-   `paid_features`: (Array<String>) 해당 플랜의 핵심 유료 기능 목록.
-   `tip`: (String) 구독과 관련된 유용한 팁.

**샘플 데이터 (hogaengData.js):**

```javascript
const hogaengData = [
  {
    "id": 201,
    "title": "ChatGPT Plus",
    "subtitle": "현존 최강 LLM의 잠재력 해방",
    "hogaeng_score": 9.2,
    "verdict_quote": "한번 맛보면 못 돌아가",
    "plan_name": "Plus",
    "price": "$20/월",
    "paid_features": [
      "GPT-4o 액세스: 무료 버전과는 비교불가한 추론 속도와 성능",
      "DALL-E 3 이미지 생성: 텍스트만으로 고품질 이미지 무제한 생성",
      "고급 데이터 분석: 파일 업로드 및 복잡한 데이터 분석, 시각화 가능",
      "GPTs: 나만의 맞춤형 챗봇 제작 및 스토어 이용"
    ],
    "tip": "Team 플랜($25/인/월)은 관리 기능이 추가되지만, 개인적으로 사용한다면 친한 친구 2~3명과 계정을 공유하는 것이 최고의 가성비 전략. 단, 동시 접속 제한에 주의!"
  },
  {
    "id": 202,
    "title": "Midjourney",
    "subtitle": "최고 퀄리티 이미지 생성의 끝판왕",
    "hogaeng_score": 8.8,
    "verdict_quote": "프로의 결과물이 필요하다면",
    "plan_name": "Standard Plan",
    "price": "$30/월",
    "paid_features": [
      "Relax 모드 무제한 생성: 시간제한 없이 여유롭게 이미지 생성",
      "Fast 모드 15시간 제공: 빠른 속도로 결과물이 필요할 때 사용",
      "개인 서버(DM)에서 작업 가능: 다른 사람에게 방해받지 않고 작업에 집중",
      "상업적 이용 가능: 생성한 이미지로 수익 창출 가능"
    ],
    "tip": "처음에는 Basic($10/월) 플랜으로 시작해서, Fast 모드 사용량이 부족하다고 느껴질 때 Standard 플랜으로 업그레이드하는 것을 추천합니다."
  }
];
```

## 3. 동적 콘텐츠 렌더링

### 3.1. `index.html`

-   **데이터 로드**: `<head>` 섹션의 스크립트 블록 시작 부분에서 `data/reviewData.js`, `data/comparisonData.js`, `data/hogaengData.js` 파일을 로드합니다.
    ```html
    <script src="./data/reviewData.js"></script>
    <script src="./data/comparisonData.js"></script>
    <script src="./data/hogaengData.js"></script>
    <script>
        // ... 메인 스크립트 로직 ...
    </script>
    ```
-   **탭 전환**: JavaScript의 `switchTab` 함수가 각 탭(reviews, comparison, hogaeng-prevention)에 따라 해당 데이터를 기반으로 HTML 요소를 동적으로 채웁니다.
    -   `reviews` 탭은 `renderCards` 함수를 호출하여 `reviewData`를 기반으로 카드 그리드를 렌더링합니다.
    -   `comparison` 탭은 `renderComparisonCards` 함수를 호출하여 `comparisonData`를 기반으로 비교 카드 및 최종 결론을 렌더링합니다.
    -   `hogaeng-prevention` 탭은 `renderHogaengCards` 함수를 호출하여 `hogaengData`를 기반으로 호갱방지 카드들을 렌더링합니다.
-   **상세 페이지 링크**: `index.html`의 각 리뷰 카드에 있는 "자세히 보기" 버튼은 `review-detail.html?id=${card.id}` 형식으로 링크되어, 클릭 시 해당 리뷰의 고유 ID를 URL 파라미터로 넘겨줍니다.

### 3.2. `review-detail.html`

-   **데이터 로드**: `index.html`과 마찬가지로 `reviewData.js`와 `hogaengData.js`를 로드합니다.
-   **ID 파싱**: 페이지 로드 시, JavaScript의 `getReviewIdFromUrl()` 함수를 사용하여 URL의 `id` 파라미터 값을 읽어옵니다.
-   **콘텐츠 렌더링**: 읽어온 `id`를 사용하여 `reviewData`에서 일치하는 리뷰를 찾고, `renderReviewDetail()` 함수를 호출하여 해당 리뷰의 제목, 설명, 점수, 요약, 본문 내용을 페이지의 적절한 HTML 요소에 동적으로 삽입합니다.
    -   `hogaengData`에서 해당 `reviewId + 200` (현재 임시 규칙)으로 연결된 호갱방지 정보가 있다면 함께 표시합니다.
    -   `full_content` 필드가 추가되면, `post-content` div에 상세 내용을 구조화하여 렌더링할 수 있습니다.

## 4. GitHub Pages 배포

이 프로젝트는 정적 웹사이트이므로, GitHub Pages를 사용하여 쉽게 배포할 수 있습니다.

1.  이 프로젝트 코드를 새 GitHub 저장소에 푸시합니다.
2.  저장소의 `Settings` > `Pages`로 이동합니다.
3.  'Source'에서 웹사이트를 배포할 브랜치(예: `main`)와 `/root` 디렉토리를 선택합니다.
4.  설정 후 몇 분 안에 GitHub Pages URL (예: `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/`)을 통해 웹사이트에 접속할 수 있습니다.

---

**참고:** `review-detail.html`의 '세 줄 요약'과 '본문 콘텐츠'는 현재 임시 데이터를 사용하고 있습니다. `reviewData`에 `summary` 배열과 `full_content` 객체 필드를 추가하여 더욱 풍부한 상세 리뷰를 구현할 수 있습니다. 