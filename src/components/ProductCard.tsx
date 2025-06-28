
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  currency: string;
  region: string;
}

export const ProductCard = ({ product, currency, region }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handlePayment = () => {
    // This will be integrated with Stripe payment
    console.log(`Initiating payment for ${product.name} in ${region}`);
    // You can integrate with your payment system here
  };

  return (
    <Card 
      className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/80 hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </Button>
        </div>
        <Badge className="absolute top-3 left-3 bg-amber-500 hover:bg-amber-600">
          {product.category}
        </Badge>
        {isHovered && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300">
            <Button 
              className="bg-white text-gray-800 hover:bg-gray-100"
              onClick={handlePayment}
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Quick Buy
            </Button>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <h4 className="font-semibold text-gray-800 mb-2 line-clamp-1">{product.name}</h4>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-amber-600">
            {currency} {product.price.toLocaleString()}
          </span>
          <Button 
            size="sm" 
            className="bg-amber-600 hover:bg-amber-700"
            onClick={handlePayment}
          >
            Buy Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
