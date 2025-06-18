var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { debug } from '@/lib/utils';
import { CreateMLCEngine } from "@mlc-ai/web-llm";
import { pipeline, env } from '@xenova/transformers';
// Set up the environment for Transformers.js
// Disable local model caching to ensure models are always fetched or handled by service worker/CDN
env.allowLocalModels = false;
let engine = null;
let initialized = false;
let embedding_pipeline = null; // Transformers.js embedding pipeline
export const initializeWebLLMEngine = (initProgressCallback) => __awaiter(void 0, void 0, void 0, function* () {
    debug('initializeWebLLMEngine 함수 진입');
    if (initialized && engine) {
        debug('WebLLM 엔진이 이미 초기화되었습니다.');
        return engine;
    }
    try {
        debug('WebLLM 엔진을 초기화하고 로딩을 시작합니다.');
        // 사전 빌드된 모델의 경우 appConfig를 명시적으로 전달할 필요 없음
        engine = yield CreateMLCEngine("Llama-3-8B-Instruct-q4f32_1-MLC", // 모델 ID
        {
            initProgressCallback: initProgressCallback,
        });
        debug('WebLLM 엔진 로딩 완료.');
        initialized = true;
        return engine;
    }
    catch (error) {
        debug('WebLLM 엔진 초기화 중 오류 발생:', error);
        throw error;
    }
});
export const getWebLLMEngine = () => {
    debug('getWebLLMEngine 함수 진입');
    debug('현재 WebLLM 엔진 상태:', engine ? '초기화됨' : '초기화되지 않음');
    return engine;
};
export const getEmbedding = (text) => __awaiter(void 0, void 0, void 0, function* () {
    debug('getEmbedding 함수 진입 - 텍스트:', text);
    try {
        if (!embedding_pipeline) {
            debug('임베딩 파이프라인 초기화 중...');
            // Load the embedding model
            embedding_pipeline = yield pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
            debug('임베딩 파이프라인 초기화 완료.');
        }
        // Generate embeddings
        const output = yield embedding_pipeline(text, { pooling: 'mean', normalize: true });
        // The output is typically a tensor, convert it to a plain array
        const embeddings = Array.from(output.data);
        debug('임베딩 생성 완료 (첫 5개 요소): ', embeddings.slice(0, 5));
        return embeddings;
    }
    catch (error) {
        debug('임베딩 가져오기 중 오류 발생:', error);
        console.error("Error getting embedding:", error);
        return null;
    }
});
