import Script from 'next/script';

interface OrganizationData {
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
  contactPoint?: {
    telephone: string;
    contactType: string;
    email?: string;
  };
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface ProductData {
  name: string;
  description: string;
  image?: string;
  offers?: {
    price: string;
    priceCurrency: string;
    availability?: string;
  };
}

/**
 * Organization structured data for SEO
 */
export function OrganizationStructuredData({ data }: { data: OrganizationData }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data.name,
    url: data.url,
    logo: data.logo,
    sameAs: data.sameAs,
    contactPoint: data.contactPoint ? {
      '@type': 'ContactPoint',
      telephone: data.contactPoint.telephone,
      contactType: data.contactPoint.contactType,
      email: data.contactPoint.email,
    } : undefined,
  };

  return (
    <Script
      id="organization-structured-data"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

/**
 * Breadcrumb structured data for SEO
 */
export function BreadcrumbStructuredData({ items }: { items: BreadcrumbItem[] }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-structured-data"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

/**
 * Product structured data for SEO
 */
export function ProductStructuredData({ data }: { data: ProductData }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: data.name,
    description: data.description,
    image: data.image,
    offers: data.offers ? {
      '@type': 'Offer',
      price: data.offers.price,
      priceCurrency: data.offers.priceCurrency,
      availability: data.offers.availability || 'https://schema.org/InStock',
    } : undefined,
  };

  return (
    <Script
      id="product-structured-data"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

/**
 * FAQ structured data for SEO
 */
export function FAQStructuredData({ 
  items 
}: { 
  items: Array<{ question: string; answer: string }> 
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <Script
      id="faq-structured-data"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

/**
 * Local Business structured data for SEO
 */
export function LocalBusinessStructuredData({
  name,
  address,
  telephone,
  url,
  priceRange,
}: {
  name: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  telephone: string;
  url: string;
  priceRange?: string;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
    telephone,
    url,
    priceRange,
  };

  return (
    <Script
      id="local-business-structured-data"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
