
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ProductCard";
import { RegionSelector } from "@/components/RegionSelector";
import { AdSenseAd } from "@/components/AdSenseAd";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Accessories = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState("Pakistan");
  const [currency, setCurrency] = useState("PKR");

  const accessoryProducts = [
    {
      id: "acc1",
      name: "Embroidered Dupatta",
      price: 1500,
      image: "/placeholder.svg",
      description: "Beautiful embroidered dupatta with golden work",
      category: "Accessories"
    },
    {
      id: "acc2",
      name: "Traditional Jewelry Set",
      price: 3500,
      image: "/placeholder.svg",
      description: "Complete jewelry set with earrings and necklace",
      category: "Accessories"
    },
    {
      id: "acc3",
      name: "Designer Handbag",
      price: 2800,
      image: "/placeholder.svg",
      description: "Stylish handbag with traditional patterns",
      category: "Accessories"
    },
    {
      id: "acc4",
      name: "Embroidered Shoes",
      price: 4200,
      image: "/placeholder.svg",
      description: "Comfortable shoes with traditional embroidery",
      category: "Accessories"
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
          <Badge variant="secondary" className="mb-4">Complete Your Look</Badge>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Accessories</h1>
          <p className="text-gray-600 text-lg">Perfect finishing touches for your outfit</p>
        </div>

        <AdSenseAd 
          adClient="ca-pub-XXXXXXXXXXXXXXXX"
          adSlot="1234567891"
          className="my-8"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {accessoryProducts.map((product) => (
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

export default Accessories;
