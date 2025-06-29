
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { ViewCounter } from "@/components/ViewCounter";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    discountPrice?: number;
    image: string;
    description: string;
    category: string;
    rating?: number;
    reviews?: number;
  };
  currency: string;
  region: string;
  onBuyNow?: (product: any) => void;
  showDiscount?: boolean;
}

export const ProductCard = ({ product, currency, region, onBuyNow, showDiscount = false }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const finalPrice = product.discountPrice || product.price;
  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onBuyNow) {
      onBuyNow(product);
    }
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-md">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Discount Badge */}
          {showDiscount && discountPercentage > 0 && (
            <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
              {discountPercentage}% OFF
            </Badge>
          )}
          
          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-white/80 hover:bg-white"
            onClick={toggleWishlist}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </Button>

          {/* Quick Buy Overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button 
              className="bg-white text-black hover:bg-gray-100"
              onClick={handleBuyNow}
            >
              Quick Buy
            </Button>
          </div>
        </div>
      </Link>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Category Badge */}
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>

          {/* Product Name */}
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-gray-800 group-hover:text-amber-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating!)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({product.reviews} reviews)
              </span>
            </div>
          )}

          {/* View Counter */}
          <ViewCounter productId={product.id} />

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-amber-600">
              {currency} {finalPrice.toLocaleString()}
            </span>
            {product.discountPrice && (
              <span className="text-sm text-gray-500 line-through">
                {currency} {product.price.toLocaleString()}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            <Button 
              className="flex-1 bg-amber-600 hover:bg-amber-700"
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
            <Link to={`/product/${product.id}`} className="flex-1">
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
