import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/ProductCard";
import { RegionSelector } from "@/components/RegionSelector";
import { AdSenseAd } from "@/components/AdSenseAd";
import { ShoppingCart } from "@/components/ShoppingCart";
import { Heart, Search, ShoppingBag, User, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState("Pakistan");
  const [currency, setCurrency] = useState("PKR");
  const [showCart, setShowCart] = useState(false);

  const products = [
    {
      id: "1",
      name: "Floral Lawn Kurta",
      price: 5000,
      image: "/placeholder.svg",
      description: "Beautiful embroidered lawn kurta with intricate floral patterns.",
      category: "Kurtas"
    },
    {
      id: "2",
      name: "Printed Silk Dress",
      price: 8000,
      image: "/placeholder.svg",
      description: "Elegant silk dress with vibrant digital prints.",
      category: "Dresses"
    },
    {
      id: "3",
      name: "Embroidered Khaddar Suit",
      price: 6500,
      image: "/placeholder.svg",
      description: "Warm and stylish khaddar suit with traditional embroidery.",
      category: "Suits"
    },
    {
      id: "4",
      name: "Cotton Net Dupatta",
      price: 2000,
      image: "/placeholder.svg",
      description: "Delicate cotton net dupatta with lace detailing.",
      category: "Dupattas"
    },
    {
      id: "5",
      name: "Banarsi Brocade Saree",
      price: 15000,
      image: "/placeholder.svg",
      description: "Luxurious banarsi brocade saree for special occasions.",
      category: "Sarees"
    },
    {
      id: "6",
      name: "Digital Print Lawn Shirt",
      price: 3500,
      image: "/placeholder.svg",
      description: "Trendy lawn shirt with modern digital prints.",
      category: "Shirts"
    }
  ];

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    const currencyMap: { [key: string]: string } = {
      "Pakistan": "PKR",
      "UAE": "AED",
      "UK": "GBP",
      "US": "USD",
      "Global": "USD"
    };
    setCurrency(currencyMap[region] || "PKR");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-3xl font-bold text-amber-800 font-serif">KK-CLOTHING</h1>
              <nav className="hidden md:flex items-center space-x-6">
                <a href="/new-arrivals" className="text-gray-700 hover:text-amber-600 font-medium">New Arrivals</a>
                <a href="/unstitched" className="text-gray-700 hover:text-amber-600 font-medium">Unstitched</a>
                <a href="/ready-to-wear" className="text-gray-700 hover:text-amber-600 font-medium">Ready to Wear</a>
                <a href="/accessories" className="text-gray-700 hover:text-amber-600 font-medium">Accessories</a>
                <a href="/about" className="text-gray-700 hover:text-amber-600 font-medium">About</a>
                <a href="/contact" className="text-gray-700 hover:text-amber-600 font-medium">Contact</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <RegionSelector selectedRegion={selectedRegion} onRegionChange={handleRegionChange} />
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Search className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setShowCart(!showCart)}>
                  <ShoppingBag className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-5">
            <Badge variant="secondary">New Season</Badge>
            <h2 className="text-5xl font-bold text-gray-800">Pakistani Fashion at Your Doorstep</h2>
            <p className="text-gray-600 text-lg">
              Explore the latest trends in Pakistani clothing. From traditional wear to modern designs, find everything you need to express your unique style.
            </p>
            <div className="flex space-x-4">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white">Shop Now</Button>
              <Button variant="outline">Explore More</Button>
            </div>
          </div>
          <div className="relative">
            <img
              src="/hero-image.jpg"
              alt="Pakistani Fashion"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute bottom-0 right-0 p-4 bg-white/80 backdrop-blur-sm rounded-tl-lg">
              <p className="text-sm text-gray-700">
                New arrivals are here! Get 20% off on your first order.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Shopping Cart */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Shopping Cart</h3>
              <Button variant="ghost" onClick={() => setShowCart(false)}>×</Button>
            </div>
            <div className="p-4">
              <ShoppingCart 
                currency={currency}
                onCheckout={(items) => {
                  console.log("Checkout items:", items);
                  setShowCart(false);
                  alert("Proceeding to checkout...");
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Badge variant="secondary">Our Best Sellers</Badge>
          <h2 className="text-4xl font-bold text-gray-800">Featured Products</h2>
          <p className="text-gray-600 text-lg">Explore our handpicked selection of the finest Pakistani fashion.</p>
        </div>

        <AdSenseAd 
          adClient="ca-pub-XXXXXXXXXXXXXXXX"
          adSlot="1234567891"
          className="my-8"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currency={currency}
              region={selectedRegion}
            />
          ))}
        </div>

        <AdSenseAd 
          adClient="ca-pub-XXXXXXXXXXXXXXXX"
          adSlot="9876543210"
          className="my-8"
        />
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Badge variant="secondary">Shop by Category</Badge>
          <h2 className="text-4xl font-bold text-gray-800">Explore Our Categories</h2>
          <p className="text-gray-600 text-lg">Find the perfect outfit for every occasion.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4 text-center">
              <a href="/new-arrivals">
                <h3 className="font-semibold text-lg mb-2">New Arrivals</h3>
                <img src="/placeholder.svg" alt="New Arrivals" className="w-full h-32 object-cover rounded-md" />
              </a>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4 text-center">
              <a href="/unstitched">
                <h3 className="font-semibold text-lg mb-2">Unstitched</h3>
                <img src="/placeholder.svg" alt="Unstitched" className="w-full h-32 object-cover rounded-md" />
              </a>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4 text-center">
              <a href="/ready-to-wear">
                <h3 className="font-semibold text-lg mb-2">Ready to Wear</h3>
                <img src="/placeholder.svg" alt="Ready to Wear" className="w-full h-32 object-cover rounded-md" />
              </a>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4 text-center">
              <a href="/accessories">
                <h3 className="font-semibold text-lg mb-2">Accessories</h3>
                <img src="/placeholder.svg" alt="Accessories" className="w-full h-32 object-cover rounded-md" />
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            &copy; 2024 KK-CLOTHING. All rights reserved.
          </p>
          <div className="mt-4">
            <a href="/about" className="text-gray-700 hover:text-amber-600 mx-3">About Us</a>
            <a href="/contact" className="text-gray-700 hover:text-amber-600 mx-3">Contact Us</a>
            <a href="/size-guide" className="text-gray-700 hover:text-amber-600 mx-3">Size Guide</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
