/**
 * Dynamic Sitemap Generation
 * R1-OS Indexation Orchestrator 통합
 */

import { MetadataRoute } from 'next';
import { 
  calculatePriority, 
  shardSitemap, 
  normalizeURL,
  type SitemapEntry 
} from '@/lib/seo/indexation';
import seoPolicy from '@/configs/seo.policy.json';

/**
 * 모든 페이지 URL 수집
 */
async function getAllPages(): Promise<Array<{ url: string; lastModified: Date; metadata?: any }>> {
  // TODO: 실제 구현
  // 1. 데이터베이스/CMS에서 동적 페이지 가져오기
  // 2. 파일 시스템에서 정적 페이지 스캔
  // 3. API 라우트 제외
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://the-saena.ai';
  
  // 정적 페이지 (예시)
  const staticPages = [
    { path: '/', priority: 1.0, changefreq: 'daily' as const },
    { path: '/about', priority: 0.8, changefreq: 'weekly' as const },
    { path: '/manifesto', priority: 0.8, changefreq: 'monthly' as const },
    { path: '/faq', priority: 0.7, changefreq: 'weekly' as const },
    { path: '/waitlist', priority: 0.9, changefreq: 'daily' as const },
    { path: '/prototype', priority: 0.6, changefreq: 'weekly' as const },
  ];
  
  return staticPages.map(page => ({
    url: normalizeURL(`${baseUrl}${page.path}`),
    lastModified: new Date(),
    metadata: {
      priority: page.priority,
      changefreq: page.changefreq
    }
  }));
}

/**
 * Fetch 히스토리 가져오기 (GSC API 또는 로그)
 */
async function getFetchHistory(): Promise<Array<{ url: string; timestamp: string }>> {
  // TODO: Google Search Console API 또는 서버 로그에서 가져오기
  return [];
}

/**
 * 메인 sitemap 생성
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getAllPages();
  const fetchHistory = await getFetchHistory();
  
  const entries: MetadataRoute.Sitemap = pages.map(page => {
    const priority = calculatePriority(
      page.url,
      fetchHistory,
      seoPolicy.indexation,
      {
        is_new: false,
        is_updated: false,
        is_hub: page.url.endsWith('/') // 홈페이지를 허브로 간주
      }
    );
    
    return {
      url: page.url,
      lastModified: page.lastModified,
      changeFrequency: page.metadata?.changefreq || 'weekly',
      priority: page.metadata?.priority || priority
    };
  });
  
  return entries;
}

/**
 * Sitemap Index 생성 (대규모 사이트용)
 */
export async function generateSitemapIndex(): Promise<string[]> {
  const pages = await getAllPages();
  const fetchHistory = await getFetchHistory();
  
  const sitemapEntries: SitemapEntry[] = pages.map(page => {
    const priority = calculatePriority(
      page.url,
      fetchHistory,
      seoPolicy.indexation
    );
    
    return {
      url: page.url,
      lastmod: page.lastModified.toISOString(),
      changefreq: page.metadata?.changefreq || 'weekly',
      priority
    };
  });
  
  // 50,000 URL씩 분할
  const shards = shardSitemap(sitemapEntries, seoPolicy.indexation.sitemap_max_urls);
  
  return shards.map(shard => `/sitemap-${shard.index}.xml`);
}
