/**
 * Intent Router
 * SERP 레이아웃 분석 → 템플릿 자동 분기
 */

import type { SERPLayout, IntentRouterResult, TemplateType } from "./types";

type Locale = "en" | "ko";

/**
 * 로캘별 SERP 패턴 사전
 */
const PATTERN = {
  en: {
    faq: [/people also ask/i, /faq/i, /questions/i],
    video: [/youtube/i, /video/i, /watch/i],
    news: [/top stories/i, /news/i, /breaking/i, /latest/i],
    product: [/shopping/i, /price/i, /product/i, /buy/i],
    discussion: [/reddit/i, /forum/i, /discussion/i],
  },
  ko: {
    faq: [/사람들이 함께 묻는 질문/, /질문/, /faq/i],
    video: [/동영상/, /youtube/i, /watch/i],
    news: [/뉴스/, /속보/, /최신/, /top stories/i],
    product: [/쇼핑/, /가격/, /구매/, /shopping/i, /price/i],
    discussion: [/카페/, /지식인/, /커뮤니티/, /reddit/i, /forum/i],
  },
} as const;

/**
 * SERP HTML 스냅샷에서 레이아웃 추출 (다국어 지원)
 */
export function extractSERPLayout(
  html: string,
  locale: Locale = "ko"
): SERPLayout {
  const text = html.toLowerCase();
  const P = PATTERN[locale];

  // FAQ 블록 탐지
  const hasFAQ = P.faq.some((r) => r.test(text));
  const faqMatches =
    html.match(/(people also ask|faq|질문|사람들이 함께 묻는)/gi) || [];
  const faqDensity = faqMatches.length / Math.max((html.length / 2000) | 0, 1);

  // 비디오 블록 탐지
  const hasVideo = P.video.some((r) => r.test(text));
  const videoMatches = html.match(/(youtube|동영상|video)/gi) || [];
  const videoDensity =
    videoMatches.length / Math.max((html.length / 2000) | 0, 1);

  // 토론 블록 탐지
  const hasDiscussion = P.discussion.some((r) => r.test(text));

  // 뉴스 블록 탐지 (토큰 기반)
  const hasNews = P.news.some((r) => r.test(text));

  // 제품 블록 탐지
  const hasProduct = P.product.some((r) => r.test(text));

  return {
    has_faq: hasFAQ,
    has_video: hasVideo,
    has_discussion: hasDiscussion,
    has_news: hasNews,
    has_product: hasProduct,
    faq_density: faqDensity,
    video_density: videoDensity,
  };
}

/**
 * 레이아웃을 벡터로 변환
 */
export function layoutToVector(layout: SERPLayout): number[] {
  return [
    layout.has_faq ? 1 : 0,
    layout.has_video ? 1 : 0,
    layout.has_discussion ? 1 : 0,
    layout.has_news ? 1 : 0,
    layout.has_product ? 1 : 0,
    layout.faq_density,
    layout.video_density,
  ];
}

/**
 * 템플릿 사전 확률 (Prior)
 */
const TEMPLATE_PRIORS: Record<TemplateType, number> = {
  FAQ: 0.05,
  Guide: 0.2,
  Comparison: 0.05,
  HowTo: 0.1,
  NewsAware: 0.05,
  Review: 0.05,
  Docs: 0.1,
};

/**
 * 템플릿 확률 계산 (규칙 기반 + 가중치 + Prior)
 */
export function calculateTemplateProbabilities(
  layout: SERPLayout
): Record<TemplateType, number> {
  const probs: Record<TemplateType, number> = { ...TEMPLATE_PRIORS };

  // FAQ 템플릿
  if (layout.has_faq) {
    probs.FAQ += 0.6 + layout.faq_density * 0.4;
  }

  // Guide 템플릿 (일반적인 정보성 쿼리)
  if (!layout.has_product && !layout.has_news) {
    probs.Guide += 0.5;
  }

  // Comparison 템플릿 (제품 비교)
  if (layout.has_product) {
    probs.Comparison += 0.4;
  }

  // HowTo 템플릿
  if (layout.has_video) {
    probs.HowTo += 0.5 + layout.video_density * 0.3;
  }

  // NewsAware 템플릿 (토큰 신호는 낮게, 구조적 신호는 높게)
  if (layout.has_news) {
    // TODO: 실제 SERP DOM에서 뉴스 카드 검출 시 +0.5 추가
    probs.NewsAware += 0.3; // 토큰 신호만으로는 낮게
  }

  // Review 템플릿
  if (layout.has_product && layout.has_discussion) {
    probs.Review += 0.7;
  }

  // Docs 템플릿 (기술 문서)
  if (!layout.has_video && !layout.has_news && !layout.has_product) {
    probs.Docs += 0.3;
  }

  return probs;
}

/**
 * 최적 템플릿 선택 (신뢰도 바닥값 보장)
 */
export function selectTemplate(layout: SERPLayout): IntentRouterResult {
  const probs = calculateTemplateProbabilities(layout);

  // argmax
  let maxProb = 0;
  let selectedTemplate: TemplateType = "Guide";

  for (const [template, prob] of Object.entries(probs)) {
    if (prob > maxProb) {
      maxProb = prob;
      selectedTemplate = template as TemplateType;
    }
  }

  // 신뢰도 바닥값 보장 (최소 0.3)
  const confidence = Math.max(maxProb, 0.3);

  return {
    template: selectedTemplate,
    confidence,
    layout_vector: layoutToVector(layout),
  };
}

/**
 * 키워드에 대한 SERP 분석 및 템플릿 라우팅
 */
export async function routeIntent(
  keyword: string,
  locale: Locale = "ko"
): Promise<IntentRouterResult> {
  // TODO: 실제 구현
  // 1. Google Search API로 상위 10개 결과 HTML 가져오기
  // 2. 각 HTML에서 레이아웃 추출
  // 3. 레이아웃 집계 (평균/최빈) 및 템플릿 선택

  console.warn("routeIntent: Mock implementation");

  // Mock: 키워드 기반 간단한 라우팅 (다국어 지원)
  const keywordLower = keyword.toLowerCase();

  // 한국어 패턴
  if (locale === "ko") {
    if (keywordLower.includes("방법") || keywordLower.includes("어떻게")) {
      return {
        template: "HowTo",
        confidence: 0.8,
        layout_vector: [0, 1, 0, 0, 0, 0.2, 0.6],
      };
    }

    if (
      keywordLower.includes("비교") ||
      keywordLower.includes("차이") ||
      keywordLower.includes("vs")
    ) {
      return {
        template: "Comparison",
        confidence: 0.75,
        layout_vector: [0, 0, 0, 0, 1, 0.1, 0.2],
      };
    }

    if (
      keywordLower.includes("무엇") ||
      keywordLower.includes("뭐") ||
      keywordLower.includes("질문")
    ) {
      return {
        template: "FAQ",
        confidence: 0.7,
        layout_vector: [1, 0, 0, 0, 0, 0.8, 0.1],
      };
    }
  }

  // 영어 패턴
  if (locale === "en") {
    if (keywordLower.includes("how to") || keywordLower.includes("how do")) {
      return {
        template: "HowTo",
        confidence: 0.8,
        layout_vector: [0, 1, 0, 0, 0, 0.2, 0.6],
      };
    }

    if (
      keywordLower.includes("vs") ||
      keywordLower.includes("versus") ||
      keywordLower.includes("compare")
    ) {
      return {
        template: "Comparison",
        confidence: 0.75,
        layout_vector: [0, 0, 0, 0, 1, 0.1, 0.2],
      };
    }

    if (keywordLower.includes("what is") || keywordLower.includes("what are")) {
      return {
        template: "FAQ",
        confidence: 0.7,
        layout_vector: [1, 0, 0, 0, 0, 0.8, 0.1],
      };
    }
  }

  // 기본값: Guide (신뢰도 바닥값 적용)
  return {
    template: "Guide",
    confidence: 0.5,
    layout_vector: [0, 0, 0, 0, 0, 0.3, 0.3],
  };
}
