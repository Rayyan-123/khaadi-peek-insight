
import { allProducts, categories, getProductById, getProductsByCategory, searchProducts, getProductsByPriceRange } from './productService';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai' | 'admin';
  timestamp: Date;
  userId?: string;
  isAdminVisible?: boolean;
  language?: string;
}

class AIService {
  private detectLanguage(text: string): string {
    const message = text.toLowerCase();
    
    // Urdu/Arabic script detection
    if (/[\u0600-\u06FF]/.test(text)) {
      return 'urdu';
    }
    
    // Hindi/Devanagari script detection
    if (/[\u0900-\u097F]/.test(text)) {
      return 'hindi';
    }
    
    // Roman Urdu common words
    const romanUrduWords = ['kya', 'hai', 'hain', 'ke', 'ka', 'ki', 'aur', 'main', 'mein', 'ap', 'aap', 'yeh', 'ye', 'woh', 'wo', 'kaise', 'kahan', 'kab', 'kyun', 'kitna', 'kitne', 'kapde', 'dress', 'price', 'qeemat', 'rang', 'color', 'size', 'saiz'];
    const hasRomanUrdu = romanUrduWords.some(word => message.includes(word));
    
    // Roman Hindi common words
    const romanHindiWords = ['kya', 'hai', 'hain', 'aur', 'main', 'mein', 'aap', 'yah', 'vah', 'kaise', 'kahan', 'kab', 'kyun', 'kitna', 'kitne', 'kapda', 'dress', 'daam', 'rang', 'color', 'size'];
    const hasRomanHindi = romanHindiWords.some(word => message.includes(word));
    
    if (hasRomanUrdu) return 'roman-urdu';
    if (hasRomanHindi) return 'roman-hindi';
    
    return 'english';
  }

  private getTranslations(language: string) {
    const translations = {
      english: {
        welcome: "Hello! Welcome to KK-Clothing. I'm your AI assistant and can help you with detailed information about our products, prices, sizes, colors, and more. What would you like to know?",
        priced_at: "is priced at PKR",
        originally: "originally PKR",
        made_from: "It's made from",
        available_in_sizes: "and available in sizes",
        colors_available: "Colors available:",
        rating: "This product has a",
        star_rating: "star rating from",
        reviews: "reviews",
        products_under: "We have",
        products_under_pkr: "products under PKR",
        great_value: "These are great value options with excellent quality",
        in_range: "In the PKR",
        range: "range, we have",
        beautiful_options: "beautiful options:",
        perfect_balance: "Perfect balance of quality and affordability",
        premium_collection: "Our premium collection (above PKR 10000) includes:",
        finest_pieces: "These are our finest pieces with superior craftsmanship",
        new_arrivals_features: "Our New Arrivals collection features",
        latest_designs: "latest designs:",
        check_trends: "Check out our latest fashion trends!",
        ready_to_wear_has: "Ready to Wear collection has",
        complete_outfits: "complete outfits:",
        perfect_immediate: "Perfect for immediate use!",
        unstitched_offers: "Our Unstitched collection offers",
        premium_fabric: "premium fabric options:",
        perfect_custom: "Perfect for custom tailoring to your measurements",
        sizes_available: "We offer sizes: Small (S), Medium (M), Large (L), Extra Large (XL), and XXL for most products",
        fabrics_include: "We use premium quality fabrics including:",
        colors_include: "Our products are available in various colors including:",
        currently_in_stock: "Currently",
        out_of: "out of",
        products_in_stock: "products are in stock",
        shipping_info: "We provide worldwide shipping with tracking support. Delivery times: 3-7 business days locally, 7-14 days internationally",
        price_range: "Our products range from PKR",
        to: "to PKR",
        can_help: "I can help you with specific product information including prices, sizes, colors, fabrics, and availability"
      },
      urdu: {
        welcome: "السلام علیکم! KK-Clothing میں خوش آمدید۔ میں آپ کا AI اسسٹنٹ ہوں اور آپ کو ہمارے پروڈکٹس، قیمتوں، سائزز، رنگوں کے بارے میں تفصیلی معلومات فراہم کر سکتا ہوں۔ آپ کیا جاننا چاہتے ہیں؟",
        priced_at: "کی قیمت PKR",
        originally: "اصل قیمت PKR",
        made_from: "یہ بنا ہے",
        available_in_sizes: "اور دستیاب سائزز",
        colors_available: "دستیاب رنگ:",
        rating: "اس پروڈکٹ کو",
        star_rating: "ستارے کی ریٹنگ ملی ہے",
        reviews: "جائزوں سے",
        products_under: "ہمارے پاس",
        products_under_pkr: "پروڈکٹس ہیں PKR",
        great_value: "یہ بہترین کوالٹی کے ساتھ قیمتی آپشنز ہیں",
        in_range: "PKR",
        range: "کی رینج میں، ہمارے پاس",
        beautiful_options: "خوبصورت آپشنز ہیں:",
        perfect_balance: "کوالٹی اور سستی کا بہترین توازن",
        premium_collection: "ہمارا پریمیم کلیکشن (PKR 10000 سے اوپر) شامل ہے:",
        finest_pieces: "یہ ہمارے بہترین کاریگری کے ٹکڑے ہیں"
      },
      'roman-urdu': {
        welcome: "Salam! KK-Clothing mein khush amdeed. Main aap ka AI assistant hun aur aap ko hamare products, prices, sizes, colors ke bare mein detailed information de sakta hun. Aap kya jana chahte hain?",
        priced_at: "ki qeemat hai PKR",
        originally: "asal qeemat PKR",
        made_from: "Ye bana hai",
        available_in_sizes: "aur available sizes",
        colors_available: "Available colors:",
        rating: "Is product ko mila hai",
        star_rating: "star rating",
        reviews: "reviews se",
        products_under: "Hamare paas hain",
        products_under_pkr: "products PKR",
        great_value: "Ye bohot ache quality ke sath valuable options hain",
        in_range: "PKR",
        range: "ki range mein, hamare paas",
        beautiful_options: "khoobsurat options hain:",
        perfect_balance: "Quality aur affordability ka perfect balance",
        premium_collection: "Hamara premium collection (PKR 10000 se upar) shamil hai:",
        finest_pieces: "Ye hamare behtareen craftsmanship ke pieces hain"
      },
      hindi: {
        welcome: "नमस्ते! KK-Clothing में आपका स्वागत है। मैं आपका AI सहायक हूं और आपको हमारे उत्पादों, कीमतों, साइज़, रंगों के बारे में विस्तृत जानकारी दे सकता हूं। आप क्या जानना चाहते हैं?",
        priced_at: "की कीमत है PKR",
        originally: "मूल कीमत PKR",
        made_from: "यह बना है",
        available_in_sizes: "और उपलब्ध साइज़",
        colors_available: "उपलब्ध रंग:",
        rating: "इस उत्पाद को मिली है",
        star_rating: "स्टार रेटिंग",
        reviews: "समीक्षाओं से",
        products_under: "हमारे पास हैं",
        products_under_pkr: "उत्पाद PKR",
        great_value: "ये बेहतरीन गुणवत्ता के साथ मूल्यवान विकल्प हैं"
      },
      'roman-hindi': {
        welcome: "Namaste! KK-Clothing mein aapka swagat hai. Main aapka AI sahayak hun aur aapko hamare products, prices, sizes, colors ke bare mein detailed information de sakta hun. Aap kya janna chahte hain?",
        priced_at: "ki keemat hai PKR",
        originally: "mul keemat PKR",
        made_from: "Ye bana hai",
        available_in_sizes: "aur available sizes",
        colors_available: "Available colors:",
        rating: "Is product ko mili hai",
        star_rating: "star rating",
        reviews: "reviews se",
        products_under: "Hamare paas hain",
        products_under_pkr: "products PKR",
        great_value: "Ye behtareen quality ke sath valuable options hain"
      }
    };
    
    return translations[language] || translations.english;
  }

  getProductResponse(userMessage: string): string {
    const language = this.detectLanguage(userMessage);
    const t = this.getTranslations(language);
    const message = userMessage.toLowerCase();
    
    // Specific product queries
    if (message.includes('embroidered silk kurta') || message.includes('kurta 1') || message.includes('silk kurta') || message.includes('کرتا') || message.includes('ریشمی')) {
      const product = getProductById('1');
      if (product) {
        return `${product.name} ${t.priced_at} ${product.discountPrice} (${t.originally} ${product.price}). ${t.made_from} ${product.fabric} ${t.available_in_sizes} ${product.sizes?.join(', ')}. ${t.colors_available} ${product.colors?.join(', ')}. ${t.rating} ${product.rating} ${t.star_rating} ${product.reviews} ${t.reviews}.`;
      }
    }
    
    if (message.includes('designer lawn') || message.includes('lawn collection') || message.includes('لان') || message.includes('ڈیزائنر')) {
      const product = getProductById('2');
      if (product) {
        return `${product.name} ${t.priced_at} ${product.discountPrice} (${t.originally} ${product.price}). ${t.made_from} ${product.fabric}, ${t.colors_available} ${product.colors?.join(', ')}. Sizes: ${product.sizes?.join(', ')}. ${t.rating} ${product.rating} ${t.star_rating} ${product.reviews} customers.`;
      }
    }
    
    // Price range queries
    if (message.includes('under 5000') || message.includes('below 5000') || message.includes('5000 se kam') || message.includes('کم') || message.includes('5000')) {
      const products = getProductsByPriceRange(0, 5000);
      return `${t.products_under} ${products.length} ${t.products_under_pkr} 5000: ${products.map(p => `${p.name} (PKR ${p.discountPrice || p.price})`).join(', ')}. ${t.great_value}.`;
    }
    
    if (message.includes('5000 to 10000') || message.includes('mid range') || message.includes('5000 se 10000') || message.includes('درمیانی')) {
      const products = getProductsByPriceRange(5000, 10000);
      return `${t.in_range} 5000-10000 ${t.range} ${products.length} ${t.beautiful_options} ${products.map(p => `${p.name} (PKR ${p.discountPrice || p.price})`).join(', ')}. ${t.perfect_balance}.`;
    }
    
    if (message.includes('above 10000') || message.includes('premium') || message.includes('luxury') || message.includes('10000 se zyada') || message.includes('پریمیم') || message.includes('مہنگا')) {
      const products = getProductsByPriceRange(10000, 50000);
      return `${t.premium_collection} ${products.map(p => `${p.name} (PKR ${p.discountPrice || p.price})`).join(', ')}. ${t.finest_pieces}.`;
    }
    
    // Category queries
    if (message.includes('new arrival') || message.includes('نیا') || message.includes('latest') || message.includes('naya') || message.includes('नया')) {
      const products = getProductsByCategory('New Arrivals');
      return `${t.new_arrivals_features} ${products.length} ${t.latest_designs} ${products.map(p => `${p.name} (PKR ${p.discountPrice || p.price})`).join(', ')}. ${t.check_trends}`;
    }
    
    if (message.includes('ready to wear') || message.includes('تیار') || message.includes('ready') || message.includes('tayyar')) {
      const products = getProductsByCategory('Ready to Wear');
      return `${t.ready_to_wear_has} ${products.length} ${t.complete_outfits} ${products.map(p => `${p.name} (PKR ${p.discountPrice || p.price})`).join(', ')}. ${t.perfect_immediate}`;
    }
    
    if (message.includes('unstitched') || message.includes('fabric') || message.includes('کپڑا') || message.includes('غیر سلا') || message.includes('kapda')) {
      const products = getProductsByCategory('Unstitched');
      return `${t.unstitched_offers} ${products.length} ${t.premium_fabric} ${products.map(p => `${p.name} (PKR ${p.discountPrice || p.price})`).join(', ')}. ${t.perfect_custom}.`;
    }
    
    // Size queries
    if (message.includes('size') || message.includes('سائز') || message.includes('साइज़') || message.includes('saiz')) {
      return `${t.sizes_available}. Our size guide provides detailed measurements. Some products may have limited size availability - check individual product pages for specific size options.`;
    }
    
    // Fabric queries  
    if (message.includes('fabric') || message.includes('material') || message.includes('کپڑا') || message.includes('कपड़ा') || message.includes('kapda')) {
      const fabrics = [...new Set(allProducts.map(p => p.fabric).filter(Boolean))];
      return `${t.fabrics_include} ${fabrics.join(', ')}. Each product page specifies the exact fabric type and care instructions.`;
    }
    
    // Color queries
    if (message.includes('color') || message.includes('colour') || message.includes('رنگ') || message.includes('रंग') || message.includes('rang')) {
      const allColors = [...new Set(allProducts.flatMap(p => p.colors || []))];
      return `${t.colors_include} ${allColors.join(', ')}. Color availability varies by product.`;
    }
    
    // Stock queries
    if (message.includes('stock') || message.includes('available') || message.includes('موجود') || message.includes('उपलब्ध') || message.includes('mojood')) {
      const inStockCount = allProducts.filter(p => p.inStock).length;
      return `${t.currently_in_stock} ${inStockCount} ${t.out_of} ${allProducts.length} ${t.products_in_stock}. We regularly update our inventory.`;
    }
    
    // Shipping and delivery
    if (message.includes('shipping') || message.includes('delivery') || message.includes('ڈیلیوری') || message.includes('डिलीवरी') || message.includes('delivery')) {
      return `${t.shipping_info}. Shipping costs calculated at checkout based on your location. Free shipping available on orders above PKR 15,000.`;
    }
    
    // Pricing general
    if (message.includes('price') || message.includes('قیمت') || message.includes('कीमत') || message.includes('qeemat') || message.includes('keemat')) {
      const minPrice = Math.min(...allProducts.map(p => p.discountPrice || p.price));
      const maxPrice = Math.max(...allProducts.map(p => p.discountPrice || p.price));
      return `${t.price_range} ${minPrice} ${t.to} ${maxPrice}. We offer competitive pricing with regular discounts.`;
    }
    
    // Return general response for unrecognized queries
    return `${t.can_help}. You can ask about:\n\n• Specific products by name\n• Price ranges and categories\n• Size and color availability\n• Fabric types and care instructions\n• Shipping and delivery information\n• Stock availability\n\nWhat would you like to know about our ${allProducts.length} available products?`;
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
