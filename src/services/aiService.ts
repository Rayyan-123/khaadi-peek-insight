
import { allProducts, categories, getProductById, getProductsByCategory, searchProducts, getProductsByPriceRange } from './productService';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai' | 'admin';
  timestamp: Date;
  userId?: string;
  isAdminVisible?: boolean;
}

class AIService {
  getProductResponse(userMessage: string): string {
    const message = userMessage.toLowerCase();
    
    // Specific product queries
    if (message.includes('embroidered silk kurta') || message.includes('kurta 1')) {
      const product = getProductById('1');
      if (product) {
        return `The Embroidered Silk Kurta is priced at PKR ${product.discountPrice} (originally PKR ${product.price}). It's made from ${product.fabric} and available in sizes ${product.sizes?.join(', ')}. Colors available: ${product.colors?.join(', ')}. This product has a ${product.rating} star rating from ${product.reviews} reviews.`;
      }
    }
    
    if (message.includes('designer lawn') || message.includes('lawn collection')) {
      const product = getProductById('2');
      if (product) {
        return `Our Designer Lawn Collection is priced at PKR ${product.discountPrice} (originally PKR ${product.price}). Made from ${product.fabric}, available in ${product.colors?.join(', ')} colors. Sizes: ${product.sizes?.join(', ')}. Rated ${product.rating} stars by ${product.reviews} customers.`;
      }
    }
    
    // Price range queries
    if (message.includes('under 5000') || message.includes('below 5000')) {
      const products = getProductsByPriceRange(0, 5000);
      return `We have ${products.length} products under PKR 5000: ${products.map(p => `${p.name} (PKR ${p.discountPrice || p.price})`).join(', ')}. These are great value options with excellent quality.`;
    }
    
    if (message.includes('5000 to 10000') || message.includes('mid range')) {
      const products = getProductsByPriceRange(5000, 10000);
      return `In the PKR 5000-10000 range, we have ${products.length} beautiful options: ${products.map(p => `${p.name} (PKR ${p.discountPrice || p.price})`).join(', ')}. Perfect balance of quality and affordability.`;
    }
    
    if (message.includes('above 10000') || message.includes('premium') || message.includes('luxury')) {
      const products = getProductsByPriceRange(10000, 50000);
      return `Our premium collection (above PKR 10000) includes: ${products.map(p => `${p.name} (PKR ${p.discountPrice || p.price})`).join(', ')}. These are our finest pieces with superior craftsmanship.`;
    }
    
    // Category queries
    if (message.includes('new arrival')) {
      const products = getProductsByCategory('New Arrivals');
      return `Our New Arrivals collection features ${products.length} latest designs: ${products.map(p => `${p.name} (PKR ${p.discountPrice || p.price})`).join(', ')}. Check out our latest fashion trends!`;
    }
    
    if (message.includes('ready to wear')) {
      const products = getProductsByCategory('Ready to Wear');
      return `Ready to Wear collection has ${products.length} complete outfits: ${products.map(p => `${p.name} (PKR ${p.discountPrice || p.price})`).join(', ')}. Perfect for immediate use!`;
    }
    
    if (message.includes('unstitched') || message.includes('fabric')) {
      const products = getProductsByCategory('Unstitched');
      return `Our Unstitched collection offers ${products.length} premium fabric options: ${products.map(p => `${p.name} (PKR ${p.discountPrice || p.price})`).join(', ')}. Perfect for custom tailoring to your measurements.`;
    }
    
    // Size queries
    if (message.includes('size') && (message.includes('available') || message.includes('what sizes'))) {
      return `We offer sizes: Small (S), Medium (M), Large (L), Extra Large (XL), and XXL for most products. Our size guide provides detailed measurements. Some products may have limited size availability - check individual product pages for specific size options.`;
    }
    
    // Fabric queries
    if (message.includes('fabric') || message.includes('material')) {
      const fabrics = [...new Set(allProducts.map(p => p.fabric).filter(Boolean))];
      return `We use premium quality fabrics including: ${fabrics.join(', ')}. Each product page specifies the exact fabric type and care instructions. All our fabrics are carefully selected for comfort, durability, and authentic Pakistani fashion appeal.`;
    }
    
    // Color queries
    if (message.includes('color') || message.includes('colours')) {
      const allColors = [...new Set(allProducts.flatMap(p => p.colors || []))];
      return `Our products are available in various colors including: ${allColors.join(', ')}. Color availability varies by product. Each product page shows available color options with images.`;
    }
    
    // Stock queries
    if (message.includes('stock') || message.includes('available')) {
      const inStockCount = allProducts.filter(p => p.inStock).length;
      return `Currently ${inStockCount} out of ${allProducts.length} products are in stock. We regularly update our inventory. If a specific item shows as out of stock, please contact us as we may have it available soon.`;
    }
    
    // Shipping and delivery
    if (message.includes('shipping') || message.includes('delivery')) {
      return `We provide worldwide shipping with tracking support. Delivery times: 3-7 business days locally, 7-14 days internationally. Shipping costs calculated at checkout based on your location. Free shipping available on orders above PKR 15,000.`;
    }
    
    // Pricing general
    if (message.includes('price') && message.includes('range')) {
      const minPrice = Math.min(...allProducts.map(p => p.discountPrice || p.price));
      const maxPrice = Math.max(...allProducts.map(p => p.discountPrice || p.price));
      return `Our products range from PKR ${minPrice} to PKR ${maxPrice}. We offer competitive pricing with regular discounts. Currently featuring special discounts on selected items. Check individual products for current pricing.`;
    }
    
    // Search functionality
    if (message.includes('search') || message.includes('find')) {
      return `You can search for products using our search function or by browsing categories: ${categories.map(c => c.name).join(', ')}. Looking for something specific? Just describe it and I'll help you find it!`;
    }
    
    // General product info
    if (message.includes('how many') || message.includes('total products')) {
      return `We currently offer ${allProducts.length} products across ${categories.length} main categories. Our collection includes traditional Pakistani wear, modern designs, formal wear, and casual outfits. New products are added regularly!`;
    }
    
    // Return general response for unrecognized queries
    return `I can help you with specific product information including prices, sizes, colors, fabrics, and availability. You can ask about:\n\n• Specific products by name\n• Price ranges and categories\n• Size and color availability\n• Fabric types and care instructions\n• Shipping and delivery information\n• Stock availability\n\nWhat would you like to know about our ${allProducts.length} available products?`;
  }
}

export const aiService = new AIService();

// Save chat messages for admin view
export const saveChatMessage = (message: ChatMessage) => {
  const messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
  messages.push(message);
  localStorage.setItem('chatMessages', JSON.stringify(messages));
};

export const getChatMessages = (): ChatMessage[] => {
  return JSON.parse(localStorage.getItem('chatMessages') || '[]');
};
