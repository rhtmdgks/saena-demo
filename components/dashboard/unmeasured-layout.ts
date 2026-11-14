// Layout-only empty shapes; zero numeric sentinels must never be rendered as measurements.
import type { IndustryContentData, ModelContentData, MarketingStrategyData, STPData, ShoppingContentData } from "@/types/dashboard";
export const industryEmpty: IndustryContentData = {
  "metrics": {
    "industryRank": 0,
    "rankChange": 0,
    "totalCompetitors": 0,
    "marketSharePercent": 0,
    "marketShareChange": 0,
    "growthRate": 0,
    "audienceReach": 0
  },
  "competitors": [],
  "strengths": [],
  "opportunities": []
};
export const modelEmpty: ModelContentData = {
  "overallMetrics": {
    "averageVisibility": 0,
    "accuracyScore": 0,
    "totalMentions": 0,
    "positiveSentimentPercent": 0
  },
  "models": [
    {
      "name": "ChatGPT Search",
      "provider": "OpenAI",
      "visibility": 0,
      "accuracy": 0,
      "sentiment": "neutral",
      "mentions": 0,
      "trend": "up",
      "change": 0
    }
  ]
};
export const marketing_strategyEmpty: MarketingStrategyData = {
  "fourP": {
    "product": {
      "score": 0,
      "change": 0,
      "trend": "up",
      "metrics": {
        "uspShare": "--",
        "featureMentions": 0,
        "productClarity": "--",
        "innovationScore": "--"
      },
      "topMentions": [],
      "trendData": []
    },
    "price": {
      "score": 0,
      "change": 0,
      "trend": "up",
      "metrics": {
        "priceCompetitiveness": "--",
        "promoSensitivity": "--",
        "discountDepthAvg": "--"
      },
      "topMentions": [],
      "trendData": []
    },
    "place": {
      "score": 0,
      "change": 0,
      "trend": "up",
      "metrics": {
        "olyoungCoverage": "--",
        "globalEcomCoverage": "--",
        "shippingSLA": "--"
      },
      "topMentions": [],
      "trendData": []
    },
    "promotion": {
      "score": 0,
      "change": 0,
      "trend": "up",
      "metrics": {
        "editorPickHits": 0,
        "ugcVolume": 0,
        "creatorSOV": "--"
      },
      "topMentions": [],
      "trendData": []
    }
  },
  "fourE": {
    "experience": {
      "score": 0,
      "change": 0,
      "trend": "up",
      "ratio": 0,
      "description": "--",
      "formula": "--",
      "insights": []
    },
    "exchange": {
      "score": 0,
      "change": 0,
      "trend": "up",
      "ratio": 0,
      "description": "--",
      "formula": "--",
      "insights": []
    },
    "evangelism": {
      "score": 0,
      "change": 0,
      "trend": "up",
      "ratio": 0,
      "description": "--",
      "formula": "--",
      "insights": []
    },
    "everyplace": {
      "score": 0,
      "change": 0,
      "trend": "up",
      "ratio": 0,
      "description": "--",
      "formula": "--",
      "insights": []
    }
  },
  "emotionDistribution": []
};
export const stpEmpty: STPData = {
  "segments": [],
  "targeting": {
    "primary": {
      "segmentName": "--",
      "score": 0,
      "rationale": []
    },
    "secondary": {
      "segmentName": "--",
      "score": 0,
      "rationale": []
    }
  },
  "positioning": {
    "statement": "--",
    "attributes": [],
    "differentiators": [],
    "positioningMap": {
      "yourBrand": {
        "x": 0,
        "y": 0
      },
      "competitors": []
    }
  }
};
export const shoppingEmpty: ShoppingContentData = {
  "metrics": {
    "productMentions": 0,
    "productMentionsChange": 0,
    "averageRating": 0,
    "ratingChange": 0,
    "priceCompetitiveness": 0,
    "availabilityScore": 0
  },
  "platforms": [],
  "categories": [],
  "priceComparison": []
};
