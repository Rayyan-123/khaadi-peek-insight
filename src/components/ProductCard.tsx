
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag } from "lucide-react";
import { PaymentModal } from "@/components/PaymentModal";

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
  const [showPayment, setShowPayment] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="relative overflow-hidden">
          <a href={`/product/${product.id}`}>
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </a>
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/80 hover:bg-white"
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </Button>
          </div>
          <Badge className="absolute top-2 left-2 bg-amber-600 hover:bg-amber-700">
            {product.category}
          </Badge>
        </div>
        
        <CardContent className="p-4">
          <a href={`/product/${product.id}`}>
            <h3 className="font-semibold text-lg mb-2 group-hover:text-amber-600 transition-colors">
              {product.name}
            </h3>
          </a>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-amber-600">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price * 1.4)}
              </span>
            </div>
            <Badge variant="destructive" className="text-xs">
              30% OFF
            </Badge>
          </div>
          <div className="flex gap-2 mt-4">
            <Button 
              className="flex-1 bg-amber-600 hover:bg-amber-700"
              onClick={() => setShowPayment(true)}
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Buy Now
            </Button>
            <Button variant="outline" className="flex-1">
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>

      <PaymentModal 
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        product={product}
        currency={currency}
        region={region}
      />
    </>
  );
};
