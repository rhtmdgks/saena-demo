import type { 
  BrandVisibilityData, 
  CitationAnalysisData,
  TopicVisibilityData,
  HomeContentData,
  MarketingStrategyData,
  STPData,
  ShoppingContentData,
  ModelContentData,
  IndustryContentData
} from "@/types/dashboard";

// 실제 환경에서는 API 엔드포인트에서 데이터를 가져옵니다
// 지금은 제공받은 실제 데이터를 사용합니다

export async function getBrandVisibilityData(): Promise<BrandVisibilityData> {
  // TODO: 실제 API 호출로 교체
  // const response = await fetch('/api/brand-visibility');
  // return response.json();
  
  return {
    currentScore: 89.8,
    changePercent: 1.0,
    changeTrend: "up",
    timeSeriesData: [
      { date: "2025-09-28", score: 79.2 },
      { date: "2025-09-29", score: 79.8 },
      { date: "2025-09-30", score: 80.5 },
      { date: "2025-10-01", score: 81.0 },
      { date: "2025-10-02", score: 82.1 },
      { date: "2025-10-03", score: 82.6 },
      { date: "2025-10-04", score: 83.0 },
      { date: "2025-10-05", score: 83.7 },
      { date: "2025-10-06", score: 84.2 },
      { date: "2025-10-07", score: 84.9 },
      { date: "2025-10-08", score: 85.4 },
      { date: "2025-10-09", score: 85.8 },
      { date: "2025-10-10", score: 86.2 },
      { date: "2025-10-11", score: 86.8 },
      { date: "2025-10-12", score: 87.3 },
      { date: "2025-10-13", score: 87.9 },
      { date: "2025-10-14", score: 88.2 },
      { date: "2025-10-15", score: 88.7 },
      { date: "2025-10-16", score: 89.1 },
      { date: "2025-10-17", score: 89.4 },
      { date: "2025-10-18", score: 89.8 }
    ],
    brandRankings: [
      { rank: 1, brandName: "Beauty of Joseon", visibilityScore: 93, changePercent: 3.4, trending: "up" },
      { rank: 2, brandName: "Round Lab", visibilityScore: 92, changePercent: 2.9, trending: "up" },
      { rank: 3, brandName: "Aestura", visibilityScore: 90, changePercent: 2.1, trending: "up" },
      { rank: 4, brandName: "La Roche-Posay", visibilityScore: 90, changePercent: -0.6, trending: "down" },
      { rank: 5, brandName: "Anessa", visibilityScore: 89, changePercent: 1.8, trending: "up" },
      { rank: 6, brandName: "suelo", visibilityScore: 89, changePercent: 1.0, trending: "up" },
      { rank: 7, brandName: "Neogen", visibilityScore: 88, changePercent: 0.9, trending: "up" },
      { rank: 8, brandName: "SKIN1004", visibilityScore: 87, changePercent: 1.2, trending: "up" },
      { rank: 9, brandName: "COSRX", visibilityScore: 86, changePercent: -0.8, trending: "down" },
      { rank: 10, brandName: "Innisfree", visibilityScore: 85, changePercent: 0.4, trending: "up" },
      { rank: 11, brandName: "Isntree", visibilityScore: 84, changePercent: 0.7, trending: "up" },
      { rank: 12, brandName: "Biore", visibilityScore: 83, changePercent: -1.1, trending: "down" },
      { rank: 13, brandName: "make p:rem", visibilityScore: 82, changePercent: 0.5, trending: "up" },
      { rank: 14, brandName: "Torriden", visibilityScore: 81, changePercent: 1.6, trending: "up" },
      { rank: 15, brandName: "Etude", visibilityScore: 80, changePercent: -0.4, trending: "down" }
    ]
  };
}

export async function getCitationAnalysisData(): Promise<CitationAnalysisData> {
  // TODO: 실제 API 호출로 교체
  // const response = await fetch('/api/citation-analysis');
  // return response.json();
  
  return {
    totalCitations: 26400,
    citationsByType: {
      earned: { count: 22440, percentage: 85.0 },
      operated: { count: 2640, percentage: 10.0 },
      owned: { count: 1320, percentage: 5.0 }
    },
    domains: [
      { rank: 1, domainName: "global.oliveyoung.com", mentionCount: 3100, type: "earned", percentage: 11.7, authorityScore: 88, url: "https://global.oliveyoung.com" },
      { rank: 2, domainName: "vogue.com", mentionCount: 1960, type: "earned", percentage: 7.4, authorityScore: 95, url: "https://www.vogue.com" },
      { rank: 3, domainName: "allure.com", mentionCount: 1740, type: "earned", percentage: 6.6, authorityScore: 94, url: "https://www.allure.com" },
      { rank: 4, domainName: "stylekorean.com", mentionCount: 1620, type: "earned", percentage: 6.1, authorityScore: 78 },
      { rank: 5, domainName: "yesstyle.com", mentionCount: 1510, type: "earned", percentage: 5.7, authorityScore: 84 },
      { rank: 6, domainName: "amazon.com", mentionCount: 1480, type: "earned", percentage: 5.6, authorityScore: 96 },
      { rank: 7, domainName: "sokoglam.com", mentionCount: 980, type: "earned", percentage: 3.7, authorityScore: 80 },
      { rank: 8, domainName: "gopicky.com", mentionCount: 930, type: "earned", percentage: 3.5, authorityScore: 72 },
      { rank: 9, domainName: "byrdie.com", mentionCount: 910, type: "earned", percentage: 3.4, authorityScore: 90 },
      { rank: 10, domainName: "sephora.com", mentionCount: 860, type: "earned", percentage: 3.3, authorityScore: 92 },
      { rank: 11, domainName: "naver.com", mentionCount: 840, type: "earned", percentage: 3.2, authorityScore: 92 },
      { rank: 12, domainName: "instagram.com", mentionCount: 800, type: "operated", percentage: 3.0, authorityScore: 94 },
      { rank: 13, domainName: "youtube.com", mentionCount: 780, type: "operated", percentage: 3.0, authorityScore: 95 },
      { rank: 14, domainName: "tiktok.com", mentionCount: 680, type: "operated", percentage: 2.6, authorityScore: 92 },
      { rank: 15, domainName: "suelo.kr", mentionCount: 520, type: "owned", percentage: 2.0, authorityScore: 48, url: "https://suelo.kr" },
      { rank: 16, domainName: "shop.suelo.kr", mentionCount: 430, type: "owned", percentage: 1.6, authorityScore: 42 },
      { rank: 17, domainName: "blog.suelo.kr", mentionCount: 370, type: "owned", percentage: 1.4, authorityScore: 38 },
      { rank: 18, domainName: "themonodist.com", mentionCount: 350, type: "earned", percentage: 1.3, authorityScore: 63 },
      { rank: 19, domainName: "vogue.co.uk", mentionCount: 320, type: "earned", percentage: 1.2, authorityScore: 93 },
      { rank: 20, domainName: "marieclaire.co.uk", mentionCount: 300, type: "earned", percentage: 1.1, authorityScore: 91 }
    ]
  };
}


export async function getTopicVisibilityData(): Promise<TopicVisibilityData> {
  // TODO: 실제 API 호출로 교체
  // const response = await fetch('/api/topic-visibility');
  // return response.json();
  
  return {
    topThemes: [
      { rank: 1, themeName: "No White Cast Sunscreens", frequency: 96 },
      { rank: 2, themeName: "PA++++ / UVA Protection", frequency: 91 },
      { rank: 3, themeName: "Sensitive & Acne-Prone Skin", frequency: 88 },
      { rank: 4, themeName: "Lightweight Water-Gel Textures", frequency: 83 },
      { rank: 5, themeName: "Makeup Compatibility", frequency: 79 },
      { rank: 6, themeName: "Water/ Sweat Resistance", frequency: 74 },
      { rank: 7, themeName: "Ingredient Focus (Niacinamide, Centella, Hyaluronics)", frequency: 72 },
      { rank: 8, themeName: "Mineral vs Chemical vs Hybrid", frequency: 69 },
      { rank: 9, themeName: "Retailer Awards & Editor Picks", frequency: 64 },
      { rank: 10, themeName: "Reef-Safe & Fragrance-Free Claims", frequency: 58 }
    ],
    keywords: [
      { text: "PA++++", frequency: 82, size: "large", color: "primary", category: "high" },
      { text: "No White Cast", frequency: 78, size: "large", color: "primary", category: "high" },
      { text: "UVA/UVB", frequency: 72, size: "large", color: "primary", category: "high" },
      { text: "Niacinamide", frequency: 68, size: "medium", color: "secondary", category: "medium" },
      { text: "Centella", frequency: 66, size: "medium", color: "secondary", category: "medium" },
      { text: "Hyaluronic Acid", frequency: 64, size: "medium", color: "secondary", category: "medium" },
      { text: "Birch Juice", frequency: 58, size: "medium", color: "secondary", category: "medium" },
      { text: "Rice Ferment", frequency: 54, size: "medium", color: "secondary", category: "medium" },
      { text: "Fragrance-Free", frequency: 52, size: "small", color: "tertiary", category: "low" },
      { text: "Oily Skin", frequency: 51, size: "small", color: "tertiary", category: "low" },
      { text: "Sensitive Skin", frequency: 49, size: "small", color: "tertiary", category: "low" },
      { text: "Hybrid Filters", frequency: 47, size: "small", color: "tertiary", category: "low" },
      { text: "Water-Resistant", frequency: 45, size: "small", color: "tertiary", category: "low" },
      { text: "Reef-Safe", frequency: 44, size: "small", color: "tertiary", category: "low" },
      { text: "Makeup Friendly", frequency: 43, size: "small", color: "tertiary", category: "low" },
      { text: "SPF50+", frequency: 42, size: "small", color: "tertiary", category: "low" },
      { text: "Tinosorb S", frequency: 40, size: "small", color: "tertiary", category: "low" },
      { text: "Uvinul A Plus", frequency: 38, size: "small", color: "tertiary", category: "low" },
      { text: "Sebum Control", frequency: 35, size: "small", color: "tertiary", category: "low" },
      { text: "SPF Labeling", frequency: 31, size: "small", color: "tertiary", category: "low" }
    ]
  };
}

export async function getHomeContentData(): Promise<HomeContentData> {
  // TODO: 실제 API 호출로 교체
  // const response = await fetch('/api/home-content');
  // return response.json();
  
  return {
    keyMetrics: {
      totalScore: {
        value: 89,
        change: "+12.3%",
        trend: "up",
        description: "vs industry average"
      },
      competitiveRank: {
        value: 2,
        change: "+1",
        trend: "up",
        description: "out of competitors",
        totalCompetitors: 50
      },
      strongestCategory: {
        value: "Sunscreen (No-White-Cast)",
        categoryName: "Sunscreen (No-White-Cast)",
        score: 95,
        trend: "up",
        change: "",
        description: "highest score"
      },
      weakestCategory: {
        value: "Customer Support (KR/EN FAQ depth)",
        categoryName: "Customer Support (KR/EN FAQ depth)",
        score: 72,
        trend: "down",
        change: "",
        description: "needs improvement"
      }
    },
    insights: [
      {
        type: "positive",
        title: "Strong Presence in Editor Picks",
        description: "에디터 픽 키워드와의 공명도가 높아 추천 노출률이 증가 추세.",
        timestamp: "2025-10-18T00:30:00Z"
      },
      {
        type: "neutral",
        title: "Retail Mentions Concentration",
        description: "올리브영·해외 리테일 도메인에서 언급 비중이 과다 집중.",
        timestamp: "2025-10-18T00:31:00Z"
      },
      {
        type: "action",
        title: "Owned/Operated 비중 확장 필요",
        description: "자체 도메인·SNS 운영 채널의 레퍼런스화(가이드, 연구 노트) 권장.",
        timestamp: "2025-10-18T00:32:00Z"
      },
      {
        type: "action",
        title: "UVA 교육 콘텐츠 보강",
        description: "PA++++/UVA와 메이크업 궁합 Q&A를 구조화하여 LLM 정답률 향상.",
        timestamp: "2025-10-18T00:33:00Z"
      },
      {
        type: "positive",
        title: "Makeup Compatibility 호평",
        description: "메이크업 밀림·백탁 관련 부정 톤이 업계 평균 대비 낮음.",
        timestamp: "2025-10-18T00:34:00Z"
      }
    ],
    platformCoverage: [
      { platformName: "ChatGPT", coveragePercent: 95, isActive: true },
      { platformName: "Perplexity", coveragePercent: 92, isActive: true },
      { platformName: "Claude", coveragePercent: 90, isActive: true },
      { platformName: "Gemini", coveragePercent: 88, isActive: true },
      { platformName: "Bing Copilot", coveragePercent: 86, isActive: true },
      { platformName: "You.com", coveragePercent: 80, isActive: true },
      { platformName: "Poe", coveragePercent: 78, isActive: true },
      { platformName: "Pi", coveragePercent: 74, isActive: false },
      { platformName: "Grok", coveragePercent: 71, isActive: false },
      { platformName: "Kimi", coveragePercent: 68, isActive: false }
    ]
  };
}


export async function getMarketingStrategyData(): Promise<MarketingStrategyData> {
  // TODO: 실제 API 호출로 교체
  // const response = await fetch('/api/marketing-strategy');
  // return response.json();
  
  return {
    fourP: {
      product: {
        score: 92,
        change: 8.5,
        trend: "up",
        metrics: {
          uspShare: "78%",
          featureMentions: 1245,
          productClarity: "94%",
          innovationScore: "89%"
        },
        topMentions: [
          { text: "No white cast even on deeper tones", sentimentScore: 0.93 },
          { text: "Lightweight water-gel finish", sentimentScore: 0.91 },
          { text: "PA++++ UVA defense (MFDS 체계)", sentimentScore: 0.89 }
        ],
        trendData: [
          { month: "May", value: 78 },
          { month: "Jun", value: 82 },
          { month: "Jul", value: 85 },
          { month: "Aug", value: 88 },
          { month: "Sep", value: 90 },
          { month: "Oct", value: 92 }
        ]
      },
      price: {
        score: 86,
        change: 4.2,
        trend: "up",
        metrics: {
          priceCompetitiveness: "92%",
          promoSensitivity: "61%",
          discountDepthAvg: "8%"
        },
        topMentions: [
          { text: "Affordable vs global derm brands", sentimentScore: 0.88 },
          { text: "Value for daily-use SPF", sentimentScore: 0.85 }
        ],
        trendData: [
          { month: "May", value: 78 },
          { month: "Jun", value: 79 },
          { month: "Jul", value: 81 },
          { month: "Aug", value: 83 },
          { month: "Sep", value: 85 },
          { month: "Oct", value: 86 }
        ]
      },
      place: {
        score: 88,
        change: 5.1,
        trend: "up",
        metrics: {
          olyoungCoverage: "76%",
          globalEcomCoverage: "68%",
          shippingSLA: "96%"
        },
        topMentions: [
          { text: "Olive Young listing visibility", sentimentScore: 0.86 },
          { text: "YesStyle/StyleKorean traction", sentimentScore: 0.84 }
        ],
        trendData: [
          { month: "May", value: 79 },
          { month: "Jun", value: 81 },
          { month: "Jul", value: 83 },
          { month: "Aug", value: 85 },
          { month: "Sep", value: 87 },
          { month: "Oct", value: 88 }
        ]
      },
      promotion: {
        score: 84,
        change: 6.3,
        trend: "up",
        metrics: {
          editorPickHits: 34,
          ugcVolume: 920,
          creatorSOV: "61%"
        },
        topMentions: [
          { text: "How-to reapplication 콘텐츠 수요", sentimentScore: 0.81 },
          { text: "Relief Sun/Birch Juice와 비교글 성과", sentimentScore: 0.79 }
        ],
        trendData: [
          { month: "May", value: 75 },
          { month: "Jun", value: 78 },
          { month: "Jul", value: 80 },
          { month: "Aug", value: 82 },
          { month: "Sep", value: 83 },
          { month: "Oct", value: 84 }
        ]
      }
    },
    fourE: {
      experience: {
        score: 89,
        change: 12.4,
        trend: "up",
        ratio: 0.67,
        description: "Experience-based sentence ratio",
        formula: "Experience sentences / Total sentences",
        insights: [
          "메이크업 호환성 리뷰 증가",
          "무향·저자극 피드백 확대",
          "여름→가을 재도포 체험담 급증"
        ]
      },
      exchange: {
        score: 83,
        change: 5.2,
        trend: "up",
        ratio: 0.41,
        description: "Value vs Price 인식 비율",
        formula: "Value-affirming mentions / Price mentions",
        insights: [
          "동급 대비 ml/₩ 가치 인식 우수",
          "세트 번들 구성 시 전환 상승"
        ]
      },
      evangelism: {
        score: 81,
        change: 9.0,
        trend: "up",
        ratio: 0.38,
        description: "UGC/리뷰 내 추천 의향",
        formula: "Recommend-intent sentences / Total reviews",
        insights: [
          "민감성 커뮤니티 내 추천 확산",
          "재구매 후기 다수"
        ]
      },
      everyplace: {
        score: 78,
        change: 7.1,
        trend: "up",
        ratio: 0.55,
        description: "채널별 일관 노출/메시지",
        formula: "Consistent presence signals / Channel count",
        insights: [
          "KR/EN 용어 통일 필요",
          "PA/UV 용어집 제공 시 정답률 개선"
        ]
      }
    },
    emotionDistribution: [
      { emotion: "Joy", value: 45 },
      { emotion: "Trust", value: 38 },
      { emotion: "Anticipation", value: 30 },
      { emotion: "Surprise", value: 22 },
      { emotion: "Sadness", value: 12 },
      { emotion: "Fear", value: 10 },
      { emotion: "Anger", value: 7 },
      { emotion: "Disgust", value: 4 }
    ]
  };
}

export async function getSTPData(): Promise<STPData> {
  // TODO: 실제 API 호출로 교체
  // const response = await fetch('/api/stp');
  // return response.json();
  
  return {
    segments: [
      {
        name: "Tech-Savvy Professionals",
        sizePercent: 34,
        characteristics: ["25-40 years old", "High income", "Digital native"],
        keywords: ["Innovation", "Efficiency", "AI", "Daily SPF"]
      },
      {
        name: "Sensitive-Skin Seekers",
        sizePercent: 26,
        characteristics: ["All ages", "Barrier-focused", "Fragrance-averse"],
        keywords: ["Hypoallergenic", "No White Cast", "PA++++"]
      },
      {
        name: "Makeup Enthusiasts",
        sizePercent: 18,
        characteristics: ["Base makeup heavy users"],
        keywords: ["Pilling-free", "Primer-like", "Dewy"]
      },
      {
        name: "Outdoor & Sports",
        sizePercent: 12,
        characteristics: ["Water/Sweat exposure"],
        keywords: ["Water-Resistant", "Long wear"]
      },
      {
        name: "Value Shoppers",
        sizePercent: 10,
        characteristics: ["Price sensitive", "Bundle-friendly"],
        keywords: ["ml/₩", "Promo"]
      }
    ],
    targeting: {
      primary: {
        segmentName: "Sensitive-Skin Seekers",
        score: 92,
        rationale: [
          "무향·저자극·무백탁 포지션과 적합",
          "UGC 구전 확대 용이",
          "재구매 주기 짧아 LTV 기여",
          "에디토리얼·피부과 문맥과 합치"
        ]
      },
      secondary: {
        segmentName: "Makeup Enthusiasts",
        score: 78,
        rationale: [
          "메이크업 궁합 메시지 성과 우수",
          "재도포 튜토리얼 전환율 높음",
          "BOJ·Round Lab 대비 차별 포인트"
        ]
      }
    },
    positioning: {
      statement: "suelo is a PA++++, no-white-cast daily sunscreen engineered for sensitive skin and seamless makeup.",
      attributes: [
        { name: "Innovation", yourScore: 95, competitorAvg: 72 },
        { name: "Sensitivity Safe", yourScore: 93, competitorAvg: 78 },
        { name: "Makeup Compatibility", yourScore: 92, competitorAvg: 75 },
        { name: "Texture/Finish", yourScore: 90, competitorAvg: 76 },
        { name: "Value for Money", yourScore: 86, competitorAvg: 80 }
      ],
      differentiators: [
        "No-white-cast on broader tones",
        "Primer-friendly, no pilling",
        "Clear PA++++ education content",
        "Consistent KR/EN messaging"
      ],
      positioningMap: {
        yourBrand: { x: 350, y: 120 },
        competitors: [
          { name: "Beauty of Joseon", x: 300, y: 140, size: 28 },
          { name: "Round Lab", x: 320, y: 150, size: 27 },
          { name: "Aestura", x: 260, y: 110, size: 24 },
          { name: "La Roche-Posay", x: 210, y: 160, size: 26 }
        ]
      }
    }
  };
}


export async function getShoppingContentData(): Promise<ShoppingContentData> {
  // TODO: 실제 API 호출로 교체
  // const response = await fetch('/api/shopping-content');
  // return response.json();
  
  return {
    metrics: {
      productMentions: 1245,
      productMentionsChange: 18.5,
      averageRating: 4.7,
      ratingChange: 0.3,
      priceCompetitiveness: 92,
      availabilityScore: 88
    },
    platforms: [
      { name: "Olive Young Global", visibility: 95, mentions: 580, rating: 4.8, trend: "up", change: 8.5 },
      { name: "Amazon", visibility: 86, mentions: 320, rating: 4.7, trend: "up", change: 5.0 },
      { name: "YesStyle", visibility: 84, mentions: 290, rating: 4.6, trend: "up", change: 4.1 },
      { name: "StyleKorean", visibility: 82, mentions: 270, rating: 4.5, trend: "down", change: -1.2 }
    ],
    categories: [
      { categoryName: "Sunscreen SPF50+", mentions: 485, visibility: 95, growthPercent: 15.3 },
      { categoryName: "Sensitive Skin Care", mentions: 360, visibility: 90, growthPercent: 11.8 },
      { categoryName: "Makeup-Ready Base", mentions: 280, visibility: 87, growthPercent: 9.2 },
      { categoryName: "Mineral/Hybrid Filters", mentions: 190, visibility: 80, growthPercent: 6.1 },
      { categoryName: "Water/Sweat Resistant", mentions: 170, visibility: 78, growthPercent: 5.4 }
    ],
    priceComparison: [
      { productName: "suelo Daily PA++++ SPF50+", yourPrice: "₩19,900", competitorAvg: "₩23,500", savingsPercent: "15%", hasAdvantage: true },
      { productName: "Beauty of Joseon Relief Sun", yourPrice: "₩18,000~₩22,000", competitorAvg: "₩18,500", savingsPercent: "-3%~+19%", hasAdvantage: false },
      { productName: "Round Lab Birch Juice", yourPrice: "₩18,000~₩24,000", competitorAvg: "₩21,000", savingsPercent: "-14%~+14%", hasAdvantage: "[Mixed]" }
    ]
  };
}

export async function getModelContentData(): Promise<ModelContentData> {
  // TODO: 실제 API 호출로 교체
  // const response = await fetch('/api/model-content');
  // return response.json();
  
  return {
    overallMetrics: {
      averageVisibility: 86.7,
      accuracyScore: 89.8,
      totalMentions: 7400,
      positiveSentimentPercent: 83
    },
    models: [
      { name: "ChatGPT", provider: "OpenAI", visibility: 95, accuracy: 94, sentiment: "positive", mentions: 1450, trend: "up", change: 8.5 },
      { name: "Claude", provider: "Anthropic", visibility: 91, accuracy: 92, sentiment: "positive", mentions: 1280, trend: "up", change: 7.2 },
      { name: "Gemini", provider: "Google", visibility: 88, accuracy: 89, sentiment: "neutral", mentions: 1170, trend: "up", change: 5.6 },
      { name: "Perplexity", provider: "Perplexity", visibility: 90, accuracy: 87, sentiment: "positive", mentions: 1210, trend: "up", change: 6.1 },
      { name: "Bing Copilot", provider: "Microsoft", visibility: 86, accuracy: 86, sentiment: "neutral", mentions: 900, trend: "up", change: 4.7 },
      { name: "You.com", provider: "You.com", visibility: 80, accuracy: 82, sentiment: "neutral", mentions: 710, trend: "up", change: 3.9 },
      { name: "Grok", provider: "xAI", visibility: 73, accuracy: 78, sentiment: "neutral", mentions: 400, trend: "down", change: -2.1 },
      { name: "Pi", provider: "Inflection", visibility: 71, accuracy: 79, sentiment: "neutral", mentions: 279, trend: "down", change: -3.2 }
    ]
  };
}

export async function getIndustryContentData(): Promise<IndustryContentData> {
  // TODO: 실제 API 호출로 교체
  // const response = await fetch('/api/industry-content');
  // return response.json();
  
  return {
    metrics: {
      industryRank: 2,
      rankChange: 1,
      totalCompetitors: 50,
      marketSharePercent: 18.5,
      marketShareChange: 2.3,
      growthRate: 12.3,
      audienceReach: 2400000
    },
    competitors: [
      { companyName: "Beauty of Joseon", score: 93.1, marketShare: 19.7, growthRate: 13.8, rank: 1 },
      { companyName: "suelo", score: 89.8, marketShare: 18.5, growthRate: 12.3, rank: 2 },
      { companyName: "Round Lab", score: 89.1, marketShare: 17.9, growthRate: 11.2, rank: 3 },
      { companyName: "Aestura", score: 88.3, marketShare: 16.2, growthRate: 10.4, rank: 4 },
      { companyName: "La Roche-Posay", score: 87.0, marketShare: 15.1, growthRate: 9.2, rank: 5 },
      { companyName: "Neogen", score: 85.7, marketShare: 13.0, growthRate: 8.4, rank: 6 },
      { companyName: "SKIN1004", score: 84.9, marketShare: 12.7, growthRate: 8.0, rank: 7 },
      { companyName: "COSRX", score: 84.1, marketShare: 12.1, growthRate: 7.2, rank: 8 }
    ],
    strengths: [
      "Highest growth rate among top-3 (+12.3%)",
      "Strong visibility on editor picks & retail pages",
      "Low negative tone for white-cast/pilling issues",
      "Competitive price-to-ml ratio",
      "KR/EN documentation improving"
    ],
    opportunities: [
      "Mineral/Hybrid 라인 확장",
      "Water/Sweat resistant 포지션 강화",
      "Owned/Operated 자료 축적로 LLM 인용률 제고",
      "재도포 튜토리얼 영상 표준화",
      "글로벌 재구매 프로그램(LTV) 설계"
    ]
  };
}
