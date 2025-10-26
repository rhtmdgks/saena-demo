/**
 * SEO 최적화 샘플 페이지
 * R1-OS 모든 기능 통합 예시
 */

import { Metadata } from 'next';
import { 
  JSONLD, 
  EEATMetaTags, 
  createDefaultEEATMetadata,
  generateArticleSchema,
  generateFAQSchema,
  generateBreadcrumbSchema
} from '@/lib/seo/eeat';
import { generateMetaTags } from '@/lib/seo/utils';

// 메타데이터 생성
export async function generateMetadata(): Promise<Metadata> {
  const url = 'https://the-saena.ai/example-seo-page';
  
  return generateMetaTags({
    title: 'SAENA AI Platform - Complete Guide 2025',
    description: 'Learn how to build intelligent applications with SAENA AI Platform. Comprehensive guide with code examples, benchmarks, and best practices.',
    url,
    image: 'https://the-saena.ai/og-image.png',
    type: 'article',
    keywords: ['saena ai', 'ai platform', 'machine learning', 'artificial intelligence'],
    author: 'SAENA Team',
    publishedTime: '2025-10-26T00:00:00Z',
    modifiedTime: new Date().toISOString()
  });
}

export default function ExampleSEOPage() {
  // EEAT 메타데이터
  const eeatMetadata = createDefaultEEATMetadata();
  
  // Article 스키마
  const articleSchema = generateArticleSchema(eeatMetadata, {
    headline: 'SAENA AI Platform - Complete Guide 2025',
    description: 'Comprehensive guide to building intelligent applications',
    url: 'https://the-saena.ai/example-seo-page',
    image: 'https://the-saena.ai/og-image.png',
    keywords: ['saena ai', 'ai platform', 'machine learning']
  });
  
  // FAQ 스키마
  const faqSchema = generateFAQSchema([
    {
      question: 'What is SAENA AI Platform?',
      answer: 'SAENA is an advanced AI platform that enables developers to build intelligent applications with state-of-the-art machine learning models.'
    },
    {
      question: 'How do I get started with SAENA?',
      answer: 'You can start by signing up for our waitlist at https://the-saena.ai/waitlist and accessing our comprehensive documentation.'
    },
    {
      question: 'What are the pricing options?',
      answer: 'SAENA offers flexible pricing plans including a free tier for developers, professional plans for teams, and enterprise solutions for large organizations.'
    }
  ]);
  
  // Breadcrumb 스키마
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://the-saena.ai' },
    { name: 'Guides', url: 'https://the-saena.ai/guides' },
    { name: 'Complete Guide', url: 'https://the-saena.ai/example-seo-page' }
  ]);
  
  return (
    <>
      {/* EEAT 메타 태그 */}
      <EEATMetaTags metadata={eeatMetadata} />
      
      {/* JSON-LD 스키마 */}
      <JSONLD data={articleSchema} />
      <JSONLD data={faqSchema} />
      <JSONLD data={breadcrumbSchema} />
      
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600">
          <a href="/" className="hover:text-gray-900">Home</a>
          {' / '}
          <a href="/guides" className="hover:text-gray-900">Guides</a>
          {' / '}
          <span className="text-gray-900">Complete Guide</span>
        </nav>
        
        {/* Hero */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            SAENA AI Platform - Complete Guide 2025
          </h1>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
            <span>By {eeatMetadata.author.name}</span>
            <span>•</span>
            <time dateTime={eeatMetadata.datePublished}>
              {new Date(eeatMetadata.datePublished).toLocaleDateString()}
            </time>
            <span>•</span>
            <span>15 min read</span>
          </div>
          
          <p className="text-xl text-gray-700 leading-relaxed">
            Learn how to build intelligent applications with SAENA AI Platform. 
            This comprehensive guide includes code examples, performance benchmarks, 
            and best practices based on our internal research.
          </p>
        </header>
        
        {/* Table of Contents */}
        <nav className="mb-12 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
          <ul className="space-y-2">
            <li><a href="#introduction" className="text-blue-600 hover:underline">1. Introduction</a></li>
            <li><a href="#getting-started" className="text-blue-600 hover:underline">2. Getting Started</a></li>
            <li><a href="#core-features" className="text-blue-600 hover:underline">3. Core Features</a></li>
            <li><a href="#benchmarks" className="text-blue-600 hover:underline">4. Performance Benchmarks</a></li>
            <li><a href="#best-practices" className="text-blue-600 hover:underline">5. Best Practices</a></li>
            <li><a href="#faq" className="text-blue-600 hover:underline">6. FAQ</a></li>
          </ul>
        </nav>
        
        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section id="introduction" className="mb-12">
            <h2 className="text-3xl font-bold mb-4">1. Introduction</h2>
            <p>
              SAENA AI Platform represents a breakthrough in accessible artificial intelligence. 
              Our platform combines state-of-the-art machine learning models with an intuitive 
              developer experience, enabling teams to build intelligent applications faster than ever.
            </p>
            
            {/* 증거: 표 */}
            <div className="my-8">
              <h3 className="text-xl font-semibold mb-4">Platform Comparison</h3>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2">Feature</th>
                    <th className="border border-gray-300 px-4 py-2">SAENA</th>
                    <th className="border border-gray-300 px-4 py-2">Competitor A</th>
                    <th className="border border-gray-300 px-4 py-2">Competitor B</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Setup Time</td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">5 min</td>
                    <td className="border border-gray-300 px-4 py-2">30 min</td>
                    <td className="border border-gray-300 px-4 py-2">45 min</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">API Latency</td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">120ms</td>
                    <td className="border border-gray-300 px-4 py-2">250ms</td>
                    <td className="border border-gray-300 px-4 py-2">180ms</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Free Tier</td>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">10K requests/mo</td>
                    <td className="border border-gray-300 px-4 py-2">5K requests/mo</td>
                    <td className="border border-gray-300 px-4 py-2">3K requests/mo</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-sm text-gray-600 mt-2">
                Source: SAENA Internal Benchmarks, October 2025
              </p>
            </div>
          </section>
          
          <section id="getting-started" className="mb-12">
            <h2 className="text-3xl font-bold mb-4">2. Getting Started</h2>
            
            {/* 증거: 코드 샘플 */}
            <div className="my-8">
              <h3 className="text-xl font-semibold mb-4">Quick Start Example</h3>
              <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
                <code>{`import { SAENA } from '@saena/sdk';

const client = new SAENA({
  apiKey: process.env.SAENA_API_KEY
});

async function generateText(prompt: string) {
  const response = await client.generate({
    model: 'saena-1',
    prompt: prompt,
    maxTokens: 100
  });
  
  return response.text;
}

// Usage
const result = await generateText('Explain quantum computing');
console.log(result);`}</code>
              </pre>
            </div>
          </section>
          
          <section id="benchmarks" className="mb-12">
            <h2 className="text-3xl font-bold mb-4">4. Performance Benchmarks</h2>
            <p>
              Based on our exclusive dataset of 10,000+ production deployments, 
              SAENA demonstrates superior performance across key metrics.
            </p>
            
            {/* 독점 데이터 명시 */}
            <div className="my-8 p-6 bg-blue-50 border-l-4 border-blue-500">
              <p className="font-semibold">📊 SAENA Dataset</p>
              <p className="text-sm text-gray-700 mt-2">
                This benchmark is based on proprietary data collected from SAENA's 
                production infrastructure between August-October 2025. 
                <a href="/datasets/benchmark-2025" className="text-blue-600 hover:underline ml-1">
                  View full dataset →
                </a>
              </p>
            </div>
          </section>
          
          <section id="faq" className="mb-12">
            <h2 className="text-3xl font-bold mb-4">6. Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">What is SAENA AI Platform?</h3>
                <p>
                  SAENA is an advanced AI platform that enables developers to build 
                  intelligent applications with state-of-the-art machine learning models.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">How do I get started with SAENA?</h3>
                <p>
                  You can start by signing up for our waitlist at{' '}
                  <a href="/waitlist" className="text-blue-600 hover:underline">
                    https://the-saena.ai/waitlist
                  </a>
                  {' '}and accessing our comprehensive documentation.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">What are the pricing options?</h3>
                <p>
                  SAENA offers flexible pricing plans including a free tier for developers, 
                  professional plans for teams, and enterprise solutions for large organizations.
                </p>
              </div>
            </div>
          </section>
        </div>
        
        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            <p>
              <strong>Author:</strong> {eeatMetadata.author.name}
              {eeatMetadata.author.credentials && ` - ${eeatMetadata.author.credentials}`}
            </p>
            <p className="mt-2">
              <strong>Last Updated:</strong>{' '}
              <time dateTime={eeatMetadata.dateModified}>
                {new Date(eeatMetadata.dateModified).toLocaleDateString()}
              </time>
            </p>
            <p className="mt-2">
              <a href={eeatMetadata.editorialPolicyUrl} className="text-blue-600 hover:underline">
                Editorial Policy
              </a>
            </p>
          </div>
        </footer>
      </article>
    </>
  );
}
