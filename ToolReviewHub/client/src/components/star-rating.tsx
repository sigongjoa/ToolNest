import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: "small" | "medium" | "large";
}

export default function StarRating({ rating, size = "medium" }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-5 h-5", 
    large: "w-6 h-6"
  };

  const starSize = sizeClasses[size];

  return (
    <div className="flex items-center">
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, index) => (
        <Star 
          key={`full-${index}`} 
          className={`${starSize} text-yellow-400 fill-current`}
        />
      ))}
      
      {/* Half star */}
      {hasHalfStar && (
        <div className="relative">
          <Star className={`${starSize} text-gray-300`} />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className={`${starSize} text-yellow-400 fill-current`} />
          </div>
        </div>
      )}
      
      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <Star 
          key={`empty-${index}`} 
          className={`${starSize} text-gray-300`}
        />
      ))}
    </div>
  );
}
