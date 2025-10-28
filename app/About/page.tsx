// app/about/page.tsx
import React from "react";

export default function AboutPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SAENA by GOODWILL(KE)",
    url: "https://the-saena.ai",
    logo: "https://the-saena.ai/icons/goodwill_white.svg",
    description:
      "SAENA is an AI brand presence monitoring platform that tracks how AI engines like GPT, Claude, and Perplexity mention and perceive your brand.",
    sameAs: [
      "https://twitter.com/saena_ai",
      "https://linkedin.com/company/saena-ai",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "support@the-saena.ai",
        contactType: "customer service",
      },
    ],
  };

  return (
    <>
      {/* SEO Schema for Google + LLMs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 px-6 md:px-12 lg:px-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          About SAENA
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-80">
          Pioneering AI brand presence monitoring for the next generation of digital marketing.
        </p>
      </section>

      {/* Feature Grid */}
      <section className="py-16 bg-neutral-900 text-white px-6 md:px-12 lg:px-20">
        <div className="grid gap-12 md:grid-cols-3">
          {[
            {
              title: "Real-time AI Monitoring",
              desc: "Track how GPT, Claude, Perplexity and 10+ LLMs mention your brand in real-time.",
            },
            {
              title: "Answer Visibility Index",
              desc: "Measure your brand's visibility in AI-generated responses with our proprietary AVI metric.",
            },
            {
              title: "Competitor Analysis",
              desc: "Compare your AI presence against competitors and identify opportunities.",
            },
            {
              title: "Citation Tracking",
              desc: "See exactly how AI agents cite your content and which sources they trust.",
            },
            {
              title: "Custom Alerts",
              desc: "Get instant notifications when your brand is mentioned or when trends shift.",
            },
            {
              title: "API Integration",
              desc: "Seamlessly integrate SAENA data into your existing marketing workflows.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-neutral-800 p-6 rounded-2xl shadow-lg hover:scale-105 transform transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="opacity-80">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-center text-white px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Dominate the AI Era?
        </h2>
        <p className="text-lg opacity-80 mb-8">
          Let SAENA help you track and optimize your brand's AI presence.
        </p>
        <a
          href="/waitlist"
          className="bg-lime-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-lime-300 transition-all"
        >
          Join Waitlist
        </a>
      </section>
    </>
  );
}
