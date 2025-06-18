var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getEmbedding } from "./webLLMClient";
import { cosineSimilarity, debug } from "./utils";
let allAITools = [];
let allAIToolEmbeddings = [];
let dataLoaded = false;
export const loadAIData = () => __awaiter(void 0, void 0, void 0, function* () {
    debug('loadAIData 함수 진입');
    if (dataLoaded) {
        debug('데이터가 이미 로드되었습니다.');
        return; // Data already loaded
    }
    try {
        debug('ai_tools.json 로드 시작');
        const toolsResponse = yield fetch('/data/ai_tools.json');
        if (!toolsResponse.ok) {
            throw new Error(`HTTP 오류! 상태: ${toolsResponse.status}`);
        }
        allAITools = (yield toolsResponse.json());
        debug('ai_tools.json 로드 완료. 도구 수:', allAITools.length);
        debug('embeddings.json 로드 시작');
        const embeddingsResponse = yield fetch('/data/embeddings.json');
        if (!embeddingsResponse.ok) {
            throw new Error(`HTTP 오류! 상태: ${embeddingsResponse.status}`);
        }
        allAIToolEmbeddings = (yield embeddingsResponse.json());
        debug('embeddings.json 로드 완료. 임베딩 수:', allAIToolEmbeddings.length);
        dataLoaded = true;
        debug('모든 AI 데이터 로드 완료.');
    }
    catch (error) {
        console.error('AI 데이터 로드 중 오류 발생:', error);
        debug('AI 데이터 로드 실패:', error.message);
        throw error;
    }
    debug('loadAIData 함수 종료');
});
export const recommendAITools = (userQuery_1, ...args_1) => __awaiter(void 0, [userQuery_1, ...args_1], void 0, function* (userQuery, topN = 5) {
    debug('recommendAITools 함수 진입 - 쿼리:', userQuery);
    if (!dataLoaded) {
        debug('데이터가 로드되지 않았으므로 먼저 로드합니다.');
        yield loadAIData();
    }
    debug('사용자 쿼리 임베딩 생성 시작');
    const userEmbedding = yield getEmbedding(userQuery);
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
    scoredTools.sort((a, b) => b.similarity - a.similarity);
    debug('도구 정렬 완료.');
    const recommendations = scoredTools.slice(0, topN).map(item => item.tool);
    debug('추천된 도구 (상위 N개):', recommendations.length);
    debug('recommendAITools 함수 종료');
    return recommendations;
});
