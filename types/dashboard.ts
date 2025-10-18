// Brand Visibility Types
export interface TimeSeriesDataPoint {
  date: string;
  score: number;
}

export interface BrandRanking {
  rank: number;
  brandName: string;
  visibilityScore: number;
  changePercent: number;
  trending: "up" | "down";
}

export interface BrandVisibilityData {
  currentScore: number;
  changePercent: number;
  changeTrend: "up" | "down";
  timeSeriesData: TimeSeriesDataPoint[];
  brandRankings: BrandRanking[];
}

// Citation Analysis Types
export interface CitationsByType {
  earned: { count: number; percentage: number };
  operated: { count: number; percentage: number };
  owned: { count: number; percentage: number };
}

export interface Domain {
  rank: number;
  domainName: string;
  mentionCount: number;
  type: "earned" | "operated" | "owned";
  percentage: number;
  authorityScore: number;
  url?: string;
}

export interface CitationAnalysisData {
  totalCitations: number;
  citationsByType: CitationsByType;
  domains: Domain[];
}

// Topic Visibility Types
export interface TopTheme {
  rank: number;
  themeName: string;
  frequency: number;
}

export interface Keyword {
  text: string;
  frequency: number;
  size: "large" | "medium" | "small";
  color: "primary" | "secondary" | "tertiary";
  category: "high" | "medium" | "low";
}

export interface TopicVisibilityData {
  topThemes: TopTheme[];
  keywords: Keyword[];
}

// Home Content Types
export interface KeyMetric {
  value: number | string;
  change: string;
  trend: "up" | "down";
  description: string;
  totalCompetitors?: number;
  categoryName?: string;
  score?: number;
}

export interface KeyMetrics {
  totalScore: KeyMetric;
  competitiveRank: KeyMetric;
  strongestCategory: KeyMetric;
  weakestCategory: KeyMetric;
}

export interface Insight {
  type: "positive" | "neutral" | "action";
  title: string;
  description: string;
  timestamp: string;
}

export interface PlatformCoverage {
  platformName: string;
  coveragePercent: number;
  isActive: boolean;
}

export interface HomeContentData {
  keyMetrics: KeyMetrics;
  insights: Insight[];
  platformCoverage: PlatformCoverage[];
}


// Marketing Strategy Types (4P/4E)
export interface TrendDataPoint {
  month: string;
  value: number;
}

export interface TopMention {
  text: string;
  sentimentScore: number;
}

export interface FourPMetrics {
  [key: string]: string | number;
}

export interface FourPElement {
  score: number;
  change: number;
  trend: "up" | "down";
  metrics: FourPMetrics;
  topMentions: TopMention[];
  trendData: TrendDataPoint[];
}

export interface FourPData {
  product: FourPElement;
  price: FourPElement;
  place: FourPElement;
  promotion: FourPElement;
}

export interface FourEElement {
  score: number;
  change: number;
  trend: "up" | "down";
  ratio: number;
  description: string;
  formula: string;
  insights: string[];
}

export interface FourEData {
  experience: FourEElement;
  exchange: FourEElement;
  evangelism: FourEElement;
  everyplace: FourEElement;
}

export interface EmotionData {
  emotion: string;
  value: number;
}

export interface MarketingStrategyData {
  fourP: FourPData;
  fourE: FourEData;
  emotionDistribution: EmotionData[];
}

// STP Types
export interface Segment {
  name: string;
  sizePercent: number;
  characteristics: string[];
  keywords: string[];
}

export interface TargetSegment {
  segmentName: string;
  score: number;
  rationale: string[];
}

export interface Targeting {
  primary: TargetSegment;
  secondary: TargetSegment;
}

export interface PositioningAttribute {
  name: string;
  yourScore: number;
  competitorAvg: number;
}

export interface PositioningMapPoint {
  x: number;
  y: number;
  size?: number;
}

export interface Competitor {
  name: string;
  x: number;
  y: number;
  size: number;
}

export interface PositioningMap {
  yourBrand: PositioningMapPoint;
  competitors: Competitor[];
}

export interface Positioning {
  statement: string;
  attributes: PositioningAttribute[];
  differentiators: string[];
  positioningMap: PositioningMap;
}

export interface STPData {
  segments: Segment[];
  targeting: Targeting;
  positioning: Positioning;
}


// Shopping Content Types
export interface ShoppingMetrics {
  productMentions: number;
  productMentionsChange: number;
  averageRating: number;
  ratingChange: number;
  priceCompetitiveness: number;
  availabilityScore: number;
}

export interface ShoppingPlatform {
  name: string;
  visibility: number;
  mentions: number;
  rating: number;
  trend: "up" | "down";
  change: number;
}

export interface ProductCategory {
  categoryName: string;
  mentions: number;
  visibility: number;
  growthPercent: number;
}

export interface PriceComparison {
  productName: string;
  yourPrice: string;
  competitorAvg: string;
  savingsPercent: string;
  hasAdvantage: boolean | string;
}

export interface ShoppingContentData {
  metrics: ShoppingMetrics;
  platforms: ShoppingPlatform[];
  categories: ProductCategory[];
  priceComparison: PriceComparison[];
}

// Model Content Types
export interface ModelOverallMetrics {
  averageVisibility: number;
  accuracyScore: number;
  totalMentions: number;
  positiveSentimentPercent: number;
}

export interface AIModel {
  name: string;
  provider: string;
  visibility: number;
  accuracy: number;
  sentiment: "positive" | "neutral" | "negative";
  mentions: number;
  trend: "up" | "down";
  change: number;
}

export interface ModelContentData {
  overallMetrics: ModelOverallMetrics;
  models: AIModel[];
}

// Industry Content Types
export interface IndustryMetrics {
  industryRank: number;
  rankChange: number;
  totalCompetitors: number;
  marketSharePercent: number;
  marketShareChange: number;
  growthRate: number;
  audienceReach: number;
}

export interface IndustryCompetitor {
  companyName: string;
  score: number;
  marketShare: number;
  growthRate: number;
  rank: number;
}

export interface IndustryContentData {
  metrics: IndustryMetrics;
  competitors: IndustryCompetitor[];
  strengths: string[];
  opportunities: string[];
}
