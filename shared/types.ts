export interface ITool {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  rating: number;
  imageUrl: string;
}

export interface IReview {
  id: number;
  toolId: number;
  content: string;
  pros: string[];
  cons: string[];
  screenshots: string[];
  subtitle: string;
} 