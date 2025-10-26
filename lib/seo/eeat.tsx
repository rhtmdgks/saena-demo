/**
 * EEAT Layer
 * Author/Organization/Dataset/FAQ/Breadcrumb JSON-LD
 */

import type { EEATMetadata, Author, Organization } from './types';

/**
 * Author JSON-LD 생성
 */
export function generateAuthorSchema(author: Author) {
  return {
    '@type': 'Person',
    name: author.name,
    ...(author.url && { url: author.url }),
    ...(author.credentials && { jobTitle: author.credentials }),
    ...(author.affiliation && {
      affiliation: {
        '@type': 'Organization',
        name: author.affiliation
      }
    })
  };
}

/**
 * Organization JSON-LD 생성
 */
export function generateOrganizationSchema(org: Organization) {
  return {
    '@type': 'Organization',
    name: org.name,
    url: org.url,
    ...(org.logo && {
      logo: {
        '@type': 'ImageObject',
        url: org.logo
      }
    })
  };
}

/**
 * Article JSON-LD 생성 (EEAT 포함)
 */
export function generateArticleSchema(
  metadata: EEATMetadata,
  article: {
    headline: string;
    description: string;
    url: string;
    image?: string;
    keywords?: string[];
  }
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    url: article.url,
    ...(article.image && {
      image: {
        '@type': 'ImageObject',
        url: article.image
      }
    }),
    author: generateAuthorSchema(metadata.author),
    publisher: generateOrganizationSchema(metadata.organization),
    datePublished: metadata.datePublished,
    dateModified: metadata.dateModified,
    ...(metadata.reviewedBy && {
      reviewedBy: generateAuthorSchema(metadata.reviewedBy)
    }),
    ...(article.keywords && { keywords: article.keywords.join(', ') }),
    ...(metadata.sources && {
      citation: metadata.sources.map(source => ({
        '@type': 'CreativeWork',
        url: source
      }))
    }),
    isAccessibleForFree: true,
    ...(metadata.editorialPolicyUrl && {
      publishingPrinciples: metadata.editorialPolicyUrl
    })
  };
}

/**
 * FAQ JSON-LD 생성
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Breadcrumb JSON-LD 생성
 */
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
}

/**
 * Dataset JSON-LD 생성
 */
export function generateDatasetSchema(
  dataset: {
    name: string;
    description: string;
    url: string;
    creator: Organization;
    datePublished: string;
    license?: string;
    distribution?: {
      contentUrl: string;
      encodingFormat: string;
    };
  }
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: dataset.name,
    description: dataset.description,
    url: dataset.url,
    creator: generateOrganizationSchema(dataset.creator),
    datePublished: dataset.datePublished,
    ...(dataset.license && { license: dataset.license }),
    ...(dataset.distribution && {
      distribution: {
        '@type': 'DataDownload',
        contentUrl: dataset.distribution.contentUrl,
        encodingFormat: dataset.distribution.encodingFormat
      }
    })
  };
}

/**
 * HowTo JSON-LD 생성
 */
export function generateHowToSchema(
  howto: {
    name: string;
    description: string;
    image?: string;
    totalTime?: string;
    steps: Array<{
      name: string;
      text: string;
      image?: string;
      url?: string;
    }>;
  }
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howto.name,
    description: howto.description,
    ...(howto.image && { image: howto.image }),
    ...(howto.totalTime && { totalTime: howto.totalTime }),
    step: howto.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: step.image }),
      ...(step.url && { url: step.url })
    }))
  };
}

/**
 * JSON-LD 컴포넌트
 */
export function JSONLD({ data }: { data: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * EEAT 메타데이터 컴포넌트
 */
export function EEATMetaTags({ metadata }: { metadata: EEATMetadata }) {
  return (
    <>
      <meta name="author" content={metadata.author.name} />
      <meta name="article:published_time" content={metadata.datePublished} />
      <meta name="article:modified_time" content={metadata.dateModified} />
      {metadata.author.affiliation && (
        <meta name="article:author:affiliation" content={metadata.author.affiliation} />
      )}
      {metadata.reviewedBy && (
        <meta name="article:reviewer" content={metadata.reviewedBy.name} />
      )}
    </>
  );
}

/**
 * 기본 EEAT 메타데이터 생성
 */
export function createDefaultEEATMetadata(): EEATMetadata {
  return {
    author: {
      name: 'SAENA Team',
      url: 'https://the-saena.ai/about',
      credentials: 'AI Research & Development',
      affiliation: 'SAENA'
    },
    organization: {
      name: 'SAENA',
      url: 'https://the-saena.ai',
      logo: 'https://the-saena.ai/logo.png'
    },
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    editorialPolicyUrl: 'https://the-saena.ai/editorial-policy'
  };
}

/**
 * JSON-LD 유효성 검증
 */
export function validateJSONLD(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // @context 체크
  if (!data['@context']) {
    errors.push('Missing @context');
  }
  
  // @type 체크
  if (!data['@type']) {
    errors.push('Missing @type');
  }
  
  // Article 타입 필수 필드 체크
  if (data['@type'] === 'Article') {
    if (!data.headline) errors.push('Article: Missing headline');
    if (!data.author) errors.push('Article: Missing author');
    if (!data.publisher) errors.push('Article: Missing publisher');
    if (!data.datePublished) errors.push('Article: Missing datePublished');
  }
  
  // Organization 타입 필수 필드 체크
  if (data['@type'] === 'Organization') {
    if (!data.name) errors.push('Organization: Missing name');
    if (!data.url) errors.push('Organization: Missing url');
  }
  
  // Person 타입 필수 필드 체크
  if (data['@type'] === 'Person') {
    if (!data.name) errors.push('Person: Missing name');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}
