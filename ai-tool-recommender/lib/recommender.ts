import { generateCompletion } from "./webLLMClient";
import { debug } from "./utils";

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

let allAITools: AITool[] = [];
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

    dataLoaded = true;
    debug('모든 AI 데이터 로드 완료.');
  } catch (error) {
    console.error('AI 데이터 로드 중 오류 발생:', error);
    debug('AI 데이터 로드 실패:', (error as Error).message);
    throw error;
  }
  debug('loadAIData 함수 종료');
};

export const recommendAITools = async (userQuery: string): Promise<{ recommendedTools: AITool[], explanation: string }> => {
  debug('recommendAITools 함수 진입 - 쿼리:', userQuery);
  if (!dataLoaded) {
    debug('데이터가 로드되지 않았으므로 먼저 로드합니다.');
    await loadAIData();
  }

  // Construct prompt for LLM
  let prompt = `사용자의 쿼리: "${userQuery}"\n\n`;
  prompt += `다음은 사용 가능한 AI 도구 목록입니다. 각 도구는 ID, 이름, 설명, 특징, 사용 사례, 카테고리, 태그를 포함합니다. 이 도구 목록 중에서 사용자의 쿼리에 가장 적합한 도구를 3-5개 추천하고, 그 이유를 설명해 주세요. 추천하는 도구의 이름만 먼저 나열한 다음, 각 도구가 사용자의 쿼리와 어떻게 관련되어 있고 어떤 면에서 유용한지 친절하게 설명해 주세요. 최대 300단어로 제한합니다. 추천 도구 목록은 다음과 같습니다:\n\n`;

  allAITools.forEach(tool => {
    prompt += `---\nID: ${tool.id}\n이름: ${tool.name}\n설명: ${tool.description}\n특징: ${tool.features.join(', ')}\n사용 사례: ${tool.use_cases.join(', ')}\n카테고리: ${tool.category}\n태그: ${tool.tags.join(', ')}\n---\n`;
  });

  debug('LLM 프롬프트 생성 완료 (일부):', prompt.slice(0, 500) + '...');

  const llmResponse = await generateCompletion(prompt, 300); // Increased maxTokens for more comprehensive explanation
  debug('LLM 응답:', llmResponse ? llmResponse.slice(0, 100) + '...' : '없음');

  let explanation = "추천 설명을 생성할 수 없습니다.";
  let recommendedToolNames: string[] = [];
  let recommendedToolObjects: AITool[] = [];

  if (llmResponse) {
    explanation = llmResponse; // Use the entire LLM response as the explanation for now

    // Attempt to extract tool names from the LLM response
    // A simple approach: look for tool names mentioned directly in the response.
    for (const tool of allAITools) {
        if (llmResponse.includes(tool.name)) {
            recommendedToolNames.push(tool.name);
        }
    }
    // Filter out duplicates and keep unique names
    recommendedToolNames = [...new Set(recommendedToolNames)];

    // Map identified names back to AITool objects
    recommendedToolObjects = allAITools.filter(tool => recommendedToolNames.includes(tool.name));
  }
  debug('LLM에 의해 추천된 도구 수:', recommendedToolObjects.length);
  debug('LLM에 의해 생성된 설명 길이:', explanation.length);

  return { recommendedTools: recommendedToolObjects, explanation: explanation };
}; 