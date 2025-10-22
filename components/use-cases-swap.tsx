'use client';

import CardSwap, { Card } from './CardSwap';

const useCases = [
  {
    title: 'Marketing Teams',
    description: 'Monitor brand mentions in AI responses and optimize your content strategy',
    icon: '📱',
    stats: 'Track 10+ LLMs',
  },
  {
    title: 'E-commerce Brands',
    description: 'Ensure your products appear in AI shopping recommendations',
    icon: '🛍️',
    stats: 'Boost visibility',
  },
  {
    title: 'Agencies',
    description: 'Manage multiple client brands with comprehensive AI analytics',
    icon: '🏢',
    stats: 'Multi-brand support',
  },
  {
    title: 'Enterprise',
    description: 'Custom models, dedicated infrastructure, and SLA guarantees',
    icon: '🚀',
    stats: 'Enterprise-grade',
  },
];

export function UseCasesSwap() {
  return (
    <section className="relative overflow-hidden bg-black py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left side - Text content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Built for Every Team
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              From startups to enterprises, SAENA adapts to your needs
            </p>
            
            <div className="mt-8 space-y-4">
              {useCases.map((useCase, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all hover:border-lime-400/50"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{useCase.icon}</span>
                    <div>
                      <h3 className="font-bold text-white">{useCase.title}</h3>
                      <p className="mt-1 text-sm text-gray-400">{useCase.description}</p>
                      <span className="mt-2 inline-block text-xs text-lime-400">{useCase.stats}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Card swap animation */}
          <div className="relative hidden lg:block" style={{ height: '600px' }}>
            <CardSwap
              width={400}
              height={500}
              cardDistance={60}
              verticalDistance={70}
              delay={3000}
              pauseOnHover={true}
              skewAmount={6}
              easing="elastic"
            >
              {useCases.map((useCase, index) => (
                <Card key={index} customClass="bg-gradient-to-br from-neutral-900 to-neutral-950 border-white/10">
                  <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                    <div className="mb-6 text-7xl">{useCase.icon}</div>
                    <h3 className="mb-3 text-2xl font-bold text-white">{useCase.title}</h3>
                    <p className="mb-4 text-gray-400">{useCase.description}</p>
                    <span className="inline-block rounded-full bg-lime-400/20 px-4 py-1 text-sm font-semibold text-lime-400">
                      {useCase.stats}
                    </span>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
}
