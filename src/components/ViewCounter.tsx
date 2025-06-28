
import { useState, useEffect } from "react";
import { Eye } from "lucide-react";

interface ViewCounterProps {
  productId: string;
}

export const ViewCounter = ({ productId }: ViewCounterProps) => {
  const [viewCount, setViewCount] = useState(0);
  const [userViews, setUserViews] = useState(0);

  useEffect(() => {
    // Simulate fetching view count from API
    const savedViews = localStorage.getItem(`views_${productId}`);
    const savedUserViews = localStorage.getItem(`user_views_${productId}`);
    
    setViewCount(savedViews ? parseInt(savedViews) : Math.floor(Math.random() * 1000) + 100);
    setUserViews(savedUserViews ? parseInt(savedUserViews) : 0);
    
    // Increment view count
    const newViewCount = (savedViews ? parseInt(savedViews) : Math.floor(Math.random() * 1000) + 100) + 1;
    const newUserViews = (savedUserViews ? parseInt(savedUserViews) : 0) + 1;
    
    setViewCount(newViewCount);
    setUserViews(newUserViews);
    
    localStorage.setItem(`views_${productId}`, newViewCount.toString());
    localStorage.setItem(`user_views_${productId}`, newUserViews.toString());
  }, [productId]);

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600">
      <Eye className="w-4 h-4" />
      <span>{viewCount.toLocaleString()} views</span>
      <span className="text-xs">({userViews} by you)</span>
    </div>
  );
};
