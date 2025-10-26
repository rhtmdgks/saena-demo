/**
 * R1-OS SEO Engine - Main Export
 * 
 * 서버 전용 모듈: IG Engine, Link Graph, Indexation, CWV Autotuner
 * 클라이언트 가능: Intent Router, Snippet Bandit, EEAT, Utils
 */

// Types (타입만 재export, 순환 참조 방지)
export type * from './types';

// ===== Server-side Only =====

// IG Engine (서버 전용 - 임베딩 API)
export {
  calculateIGScore,
  calculateNovelty,
  calculateEvidence,
  detectEvidence,
  detectExclusiveData,
  generateDocumentEmbeddings,
  fetchSERPEmbeddings
} from './ig';

// Link Graph (서버 전용 - 대규모 계산)
export {
  buildLinkGraph,
  calculatePageRank,
  calculateLinkScore,
  calculateLinkBudget,
  validateLinkGraph,
  tfidfCosineSimilarity
} from './link-graph';

// Indexation (서버 전용 - Sitemap 생성)
export {
  clusterCanonicals,
  calculatePriority,
  shardSitemap,
  generateSitemapXML,
  generateSitemapIndexXML,
  normalizeURL
} from './indexation';

// CWV Autotuner (서버 전용 - 이미지 최적화)
export {
  detectViolations,
  calculateP75,
  generateFixPR,
  collectRUMData,
  generateLighthouseConfig,
  generateImageOptimizationScript
} from './cwv-autotuner';

// ===== Client-side Compatible =====

// Intent Router (클라이언트 가능)
export {
  routeIntent,
  extractSERPLayout,
  selectTemplate,
  layoutToVector
} from './intent-router';

// Snippet Bandit (클라이언트 가능)
export {
  selectVariant,
  updateBanditState,
  validateSnippet,
  generateVariants
} from './snippet-bandit';

// EEAT (클라이언트 가능 - React 컴포넌트)
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

// Utils (공통 유틸리티)
export {
  safeCosine,
  clamp,
  percentile,
  detectLocale,
  tokenize,
  loadSEOPolicy,
  generateMetaTags,
  generateSlug,
  calculateReadingTime,
  calculateKeywordDensity,
  optimizeMetaDescription,
  optimizeTitle,
  validateStructuredData,
  generateCanonicalURL,
  extractHeadings,
  generateTableOfContents,
  generateAltText,
  generateShareURLs,
  calculatePageScore
} from './utils';
