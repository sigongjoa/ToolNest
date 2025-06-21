import { tools, reviews, type Tool, type Review, type InsertTool, type InsertReview, type ToolWithReview } from "../shared/schema";

const seedTools: InsertTool[] = [
  {
    name: "Midjourney",
    slug: "midjourney",
    category: "Image Generation",
    description: "텍스트 프롬프트만으로 고퀄리티 이미지를 생성해 주는 AI 서비스입니다.",
    rating: 4.8,
    imageUrl: "https://example.com/logos/midjourney.png",
    url: "https://www.midjourney.com",
  },
  {
    name: "ChatGPT",
    slug: "chatgpt",
    category: "NLP",
    description: "대화형 AI로, 다양한 주제에 대해 자연스러운 응답과 콘텐츠 생성을 지원합니다.",
    rating: 4.7,
    imageUrl: "https://example.com/logos/chatgpt.png",
    url: "https://chat.openai.com",
  },
  {
    name: "GitHub Copilot",
    slug: "github-copilot",
    category: "Code Assistant",
    description: "IDE 내에서 실시간 코드 완성·제안을 제공하는 AI 코딩 도우미입니다.",
    rating: 4.6,
    imageUrl: "https://example.com/logos/copilot.png",
    url: "https://github.com/features/copilot",
  },
  {
    name: "Grammarly",
    slug: "grammarly",
    category: "Writing Aid",
    description: "문법·맞춤법은 물론 스타일 개선까지 도와주는 글쓰기 보조 도구입니다.",
    rating: 4.5,
    imageUrl: "https://example.com/logos/grammarly.png",
    url: "https://www.grammarly.com",
  },
  {
    name: "Stable Diffusion",
    slug: "stable-diffusion",
    category: "Image Generation",
    description: "로컬 GPU에서도 실행 가능한 오픈소스 텍스트→이미지 생성 모델입니다.",
    rating: 4.4,
    imageUrl: "https://example.com/logos/stable-diffusion.png",
    url: "https://stability.ai/blog/stable-diffusion",
  },
];

const seedReviews: InsertReview[] = [
  {
    toolId: 1,
    subtitle: "환상적인 이미지 퀄리티",
    content: "Midjourney의 결과물은 디테일과 색감이 정말 뛰어나서, 아트워크 제작에 최적입니다.",
    pros: ["다양한 스타일 지원", "높은 해상도 결과물", "빠른 응답 속도"],
    cons: ["무료 체험 제한이 큼", "상업용 라이선스 비용 높음"],
    screenshots: ["https://example.com/screenshots/midjourney1.png"],
  },
  {
    toolId: 2,
    subtitle: "자연스러운 대화와 높은 활용도",
    content: "ChatGPT는 질문·답변뿐 아니라 블로그 초안, 코드 생성 등 다방면으로 활용 가능합니다.",
    pros: ["긴 컨텍스트 유지", "플러그인 확장성", "다국어 지원"],
    cons: ["때때로 사실관계 오류", "프라이버시 우려"],
    screenshots: ["https://example.com/screenshots/chatgpt_discuss.png"],
  },
  {
    toolId: 3,
    subtitle: "개발 생산성 극대화",
    content: "Copilot은 복잡한 함수도 단 몇 초 만에 제안해 줘서, 코드 작성 속도가 크게 빨라졌습니다.",
    pros: ["다양한 언어 지원", "IDE 통합 매끄러움", "코드 컨텍스트 이해도 우수"],
    cons: ["민감정보 제안 위험", "가끔 부적절한 코드 생성"],
    screenshots: ["https://example.com/screenshots/copilot_suggestion.png"],
  },
  {
    toolId: 4,
    subtitle: "글쓰기 완성도 UP",
    content: "Grammarly는 기본 문법 교정에서 스타일 제안까지 제공해, 보고서나 이메일 작성 시 유용합니다.",
    pros: ["실시간 교정", "스타일 토글 기능", "브라우저 확장 지원"],
    cons: ["무료 버전 기능 제한", "한국어 지원 미흡"],
    screenshots: ["https://example.com/screenshots/grammarly_ui.png"],
  },
  {
    toolId: 5,
    subtitle: "자유도 높은 이미지 생성",
    content: "Stable Diffusion은 커스터마이징과 오프라인 실행이 가능해, 프라이빗 프로젝트에 적합합니다.",
    pros: ["오픈소스·무료", "로컬 실행 가능", "플러그인 생태계 풍부"],
    cons: ["설치 환경 구성 복잡", "GPU 메모리 의존도 높음"],
    screenshots: ["https://example.com/screenshots/stable_diffusion_run.png"],
  },
];

export interface IStorage {
  getTools(): Promise<Tool[]>;
  getToolBySlug(slug: string): Promise<ToolWithReview | undefined>;
  createTool(tool: InsertTool): Promise<Tool>;
  createReview(review: InsertReview): Promise<Review>;
}

export class MemStorage implements IStorage {
  private tools: Map<number, Tool>;
  private reviews: Map<number, Review>;
  private currentToolId: number;
  private currentReviewId: number;

  constructor() {
    this.tools = new Map();
    this.reviews = new Map();
    this.currentToolId = 1;
    this.currentReviewId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    console.debug('MemStorage: Initializing data with seedTools and seedReviews.');
    seedTools.forEach(async (seedTool, index) => {
      console.debug(`MemStorage: Adding tool ${seedTool.name} (index: ${index}).`);
      const tool = await this.createTool(seedTool);
      console.debug(`MemStorage: Added tool with ID: ${tool.id}.`);
    });

    // Reviews need to be added after tools are created and their IDs are known.
    // Since toolId in seedReviews are hardcoded based on sequential IDs, we can use that for this in-memory storage.
    seedReviews.forEach(async (seedReview, index) => {
      console.debug(`MemStorage: Adding review for tool ID ${seedReview.toolId} (index: ${index}).`);
      const review = await this.createReview(seedReview);
      console.debug(`MemStorage: Added review with ID: ${review.id}.`);
    });
    console.debug('MemStorage: Data initialization complete.');
  }

  async getTools(): Promise<Tool[]> {
    return Array.from(this.tools.values());
  }

  async getToolBySlug(slug: string): Promise<ToolWithReview | undefined> {
    const tool = Array.from(this.tools.values()).find(t => t.slug === slug);
    if (!tool) return undefined;

    const review = Array.from(this.reviews.values()).find(r => r.toolId === tool.id);
    return { ...tool, review };
  }

  async createTool(insertTool: InsertTool): Promise<Tool> {
    const id = this.currentToolId++;
    const tool: Tool = { ...insertTool, id };
    this.tools.set(id, tool);
    return tool;
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.currentReviewId++;
    const review: Review = { ...insertReview, id };
    this.reviews.set(id, review);
    return review;
  }
}

export const storage = new MemStorage();
