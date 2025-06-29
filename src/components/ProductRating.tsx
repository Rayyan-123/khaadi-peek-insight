
import { useState, useEffect } from "react";
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
  const [currentRating, setCurrentRating] = useState(initialRating);
  const [totalCount, setTotalCount] = useState(totalRatings);

  useEffect(() => {
    // Check if user has already rated this product
    const savedRating = localStorage.getItem(`rating_${productId}`);
    if (savedRating) {
      setUserRating(parseInt(savedRating));
      setHasRated(true);
    }
  }, [productId]);

  const handleRatingClick = (rating: number) => {
    if (hasRated) return;
    
    setUserRating(rating);
    setHasRated(true);
    
    // Save rating to localStorage
    localStorage.setItem(`rating_${productId}`, rating.toString());
    
    // Update average rating (simplified calculation)
    const newTotalCount = totalCount + 1;
    const newAverageRating = ((currentRating * totalCount) + rating) / newTotalCount;
    
    setCurrentRating(newAverageRating);
    setTotalCount(newTotalCount);
    
    onRatingSubmit?.(rating);
  };

  const displayRating = hoveredRating || currentRating;

  return (
    <div className="flex flex-col items-center space-y-2 p-4 border rounded-lg bg-gray-50">
      <h3 className="font-semibold text-gray-800">Rate this Product</h3>
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRatingClick(star)}
            onMouseEnter={() => !hasRated && setHoveredRating(star)}
            onMouseLeave={() => !hasRated && setHoveredRating(0)}
            disabled={hasRated}
            className={`transition-colors ${hasRated ? 'cursor-default' : 'cursor-pointer hover:scale-110'}`}
          >
            <Star 
              className={`w-6 h-6 transition-colors ${
                star <= (hasRated ? userRating : displayRating)
                  ? 'text-yellow-400 fill-current' 
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
      <div className="text-sm text-gray-600 text-center">
        {currentRating > 0 && (
          <div>
            <span className="font-medium">{currentRating.toFixed(1)}</span> out of 5
            <span className="text-gray-500"> ({totalCount} review{totalCount !== 1 ? 's' : ''})</span>
          </div>
        )}
        {hasRated && (
          <div className="text-green-600 mt-1">
            ✓ You rated this product {userRating} star{userRating !== 1 ? 's' : ''}
          </div>
        )}
        {!hasRated && (
          <div className="text-gray-500">Click to rate this product</div>
        )}
      </div>
    </div>
  );
};
