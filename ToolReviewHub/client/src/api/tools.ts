import axios from 'axios';
import { ITool, Metric, Weights } from '../lib/types';

const api = axios.create({
  baseURL: '/api',
});

export interface ReviewOut {
  rice_score: number;
  subtitle: string;
  content: string;
  pros: string[];
  cons: string[];
}

export interface ReviewCreatePayload {
  metrics: Metric;
  weights: Weights;
}

export const fetchTools = async (): Promise<ITool[]> => {
  console.debug('fetchTools: Fetching tools...');
  // 실제 API 호출 대신 가상 데이터 반환
  const dummyTools: ITool[] = [
    {
      id: 1,
      name: 'Midjourney',
      slug: 'midjourney',
      category: '생성형 AI',
      description: 'AI 이미지 생성 도구',
      url: 'https://www.midjourney.com',
      imageUrl: '/placeholder-logo.png',
      categories: ['생성형 AI'],
      rating: 4.5,
      metrics: {
        accuracy: 0.9,
        latency: 1500,
        cost: 0.1,
        usability: 0.8,
        stability: 0.95,
      },
    },
    {
      id: 2,
      name: 'ChatGPT',
      slug: 'chatgpt',
      category: 'AI 챗봇',
      description: 'AI 챗봇',
      url: 'https://chat.openai.com',
      imageUrl: '/placeholder-logo.png',
      categories: ['AI 챗봇'],
      rating: 4.8,
      metrics: {
        accuracy: 0.85,
        latency: 500,
        cost: 0.02,
        usability: 0.9,
        stability: 0.92,
      },
    },
    {
      id: 3,
      name: 'GitHub Copilot',
      slug: 'github-copilot',
      category: '개발 도구',
      description: 'AI 코딩 도우미',
      url: 'https://copilot.github.com',
      imageUrl: '/placeholder-logo.png',
      categories: ['개발 도구'],
      rating: 4.6,
      metrics: {
        accuracy: 0.88,
        latency: 200,
        cost: 0.05,
        usability: 0.85,
        stability: 0.9,
      },
    },
    {
      id: 4,
      name: 'Grammarly',
      slug: 'grammarly',
      category: '생산성 도구',
      description: 'AI 글쓰기 도우미',
      url: 'https://www.grammarly.com',
      imageUrl: '/placeholder-logo.png',
      categories: ['생산성 도구'],
      rating: 4.7,
      metrics: {
        accuracy: 0.92,
        latency: 300,
        cost: 0.01,
        usability: 0.95,
        stability: 0.98,
      },
    },
    {
      id: 5,
      name: 'Stable Diffusion',
      slug: 'stable-diffusion',
      category: '생성형 AI',
      description: 'AI 이미지 생성 도구',
      url: 'https://stability.ai/stable-diffusion',
      imageUrl: '/placeholder-logo.png',
      categories: ['생성형 AI'],
      rating: 4.4,
      metrics: {
        accuracy: 0.87,
        latency: 1800,
        cost: 0.08,
        usability: 0.75,
        stability: 0.93,
      },
    },
  ];
  console.debug('fetchTools: Returning dummy tools:', dummyTools);
  return dummyTools;
};

export const fetchTool = async (slug: string): Promise<ITool> => {
  console.debug(`fetchTool: Fetching tool with slug: ${slug}...`);
  // 가상 데이터에서 특정 도구 찾기
  const dummyTools: ITool[] = [
    {
      id: 1,
      name: 'Midjourney',
      slug: 'midjourney',
      category: '생성형 AI',
      description: 'AI 이미지 생성 도구',
      url: 'https://www.midjourney.com',
      imageUrl: '/placeholder-logo.png',
      categories: ['생성형 AI'],
      rating: 4.5,
      metrics: {
        accuracy: 0.9,
        latency: 1500,
        cost: 0.1,
        usability: 0.8,
        stability: 0.95,
      },
    },
    {
      id: 2,
      name: 'ChatGPT',
      slug: 'chatgpt',
      category: 'AI 챗봇',
      description: 'AI 챗봇',
      url: 'https://chat.openai.com',
      imageUrl: '/placeholder-logo.png',
      categories: ['AI 챗봇'],
      rating: 4.8,
      metrics: {
        accuracy: 0.85,
        latency: 500,
        cost: 0.02,
        usability: 0.9,
        stability: 0.92,
      },
    },
    {
      id: 3,
      name: 'GitHub Copilot',
      slug: 'github-copilot',
      category: '개발 도구',
      description: 'AI 코딩 도우미',
      url: 'https://copilot.github.com',
      imageUrl: '/placeholder-logo.png',
      categories: ['개발 도구'],
      rating: 4.6,
      metrics: {
        accuracy: 0.88,
        latency: 200,
        cost: 0.05,
        usability: 0.85,
        stability: 0.9,
      },
    },
    {
      id: 4,
      name: 'Grammarly',
      slug: 'grammarly',
      category: '생산성 도구',
      description: 'AI 글쓰기 도우미',
      url: 'https://www.grammarly.com',
      imageUrl: '/placeholder-logo.png',
      categories: ['생산성 도구'],
      rating: 4.7,
      metrics: {
        accuracy: 0.92,
        latency: 300,
        cost: 0.01,
        usability: 0.95,
        stability: 0.98,
      },
    },
    {
      id: 5,
      name: 'Stable Diffusion',
      slug: 'stable-diffusion',
      category: '생성형 AI',
      description: 'AI 이미지 생성 도구',
      url: 'https://stability.ai/stable-diffusion',
      imageUrl: '/placeholder-logo.png',
      categories: ['생성형 AI'],
      rating: 4.4,
      metrics: {
        accuracy: 0.87,
        latency: 1800,
        cost: 0.08,
        usability: 0.75,
        stability: 0.93,
      },
    },
  ];
  const foundTool = dummyTools.find(tool => tool.slug === slug);
  if (!foundTool) {
    console.error(`fetchTool: Tool with slug ${slug} not found.`);
    throw new Error(`Tool with slug ${slug} not found`);
  }
  console.debug(`fetchTool: Returning tool ${slug}:`, foundTool);
  return foundTool;
};

export const createReview = async (toolId: string, payload: ReviewCreatePayload): Promise<ReviewOut> => {
  console.debug(`createReview: Creating review for tool ID: ${toolId} with payload:`, payload);
  // 더미 리뷰 생성 로직
  const dummyReview: ReviewOut = {
    rice_score: 85, // 가상 쌀먹지수
    subtitle: '가상 리뷰 제목',
    content: '이것은 쌀먹지수 가상 리뷰입니다. 실제 데이터는 아닙니다.',
    pros: ['장점 1', '장점 2'],
    cons: ['단점 1'],
  };
  console.debug('createReview: Returning dummy review:', dummyReview);
  return dummyReview;
};

export const fetchReview = async (toolId: string): Promise<ReviewOut> => {
  console.debug(`fetchReview: Fetching review for tool ID: ${toolId}...`);
  // 더미 리뷰 반환
  const dummyReview: ReviewOut = {
    rice_score: 85, // 가상 쌀먹지수
    subtitle: '가상 리뷰 제목',
    content: '이것은 쌀먹지수 가상 리뷰입니다. 실제 데이터는 아닙니다.',
    pros: ['장점 1', '장점 2'],
    cons: ['단점 1'],
  };
  console.debug('fetchReview: Returning dummy review:', dummyReview);
  return dummyReview;
}; 