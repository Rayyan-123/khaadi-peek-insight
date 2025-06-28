
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingBag, ArrowLeft, Share2, Star } from "lucide-react";
import { AdSenseAd } from "@/components/AdSenseAd";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  // Mock product data - in real app, fetch based on ID
  const product = {
    id: id || "1",
    name: "Floral Lawn Kurta",
    price: 5000,
    originalPrice: 7000,
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    description: "Beautiful embroidered lawn kurta with intricate floral patterns. Perfect for casual and semi-formal occasions.",
    category: "Kurtas",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Pink", "Blue", "Green"],
    material: "100% Cotton Lawn",
    care: "Machine wash cold, tumble dry low",
    inStock: true,
    rating: 4.5,
    reviews: 28
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-800 font-serif">KK-CLOTHING</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingBag className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.slice(1).map((image, index) => (
                <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer">
                  <img src={image} alt={`${product.name} ${index + 2}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">{product.category}</Badge>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-amber-600">PKR {product.price.toLocaleString()}</span>
                <span className="text-xl text-gray-500 line-through">PKR {product.originalPrice.toLocaleString()}</span>
                <Badge variant="destructive">30% OFF</Badge>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Size</h3>
              <div className="flex space-x-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    className="w-12 h-12"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3">
                Add to Cart - PKR {(product.price * quantity).toLocaleString()}
              </Button>
              <Button variant="outline" className="w-full py-3">
                Buy Now
              </Button>
            </div>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Product Details</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="space-y-2 text-sm">
                  <div><strong>Material:</strong> {product.material}</div>
                  <div><strong>Care Instructions:</strong> {product.care}</div>
                  <div><strong>Availability:</strong> <span className="text-green-600">In Stock</span></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AdSense Ad */}
        <AdSenseAd 
          adClient="ca-pub-XXXXXXXXXXXXXXXX"
          adSlot="1234567891"
          className="my-8"
        />
      </div>
    </div>
  );
};

export default ProductDetails;
