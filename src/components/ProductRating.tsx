
import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductRatingProps {
  productId: string;
  initialRating?: number;
  totalRatings?: number;
  onRatingSubmit?: (rating: number) => void;
}

export const ProductRating = ({ 
  productId, 
  initialRating = 0, 
  totalRatings = 0,
  onRatingSubmit 
}: ProductRatingProps) => {
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  const handleRatingClick = (rating: number) => {
    setUserRating(rating);
    setHasRated(true);
    onRatingSubmit?.(rating);
  };

  const displayRating = hoveredRating || userRating || initialRating;

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRatingClick(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            disabled={hasRated}
            className="transition-colors"
          >
            <Star 
              className={`w-6 h-6 ${
                star <= displayRating 
                  ? 'text-yellow-400 fill-current' 
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
      <div className="text-sm text-gray-600">
        {initialRating > 0 && (
          <span>{initialRating.toFixed(1)} ({totalRatings} reviews)</span>
        )}
        {hasRated && (
          <span className="text-green-600 ml-2">Thank you for rating!</span>
        )}
      </div>
    </div>
  );
};
