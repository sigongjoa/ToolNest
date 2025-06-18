import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const debug = (...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
        console.debug('DEBUG:', ...args);
    }
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  console.debug('cosineSimilarity 함수 진입');
  if (vecA.length !== vecB.length) {
    console.error('두 벡터의 길이가 다릅니다.');
    throw new Error("Vectors must be of the same length");
  }

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    magnitudeA += vecA[i] * vecA[i];
    magnitudeB += vecB[i] * vecB[i];
  }

  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  if (magnitudeA === 0 || magnitudeB === 0) {
    console.debug('하나 또는 두 벡터의 크기가 0입니다. 유사도를 0으로 반환합니다.');
    return 0;
  }
  console.debug('cosineSimilarity 함수 종료');
  return dotProduct / (magnitudeA * magnitudeB);
}
