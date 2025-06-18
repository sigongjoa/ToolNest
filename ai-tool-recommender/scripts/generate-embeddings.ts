import { pipeline, env } from "@xenova/transformers";
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Disable local model caching for this script as well
env.allowLocalModels = false;

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

async function generateEmbeddings() {
  console.log('임베딩 생성 스크립트 시작...');

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Corrected path to go up two levels to the project root, then down to public/data
  const projectRoot = path.resolve(__dirname, '../../');
  const publicDataPath = path.join(projectRoot, 'public/data');
  const aiToolsFilePath = path.join(publicDataPath, 'ai_tools.json');
  const embeddingsFilePath = path.join(publicDataPath, 'embeddings.json');

  try {
    console.log(`'${aiToolsFilePath}' 파일 읽기...`);
    const aiToolsData = await fs.readFile(aiToolsFilePath, 'utf8');
    const aiTools: AITool[] = JSON.parse(aiToolsData);
    console.log(`'ai_tools.json'에서 ${aiTools.length}개의 도구 로드 완료.`);

    console.log('임베딩 파이프라인 로드 중 (Xenova/all-MiniLM-L6-v2)...');
    const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    console.log('임베딩 파이프라인 로드 완료.');

    const embeddings: AIToolEmbedding[] = [];

    for (const tool of aiTools) {
      console.log(`도구 '${tool.name}' (${tool.id})에 대한 임베딩 생성 중...`);
      const output = await extractor(tool.description, { pooling: 'mean', normalize: true });
      const embedding = Array.from(output.data) as number[];
      embeddings.push({ id: tool.id, embedding: embedding });
      console.log(`도구 '${tool.name}' 임베딩 생성 완료 (첫 5개 요소): ${embedding.slice(0, 5).map(e => e.toFixed(4)).join(', ')}`);
    }

    console.log(`'${embeddingsFilePath}' 파일에 ${embeddings.length}개의 임베딩 저장 중...`);
    await fs.writeFile(embeddingsFilePath, JSON.stringify(embeddings, null, 2), 'utf8');
    console.log('임베딩 생성 및 저장 완료.');

  } catch (error) {
    console.error('임베딩 생성 중 오류 발생:', error);
  }
}

generateEmbeddings(); 