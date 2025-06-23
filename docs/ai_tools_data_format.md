# AI 도구 데이터 JSON 포맷 정의

이 문서는 AI Tool Recommender 애플리케이션에서 사용될 AI 도구 데이터의 JSON 포맷을 정의합니다. 이 포맷은 AI 도구 검색, 추천 및 상세 정보 표시에 필요한 모든 정보를 포함합니다.

## JSON 포맷 예시

```json
[
  {
    "id": "ai_tool_001",
    "name": "Midjourney",
    "description": "텍스트 프롬프트로부터 이미지를 생성하는 강력한 AI 도구입니다.",
    "features": [
      "텍스트-이미지 변환",
      "다양한 스타일 지원",
      "고해상도 이미지 생성"
    ],
    "use_cases": [
      "콘텐츠 제작",
      "아트 디자인",
      "아이디어 시각화"
    ],
    "category": "이미지 생성",
    "tags": ["AI 아트", "이미지", "생성형 AI", "디자인"],
    "url": "https://www.midjourney.com",
    "image_url": "/public/placeholder-logo.png",
    "rating": 4.8,
    "reviews": 1250
  },
  {
    "id": "ai_tool_002",
    "name": "ChatGPT",
    "description": "대화형 인공지능으로, 다양한 질문에 답변하고 텍스트를 생성합니다.",
    "features": [
      "자연어 이해",
      "텍스트 생성",
      "질의응답",
      "번역"
    ],
    "use_cases": [
      "글쓰기 보조",
      "정보 검색",
      "코드 생성",
      "아이디어 브레인스토밍"
    ],
    "category": "텍스트 생성",
    "tags": ["챗봇", "언어 모델", "텍스트", "AI 비서"],
    "url": "https://chat.openai.com",
    "image_url": "/public/placeholder-logo.png",
    "rating": 4.9,
    "reviews": 2500
  },
  {
    "id": "ai_tool_003",
    "name": "DALL-E 3",
    "description": "텍스트 설명을 기반으로 독창적인 이미지를 생성하는 AI 시스템입니다.",
    "features": [
      "텍스트-이미지 변환",
      "사실적인 이미지",
      "다양한 그림 스타일"
    ],
    "use_cases": [
      "마케팅 자료",
      "콘텐츠 제작",
      "아트워크 생성"
    ],
    "category": "이미지 생성",
    "tags": ["AI 아트", "이미지", "생성형 AI", "디자인"],
    "url": "https://openai.com/dall-e-3",
    "image_url": "/public/placeholder-logo.png",
    "rating": 4.7,
    "reviews": 980
  }
]
```

## 필드 설명

*   **`id` (문자열)**: 각 AI 도구를 고유하게 식별하는 ID입니다.
*   **`name` (문자열)**: AI 도구의 공식 이름입니다.
*   **`description` (문자열)**: 도구의 주요 기능을 간략하게 설명합니다.
*   **`features` (문자열 배열)**: 도구가 제공하는 주요 기능 목록입니다.
*   **`use_cases` (문자열 배열)**: 도구를 사용할 수 있는 일반적인 시나리오 목록입니다.
*   **`category` (문자열)**: 도구가 속하는 카테고리입니다 (예: "이미지 생성", "텍스트 생성" 등).
*   **`tags` (문자열 배열)**: 검색 및 필터링에 유용한 키워드 태그 목록입니다.
*   **`url` (문자열)**: 도구의 공식 웹사이트 또는 상세 정보 페이지로 연결되는 URL입니다.
*   **`image_url` (문자열, 선택 사항)**: 도구를 시각적으로 나타내는 이미지의 URL입니다. `public` 폴더에 있는 이미지를 참조하는 것이 일반적입니다.
*   **`rating` (숫자, 선택 사항)**: 도구에 대한 사용자 평점입니다 (예: 1.0 ~ 5.0).
*   **`reviews` (숫자, 선택 사항)**: 도구에 대한 총 리뷰 개수입니다. 