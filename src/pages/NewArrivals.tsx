
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ProductCard";
import { RegionSelector } from "@/components/RegionSelector";
import { AdSenseAd } from "@/components/AdSenseAd";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NewArrivals = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState("Pakistan");
  const [currency, setCurrency] = useState("PKR");

  const newProducts = [
    {
      id: "new1",
      name: "Latest Embroidered Kurta Set",
      price: 6500,
      image: "/placeholder.svg",
      description: "Brand new design with intricate embroidery work",
      category: "New Arrivals"
    },
    {
      id: "new2", 
      name: "Trendy Lawn Collection",
      price: 4800,
      image: "/placeholder.svg",
      description: "Fresh summer collection with modern prints",
      category: "New Arrivals"
    },
    {
      id: "new3",
      name: "Designer Formal Wear",
      price: 12000,
      image: "/placeholder.svg", 
      description: "Elegant formal wear for special occasions",
      category: "New Arrivals"
    },
    {
      id: "new4",
      name: "Casual Chic Outfit",
      price: 3500,
      image: "/placeholder.svg",
      description: "Perfect for everyday wear with comfort",
      category: "New Arrivals"
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
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-800 font-serif">KK-CLOTHING</h1>
            </div>
            <RegionSelector selectedRegion={selectedRegion} onRegionChange={handleRegionChange} />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">Fresh Collection</Badge>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">New Arrivals</h1>
          <p className="text-gray-600 text-lg">Discover our latest collection of Pakistani fashion</p>
        </div>

        <AdSenseAd 
          adClient="ca-pub-XXXXXXXXXXXXXXXX"
          adSlot="1234567891"
          className="my-8"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {newProducts.map((product) => (
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
      </div>
    </div>
  );
};

export default NewArrivals;
