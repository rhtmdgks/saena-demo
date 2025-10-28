# Analytics Dashboard Implementation Requirements

## Introduction

This specification defines the requirements for implementing comprehensive analytics dashboard pages for the Shuello (suelo) K-beauty sunscreen brand prototype. The analytics section will provide detailed insights into brand performance across various AI platforms and channels.

## Glossary

- **System**: The analytics dashboard component of the Shuello brand monitoring platform
- **User**: Marketing team members or brand managers viewing analytics
- **AI Platform**: ChatGPT, Claude, Perplexity, Gemini, etc.
- **Visibility Score**: Percentage metric indicating how often the brand appears in AI responses
- **Citation**: A mention or reference to the brand in AI-generated content
- **Sentiment Score**: Numerical value (-1 to 1) representing positive/negative tone

## Requirements

### Requirement 1: Analytics Overview Page

**User Story:** As a brand manager, I want to see a comprehensive overview of all analytics metrics in one place, so that I can quickly assess overall brand performance.

#### Acceptance Criteria

1. WHEN the user navigates to the Analytics Overview page, THE System SHALL display key performance indicators including total visibility score, citation count, sentiment score, and platform coverage
2. WHEN the user views the overview, THE System SHALL present time-series charts showing trends over the selected time period
3. WHEN the user selects a time range filter, THE System SHALL update all metrics to reflect the selected period
4. WHERE the user has access to multiple brands, THE System SHALL allow comparison between brands
5. WHEN metrics show significant changes, THE System SHALL highlight these with visual indicators (up/down arrows and percentage changes)

### Requirement 2: Brand Analytics Page Enhancement

**User Story:** As a marketing analyst, I want to analyze brand visibility across different dimensions (visibility, sentiment, topics, platforms, regions, shopping, citations), so that I can identify strengths and opportunities.

#### Acceptance Criteria

1. WHEN the user selects the "Visibility" tab, THE System SHALL display brand visibility scores over time with competitor comparisons
2. WHEN the user selects the "Sentiment" tab, THE System SHALL show sentiment analysis with positive/negative/neutral breakdowns
3. WHEN the user selects the "Topics" tab, THE System SHALL present topic clusters and keyword associations related to the brand
4. WHEN the user selects the "Platforms" tab, THE System SHALL display performance metrics for each AI platform (ChatGPT, Claude, Perplexity, etc.)
5. WHEN the user selects the "Regions" tab, THE System SHALL show geographic distribution of brand mentions
6. WHEN the user selects the "Shopping" tab, THE System SHALL display shopping-specific visibility metrics
7. WHEN the user selects the "Citations" tab, THE System SHALL list all citation sources with authority scores

### Requirement 3: Conversations Analytics Page

**User Story:** As a content strategist, I want to analyze actual AI conversations mentioning our brand, so that I can understand context and user intent.

#### Acceptance Criteria

1. WHEN the user views the Conversations page, THE System SHALL display a list of recent AI conversations mentioning the brand
2. WHEN the user filters by platform, THE System SHALL show only conversations from the selected AI platform
3. WHEN the user clicks on a conversation, THE System SHALL display the full conversation context
4. WHEN the user views a conversation, THE System SHALL highlight brand mentions and related keywords
5. WHEN the user analyzes conversations, THE System SHALL categorize them by user intent (product inquiry, comparison, review, etc.)

### Requirement 4: Copilot Analytics Page

**User Story:** As a product manager, I want to track how Microsoft Copilot presents our brand, so that I can optimize our presence in enterprise AI tools.

#### Acceptance Criteria

1. WHEN the user views the Copilot Analytics page, THE System SHALL display Copilot-specific visibility metrics
2. WHEN the user analyzes Copilot data, THE System SHALL show citation sources used by Copilot
3. WHEN the user reviews performance, THE System SHALL compare Copilot metrics against other AI platforms
4. WHEN the user examines queries, THE System SHALL list common Copilot queries that trigger brand mentions
5. WHEN the user views trends, THE System SHALL display time-series data for Copilot visibility

### Requirement 5: Website Analytics Page

**User Story:** As a digital marketing manager, I want to see how AI platforms reference our website content, so that I can optimize our owned media strategy.

#### Acceptance Criteria

1. WHEN the user views the Website Analytics page, THE System SHALL display citation frequency for each website domain (suelo.kr, shop.suelo.kr, blog.suelo.kr)
2. WHEN the user analyzes website performance, THE System SHALL show which pages are most frequently cited
3. WHEN the user reviews content effectiveness, THE System SHALL display correlation between content type and citation rate
4. WHEN the user examines authority scores, THE System SHALL present domain authority metrics
5. WHEN the user tracks trends, THE System SHALL show how website citations have changed over time

### Requirement 6: Data Accuracy and Brand Consistency

**User Story:** As a quality assurance lead, I want all analytics data to accurately reflect the Shuello brand and K-beauty sunscreen industry, so that insights are actionable and relevant.

#### Acceptance Criteria

1. THE System SHALL use only Shuello (suelo) brand data and K-beauty sunscreen industry context
2. THE System SHALL NOT include data from unrelated industries (fintech, banking, business services, etc.)
3. THE System SHALL reference appropriate competitors (Beauty of Joseon, Round Lab, Aestura, La Roche-Posay, etc.)
4. THE System SHALL use relevant product categories (sunscreen, SPF, PA++++, sensitive skin, etc.)
5. THE System SHALL maintain consistent brand naming (suelo/Shuello) throughout all pages

### Requirement 7: Interactive Data Visualization

**User Story:** As a data analyst, I want interactive charts and visualizations, so that I can explore data in depth and extract insights.

#### Acceptance Criteria

1. WHEN the user hovers over chart elements, THE System SHALL display detailed tooltips with exact values
2. WHEN the user clicks on legend items, THE System SHALL toggle visibility of corresponding data series
3. WHEN the user selects a time range, THE System SHALL animate transitions between data states
4. WHERE applicable, THE System SHALL provide zoom and pan functionality for detailed analysis
5. WHEN the user exports data, THE System SHALL generate downloadable reports in CSV or PDF format

### Requirement 8: Performance and Loading States

**User Story:** As a user, I want fast page loads and clear loading indicators, so that I have a smooth experience even with large datasets.

#### Acceptance Criteria

1. WHEN the user navigates to any analytics page, THE System SHALL display a loading skeleton within 100ms
2. WHEN data is being fetched, THE System SHALL show progress indicators for long-running operations
3. WHEN data fails to load, THE System SHALL display user-friendly error messages with retry options
4. THE System SHALL cache frequently accessed data to improve subsequent load times
5. THE System SHALL lazy-load non-critical components to optimize initial page render

---

## Implementation Prompt Template

When implementing each analytics page, use the following prompt structure:

```
I need to implement the [PAGE_NAME] analytics page for the Shuello (suelo) K-beauty sunscreen brand.

**Context:**
- Brand: Shuello (suelo) - Korean sunscreen brand
- Industry: K-beauty, specifically sunscreen/SPF products
- Main competitors: Beauty of Joseon, Round Lab, Aestura, La Roche-Posay, Anessa
- Key product features: PA++++, no white cast, sensitive skin friendly, makeup compatible
- Target platforms: ChatGPT, Claude, Perplexity, Gemini, Bing Copilot

**Page Requirements:**
[Paste specific acceptance criteria from requirements.md]

**Data Structure:**
Please provide realistic mock data that includes:
1. [Specific metrics needed]
2. [Time-series data points]
3. [Categorical breakdowns]
4. [Comparison data]

**Design Requirements:**
- Follow existing dashboard design patterns (dark mode support, accent-green highlights)
- Use consistent typography and spacing
- Include interactive elements (filters, tabs, tooltips)
- Ensure responsive layout (mobile, tablet, desktop)

**Component Structure:**
- Create component at: components/dashboard/analytics-[page-name]-content.tsx
- Use TypeScript with proper type definitions
- Implement data fetching from lib/api/dashboard-data.ts
- Add types to types/dashboard.ts if needed

**Specific Features:**
[List any unique features for this page]

Please implement this page with:
1. Realistic, brand-appropriate data
2. Interactive visualizations
3. Proper loading states
4. Error handling
5. Responsive design
6. Accessibility compliance

Do NOT include any data from other industries (fintech, banking, business services, etc.).
```

---

## Page-Specific Prompt Examples

### For Analytics Overview Page:

```
I need to implement the Analytics Overview page for the Shuello (suelo) K-beauty sunscreen brand.

**Context:**
- Brand: Shuello (suelo) - Korean sunscreen brand
- Industry: K-beauty, specifically sunscreen/SPF products
- Main competitors: Beauty of Joseon, Round Lab, Aestura, La Roche-Posay, Anessa
- Key product features: PA++++, no white cast, sensitive skin friendly, makeup compatible

**Page Requirements:**
1. Display 4-6 key performance indicator cards (visibility score, total citations, sentiment score, platform coverage, growth rate, market position)
2. Show time-series chart with overall visibility trend (last 30 days)
3. Display platform breakdown (ChatGPT, Claude, Perplexity, Gemini, Bing Copilot)
4. Show top performing topics/keywords
5. Display recent significant changes or alerts
6. Include time range selector (7d, 15d, 30d, custom)

**Data Structure:**
Provide realistic mock data including:
1. Overall visibility score (0-100) with trend
2. Total citation count with breakdown by type (earned, operated, owned)
3. Sentiment score (-1 to 1) with positive/negative/neutral percentages
4. Platform-wise visibility scores
5. Top 10 keywords/topics with frequency
6. Daily time-series data for last 30 days

**Specific Features:**
- Comparison cards showing change vs previous period
- Mini sparkline charts in KPI cards
- Quick filters for time range
- Alert badges for significant changes
- Export functionality for reports

Please implement with realistic K-beauty sunscreen industry data.
```

### For Conversations Analytics Page:

```
I need to implement the Conversations Analytics page for the Shuello (suelo) K-beauty sunscreen brand.

**Context:**
- Brand: Shuello (suelo) - Korean sunscreen brand
- Users ask AI about: best sunscreen, no white cast, PA++++, sensitive skin, makeup compatibility
- Common queries: "best Korean sunscreen", "sunscreen for oily skin", "PA++++ meaning"

**Page Requirements:**
1. Display list of recent AI conversations mentioning the brand (20-50 conversations)
2. Show conversation metadata (platform, date, user intent, sentiment)
3. Provide filters (platform, date range, sentiment, intent category)
4. Display full conversation on click with brand mentions highlighted
5. Show conversation analytics (intent distribution, sentiment trends, common questions)
6. Include search functionality to find specific conversations

**Data Structure:**
Provide realistic mock data including:
1. 30-50 conversation samples with:
   - Platform (ChatGPT, Claude, Perplexity, etc.)
   - Timestamp
   - User query (realistic sunscreen-related questions)
   - AI response (mentioning Shuello appropriately)
   - Sentiment score
   - Intent category (product inquiry, comparison, review, how-to, ingredient question)
   - Brand mention count
   - Competitor mentions
2. Intent distribution (percentages)
3. Sentiment trend over time
4. Most common question patterns

**Specific Features:**
- Conversation cards with preview
- Modal/drawer for full conversation view
- Highlight brand and competitor mentions in different colors
- Filter chips for quick filtering
- Search bar with autocomplete
- Export selected conversations

Please create realistic conversations about K-beauty sunscreen products.
```

### For Copilot Analytics Page:

```
I need to implement the Copilot Analytics page for the Shuello (suelo) K-beauty sunscreen brand.

**Context:**
- Focus: Microsoft Copilot (Bing Copilot) specific analytics
- Enterprise context: Business users researching products
- Copilot features: Shopping integration, web search, citations

**Page Requirements:**
1. Display Copilot-specific visibility score and trend
2. Show citation sources used by Copilot
3. Compare Copilot performance vs other platforms
4. Display common Copilot queries triggering brand mentions
5. Show shopping tile appearance frequency
6. Include geographic distribution of Copilot mentions

**Data Structure:**
Provide realistic mock data including:
1. Copilot visibility score with 30-day trend
2. Citation sources (domains) with frequency
3. Comparison data (Copilot vs ChatGPT vs Claude vs Perplexity)
4. Top 20 Copilot queries mentioning the brand
5. Shopping tile appearance rate
6. Geographic data (countries/regions)

**Specific Features:**
- Copilot-specific metrics dashboard
- Citation source analysis
- Query pattern analysis
- Shopping integration metrics
- Platform comparison charts

Please focus on enterprise/business user context for Copilot.
```

### For Website Analytics Page:

```
I need to implement the Website Analytics page for the Shuello (suelo) K-beauty sunscreen brand.

**Context:**
- Owned domains: suelo.kr, shop.suelo.kr, blog.suelo.kr
- Content types: product pages, blog posts, educational content, FAQs
- Goal: Understand how AI platforms cite our owned content

**Page Requirements:**
1. Display citation frequency for each domain
2. Show most cited pages/content
3. Display content type performance (product pages vs blog vs educational)
4. Show domain authority scores
5. Display citation trend over time
6. Include recommendations for content optimization

**Data Structure:**
Provide realistic mock data including:
1. Domain-level metrics:
   - suelo.kr: citation count, authority score, trend
   - shop.suelo.kr: citation count, authority score, trend
   - blog.suelo.kr: citation count, authority score, trend
2. Top 20 cited pages with URLs and citation counts
3. Content type breakdown (product: X%, blog: Y%, educational: Z%)
4. 30-day citation trend per domain
5. Platform-wise citation distribution
6. Content recommendations based on performance

**Specific Features:**
- Domain comparison cards
- Page-level citation table with sorting
- Content type pie/bar chart
- Citation trend line chart
- Actionable recommendations panel
- Export functionality

Please create realistic URLs and content for a K-beauty sunscreen brand.
```

---

## Data Consistency Guidelines

When creating mock data for any analytics page:

### ✅ DO USE:
- Shuello/suelo brand name
- K-beauty sunscreen context
- Competitors: Beauty of Joseon, Round Lab, Aestura, La Roche-Posay, Anessa, COSRX, SKIN1004, Innisfree
- Product features: PA++++, SPF50+, no white cast, sensitive skin, makeup compatible, water-resistant
- Keywords: sunscreen, UV protection, UVA/UVB, niacinamide, centella, hyaluronic acid
- Platforms: ChatGPT, Claude, Perplexity, Gemini, Bing Copilot, You.com
- Domains: global.oliveyoung.com, yesstyle.com, stylekorean.com, vogue.com, allure.com, byrdie.com
- User intents: product inquiry, comparison, ingredient question, application how-to, skin type recommendation

### ❌ DO NOT USE:
- Business banking, fintech, corporate cards, expense management
- Startup, SMB, enterprise software
- Payment processing, accounts payable
- Any non-beauty industry data
- Unrelated product categories

---

## Next Steps

1. Review these requirements with stakeholders
2. Prioritize pages for implementation (suggested order: Overview → Conversations → Copilot → Website)
3. Use the prompt templates above to request implementation
4. Validate each implementation against acceptance criteria
5. Iterate based on feedback
