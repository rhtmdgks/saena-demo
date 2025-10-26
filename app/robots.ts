/**
 * Robots.txt Generation
 * R1-OS 크롤 정책
 */

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://the-saena.ai';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
          '/*.json$',
          '/*?*utm_*', // UTM 파라미터 크롤 방지
        ],
      },
      {
        userAgent: 'GPTBot', // OpenAI 크롤러
        disallow: ['/'], // AI 학습 데이터 수집 차단 (선택사항)
      },
      {
        userAgent: 'CCBot', // Common Crawl
        disallow: ['/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
