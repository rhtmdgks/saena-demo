'use client';

import MagicBento from './MagicBento';

export function SaenaFeatures() {
  return (
    <section className="container mx-auto px-4 py-16 sm:py-20">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Powerful Features
        </h2>
        <p className="mt-4 text-lg text-gray-400">
          AI 검색 환경을 장악하는 데 필요한 모든 기능
        </p>
      </div>
      
      <div className="flex justify-center">
        <MagicBento
          textAutoHide={false}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12}
          glowColor="132, 204, 22"
        />
      </div>
    </section>
  );
}
