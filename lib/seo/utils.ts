/**
 * SEO Utility Functions
 * 공통 수치/텍스트 처리 유틸리티
 */

import type { SEOPolicy } from './types';

/**
 * 안전한 코사인 유사도 (0-division 방어)
 */
export function safeCosine(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0;
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom > 0 ? dotProduct / denom : 0;
}

/**
 * 값 클램핑 (범위 제한)
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * 백분위수 계산 (선형 보간)
 */
export function percentile(
  values: number[],
  p: number,
  interpolate: boolean = true
): number {
  if (values.length === 0) return 0;
  if (values.length === 1) return values[0];
  if (p < 0 || p > 1) throw new Error('Percentile must be between 0 and 1');
  
  const sorted = [...values].sort((a, b) => a - b);
  
  if (!interpolate) {
    const index = Math.ceil(sorted.length * p) - 1;
    return sorted[Math.max(0, index)];
  }
  
  // 선형 보간
  const pos = (sorted.length - 1) * p;
  const base = Math.floor(pos);
  const rest = pos - base;
  
  if (base + 1 < sorted.length) {
    return sorted[base] + (sorted[base + 1] - sorted[base]) * rest;
  }
  
  return sorted[base];
}

/**
 * 로캘 감지 (HTML 기반)
 */
export function detectLocale(html: string): 'ko' | 'en' | 'unknown' {
  const langMatch = html.match(/<html[^>]*lang=["']?([^"'\s>]+)/i);
  if (langMatch) {
    const lang = langMatch[1].toLowerCase();
    if (lang.startsWith('ko')) return 'ko';
    if (lang.startsWith('en')) return 'en';
  }
  
  // 한글 문자 비율로 추정
  const koreanChars = (html.match(/[가-힣]/g) || []).length;
  const totalChars = html.replace(/\s/g, '').length;
  
  if (totalChars > 0 && koreanChars / totalChars > 0.1) {
    return 'ko';
  }
  
  return 'en'; // 기본값
}

/**
 * 텍스트 토큰화 (로캘별)
 */
export function tokenize(text: string, locale: 'ko' | 'en' = 'ko'): string[] {
  const normalized = text.toLowerCase().trim();
  
  if (locale === 'ko') {
    // 한글: 공백 + 특수문자 기준 분리
    return normalized
      .split(/[\s\p{P}]+/u)
      .filter(token => token.length > 0);
  }
  
  // 영어: 공백 기준 분리
  return normalized
    .split(/\s+/)
    .filter(token => token.length > 0);
}

/**
 * SEO 정책 로드 (환경별)
 */
export function loadSEOPolicy(environment?: string): SEOPolicy {
  const env = environment || process.env.NODE_ENV || 'production';
  
  try {
    // 환경별 정책 파일 시도
    const envPolicy = require(`@/configs/seo.policy.${env}.json`);
    return envPolicy;
  } catch {
    // 기본 정책 사용
    const defaultPolicy = require('@/configs/seo.policy.json');
    return defaultPolicy;
  }
}

/**
 * 메타 태그 생성
 */
export function generateMetaTags(options: {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: string;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}) {
  const {
    title,
    description,
    url,
    image,
    type = 'website',
    keywords,
    author,
    publishedTime,
    modifiedTime,
    noindex = false
  } = options;
  
  return {
    title,
    description,
    keywords: keywords?.join(', '),
    authors: author ? [{ name: author }] : undefined,
    openGraph: {
      title,
      description,
      url,
      type,
      images: image ? [{ url: image }] : undefined,
      publishedTime,
      modifiedTime
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined
    },
    robots: noindex ? 'noindex,nofollow' : 'index,follow',
    alternates: {
      canonical: url
    }
  };
}

/**
 * URL 슬러그 생성
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // 특수문자 제거
    .replace(/[\s_-]+/g, '-') // 공백을 하이픈으로
    .replace(/^-+|-+$/g, ''); // 앞뒤 하이픈 제거
}

/**
 * 읽기 시간 계산
 */
export function calculateReadingTime(content: string, wordsPerMinute: number = 200): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * 키워드 밀도 계산
 */
export function calculateKeywordDensity(content: string, keyword: string): number {
  const contentLower = content.toLowerCase();
  const keywordLower = keyword.toLowerCase();
  
  const totalWords = contentLower.split(/\s+/).length;
  const keywordMatches = (contentLower.match(new RegExp(keywordLower, 'g')) || []).length;
  
  return (keywordMatches / totalWords) * 100;
}

/**
 * 메타 디스크립션 최적화
 */
export function optimizeMetaDescription(text: string, maxLength: number = 160): string {
  if (text.length <= maxLength) return text;
  
  // 문장 단위로 자르기
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  let result = '';
  
  for (const sentence of sentences) {
    if ((result + sentence).length > maxLength - 3) break;
    result += sentence;
  }
  
  return result.trim() + '...';
}

/**
 * 타이틀 최적화
 */
export function optimizeTitle(title: string, maxLength: number = 60): string {
  if (title.length <= maxLength) return title;
  
  // 단어 단위로 자르기
  const words = title.split(' ');
  let result = '';
  
  for (const word of words) {
    if ((result + ' ' + word).length > maxLength - 3) break;
    result += (result ? ' ' : '') + word;
  }
  
  return result.trim() + '...';
}

/**
 * 구조화된 데이터 검증
 */
export function validateStructuredData(data: any): boolean {
  try {
    // 기본 필수 필드 체크
    if (!data['@context'] || !data['@type']) {
      return false;
    }
    
    // JSON 직렬화 가능 여부 체크
    JSON.stringify(data);
    
    return true;
  } catch {
    return false;
  }
}

/**
 * 캐노니컬 URL 생성
 */
export function generateCanonicalURL(path: string, baseUrl?: string): string {
  const base = baseUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://the-saena.ai';
  const cleanPath = path.replace(/\/$/, ''); // 트레일링 슬래시 제거
  return `${base}${cleanPath}`;
}

/**
 * 헤딩 구조 추출
 */
export function extractHeadings(content: string): Array<{ level: number; text: string }> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Array<{ level: number; text: string }> = [];
  
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      level: match[1].length,
      text: match[2].trim()
    });
  }
  
  return headings;
}

/**
 * 목차 생성
 */
export function generateTableOfContents(content: string): string {
  const headings = extractHeadings(content);
  
  let toc = '';
  for (const heading of headings) {
    const indent = '  '.repeat(heading.level - 1);
    const slug = generateSlug(heading.text);
    toc += `${indent}- [${heading.text}](#${slug})\n`;
  }
  
  return toc;
}

/**
 * 이미지 alt 텍스트 생성
 */
export function generateAltText(filename: string, context?: string): string {
  // 파일명에서 확장자 제거 및 정리
  const name = filename
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\d+/g, '')
    .trim();
  
  if (context) {
    return `${context} - ${name}`;
  }
  
  return name;
}

/**
 * 소셜 미디어 공유 URL 생성
 */
export function generateShareURLs(url: string, title: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  
  return {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`
  };
}

/**
 * 페이지 성능 점수 계산
 */
export function calculatePageScore(metrics: {
  igScore: number;
  lcpMs: number;
  cls: number;
  inpMs: number;
  internalLinks: number;
  externalLinks: number;
  wordCount: number;
}): number {
  const {
    igScore,
    lcpMs,
    cls,
    inpMs,
    internalLinks,
    externalLinks,
    wordCount
  } = metrics;
  
  // IG 점수 (40%)
  const igWeight = igScore * 0.4;
  
  // CWV 점수 (30%)
  const lcpScore = Math.max(0, 1 - (lcpMs - 1000) / 3000);
  const clsScore = Math.max(0, 1 - cls / 0.25);
  const inpScore = Math.max(0, 1 - (inpMs - 100) / 300);
  const cwvWeight = ((lcpScore + clsScore + inpScore) / 3) * 0.3;
  
  // 콘텐츠 점수 (20%)
  const linkScore = Math.min(1, (internalLinks + externalLinks) / 20);
  const wordScore = Math.min(1, wordCount / 1500);
  const contentWeight = ((linkScore + wordScore) / 2) * 0.2;
  
  // 기술 점수 (10%)
  const techScore = 1.0; // JSON-LD, 메타태그 등
  const techWeight = techScore * 0.1;
  
  return Math.round((igWeight + cwvWeight + contentWeight + techWeight) * 100);
}
