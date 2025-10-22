'use client';

import SpotlightCard from './SpotlightCard';

const products = [
  {
    title: 'SAENA Insight',
    description: 'Track how AI engines perceive and mention your brand in real-time',
    features: ['Real-time monitoring', 'Answer Visibility Index', 'Context analysis'],
  },
  {
    title: 'SAENA Agent Analytics',
    description: 'Analyze how GPT, Claude, and Perplexity cite your website',
    features: ['Citation tracking', 'Source link analysis', 'Brand trust metrics'],
  },
  {
    title: 'SAENA Shopping',
    description: 'Optimize product recommendations in AI-powered shopping experiences',
    features: ['Product visibility', 'Competitor analysis', 'Recommendation optimization'],
  },
];

export function ProductsSection() {
  return (
    <section className="container mx-auto px-4 py-16 sm:py-20">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Our Products
        </h2>
        <p className="mt-4 text-lg text-gray-400">
          Three powerful tools to manage your AI presence
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <SpotlightCard
            key={index}
            className="h-full"
            spotlightColor="rgba(132, 204, 22, 0.2)"
          >
            <h3 className="mb-4 text-2xl font-bold text-white">{product.title}</h3>
            <p className="mb-6 text-gray-400">{product.description}</p>
            <ul className="space-y-2">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
