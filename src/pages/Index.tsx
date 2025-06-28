
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Heart, ShoppingBag, User, MapPin } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { AdSenseAd } from "@/components/AdSenseAd";
import { RegionSelector } from "@/components/RegionSelector";

const Index = () => {
  const [selectedRegion, setSelectedRegion] = useState("Pakistan");
  const [currency, setCurrency] = useState("PKR");

  const products = [
    {
      id: "1",
      name: "Floral Lawn Kurta",
      price: 5000,
      image: "/placeholder.svg",
      description: "Embroidered lawn kurta with intricate floral patterns",
      category: "Kurtas"
    },
    {
      id: "2", 
      name: "Embroidered Shalwar Kameez",
      price: 7000,
      image: "/placeholder.svg",
      description: "Traditional three-piece suit with beautiful embroidery",
      category: "Suits"
    },
    {
      id: "3",
      name: "Cotton Unstitched Suit",
      price: 4500,
      image: "/placeholder.svg", 
      description: "Premium cotton unstitched fabric for custom tailoring",
      category: "Unstitched"
    },
    {
      id: "4",
      name: "Printed Kurta",
      price: 3500,
      image: "/placeholder.svg",
      description: "Casual printed kurta perfect for everyday wear",
      category: "Kurtas"
    },
    {
      id: "5",
      name: "Luxury Embroidered Dress",
      price: 10000,
      image: "/placeholder.svg",
      description: "Premium luxury dress with hand-embroidered details",
      category: "Dresses"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-800 font-serif">KK-CLOTHING</h1>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                <MapPin className="w-3 h-3 mr-1" />
                {selectedRegion}
              </Badge>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-amber-600 transition-colors">New Arrivals</a>
              <a href="#" className="text-gray-700 hover:text-amber-600 transition-colors">Unstitched</a>
              <a href="#" className="text-gray-700 hover:text-amber-600 transition-colors">Ready to Wear</a>
              <a href="#" className="text-gray-700 hover:text-amber-600 transition-colors">Accessories</a>
              <a href="/about" className="text-gray-700 hover:text-amber-600 transition-colors">About</a>
              <a href="/contact" className="text-gray-700 hover:text-amber-600 transition-colors">Contact</a>
              <RegionSelector selectedRegion={selectedRegion} onRegionChange={setSelectedRegion} />
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingBag className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-50 to-orange-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 font-serif">
            Discover Timeless Elegance
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Shop Premium Pakistani Clothing - Up to 50% Off
          </p>
          <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg">
            Shop Now
          </Button>
        </div>
      </section>

      {/* AdSense Header Ad */}
      <AdSenseAd 
        adClient="ca-pub-XXXXXXXXXXXXXXXX"
        adSlot="1234567890"
        adFormat="auto"
        fullWidthResponsive={true}
        className="my-8"
      />

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-3/4">
              <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center font-serif">
                Featured Collection
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    currency={currency}
                    region={selectedRegion}
                  />
                ))}
              </div>
            </div>

            {/* Sidebar with Ad */}
            <div className="lg:w-1/4">
              <AdSenseAd 
                adClient="ca-pub-XXXXXXXXXXXXXXXX"
                adSlot="0987654321"
                adFormat="rectangle"
                className="sticky top-24"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center font-serif">
            Shop by Category
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Unstitched", "Ready to Wear", "Accessories", "Sale"].map((category) => (
              <Card key={category} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">👗</span>
                  </div>
                  <h4 className="font-semibold text-gray-800">{category}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4 font-serif">KK-CLOTHING</h4>
              <p className="text-gray-300">Premium Pakistani clothing for the modern woman.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-300">
                <li><a href="/about" className="hover:text-white">About Us</a></li>
                <li><a href="/size-guide" className="hover:text-white">Size Guide</a></li>
                <li><a href="#" className="hover:text-white">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white">Returns</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Customer Service</h5>
              <ul className="space-y-2 text-gray-300">
                <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Track Order</a></li>
                <li><a href="#" className="hover:text-white">Exchange Policy</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Follow Us</h5>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                  📘
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                  📷
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                  🐦
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 KK-Clothing. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
