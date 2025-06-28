
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ProductCard";
import { RegionSelector } from "@/components/RegionSelector";
import { AdSenseAd } from "@/components/AdSenseAd";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Unstitched = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState("Pakistan");
  const [currency, setCurrency] = useState("PKR");

  const unstitchedProducts = [
    {
      id: "uns1",
      name: "Premium Lawn Fabric",
      price: 2500,
      image: "/placeholder.svg",
      description: "High-quality unstitched lawn fabric with digital print",
      category: "Unstitched"
    },
    {
      id: "uns2",
      name: "Embroidered Chiffon Suit",
      price: 4500,
      image: "/placeholder.svg",
      description: "Elegant chiffon fabric with embroidered work",
      category: "Unstitched"
    },
    {
      id: "uns3",
      name: "Cotton Karandi Fabric",
      price: 3200,
      image: "/placeholder.svg",
      description: "Soft cotton karandi perfect for winter wear",
      category: "Unstitched"
    },
    {
      id: "uns4",
      name: "Silk Dupatta Set",
      price: 5500,
      image: "/placeholder.svg",
      description: "Pure silk unstitched suit with matching dupatta",
      category: "Unstitched"
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
          <Badge variant="secondary" className="mb-4">Customize Your Style</Badge>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Unstitched Collection</h1>
          <p className="text-gray-600 text-lg">Premium fabrics ready for your personal touch</p>
        </div>

        <AdSenseAd 
          adClient="ca-pub-XXXXXXXXXXXXXXXX"
          adSlot="1234567891"
          className="my-8"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {unstitchedProducts.map((product) => (
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

export default Unstitched;
