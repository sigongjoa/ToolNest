import { debug } from '@/lib/utils';
import { CreateMLCEngine, MLCEngine } from "@mlc-ai/web-llm";
import type { InitProgressReport } from "@mlc-ai/web-llm";
import { pipeline, env } from '@xenova/transformers';

// Set up the environment for Transformers.js
// Disable local model caching to ensure models are always fetched or handled by service worker/CDN
env.allowLocalModels = false;

let engine: MLCEngine | null = null;
let initialized = false;
let embedding_pipeline: any = null; // Transformers.js embedding pipeline

const LM_STUDIO_API_BASE_URL = 'http://127.0.0.1:1234/v1';

export const initializeWebLLMEngine = async (
    initProgressCallback: (report: InitProgressReport) => void
): Promise<MLCEngine> => {
    debug('initializeWebLLMEngine 함수 진입');
    if (initialized && engine) {
        debug('WebLLM 엔진이 이미 초기화되었습니다.');
        return engine;
    }

    try {
        debug('WebLLM 엔진을 초기화하고 로딩을 시작합니다.');
        // 사전 빌드된 모델의 경우 appConfig를 명시적으로 전달할 필요 없음
        engine = await CreateMLCEngine(
            "Llama-3-8B-Instruct-q4f32_1-MLC", // 모델 ID
            {
                initProgressCallback: initProgressCallback,
            }
        );
        debug('WebLLM 엔진 로딩 완료.');
        initialized = true;
        return engine;
    } catch (error) {
        debug('WebLLM 엔진 초기화 중 오류 발생:', error);
        throw error;
    }
};

export const getWebLLMEngine = (): MLCEngine | null => {
    debug('getWebLLMEngine 함수 진입');
    debug('현재 WebLLM 엔진 상태:', engine ? '초기화됨' : '초기화되지 않음');
    return engine;
};

export const getEmbedding = async (text: string): Promise<number[] | null> => {
    debug('getEmbedding 함수 진입 - 텍스트:', text);
    try {
        const response = await fetch(`${LM_STUDIO_API_BASE_URL}/embeddings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input: text,
                model: "llava-v1.5-7b-llamafile" // LM Studio에서 제공하는 모델 ID 사용
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP 오류! 상태: ${response.status}, 응답: ${errorText}`);
        }

        const data = await response.json();
        // LM Studio 응답 형식에 따라 임베딩 데이터 경로 조정
        const embeddings = data.data[0].embedding as number[];
        
        debug('임베딩 생성 완료 (첫 5개 요소): ', embeddings.slice(0, 5));
        return embeddings;
    } catch (error) {
        debug('임베딩 가져오기 중 오류 발생:', error);
        console.error("임베딩 가져오기 중 오류 발생:", error);
        return null;
    }
};

export const generateCompletion = async (prompt: string, maxTokens: number = 200): Promise<string | null> => {
    debug('generateCompletion 함수 진입 - 프롬프트:', prompt.slice(0, 100) + '...');
    try {
        const response = await fetch(`${LM_STUDIO_API_BASE_URL}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "llava-v1.5-7b-llamafile", // LM Studio에서 제공하는 모델 ID 사용
                messages: [{
                    role: "user",
                    content: prompt
                }],
                temperature: 0.7,
                max_tokens: maxTokens,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP 오류! 상태: ${response.status}, 응답: ${errorText}`);
        }

        const data = await response.json();
        const completion = data.choices[0].message.content;
        
        debug('Completion 생성 완료 (첫 100자): ', completion.slice(0, 100) + '...');
        return completion;
    } catch (error) {
        debug('Completion 생성 중 오류 발생:', error);
        console.error("Completion 생성 중 오류 발생:", error);
        return null;
    }
}; 