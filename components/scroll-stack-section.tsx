'use client';

import ScrollStack, { ScrollStackItem } from './ScrollStack';

export function ScrollStackSection() {
  return (
    <section className="relative w-full bg-black">
      <div className="container mx-auto px-4 pt-16 sm:pt-20 pb-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Our Process
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Scroll to see how we bring your vision to life
          </p>
        </div>
      </div>

      <ScrollStack
        itemDistance={100}
        itemScale={0.03}
        itemStackDistance={30}
        stackPosition="20%"
        scaleEndPosition="10%"
        baseScale={0.85}
        useWindowScroll={true}
      >
        <ScrollStackItem itemClassName="bg-gradient-to-br from-[#667eea] to-[#764ba2]">
          <div className="flex flex-col items-center justify-center h-full">
            <h3 className="text-4xl font-bold text-white mb-4">Discovery</h3>
            <p className="text-xl text-white/90 text-center">
              We start by understanding your brand, goals, and target audience
            </p>
          </div>
        </ScrollStackItem>

        <ScrollStackItem itemClassName="bg-gradient-to-br from-[#f093fb] to-[#f5576c]">
          <div className="flex flex-col items-center justify-center h-full">
            <h3 className="text-4xl font-bold text-white mb-4">Concept</h3>
            <p className="text-xl text-white/90 text-center">
              Our team creates unique concepts tailored to your vision
            </p>
          </div>
        </ScrollStackItem>

        <ScrollStackItem itemClassName="bg-gradient-to-br from-[#4facfe] to-[#00f2fe]">
          <div className="flex flex-col items-center justify-center h-full">
            <h3 className="text-4xl font-bold text-white mb-4">Production</h3>
            <p className="text-xl text-white/90 text-center">
              We bring your animation to life with cutting-edge 3D technology
            </p>
          </div>
        </ScrollStackItem>

        <ScrollStackItem itemClassName="bg-gradient-to-br from-[#43e97b] to-[#38f9d7]">
          <div className="flex flex-col items-center justify-center h-full">
            <h3 className="text-4xl font-bold text-white mb-4">Refinement</h3>
            <p className="text-xl text-white/90 text-center">
              Multiple revision rounds ensure perfection in every detail
            </p>
          </div>
        </ScrollStackItem>

        <ScrollStackItem itemClassName="bg-gradient-to-br from-[#fa709a] to-[#fee140]">
          <div className="flex flex-col items-center justify-center h-full">
            <h3 className="text-4xl font-bold text-white mb-4">Delivery</h3>
            <p className="text-xl text-white/90 text-center">
              Your final animation, ready to wow your audience
            </p>
          </div>
        </ScrollStackItem>
      </ScrollStack>
    </section>
  );
}
