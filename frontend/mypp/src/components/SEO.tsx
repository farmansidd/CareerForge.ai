import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  structuredData
}) => {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);

      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        element.setAttribute('content', content);
        document.getElementsByTagName('head')[0].appendChild(element);
      }
    };

    // Update meta description
    if (description) {
      updateMetaTag('description', description);
    }

    // Update meta keywords
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // Update Open Graph tags
    if (title) {
      updateMetaTag('og:title', title, true);
    }
    if (description) {
      updateMetaTag('og:description', description, true);
    }
    if (type) {
      updateMetaTag('og:type', type, true);
    }
    if (url) {
      updateMetaTag('og:url', url, true);
    }
    if (image) {
      updateMetaTag('og:image', image, true);
    }

    // Update Twitter Card tags
    if (title) {
      updateMetaTag('twitter:title', title, true);
    }
    if (description) {
      updateMetaTag('twitter:description', description, true);
    }
    if (image) {
      updateMetaTag('twitter:image', image, true);
    }

    // Add or update structured data
    if (structuredData) {
      // Remove existing structured data scripts
      const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
      existingScripts.forEach(script => script.remove());

      // Add new structured data
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.getElementsByTagName('head')[0].appendChild(script);
    }

  }, [title, description, keywords, image, url, type, structuredData]);

  return null; // This component doesn't render anything
};

export default SEO;
