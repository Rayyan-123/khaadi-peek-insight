
import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export const SEOHead = ({ 
  title = "KK-Clothing - Premium Pakistani Fashion | Traditional & Modern Dresses",
  description = "Discover authentic Pakistani fashion at KK-Clothing. Shop premium kurtas, lawn suits, formal wear & accessories. Worldwide shipping with local currency support. Traditional craftsmanship meets modern style.",
  keywords = "Pakistani dresses, kurta, lawn suits, shalwar kameez, Pakistani fashion, traditional wear, embroidered dresses, formal wear, KK Clothing, Pakistan fashion online",
  image = "/placeholder.svg",
  url = "https://kk-clothing.com"
}: SEOHeadProps) => {
  
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta tags
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'author', content: 'KK-Clothing' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      
      // Open Graph tags
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'KK-Clothing' },
      
      // Twitter Card tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      
      // Additional SEO tags
      { name: 'theme-color', content: '#d97706' },
      { name: 'application-name', content: 'KK-Clothing' },
    ];

    metaTags.forEach(tag => {
      let element = document.querySelector(`meta[${tag.name ? 'name' : 'property'}="${tag.name || tag.property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        if (tag.name) {
          element.setAttribute('name', tag.name);
        } else if (tag.property) {
          element.setAttribute('property', tag.property);
        }
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', tag.content);
    });

    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ClothingStore",
      "name": "KK-Clothing",
      "description": description,
      "url": url,
      "logo": image,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "PK"
      },
      "sameAs": [
        "https://facebook.com/kk-clothing",
        "https://instagram.com/kk-clothing"
      ]
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement('script') as HTMLScriptElement;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, image, url]);

  return null;
};
