'use client';

import ScrollStack, { ScrollStackItem } from './ScrollStack';

const features = [
  {
    title: 'Real-time Brand Monitoring',
    description: 'Track how AI engines mention your brand across GPT, Claude, and Perplexity',
    icon: '📊',
    color: 'bg-gradient-to-br from-purple-500/20 to-purple-900/20',
  },
  {
    title: 'Citation Analysis',
    description: 'Understand how LLMs cite and reference your website content',
    icon: '🔗',
    color: 'bg-gradient-to-br from-blue-500/20 to-blue-900/20',
  },
  {
    title: 'Answer Visibility Index',
    description: 'Measure your brand presence in AI-generated answers',
    icon: '📈',
    color: 'bg-gradient-to-br from-lime-500/20 to-lime-900/20',
  },
  {
    title: 'Competitive Intelligence',
    description: 'Compare your AI visibility against competitors',
    icon: '🎯',
    color: 'bg-gradient-to-br from-orange-500/20 to-orange-900/20',
  },
];

export function FeaturesScroll() {
  return (
    <section className="relative bg-black py-16">
      <div className="container mx-auto px-4 mb-12 text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Core Capabilities
        </h2>
        <p className="mt-4 text-lg text-gray-400">
          Scroll to explore what makes SAENA powerful
        </p>
      </div>

      <div className="relative">
        <ScrollStack
          useWindowScroll={false}
          itemDistance={50}
          itemScale={0.05}
          itemStackDistance={30}
          stackPosition="20%"
          scaleEndPosition="10%"
          baseScale={0.9}
          className="h-[600px]"
        >
          {features.map((feature, index) => (
            <ScrollStackItem key={index} itemClassName={`${feature.color} border border-white/10`}>
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="mb-4 text-6xl">{feature.icon}</div>
                  <h3 className="mb-3 text-2xl font-bold text-white">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
                <div className="mt-6 text-sm text-gray-400">
                  Feature {index + 1} of {features.length}
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
