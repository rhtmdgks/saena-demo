/**
 * R1-OS SEO Engine - Client-safe Exports
 * 클라이언트 번들에 포함 가능한 모듈
 */

// Intent Router
export {
  routeIntent,
  extractSERPLayout,
  selectTemplate,
  layoutToVector
} from './intent-router';

// Snippet Bandit
export {
  selectVariant,
  updateBanditState,
  validateSnippet,
  generateVariants
} from './snippet-bandit';

// EEAT (React 컴포넌트)
export {
  JSONLD,
  EEATMetaTags,
  generateArticleSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateDatasetSchema,
  generateHowToSchema,
  generateAuthorSchema,
  generateOrganizationSchema,
  createDefaultEEATMetadata,
  validateJSONLD
} from './eeat';

// Utils (경량 유틸리티만)
export {
  clamp,
  percentile,
  detectLocale,
  tokenize,
  generateSlug,
  calculateReadingTime,
  optimizeMetaDescription,
  optimizeTitle,
  generateCanonicalURL,
  generateAltText
} from './utils';

// Types
export type * from './types';
