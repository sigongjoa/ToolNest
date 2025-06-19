import { Link } from "wouter";
import { Play } from "lucide-react";
import { type Tool } from "@shared/schema";
import StarRating from "./star-rating";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-neutral-200">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img 
            src={tool.imageUrl} 
            alt={`${tool.name} logo`} 
            className="w-12 h-12 rounded-lg mr-4 object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold text-neutral-900">
              {tool.name}
            </h3>
            <p className="text-neutral-600 text-sm">{tool.category}</p>
          </div>
        </div>
        
        <div className="flex items-center mb-3">
          <StarRating rating={tool.rating} size="small" />
          <span className="text-neutral-600 text-sm ml-2">
            {tool.rating} / 5
          </span>
        </div>
        
        <p className="text-neutral-700 mb-4 text-sm leading-relaxed">
          {tool.description}
        </p>
        
        <Link 
          href={`/reviews/${tool.slug}`}
          className="inline-flex items-center text-primary hover:text-blue-700 font-medium transition-colors"
        >
          <Play className="w-4 h-4 mr-2" />
          Read Review
        </Link>
      </div>
    </article>
  );
}
