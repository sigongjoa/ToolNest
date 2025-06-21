export interface ITool {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  rating: number;
  imageUrl: string;
  url: string;
  metrics?: Metric;
  categories: string[];
}

export interface Metric {
  accuracy: number;
  latency: number;
  cost: number;
  usability: number;
  stability: number;
}

export interface Weights {
  accuracy: number;
  latency: number;
  cost: number;
  usability: number;
  stability: number;
}

export interface IReview {
  id: number;
  toolId: number;
  content: string;
  pros: string[];
  cons: string[];
  screenshots: string[];
  subtitle: string;
}

export const tools: ITool[] = [
  {
    id: 5,
    name: "Anthropic Claude 3",
    slug: "claude-3",
    category: "AI",
    description: "Anthropic에서 제공하는 대화형 AI로, 높은 안전성(safety)과 일관된 응답 품질을 자랑합니다.",
    rating: 4.8,
    imageUrl: "https://example.com/logos/claude3.png",
    url: "https://www.anthropic.com/claude",
    categories: ["AI"]
  },
  {
    id: 6,
    name: "GitHub Copilot",
    slug: "github-copilot",
    category: "AI",
    description: "GitHub와 OpenAI가 협업하여 만든 AI 코딩 도우미로, IDE 내에서 실시간 코드 제안과 완성을 지원합니다.",
    rating: 4.6,
    imageUrl: "https://example.com/logos/copilot.png",
    url: "https://github.com/features/copilot",
    categories: ["AI"]
  },
  {
    id: 7,
    name: "Jasper AI",
    slug: "jasper-ai",
    category: "AI",
    description: "마케팅 카피, 블로그 포스트, 광고 문구 등을 자동 생성해 주는 AI 콘텐츠 플랫폼입니다.",
    rating: 4.5,
    imageUrl: "https://example.com/logos/jasper.png",
    url: "https://www.jasper.ai",
    categories: ["AI"]
  },
  {
    id: 8,
    name: "Copy.ai",
    slug: "copy-ai",
    category: "AI",
    description: "간단한 프롬프트만으로 소셜 미디어 캡션, 이메일, 블로그 초안을 빠르게 만들어 주는 도구입니다.",
    rating: 4.3,
    imageUrl: "https://example.com/logos/copyai.png",
    url: "https://www.copy.ai",
    categories: ["AI"]
  },
  {
    id: 9,
    name: "Stable Diffusion",
    slug: "stable-diffusion",
    category: "AI",
    description: "오픈소스 텍스트→이미지 생성 모델로, 로컬 설치 후 커스터마이징이 자유롭습니다.",
    rating: 4.4,
    imageUrl: "https://example.com/logos/stable-diffusion.png",
    url: "https://stability.ai/blog/stable-diffusion",
    categories: ["AI"]
  },
  {
    id: 10,
    name: "Google Drive",
    slug: "google-drive",
    category: "General Utility",
    description: "문서, 사진, 비디오 등을 저장하고 공유할 수 있는 클라우드 저장 서비스입니다.",
    rating: 4.7,
    imageUrl: "https://example.com/logos/google-drive.png",
    url: "https://drive.google.com/",
    categories: ["General Utility"]
  },
  {
    id: 11,
    name: "Notion",
    slug: "notion",
    category: "Productivity Tool",
    description: "메모, 프로젝트 관리, 데이터베이스 등 다양한 기능을 통합하여 제공하는 워크스페이스 도구입니다.",
    rating: 4.6,
    imageUrl: "https://example.com/logos/notion.png",
    url: "https://www.notion.so/",
    categories: ["Productivity Tool"]
  },
  {
    id: 12,
    name: "Zoom",
    slug: "zoom",
    category: "Business AI",
    description: "원격 회의, 웨비나, 채팅 등 다양한 협업 기능을 제공하는 화상 회의 플랫폼입니다.",
    rating: 4.5,
    imageUrl: "https://example.com/logos/zoom.png",
    url: "https://zoom.us/",
    categories: ["Business AI"]
  },
  {
    id: 13,
    name: "Slack",
    slug: "slack",
    category: "Business AI",
    description: "팀 커뮤니케이션 및 협업을 위한 메시징 플랫폼입니다.",
    rating: 4.4,
    imageUrl: "https://example.com/logos/slack.png",
    url: "https://slack.com/",
    categories: ["Business AI"]
  },
  {
    id: 14,
    name: "Quizlet",
    slug: "quizlet",
    category: "Education AI",
    description: "플래시카드, 퀴즈, 게임 등을 통해 학습을 돕는 온라인 학습 도구입니다.",
    rating: 4.3,
    imageUrl: "https://example.com/logos/quizlet.png",
    url: "https://quizlet.com/",
    categories: ["Education AI"]
  },
  {
    id: 15,
    name: "Grammarly",
    slug: "grammarly",
    category: "Education AI",
    description: "문법, 철자, 구두점 오류를 교정하고 문체 개선을 돕는 글쓰기 도우미입니다.",
    rating: 4.6,
    imageUrl: "https://example.com/logos/grammarly.png",
    url: "https://www.grammarly.com/",
    categories: ["Education AI"]
  }
];

export const reviews: IReview[] = [
  {
    id: 5,
    toolId: 5,
    subtitle: "안전성과 일관성의 조화",
    content: "Claude 3는 사용자 안전 정책을 엄격히 지키면서도, 복잡한 질문에 대해 일관성 있는 답변을 제공합니다.",
    pros: [
      "높은 안전성(safety) 필터링",
      "긴 대화 컨텍스트 유지",
      "투명한 정책 설명"
    ],
    cons: [
      "응답 생성 속도가 다소 느림",
      "요금제가 다소 복잡함"
    ],
    screenshots: [
      "https://example.com/screenshots/claude_review.png"
    ]
  },
  {
    id: 6,
    toolId: 6,
    subtitle: "IDE 내 완벽한 코드 파트너",
    content: "GitHub Copilot은 함수 작성부터 리팩토링까지 실시간으로 제안해 주어 생산성을 크게 향상시켜 줍니다.",
    pros: [
      "IDE 통합이 매끄러움",
      "다양한 프로그래밍 언어 지원",
      "코드 컨텍스트 이해 능력 우수"
    ],
    cons: [
      "민감한 보안 정보가 코드 제안에 포함될 우려",
      "완벽하지 않은 제안도 종종 있음"
    ],
    screenshots: [
      "https://example.com/screenshots/copilot_suggestion.png"
    ]
  },
  {
    id: 7,
    toolId: 7,
    subtitle: "마케팅 카피 자동화의 강자",
    content: "Jasper AI는 AIDA, PAS 등 다양한 카피라이팅 프레임워크를 지원해, 마케팅 콘텐츠를 빠르게 생성할 수 있습니다.",
    pros: [
      "프레임워크 기반 템플릿 제공",
      "다국어 콘텐츠 지원",
      "팀 협업 기능 내장"
    ],
    cons: [
      "장문 콘텐츠 품질 편차",
      "고급 기능은 유료 플랜 필요"
    ],
    screenshots: [
      "https://example.com/screenshots/jasper_templates.png"
    ]
  },
  {
    id: 8,
    toolId: 8,
    subtitle: "번개같이 빠른 카피 생성",
    content: "Copy.ai는 간단한 주제만 입력해도 즉시 소셜 미디어 캡션·이메일 제목 등을 제안해 줍니다.",
    pros: [
      "UI가 직관적이고 사용법 간단",
      "짧은 형식 콘텐츠에 강점",
      "무료 체험 플랜 제공"
    ],
    cons: [
      "긴 형식 콘텐츠에는 부적합",
      "아이디어가 중복될 때가 있음"
    ],
    screenshots: [
      "https://example.com/screenshots/copyai_interface.png"
    ]
  },
  {
    id: 9,
    toolId: 9,
    subtitle: "자유도 높은 이미지 생성",
    content: "Stable Diffusion은 로컬 GPU에서도 실행 가능해, 데이터와 프롬프트를 완전히 제어할 수 있는 장점이 있습니다.",
    pros: [
      "오픈소스라 커스터마이징 자유",
      "플러그인·노트북 예제 풍부",
      "비용 부담이 낮음"
    ],
    cons: [
      "초기 설치 및 설정이 복잡",
      "GPU 메모리 요구량이 높음"
    ],
    screenshots: [
      "https://example.com/screenshots/stable_diffusion_run.png"
    ]
  }
]; 