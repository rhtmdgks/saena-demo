/**
 * R1-OS SEO Engine - Type Definitions
 * SAENA (the-saena.ai)
 */

export interface SEOPolicy {
  version: string;
  environment: string;
  ig_engine: IGConfig;
  snippet_bandit: SnippetBanditConfig;
  link_graph: LinkGraphConfig;
  indexation: IndexationConfig;
  cwv: CWVConfig;
  authority: AuthorityConfig;
  eeat: EEATConfig;
  quality_gate: QualityGateConfig;
}

export interface IGConfig {
  tau_novel: number;
  threshold_novel: number;
  threshold_evidence: number;
  threshold_score: number;
  weights: {
    novel: number;
    evidence: number;
    exclusive: number;
  };
  top_k_serp: number;
}

export interface SnippetBanditConfig {
  alpha_init: number;
  beta_init: number;
  update_interval_days: number;
  min_impressions: number;
  max_variants: number;
  prune_threshold: number;
  clickbait_forbidden: string[];
}

export interface LinkGraphConfig {
  lambda: number;
  damping: number;
  budget_min: number;
  budget_max: number;
  budget_base: number;
  budget_scale: number;
  max_same_anchor: number;
  max_same_target: number;
}

export interface IndexationConfig {
  sitemap_max_urls: number;
  tau_canonical: number;
  priority_ema_alpha: number;
  fetch_freq_window_days: number;
}

export interface CWVConfig {
  lcp_threshold_ms: number;
  cls_threshold: number;
  inp_threshold_ms: number;
  lcp_lab_target_ms: number;
  cls_lab_target: number;
  js_initial_budget_kb: number;
  hero_image_max_pixels: number;
  percentile: number;
}

export interface AuthorityConfig {
  min_referring_domains: number;
  anchor_diversity_min: number;
  dofollow_ratio_target: number;
}

export interface EEATConfig {
  require_author: boolean;
  require_organization: boolean;
  require_date_modified: boolean;
  require_editorial_policy: boolean;
}

export interface QualityGateConfig {
  fail_on_ig_below_threshold: boolean;
  fail_on_cwv_violation: boolean;
  fail_on_broken_links: boolean;
  fail_on_schema_errors: boolean;
}

// IG Engine Types
export interface IGResult {
  readonly ig_novel: number;
  readonly ig_evidence: number;
  readonly ig_exclusive: number;
  readonly ig_score: number;
  readonly passes_threshold: boolean;
  readonly status: 'publish' | 'draft';
  readonly meta_robots: 'index,follow' | 'noindex,nofollow';
  readonly improvement_todos: readonly string[];
}

export interface DocumentEmbedding {
  url: string;
  paragraphs: number[][];
}

export interface EvidenceMetrics {
  tables: number;
  graphs: number;
  code_samples: number;
  references: number;
  total_paragraphs: number;
}

// Intent Router Types
export type TemplateType = 
  | 'FAQ'
  | 'Guide'
  | 'Comparison'
  | 'HowTo'
  | 'NewsAware'
  | 'Review'
  | 'Docs';

export interface SERPLayout {
  has_faq: boolean;
  has_video: boolean;
  has_discussion: boolean;
  has_news: boolean;
  has_product: boolean;
  faq_density: number;
  video_density: number;
}

export interface IntentRouterResult {
  template: TemplateType;
  confidence: number;
  layout_vector: number[];
}

// Snippet Bandit Types
export interface SnippetVariant {
  id: string;
  title: string;
  description: string;
  alpha: number;
  beta: number;
  impressions: number;
  clicks: number;
  ctr: number;
}

export interface BanditState {
  keyword: string;
  variants: SnippetVariant[];
  last_updated: string;
  total_impressions: number;
}

// Link Graph Types
export interface PageNode {
  url: string;
  content_vector: number[];
  pagerank: number;
  traffic_score: number;
  recency_score: number;
}

export interface InternalLink {
  from_url: string;
  to_url: string;
  anchor_text: string;
  link_score: number;
}

export interface LinkBudget {
  url: string;
  budget: number;
  allocated_links: InternalLink[];
}

// CWV Types
export interface CWVMetrics {
  lcp_p75: number;
  cls_p75: number;
  inp_p75: number;
  url: string;
  template: string;
  sample_size: number;
}

export interface CWVViolation {
  metric: 'LCP' | 'CLS' | 'INP';
  current_value: number;
  threshold: number;
  url: string;
  suggested_fixes: string[];
}

// EEAT Types (readonly for immutability)
export interface Author {
  readonly name: string;
  readonly url?: string;
  readonly credentials?: string;
  readonly affiliation?: string;
}

export interface Organization {
  readonly name: string;
  readonly url: string;
  readonly logo?: string;
}

export interface EEATMetadata {
  readonly author: Author;
  readonly organization: Organization;
  readonly datePublished: string;
  readonly dateModified: string;
  readonly reviewedBy?: Author;
  readonly sources?: readonly string[];
  readonly editorialPolicyUrl: string;
}
