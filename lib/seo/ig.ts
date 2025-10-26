/**
 * IG Engine (Information Gain)
 * 상위 SERP 대비 새로움/정밀 근거/독점 데이터 정량화
 */

import type { IGResult, DocumentEmbedding, EvidenceMetrics, IGConfig } from './types';

/**
 * 코사인 유사도 계산
 * 영벡터 처리: 분모가 0이면 0 반환 (NaN/Infinity 방지)
 */
function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) throw new Error('Vector dimension mismatch');
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  
  // 영벡터 처리: 분모가 0이면 유사도 0 반환
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom > 0 ? dotProduct / denom : 0;
}

/**
 * IG_novel 계산: 신규 문서의 새로움 점수
 * IG_novel = (1/|D|) * Σ_{d∈D} 1[ min_{s∈S} cos(d, s) < τ_n ]
 */
export function calculateNovelty(
  newDocParagraphs: number[][],
  serpDocsParagraphs: number[][][],
  tauNovel: number
): number {
  if (newDocParagraphs.length === 0) return 0;
  
  let novelCount = 0;
  
  for (const newPara of newDocParagraphs) {
    let minSimilarity = 1.0;
    let isNovel = false;
    
    // 조기 종료 최적화: 임계값 이하 발견 시 즉시 중단
    outerLoop: for (const serpDoc of serpDocsParagraphs) {
      for (const serpPara of serpDoc) {
        const sim = cosineSimilarity(newPara, serpPara);
        minSimilarity = Math.min(minSimilarity, sim);
        
        // 조기 종료: 이미 novel로 판정되면 더 이상 계산 불필요
        if (minSimilarity < tauNovel) {
          isNovel = true;
          break outerLoop;
        }
      }
    }
    
    if (isNovel) {
      novelCount++;
    }
  }
  
  return novelCount / newDocParagraphs.length;
}

// 정규식 캐싱 (성능 최적화)
const EVIDENCE_PATTERNS = {
  table: /<table[\s\S]*?<\/table>/gi,
  markdownTable: /\|[\s\S]*?\|/g,
  img: /<img[^>]*>/gi,
  markdownImg: /!\[.*?\]\(.*?\)/g,
  chartKeywords: /\b(chart|graph|diagram|visualization)\b/gi,
  codeBlock: /```[\s\S]*?```/g,
  preTag: /<pre[\s\S]*?<\/pre>/gi,
  codeTag: /<code[\s\S]*?<\/code>/gi,
  footnote: /\[\d+\]/g,
  url: /https?:\/\/[^\s)]+/g,
  refKeywords: /\b(source|reference|citation|study|research)\b/gi,
  paragraph: /\n\n+/
} as const;

/**
 * 증거 요소 탐지 (표, 그래프, 코드, 레퍼런스)
 * 정규식 캐싱으로 성능 최적화
 */
export function detectEvidence(content: string): EvidenceMetrics {
  const paragraphs = content.split(EVIDENCE_PATTERNS.paragraph).filter(p => p.trim().length > 0);
  
  // 표 탐지
  const tables = (content.match(EVIDENCE_PATTERNS.table) || []).length +
                 (content.match(EVIDENCE_PATTERNS.markdownTable) || []).length;
  
  // 그래프/이미지 탐지
  const graphs = (content.match(EVIDENCE_PATTERNS.img) || []).length +
                 (content.match(EVIDENCE_PATTERNS.markdownImg) || []).length +
                 (content.match(EVIDENCE_PATTERNS.chartKeywords) || []).length;
  
  // 코드 샘플 탐지
  const codeSamples = (content.match(EVIDENCE_PATTERNS.codeBlock) || []).length +
                      (content.match(EVIDENCE_PATTERNS.preTag) || []).length +
                      (content.match(EVIDENCE_PATTERNS.codeTag) || []).length;
  
  // 레퍼런스 탐지
  const references = (content.match(EVIDENCE_PATTERNS.footnote) || []).length +
                     (content.match(EVIDENCE_PATTERNS.url) || []).length +
                     (content.match(EVIDENCE_PATTERNS.refKeywords) || []).length;
  
  return {
    tables,
    graphs,
    code_samples: codeSamples,
    references,
    total_paragraphs: paragraphs.length
  };
}

/**
 * IG_evidence 계산: 정량 요소의 문단 비율
 * 표/그래프/코드/레퍼런스 각 1점, 문단당 최대 2점
 */
export function calculateEvidence(metrics: EvidenceMetrics): number {
  if (metrics.total_paragraphs === 0) return 0;
  
  const totalScore = Math.min(
    metrics.tables + metrics.graphs + metrics.code_samples + metrics.references,
    metrics.total_paragraphs * 2
  );
  
  return totalScore / (metrics.total_paragraphs * 2);
}

/**
 * 독점 데이터 소스 감지
 */
export function detectExclusiveData(content: string, metadata?: Record<string, any>): boolean {
  // 자사 데이터 키워드
  const exclusiveKeywords = [
    'saena dataset',
    'proprietary data',
    'internal research',
    'our experiment',
    'our api',
    'exclusive survey'
  ];
  
  const contentLower = content.toLowerCase();
  const hasExclusiveKeyword = exclusiveKeywords.some(kw => contentLower.includes(kw));
  
  // 메타데이터에서 데이터 소스 확인
  const hasExclusiveMetadata = metadata?.dataSource === 'saena' || 
                                metadata?.isExclusive === true;
  
  return hasExclusiveKeyword || hasExclusiveMetadata;
}

/**
 * IG 종합 점수 계산 및 품질 게이트 판정
 */
export function calculateIGScore(
  newDocParagraphs: number[][],
  serpDocsParagraphs: number[][][],
  content: string,
  config: IGConfig,
  metadata?: Record<string, any>
): IGResult {
  // 1. 새로움 계산
  const igNovel = calculateNovelty(newDocParagraphs, serpDocsParagraphs, config.tau_novel);
  
  // 2. 증거 계산
  const evidenceMetrics = detectEvidence(content);
  const igEvidence = calculateEvidence(evidenceMetrics);
  
  // 3. 독점성 계산
  const igExclusive = detectExclusiveData(content, metadata) ? 1 : 0;
  
  // 4. 종합 점수 (w_excl 중복 가중 제거)
  const igScore = 
    config.weights.novel * igNovel +
    config.weights.evidence * igEvidence +
    config.weights.exclusive * igExclusive;
  
  // 5. 품질 게이트 판정
  const passesNovel = igNovel >= config.threshold_novel;
  const passesEvidence = igEvidence >= config.threshold_evidence;
  const passesScore = igScore >= config.threshold_score;
  const passesThreshold = passesNovel && passesEvidence && passesScore;
  
  // 6. 개선 TODO 생성
  const improvementTodos: string[] = [];
  if (!passesNovel) {
    improvementTodos.push(
      `IG_novel (${igNovel.toFixed(3)}) < ${config.threshold_novel}: 상위 SERP 대비 새로운 정보 추가 필요`
    );
  }
  if (!passesEvidence) {
    improvementTodos.push(
      `IG_evidence (${igEvidence.toFixed(3)}) < ${config.threshold_evidence}: 표/그래프/코드/레퍼런스 추가 필요`
    );
  }
  if (!passesScore) {
    improvementTodos.push(
      `IG_score (${igScore.toFixed(3)}) < ${config.threshold_score}: 전반적인 정보 품질 향상 필요`
    );
  }
  
  return {
    ig_novel: igNovel,
    ig_evidence: igEvidence,
    ig_exclusive: igExclusive,
    ig_score: igScore,
    passes_threshold: passesThreshold,
    status: passesThreshold ? 'publish' : 'draft',
    meta_robots: passesThreshold ? 'index,follow' : 'noindex,nofollow',
    improvement_todos: improvementTodos
  };
}

/**
 * SERP 문서 임베딩 가져오기 (실제 구현 시 OpenAI/Cohere API 사용)
 */
export async function fetchSERPEmbeddings(
  keyword: string,
  topK: number = 10
): Promise<number[][][]> {
  // TODO: 실제 구현
  // 1. Google Search API로 상위 k개 URL 가져오기
  // 2. 각 URL 크롤링 및 문단 분할
  // 3. 임베딩 API로 벡터화
  // 4. 반환
  
  console.warn('fetchSERPEmbeddings: Mock implementation');
  return [];
}

/**
 * 문서 임베딩 생성 (실제 구현 시 OpenAI/Cohere API 사용)
 */
export async function generateDocumentEmbeddings(
  content: string
): Promise<number[][]> {
  // TODO: 실제 구현
  // 1. 문단 분할
  // 2. 임베딩 API로 벡터화
  // 3. 반환
  
  console.warn('generateDocumentEmbeddings: Mock implementation');
  return [];
}
