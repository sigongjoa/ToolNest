import { debug } from '@/lib/utils';

interface Tool {
    id: string;
    name: string;
    description: string;
    category: string;
    embedding?: number[];
}

export const loadTools = async (logger: { debug: (...args: any[]) => void }): Promise<Tool[]> => {
    logger.debug('loadTools 함수 진입');
    try {
        logger.debug('public/data/tools.json 로드 시도...');
        const response = await fetch('/data/tools.json');
        if (!response.ok) {
            throw new Error(`HTTP 오류! 상태: ${response.status}`);
        }
        const tools: Tool[] = await response.json();
        logger.debug('tools.json 로드 성공:', tools.length, '개 도구');
        return tools;
    } catch (error) {
        logger.debug('tools.json 로드 중 오류 발생:', error);
        return [];
    }
};

export const loadEmbeddings = async (logger: { debug: (...args: any[]) => void }): Promise<{[key: string]: number[]}> => {
    logger.debug('loadEmbeddings 함수 진입');
    try {
        logger.debug('public/data/embeddings.json 로드 시도...');
        const response = await fetch('/data/embeddings.json');
        if (!response.ok) {
            throw new Error(`HTTP 오류! 상태: ${response.status}`);
        }
        const embeddings: {[key: string]: number[]} = await response.json();
        logger.debug('embeddings.json 로드 성공:', Object.keys(embeddings).length, '개 임베딩');
        return embeddings;
    } catch (error) {
        logger.debug('embeddings.json 로드 중 오류 발생:', error);
        return {};
    }
}; 