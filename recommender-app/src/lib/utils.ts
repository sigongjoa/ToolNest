import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cosineSimilarity = (vecA: number[], vecB: number[]): number => {
    const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
};

export const debug = (...args: any[]) => {
    if (import.meta.env.DEV) {
        console.debug('DEBUG:', ...args);
    }
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
} 