import { getEmbedding } from '@/lib/webLLMClient';
import { cosineSimilarity, debug } from '@/lib/utils';
import { loadTools, loadEmbeddings } from '@/lib/dataLoader';

interface Tool {
    id: number;
    name: string;
    description: string;
    category: string;
    imageUrl: string;
    rating: number;
    embedding?: number[];
}

export const recommendTools = async (query: string): Promise<Tool[]> => {
    debug('recommendTools 함수 진입 - 쿼리:', query);
    let tools: Tool[] = [];
    let embeddings: { [key: string]: number[] } = {};

    try {
        tools = await loadTools({ debug });
        embeddings = await loadEmbeddings({ debug });
    } catch (error) {
        debug('도구 또는 임베딩 로드 중 오류 발생:', error);
        return [];
    }

    if (tools.length === 0 || Object.keys(embeddings).length === 0) {
        debug('로드된 도구 또는 임베딩이 없어 추천을 진행할 수 없습니다.');
        return [];
    }

    const queryEmbedding = await getEmbedding(query);

    if (!queryEmbedding) {
        debug('쿼리 임베딩을 가져올 수 없어 추천을 진행할 수 없습니다.');
        return [];
    }

    // 도구에 임베딩을 할당 (메모리 내에서만)
    const toolsWithEmbeddings = tools.map(tool => ({
        ...tool,
        embedding: embeddings[tool.id.toString()] || undefined
    }));

    // 유효한 임베딩을 가진 도구만 필터링
    const embeddableTools = toolsWithEmbeddings.filter(tool => tool.embedding);

    if (embeddableTools.length === 0) {
        debug('유효한 임베딩을 가진 도구가 없어 추천을 진행할 수 없습니다.');
        return [];
    }

    // 코사인 유사도를 기반으로 도구 추천
    const scoredTools = embeddableTools.map(tool => {
        const score = cosineSimilarity(queryEmbedding, tool.embedding!);
        return { tool, score };
    });

    scoredTools.sort((a, b) => b.score - a.score);

    const recommended = scoredTools.map(item => item.tool);
    debug('추천된 도구:', recommended);
    return recommended;
}; 