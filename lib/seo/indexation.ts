/**
 * Indexation Orchestrator
 * Sitemap 분할/우선순위 큐/캐노니컬 클러스터링
 */

import type { IndexationConfig } from "./types";

export interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
}

export interface CanonicalCluster {
  canonical_url: string;
  duplicate_urls: string[];
  similarity: number;
}

/**
 * SimHash 계산 (TF-IDF 가중치 반영)
 * 단어 빈도를 로그 스케일로 가중하여 stopword 영향 최소화
 */
function simhash(text: string): bigint {
  const tokens = text.toLowerCase().split(/\s+/);
  const hashSize = 64;
  const v = new Array(hashSize).fill(0);

  // 단어 빈도 계산
  const freq = new Map<string, number>();
  for (const token of tokens) {
    if (token.length > 0) {
      freq.set(token, (freq.get(token) || 0) + 1);
    }
  }

  // TF-IDF 가중치 반영
  for (const [token, count] of freq) {
    // 해시 함수
    let hash = BigInt(0);
    for (let i = 0; i < token.length; i++) {
      hash =
        (hash * BigInt(31) + BigInt(token.charCodeAt(i))) &
        BigInt("0xFFFFFFFFFFFFFFFF");
    }

    // 로그 가중치로 빈도 반영 (stopword 영향 감소)
    const weight = Math.log(count + 1);

    // 각 비트에 가중치 적용
    for (let i = 0; i < hashSize; i++) {
      const bit = (hash >> BigInt(i)) & BigInt(1);
      v[i] += bit === BigInt(1) ? weight : -weight;
    }
  }

  // 최종 해시 생성
  let fingerprint = BigInt(0);
  for (let i = 0; i < hashSize; i++) {
    if (v[i] > 0) {
      fingerprint |= BigInt(1) << BigInt(i);
    }
  }

  return fingerprint;
}

/**
 * Hamming Distance 계산
 */
function hammingDistance(hash1: bigint, hash2: bigint): number {
  let xor = hash1 ^ hash2;
  let distance = 0;

  while (xor !== BigInt(0)) {
    distance += Number(xor & BigInt(1));
    xor >>= BigInt(1);
  }

  return distance;
}

/**
 * Jaccard 유사도 계산
 */
function jaccardSimilarity(text1: string, text2: string): number {
  const words1 = new Set(text1.toLowerCase().split(/\s+/));
  const words2 = new Set(text2.toLowerCase().split(/\s+/));

  const intersection = new Set([...words1].filter((x) => words2.has(x)));
  const union = new Set([...words1, ...words2]);

  return intersection.size / union.size;
}

/**
 * 캐노니컬 클러스터링
 * SimHash + Jaccard 조합으로 중복 콘텐츠 감지
 */
export function clusterCanonicals(
  pages: Array<{ url: string; content: string }>,
  tauCanonical: number
): CanonicalCluster[] {
  const clusters: CanonicalCluster[] = [];
  const processed = new Set<string>();

  // SimHash 계산
  const hashes = pages.map((page) => ({
    url: page.url,
    content: page.content,
    hash: simhash(page.content),
  }));

  for (let i = 0; i < hashes.length; i++) {
    if (processed.has(hashes[i].url)) continue;

    const cluster: CanonicalCluster = {
      canonical_url: hashes[i].url,
      duplicate_urls: [],
      similarity: 1.0,
    };

    for (let j = i + 1; j < hashes.length; j++) {
      if (processed.has(hashes[j].url)) continue;

      // SimHash 거리 체크 (64비트 기준 18% 이하 차이)
      const hammingDist = hammingDistance(hashes[i].hash, hashes[j].hash);
      const simhashSimilarity = 1 - hammingDist / 64;

      if (simhashSimilarity >= tauCanonical) {
        // Jaccard로 재확인
        const jaccardSim = jaccardSimilarity(
          hashes[i].content,
          hashes[j].content
        );

        if (jaccardSim >= tauCanonical) {
          cluster.duplicate_urls.push(hashes[j].url);
          processed.add(hashes[j].url);
        }
      }
    }

    if (cluster.duplicate_urls.length > 0) {
      clusters.push(cluster);
    }

    processed.add(hashes[i].url);
  }

  return clusters;
}

/**
 * 우선순위 계산 (EMA 기반)
 * priority(u) = EMA(fetch_freq(u), α) + bonus
 */
export function calculatePriority(
  url: string,
  fetchHistory: Array<{ url: string; timestamp: string }>,
  config: IndexationConfig,
  metadata?: {
    is_new?: boolean;
    is_updated?: boolean;
    is_hub?: boolean;
  }
): number {
  // Fetch 빈도 계산
  const urlFetches = fetchHistory
    .filter((f) => f.url === url)
    .map((f) => new Date(f.timestamp).getTime())
    .sort((a, b) => b - a);

  if (urlFetches.length === 0) {
    return metadata?.is_new ? 0.8 : 0.5;
  }

  // EMA 계산 (최신 fetch가 더 높은 가중치)
  const now = Date.now();
  const windowMs = config.fetch_freq_window_days * 24 * 60 * 60 * 1000;

  let ema = 0;

  for (const fetchTime of urlFetches) {
    const age = now - fetchTime;
    if (age > windowMs) break;

    const recency = 1 - age / windowMs;
    // 지수이동평균: 최신 값이 더 큰 영향력
    ema =
      config.priority_ema_alpha * recency +
      (1 - config.priority_ema_alpha) * ema;
  }

  // 보너스 적용
  let bonus = 0;
  if (metadata?.is_new) bonus += 0.2;
  if (metadata?.is_updated) bonus += 0.15;
  if (metadata?.is_hub) bonus += 0.1;

  // 클램프: 최소 0.1, 최대 1.0
  const priority = Math.min(1.0, Math.max(0.1, ema + bonus));
  return Math.round(priority * 10) / 10;
}

/**
 * Sitemap 분할 (50,000 URL/파일)
 */
export function shardSitemap(
  entries: SitemapEntry[],
  maxUrlsPerFile: number
): Array<{ index: number; entries: SitemapEntry[] }> {
  const shards: Array<{ index: number; entries: SitemapEntry[] }> = [];

  for (let i = 0; i < entries.length; i += maxUrlsPerFile) {
    shards.push({
      index: Math.floor(i / maxUrlsPerFile),
      entries: entries.slice(i, i + maxUrlsPerFile),
    });
  }

  return shards;
}

/**
 * Sitemap XML 생성
 */
export function generateSitemapXML(entries: SitemapEntry[]): string {
  const urlEntries = entries
    .map(
      (entry) => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

/**
 * Sitemap Index XML 생성
 */
export function generateSitemapIndexXML(
  sitemapUrls: string[],
  baseUrl: string
): string {
  const sitemapEntries = sitemapUrls
    .map(
      (url) => `
  <sitemap>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>`;
}

/**
 * URL 정규화 (파라미터 변형 처리)
 */
export function normalizeURL(url: string, keepTrailingSlash: boolean = false): string {
  try {
    const urlObj = new URL(url);

    // 불필요한 파라미터 제거
    const paramsToRemove = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "fbclid",
      "gclid",
    ];
    paramsToRemove.forEach((param) => urlObj.searchParams.delete(param));

    // 파라미터 정렬 (대소문자 구분)
    const sortedParams = Array.from(urlObj.searchParams.entries()).sort((a, b) =>
      a[0].localeCompare(b[0])
    );
    urlObj.search = "";
    sortedParams.forEach(([key, value]) => urlObj.searchParams.append(key, value));

    // 트레일링 슬래시 처리 (루트 제외, canonical 구조 보존)
    if (!keepTrailingSlash && urlObj.pathname.endsWith("/") && urlObj.pathname !== "/") {
      urlObj.pathname = urlObj.pathname.slice(0, -1);
    }

    return urlObj.toString();
  } catch {
    return url;
  }
}
