/**
 * R1-OS SEO Engine - Server-only Exports
 * 서버 전용 모듈 (클라이언트 번들에서 제외)
 */

// IG Engine (임베딩 API 필요)
export {
  calculateIGScore,
  calculateNovelty,
  calculateEvidence,
  detectEvidence,
  detectExclusiveData,
  generateDocumentEmbeddings,
  fetchSERPEmbeddings
} from './ig';

// Link Graph (대규모 계산)
export {
  buildLinkGraph,
  calculatePageRank,
  calculateLinkScore,
  calculateLinkBudget,
  validateLinkGraph,
  tfidfCosineSimilarity
} from './link-graph';

// Indexation (Sitemap 생성)
export {
  clusterCanonicals,
  calculatePriority,
  shardSitemap,
  generateSitemapXML,
  generateSitemapIndexXML,
  normalizeURL
} from './indexation';

// CWV Autotuner (sharp/이미지 최적화)
export {
  detectViolations,
  calculateP75,
  generateFixPR,
  collectRUMData,
  generateLighthouseConfig,
  generateImageOptimizationScript
} from './cwv-autotuner';

// Types
export type * from './types';
