import { getEmbedding } from "./webLLMClient";
import { cosineSimilarity, debug } from "./utils";

interface AITool {
  id: string;
  name: string;
  description: string;
  features: string[];
  use_cases: string[];
  category: string;
  tags: string[];
  url: string;
  image_url: string;
  rating: number;
  reviews: number;
}

interface AIToolEmbedding {
  id: string;
  embedding: number[];
}

let allAITools: AITool[] = [];
let allAIToolEmbeddings: AIToolEmbedding[] = [];
let dataLoaded = false;

export const loadAIData = async () => {
  debug('loadAIData 함수 진입');
  if (dataLoaded) {
    debug('데이터가 이미 로드되었습니다.');
    return; // Data already loaded
  }

  try {
    debug('ai_tools.json 로드 시작');
    const toolsResponse = await fetch('/data/ai_tools.json');
    if (!toolsResponse.ok) {
      throw new Error(`HTTP 오류! 상태: ${toolsResponse.status}`);
    }
    allAITools = (await toolsResponse.json()) as AITool[];
    debug('ai_tools.json 로드 완료. 도구 수:', allAITools.length);

    debug('embeddings.json 로드 시작');
    const embeddingsResponse = await fetch('/data/embeddings.json');
    if (!embeddingsResponse.ok) {
      throw new Error(`HTTP 오류! 상태: ${embeddingsResponse.status}`);
    }
    allAIToolEmbeddings = (await embeddingsResponse.json()) as AIToolEmbedding[];
    debug('embeddings.json 로드 완료. 임베딩 수:', allAIToolEmbeddings.length);

    dataLoaded = true;
    debug('모든 AI 데이터 로드 완료.');
  } catch (error) {
    console.error('AI 데이터 로드 중 오류 발생:', error);
    debug('AI 데이터 로드 실패:', (error as Error).message);
    throw error;
  }
  debug('loadAIData 함수 종료');
};

export const recommendAITools = async (userQuery: string, topN: number = 5): Promise<AITool[]> => {
  debug('recommendAITools 함수 진입 - 쿼리:', userQuery);
  if (!dataLoaded) {
    debug('데이터가 로드되지 않았으므로 먼저 로드합니다.');
    await loadAIData();
  }

  debug('사용자 쿼리 임베딩 생성 시작');
  const userEmbedding = await getEmbedding(userQuery);
  if (!userEmbedding) {
    debug('사용자 쿼리 임베딩 생성 실패. 빈 배열 반환.');
    return [];
  }
  debug('사용자 쿼리 임베딩 생성 완료 (첫 5개 요소): ', userEmbedding.slice(0, 5));

  const scoredTools = allAITools.map(tool => {
    debug('도구 임베딩 찾기:', tool.id);
    const toolEmbeddingData = allAIToolEmbeddings.find(emb => emb.id === tool.id);
    if (!toolEmbeddingData) {
      debug('도구 임베딩을 찾을 수 없음:', tool.id);
      return { tool, similarity: 0 };
    }
    debug('코사인 유사도 계산 시작');
    const similarity = cosineSimilarity(userEmbedding, toolEmbeddingData.embedding);
    debug('코사인 유사도 계산 완료:', tool.id, similarity);
    return { tool, similarity };
  });

  debug('도구 정렬 시작');
  // Log all scored tools before sorting to see their similarities
  scoredTools.forEach(item => {
    debug(`도구: ${item.tool.name} (ID: ${item.tool.id}), 유사도: ${item.similarity.toFixed(4)}`);
  });

  scoredTools.sort((a, b) => b.similarity - a.similarity);
  debug('도구 정렬 완료.');

  const recommendations = scoredTools.slice(0, topN).map(item => item.tool);
  debug('추천된 도구 (상위 N개):', recommendations.length);
  debug('recommendAITools 함수 종료');
  return recommendations;
}; 