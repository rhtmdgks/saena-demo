import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { ProductsSection } from "@/components/products-section";
import { SaenaFeatures } from "@/components/saena-features";
import { UseCasesSwap } from "@/components/use-cases-swap";
import { TeamSection } from "@/components/team-section";
import { Pricing } from "@/components/pricing";
import { AppverseFooter } from "@/components/appverse-footer";
import Script from "next/script";
import "./paperlogy-fonts.css";

// ✅ Force static generation for low TTFB
export const dynamic = "force-static";

export default function Page() {
  // Structured data for pricing
  const pricingStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPageElement",
    "@id": "https://the-saena.ai/#pricing",
    name: "Pricing Plans",
    description:
      "SAENA AI brand monitoring pricing plans - Awareness, Growth, Scale-up, and Enterprise packages",
    url: "https://the-saena.ai/#pricing",
    mainEntity: {
      "@type": "PriceSpecification",
      name: "AI Brand Monitoring Services",
      description:
        "Professional AI brand presence monitoring with four pricing tiers",
      offers: [
        {
          "@type": "Offer",
          name: "Awareness Plan",
          price: "0",
          priceCurrency: "USD",
          description: "5 LLM monitoring with weekly reports and basic brand tracking",
        },
        {
          "@type": "Offer",
          name: "Growth Plan",
          price: "149",
          priceCurrency: "USD",
          description: "10+ LLM monitoring with daily reports and competitor analysis",
        },
        {
          "@type": "Offer",
          name: "Scale-up Plan",
          price: "399",
          priceCurrency: "USD",
          description: "Unlimited LLM monitoring with real-time reports and advanced analytics",
        },
        {
          "@type": "Offer",
          name: "Enterprise Plan",
          price: "Custom",
          priceCurrency: "USD",
          description: "Enterprise-grade monitoring with custom integrations and SLA",
        },
      ],
    },
  };

  // Structured data for main page
  const pageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://the-saena.ai/",
    name: "SAENA | AI Brand Presence Monitoring Platform",
    description:
      "Track and optimize how AI engines like GPT, Claude, and Perplexity perceive and mention your brand. Real-time monitoring, analytics, and insights for the AI era.",
    url: "https://the-saena.ai/",
    mainEntity: {
      "@type": "Organization",
      name: "SAENA by GOODWILL(KE)",
      url: "https://the-saena.ai",
      sameAs: [
        "https://twitter.com/saena_ai",
        "https://linkedin.com/company/saena-ai",
      ],
    },
    hasPart: [
      {
        "@type": "WebPageElement",
        "@id": "https://the-saena.ai/#pricing",
        name: "Pricing Section",
        url: "https://the-saena.ai/#pricing",
      },
    ],
  };

  return (
    <>
      <main className="min-h-[100dvh] text-white" style={{ fontFamily: 'Paperlogy, sans-serif' }}>
        <SiteHeader />
        <Hero />
        <ProductsSection />
        <SaenaFeatures />
        <UseCasesSwap />
        <TeamSection />
        <Pricing />
        <AppverseFooter />
      </main>

      {/* JSON-LD structured data */}
      <Script
        id="pricing-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pricingStructuredData),
        }}
      />

      <Script
        id="page-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageStructuredData),
        }}
      />
    </>
  );
}
