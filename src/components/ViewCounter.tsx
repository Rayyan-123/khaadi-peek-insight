
import { useState, useEffect } from "react";
import { Eye } from "lucide-react";

interface ViewCounterProps {
  productId: string;
}

export const ViewCounter = ({ productId }: ViewCounterProps) => {
  const [viewCount, setViewCount] = useState(0);
  const [userViews, setUserViews] = useState(0);
  const [hasIncremented, setHasIncremented] = useState(false);

  useEffect(() => {
    // Get existing view counts
    const savedViews = localStorage.getItem(`views_${productId}`);
    const savedUserViews = localStorage.getItem(`user_views_${productId}`);
    const sessionKey = `session_viewed_${productId}`;
    const hasViewedInSession = sessionStorage.getItem(sessionKey);
    
    let initialViews = savedViews ? parseInt(savedViews) : Math.floor(Math.random() * 1000) + 100;
    let initialUserViews = savedUserViews ? parseInt(savedUserViews) : 0;
    
    setViewCount(initialViews);
    setUserViews(initialUserViews);
    
    // Only increment if not viewed in this session
    if (!hasViewedInSession && !hasIncremented) {
      const newViewCount = initialViews + 1;
      const newUserViews = initialUserViews + 1;
      
      setViewCount(newViewCount);
      setUserViews(newUserViews);
      
      localStorage.setItem(`views_${productId}`, newViewCount.toString());
      localStorage.setItem(`user_views_${productId}`, newUserViews.toString());
      sessionStorage.setItem(sessionKey, 'true');
      
      setHasIncremented(true);
    }
  }, [productId, hasIncremented]);

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600">
      <Eye className="w-4 h-4" />
      <span className="font-medium">{viewCount.toLocaleString()}</span>
      <span>views</span>
      {userViews > 0 && (
        <span className="text-xs text-amber-600">
          ({userViews} by you)
        </span>
      )}
    </div>
  );
};
