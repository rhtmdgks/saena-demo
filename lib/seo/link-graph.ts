/**
 * Internal Link Graph
 * TF-IDF × PageRank 기반 링크 배분
 */

import type { PageNode, InternalLink, LinkBudget, LinkGraphConfig } from './types';

/**
 * TF-IDF 코사인 유사도 계산
 */
export function tfidfCosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) return 0;
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  
  if (normA === 0 || normB === 0) return 0;
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * PageRank 계산 (Power Iteration)
 */
export function calculatePageRank(
  nodes: PageNode[],
  edges: { from: string; to: string }[],
  damping: number = 0.85,
  maxIterations: number = 100,
  tolerance: number = 1e-6
): Map<string, number> {
  const n = nodes.length;
  const urlToIndex = new Map(nodes.map((node, i) => [node.url, i]));
  
  // 초기 PageRank (균등 분배)
  let pr = new Array(n).fill(1 / n);
  let newPr = new Array(n).fill(0);
  
  // 인접 리스트 구축
  const outLinks = new Map<number, number[]>();
  for (const edge of edges) {
    const fromIdx = urlToIndex.get(edge.from);
    const toIdx = urlToIndex.get(edge.to);
    
    if (fromIdx !== undefined && toIdx !== undefined) {
      if (!outLinks.has(fromIdx)) {
        outLinks.set(fromIdx, []);
      }
      outLinks.get(fromIdx)!.push(toIdx);
    }
  }
  
  // Power Iteration (O(n) 최적화)
  for (let iter = 0; iter < maxIterations; iter++) {
    newPr.fill((1 - damping) / n);
    
    // Dangling node 기여도 사전 계산 (O(n) → O(1))
    let danglingSum = 0;
    for (let i = 0; i < n; i++) {
      const links = outLinks.get(i);
      if (!links || links.length === 0) {
        danglingSum += pr[i];
      }
    }
    const danglingContribution = (damping * danglingSum) / n;
    
    // 모든 노드에 dangling 기여도 일괄 적용
    for (let j = 0; j < n; j++) {
      newPr[j] += danglingContribution;
    }
    
    // 정상 링크 처리
    for (let i = 0; i < n; i++) {
      const links = outLinks.get(i);
      if (links && links.length > 0) {
        const contribution = (damping * pr[i]) / links.length;
        for (const j of links) {
          newPr[j] += contribution;
        }
      }
    }
    
    // 수렴 체크
    let diff = 0;
    for (let i = 0; i < n; i++) {
      diff += Math.abs(newPr[i] - pr[i]);
    }
    
    if (diff < tolerance) break;
    
    // 스왑 (깊은 복사 불필요 - 매 반복마다 fill로 초기화)
    [pr, newPr] = [newPr, pr];
  }
  
  // 결과 맵 생성
  const result = new Map<string, number>();
  nodes.forEach((node, i) => {
    result.set(node.url, pr[i]);
  });
  
  return result;
}

/**
 * 링크 점수 계산
 * LinkScore(u→v) = λ*sim(u,v) + (1−λ)*PR_normalized(v)
 * PageRank 정규화로 TF-IDF와 동등 스케일 확보
 */
export function calculateLinkScore(
  fromNode: PageNode,
  toNode: PageNode,
  lambda: number,
  averagePageRank: number = 1.0
): number {
  const similarity = tfidfCosineSimilarity(fromNode.content_vector, toNode.content_vector);
  
  // PageRank 정규화: 평균 대비 상대적 중요도
  const normalizedPR = toNode.pagerank / averagePageRank;
  
  const score = lambda * similarity + (1 - lambda) * normalizedPR;
  return score;
}

/**
 * 페이지별 링크 예산 계산
 * B(u) = clip( round( 6 + 4 * rank_norm(u) ), 6, 14 )
 */
export function calculateLinkBudget(
  node: PageNode,
  config: LinkGraphConfig
): number {
  // rank_norm: 트래픽/인덱스/최근성 조합 0~1
  const rankNorm = (
    node.traffic_score * 0.5 +
    node.pagerank * 0.3 +
    node.recency_score * 0.2
  );
  
  const budget = Math.round(config.budget_base + config.budget_scale * rankNorm);
  return Math.max(config.budget_min, Math.min(config.budget_max, budget));
}

/**
 * 앵커 텍스트 추출 (TF-IDF top-n 키프레이즈)
 */
export function extractAnchorText(
  fromContent: string,
  toContent: string,
  toUrl: string
): string {
  // TODO: 실제 구현에서는 TF-IDF 기반 키프레이즈 추출
  // 여기서는 간단히 타겟 페이지의 주요 키워드 사용
  
  const words = toContent.toLowerCase().split(/\s+/);
  const wordFreq = new Map<string, number>();
  
  for (const word of words) {
    if (word.length > 3) {
      wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
    }
  }
  
  const sortedWords = Array.from(wordFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([word]) => word);
  
  return sortedWords.join(' ') || toUrl;
}

/**
 * 내부 링크 그래프 생성
 */
export function buildLinkGraph(
  nodes: PageNode[],
  existingEdges: { from: string; to: string }[],
  config: LinkGraphConfig
): LinkBudget[] {
  // 1. PageRank 계산
  const pageRanks = calculatePageRank(nodes, existingEdges, config.damping);
  
  // PageRank를 노드에 반영
  const enrichedNodes = nodes.map(node => ({
    ...node,
    pagerank: pageRanks.get(node.url) || 0
  }));
  
  // 2. 각 페이지별 링크 배분
  const linkBudgets: LinkBudget[] = [];
  
  // 평균 PageRank 계산 (정규화용)
  const averagePageRank = enrichedNodes.length > 0 
    ? 1 / enrichedNodes.length 
    : 1.0;
  
  for (const fromNode of enrichedNodes) {
    const budget = calculateLinkBudget(fromNode, config);
    
    // 최적화: budget만큼만 계산 (Top-K 선택)
    // 전체 계산 후 정렬 대신, 부분 정렬 사용
    const linkScores: Array<{ toNode: PageNode; score: number }> = [];
    
    for (const toNode of enrichedNodes) {
      if (fromNode.url === toNode.url) continue;
      
      const score = calculateLinkScore(fromNode, toNode, config.lambda, averagePageRank);
      
      // Min-heap 방식: budget개만 유지 (메모리 최적화)
      if (linkScores.length < budget) {
        linkScores.push({ toNode, score });
        if (linkScores.length === budget) {
          linkScores.sort((a, b) => a.score - b.score); // 오름차순
        }
      } else if (score > linkScores[0].score) {
        // 최소값 교체
        linkScores[0] = { toNode, score };
        // 재정렬 (작은 배열이므로 O(k log k))
        linkScores.sort((a, b) => a.score - b.score);
      }
    }
    
    // 내림차순 정렬
    const topLinks = linkScores.sort((a, b) => b.score - a.score);
    
    // 앵커 텍스트 생성 및 중복 체크
    const anchorCounts = new Map<string, number>();
    const targetCounts = new Map<string, number>();
    const allocatedLinks: InternalLink[] = [];
    
    for (const { toNode, score } of topLinks) {
      // 동일 대상 페이지 링크 제한
      const targetCount = targetCounts.get(toNode.url) || 0;
      if (targetCount >= config.max_same_target) continue;
      
      const anchorText = extractAnchorText('', '', toNode.url);
      
      // 동일 앵커 제한
      const anchorCount = anchorCounts.get(anchorText) || 0;
      if (anchorCount >= config.max_same_anchor) continue;
      
      allocatedLinks.push({
        from_url: fromNode.url,
        to_url: toNode.url,
        anchor_text: anchorText,
        link_score: score
      });
      
      anchorCounts.set(anchorText, anchorCount + 1);
      targetCounts.set(toNode.url, targetCount + 1);
    }
    
    linkBudgets.push({
      url: fromNode.url,
      budget,
      allocated_links: allocatedLinks
    });
  }
  
  return linkBudgets;
}

/**
 * 링크 그래프 검증
 */
export function validateLinkGraph(
  linkBudgets: LinkBudget[],
  config: LinkGraphConfig
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  for (const budget of linkBudgets) {
    // 예산 범위 체크
    if (budget.budget < config.budget_min || budget.budget > config.budget_max) {
      errors.push(`${budget.url}: 링크 예산 범위 초과 (${budget.budget})`);
    }
    
    // 앵커 중복 체크
    const anchorCounts = new Map<string, number>();
    for (const link of budget.allocated_links) {
      const count = anchorCounts.get(link.anchor_text) || 0;
      anchorCounts.set(link.anchor_text, count + 1);
      
      if (count + 1 > config.max_same_anchor) {
        errors.push(`${budget.url}: 동일 앵커 "${link.anchor_text}" 초과 (${count + 1})`);
      }
    }
    
    // 대상 페이지 중복 체크
    const targetCounts = new Map<string, number>();
    for (const link of budget.allocated_links) {
      const count = targetCounts.get(link.to_url) || 0;
      targetCounts.set(link.to_url, count + 1);
      
      if (count + 1 > config.max_same_target) {
        errors.push(`${budget.url}: 동일 대상 "${link.to_url}" 초과 (${count + 1})`);
      }
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}
