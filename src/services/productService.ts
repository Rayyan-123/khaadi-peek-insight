
export interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  description: string;
  category: string;
  rating: number;
  reviews: number;
  fabric?: string;
  sizes?: string[];
  colors?: string[];
  inStock: boolean;
}

export const allProducts: Product[] = [
  {
    id: "1",
    name: "Embroidered Silk Kurta",
    price: 8500,
    discountPrice: 6500,
    image: "/placeholder.svg",
    description: "Luxurious silk kurta with intricate embroidery work",
    category: "Featured",
    rating: 4.8,
    reviews: 124,
    fabric: "Pure Silk",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Red", "Gold", "Navy"],
    inStock: true
  },
  {
    id: "2",
    name: "Designer Lawn Collection",
    price: 5500,
    discountPrice: 4200,
    image: "/placeholder.svg",
    description: "Premium lawn fabric with modern prints",
    category: "New Arrivals",
    rating: 4.6,
    reviews: 89,
    fabric: "Premium Lawn",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Pink", "Blue", "Green"],
    inStock: true
  },
  {
    id: "3",
    name: "Formal Wear Ensemble",
    price: 12000,
    discountPrice: 9500,
    image: "/placeholder.svg",
    description: "Complete formal wear set for special occasions",
    category: "Ready to Wear",
    rating: 4.9,
    reviews: 156,
    fabric: "Chiffon & Silk",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Maroon", "Royal Blue"],
    inStock: true
  },
  {
    id: "4",
    name: "Casual Chic Outfit",
    price: 4500,
    discountPrice: 3200,
    image: "/placeholder.svg",
    description: "Comfortable everyday wear with style",
    category: "Unstitched",
    rating: 4.4,
    reviews: 67,
    fabric: "Cotton",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Cream", "Light Blue"],
    inStock: true
  },
  {
    id: "5",
    name: "Traditional Shalwar Kameez",
    price: 7500,
    discountPrice: 5800,
    image: "/placeholder.svg",
    description: "Classic Pakistani traditional wear",
    category: "Ready to Wear",
    rating: 4.7,
    reviews: 203,
    fabric: "Cotton Blend",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Off-White", "Beige"],
    inStock: true
  },
  // Add more products for different categories
];

export const categories = [
  {
    name: "New Arrivals",
    description: "Latest fashion trends and seasonal collections",
    products: allProducts.filter(p => p.category === "New Arrivals").length
  },
  {
    name: "Ready to Wear",
    description: "Complete outfits ready to wear",
    products: allProducts.filter(p => p.category === "Ready to Wear").length
  },
  {
    name: "Unstitched",
    description: "Premium fabrics for custom tailoring",
    products: allProducts.filter(p => p.category === "Unstitched").length
  },
  {
    name: "Accessories",
    description: "Perfect finishing touches",
    products: 15 // Mock count
  }
];

export const getProductById = (id: string): Product | undefined => {
  return allProducts.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return allProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
};

export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase();
  return allProducts.filter(p => 
    p.name.toLowerCase().includes(searchTerm) ||
    p.description.toLowerCase().includes(searchTerm) ||
    p.category.toLowerCase().includes(searchTerm) ||
    p.fabric?.toLowerCase().includes(searchTerm)
  );
};

export const getProductsByPriceRange = (min: number, max: number): Product[] => {
  return allProducts.filter(p => {
    const price = p.discountPrice || p.price;
    return price >= min && price <= max;
  });
};
