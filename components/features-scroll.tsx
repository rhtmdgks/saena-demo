'use client';

import ScrollStack, { ScrollStackItem } from './ScrollStack';

export function FeaturesScroll() {
  return (
    <section className="relative bg-black py-16">
      <div className="container mx-auto px-4 mb-12 text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Scroll Down
        </h2>
      </div>

      <div className="relative h-[600px]">
        <ScrollStack>
          <ScrollStackItem itemClassName="ssc-demo-1">
            <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>
              Text Animations
            </h3>
            <div style={{ fontSize: '4rem', textAlign: 'center' }}>📝</div>
          </ScrollStackItem>
          
          <ScrollStackItem itemClassName="ssc-demo-2">
            <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>
              Animations
            </h3>
            <div style={{ fontSize: '4rem', textAlign: 'center' }}>▶️</div>
          </ScrollStackItem>
          
          <ScrollStackItem itemClassName="ssc-demo-3">
            <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>
              Components
            </h3>
            <div style={{ fontSize: '4rem', textAlign: 'center' }}>🧩</div>
          </ScrollStackItem>
          
          <ScrollStackItem itemClassName="ssc-demo-4">
            <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>
              Backgrounds
            </h3>
            <div style={{ fontSize: '4rem', textAlign: 'center' }}>🖼️</div>
          </ScrollStackItem>
          
          <ScrollStackItem itemClassName="ssc-demo-5">
            <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
              All on React Bits!
            </h3>
          </ScrollStackItem>
        </ScrollStack>
      </div>
    </section>
  );
}
