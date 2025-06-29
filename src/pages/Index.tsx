import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/ProductCard";
import { RegionSelector } from "@/components/RegionSelector";
import { AdSenseAd } from "@/components/AdSenseAd";
import { PaymentModal } from "@/components/PaymentModal";
import { AuthModal } from "@/components/AuthModal";
import { ChatWidget } from "@/components/ChatWidget";
import { ShoppingCart } from "@/components/ShoppingCart";
import { Heart, ShoppingBag, User, Search, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { UserAccountDropdown } from "@/components/UserAccountDropdown";

const Index = () => {
  const [selectedRegion, setSelectedRegion] = useState("Pakistan");
  const [currency, setCurrency] = useState("PKR");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check for logged in user on component mount
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const featuredProducts = [
    {
      id: "1",
      name: "Embroidered Silk Kurta",
      price: 8500,
      discountPrice: 6500,
      image: "/placeholder.svg",
      description: "Luxurious silk kurta with intricate embroidery work",
      category: "Featured",
      rating: 4.8,
      reviews: 124
    },
    {
      id: "2",
      name: "Designer Lawn Collection",
      price: 5500,
      discountPrice: 4200,
      image: "/placeholder.svg",
      description: "Premium lawn fabric with modern prints",
      category: "Featured",
      rating: 4.6,
      reviews: 89
    },
    {
      id: "3",
      name: "Formal Wear Ensemble",
      price: 12000,
      discountPrice: 9500,
      image: "/placeholder.svg",
      description: "Complete formal wear set for special occasions",
      category: "Featured",
      rating: 4.9,
      reviews: 156
    },
    {
      id: "4",
      name: "Casual Chic Outfit",
      price: 4500,
      discountPrice: 3200,
      image: "/placeholder.svg",
      description: "Comfortable everyday wear with style",
      category: "Featured",
      rating: 4.4,
      reviews: 67
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

  const handleBuyNow = (product: any) => {
    setSelectedProduct(product);
    setShowPaymentModal(true);
  };

  const handleAuthSuccess = (user: any) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  const handleSwitchAccount = () => {
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* SEO Meta Tags - Would be handled by Helmet in a real app */}
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-800 font-serif">KK-CLOTHING</h1>
              <Badge variant="secondary" className="hidden md:inline-flex">Premium Pakistani Fashion</Badge>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-amber-600 transition-colors">Home</Link>
              <Link to="/new-arrivals" className="text-gray-700 hover:text-amber-600 transition-colors">New Arrivals</Link>
              <Link to="/unstitched" className="text-gray-700 hover:text-amber-600 transition-colors">Unstitched</Link>
              <Link to="/ready-to-wear" className="text-gray-700 hover:text-amber-600 transition-colors">Ready to Wear</Link>
              <Link to="/accessories" className="text-gray-700 hover:text-amber-600 transition-colors">Accessories</Link>
              <Link to="/about" className="text-gray-700 hover:text-amber-600 transition-colors">About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-amber-600 transition-colors">Contact</Link>
            </nav>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-4">
              <RegionSelector selectedRegion={selectedRegion} onRegionChange={handleRegionChange} />
              
              {/* Desktop Icons */}
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Search className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowCart(true)}
                >
                  <ShoppingBag className="w-5 h-5" />
                </Button>
                
                {/* User Account */}
                {currentUser ? (
                  <UserAccountDropdown 
                    user={currentUser}
                    onLogout={handleLogout}
                    onSwitchAccount={handleSwitchAccount}
                  />
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowAuthModal(true)}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Account
                  </Button>
                )}
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t">
              <nav className="flex flex-col space-y-3 pt-4">
                <Link to="/" className="text-gray-700 hover:text-amber-600 transition-colors">Home</Link>
                <Link to="/new-arrivals" className="text-gray-700 hover:text-amber-600 transition-colors">New Arrivals</Link>
                <Link to="/unstitched" className="text-gray-700 hover:text-amber-600 transition-colors">Unstitched</Link>
                <Link to="/ready-to-wear" className="text-gray-700 hover:text-amber-600 transition-colors">Ready to Wear</Link>
                <Link to="/accessories" className="text-gray-700 hover:text-amber-600 transition-colors">Accessories</Link>
                <Link to="/about" className="text-gray-700 hover:text-amber-600 transition-colors">About</Link>
                <Link to="/contact" className="text-gray-700 hover:text-amber-600 transition-colors">Contact</Link>
                
                <div className="flex items-center space-x-4 pt-4 border-t">
                  <Button variant="ghost" size="sm">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Heart className="w-4 h-4 mr-2" />
                    Wishlist
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowCart(true)}>
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Cart
                  </Button>
                </div>
                
                {currentUser ? (
                  <div className="pt-4 border-t">
                    <UserAccountDropdown 
                      user={currentUser}
                      onLogout={handleLogout}
                      onSwitchAccount={handleSwitchAccount}
                    />
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setShowAuthModal(true)}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Login / Sign Up
                  </Button>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-amber-100 via-amber-50 to-orange-100">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 font-serif">
              Discover Authentic Pakistani Fashion
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Premium collection of traditional and modern Pakistani dresses. 
              <br className="hidden md:block" />
              Shop worldwide with local currency support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 px-8 py-4 text-lg">
                Explore Collection
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
                View Size Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* AdSense Header Ad */}
      <AdSenseAd 
        adClient="ca-pub-XXXXXXXXXXXXXXXX"
        adSlot="1234567891"
        className="my-8"
      />

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Premium Collection</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Products</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Handpicked selection of our finest Pakistani dresses, crafted with attention to detail and traditional artistry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                region={selectedRegion}
                onBuyNow={handleBuyNow}
                showDiscount={true}
              />
            ))}
          </div>

          <div className="text-center">
            <Link to="/new-arrivals">
              <Button size="lg" variant="outline" className="px-8">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Shop by Category</h2>
            <p className="text-gray-600 text-lg">Explore our diverse range of Pakistani fashion</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "New Arrivals", link: "/new-arrivals", desc: "Latest fashion trends", color: "bg-rose-100" },
              { name: "Unstitched", link: "/unstitched", desc: "Premium fabrics", color: "bg-blue-100" },
              { name: "Ready to Wear", link: "/ready-to-wear", desc: "Complete outfits", color: "bg-green-100" },
              { name: "Accessories", link: "/accessories", desc: "Perfect finishing touches", color: "bg-purple-100" }
            ].map((category) => (
              <Link key={category.name} to={category.link}>
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${category.color} rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <span className="text-2xl font-bold text-gray-600">{category.name[0]}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
                    <p className="text-gray-600">{category.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AdSense Sidebar Ad */}
      <AdSenseAd 
        adClient="ca-pub-XXXXXXXXXXXXXXXX"
        adSlot="9876543210"
        className="my-8"
      />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 font-serif">KK-CLOTHING</h3>
              <p className="text-gray-400 mb-4">
                Premium Pakistani fashion delivered worldwide. Authentic designs, quality craftsmanship.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">Facebook</Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">Instagram</Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">WhatsApp</Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/about" className="block text-gray-400 hover:text-white transition-colors">About Us</Link>
                <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors">Contact</Link>
                <Link to="/size-guide" className="block text-gray-400 hover:text-white transition-colors">Size Guide</Link>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Shipping Info</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <div className="space-y-2">
                <Link to="/new-arrivals" className="block text-gray-400 hover:text-white transition-colors">New Arrivals</Link>
                <Link to="/unstitched" className="block text-gray-400 hover:text-white transition-colors">Unstitched</Link>
                <Link to="/ready-to-wear" className="block text-gray-400 hover:text-white transition-colors">Ready to Wear</Link>
                <Link to="/accessories" className="block text-gray-400 hover:text-white transition-colors">Accessories</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Customer Support</h4>
              <div className="space-y-2 text-gray-400">
                <p>Email: support@kk-clothing.com</p>
                <p>Phone: +92-XXX-XXXXXXX</p>
                <p>WhatsApp: +92-XXX-XXXXXXX</p>
                <p>Mon-Sat: 9 AM - 8 PM</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 KK-Clothing. All rights reserved. | 
              <a href="#" className="hover:text-white ml-1">Privacy Policy</a> | 
              <a href="#" className="hover:text-white ml-1">Terms of Service</a>
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showPaymentModal && selectedProduct && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          product={selectedProduct}
          region={selectedRegion}
          currency={currency}
        />
      )}

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}

      {showCart && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold">Shopping Cart</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowCart(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-4">
              <ShoppingCart
                currency={currency}
                onCheckout={() => {
                  setShowCart(false);
                  // Handle checkout logic
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default Index;
