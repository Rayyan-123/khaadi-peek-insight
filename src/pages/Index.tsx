
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChatWidget } from "@/components/ChatWidget";
import { ShoppingCart } from "@/components/ShoppingCart";
import { RegionSelector } from "@/components/RegionSelector";
import { allProducts } from "@/services/productService";
import { UserNotifications } from "@/components/UserNotifications";
import { convertCurrency, getCurrencySymbol } from "@/services/currencyService";

export default function Index() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("Pakistan");
  const [currency, setCurrency] = useState("PKR");
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Error parsing cart from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

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

  const addToCart = (product: any) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prev =>
        prev.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const currencySymbol = getCurrencySymbol(currency);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-2xl font-bold text-amber-600">
                KK-Clothing
              </Link>
              
              <div className="hidden md:flex space-x-6">
                <Link to="/new-arrivals" className="text-gray-700 hover:text-amber-600 transition-colors">
                  New Arrivals
                </Link>
                <Link to="/ready-to-wear" className="text-gray-700 hover:text-amber-600 transition-colors">
                  Ready to Wear
                </Link>
                <Link to="/unstitched" className="text-gray-700 hover:text-amber-600 transition-colors">
                  Unstitched
                </Link>
                <Link to="/accessories" className="text-gray-700 hover:text-amber-600 transition-colors">
                  Accessories
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-amber-600 transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <RegionSelector selectedRegion={selectedRegion} onRegionChange={handleRegionChange} />
              <UserNotifications />
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-amber-600">
                    {cart.length}
                  </Badge>
                )}
              </Button>

              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/new-arrivals" 
                className="block px-3 py-2 text-gray-700 hover:text-amber-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                New Arrivals
              </Link>
              <Link 
                to="/ready-to-wear" 
                className="block px-3 py-2 text-gray-700 hover:text-amber-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Ready to Wear
              </Link>
              <Link 
                to="/unstitched" 
                className="block px-3 py-2 text-gray-700 hover:text-amber-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Unstitched
              </Link>
              <Link 
                to="/accessories" 
                className="block px-3 py-2 text-gray-700 hover:text-amber-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Accessories
              </Link>
              <Link 
                to="/contact" 
                className="block px-3 py-2 text-gray-700 hover:text-amber-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-amber-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-amber-800 mb-4">
            Discover the Latest in Fashion
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Explore our new arrivals and curated collections. Find the perfect
            outfit for every occasion.
          </p>
          <div className="space-x-4">
            <Link
              to="/new-arrivals"
              className="inline-block bg-amber-600 text-white py-3 px-8 rounded-md hover:bg-amber-700 transition-colors"
            >
              Shop New Arrivals
            </Link>
            <Link
              to="/ready-to-wear"
              className="inline-block bg-white text-amber-700 py-3 px-8 rounded-md border border-amber-600 hover:bg-amber-100 transition-colors"
            >
              Explore Ready to Wear
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProducts.slice(0, 3).map((product) => {
              const convertedPrice = convertCurrency(product.price, 'PKR', currency);
              const convertedDiscountPrice = product.discountPrice ? convertCurrency(product.discountPrice, 'PKR', currency) : undefined;
              
              return (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-3">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-amber-600 font-bold">
                        {currencySymbol} {(convertedDiscountPrice || convertedPrice).toLocaleString()}
                      </span>
                      <Button onClick={() => addToCart({...product, price: convertedPrice, discountPrice: convertedDiscountPrice})}>
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Shop By Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/new-arrivals" className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://source.unsplash.com/400x300/?fashion"
                alt="New Arrivals"
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  New Arrivals
                </h3>
              </div>
            </Link>
            <Link to="/ready-to-wear" className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://source.unsplash.com/400x300/?clothing"
                alt="Ready to Wear"
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  Ready to Wear
                </h3>
              </div>
            </Link>
            <Link to="/unstitched" className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://source.unsplash.com/400x300/?fabric"
                alt="Unstitched"
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  Unstitched
                </h3>
              </div>
            </Link>
            <Link to="/accessories" className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://source.unsplash.com/400x300/?accessories"
                alt="Accessories"
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  Accessories
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 border-t">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <p className="text-gray-600 mb-2">
              &copy; {new Date().getFullYear()} KK-Clothing. All rights reserved.
            </p>
            <div className="space-y-1">
              <p className="text-gray-600">
                📞 Call us: +92 300 1234567 | 📱 WhatsApp: +92 300 1234567
              </p>
              <p className="text-gray-600">
                💬 Live Chat Available | 📧 Email: info@kk-clothing.com
              </p>
            </div>
          </div>
        </div>
      </footer>

      <ChatWidget />
      <ShoppingCart 
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        currency={currencySymbol}
      />
    </div>
  );
}
