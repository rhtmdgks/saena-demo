import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  const buttonNew = (
    <Button
      asChild
      className="rounded-full bg-lime-400 px-6 text-black hover:bg-lime-300"
    >
      <a href="/prototype">
        SAENA 데모 이용해보기
      </a>
    </Button>
  );

  return (
    <section className="relative isolate overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center py-14 sm:py-20">
          <div className="mb-5 flex items-center gap-2">
            <Image
              src="/icons/goodwill_white.svg"
              alt="GOODWILL(KE) logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <p className="text-sm uppercase tracking-[0.1em] text-lime-300/80">
              SAENA
            </p>
          </div>
          <h1 className="mt-3 text-center text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block">HIGH-IMPACT</span>
            <span className="block text-lime-300 drop-shadow-[0_0_40px_rgba(132,204,22,0.8)]">
              BRAND PRESENCE
            </span>
            <span className="block">FOR THE AI ERA</span>
          </h1>
          <div className="mt-6">{buttonNew}</div>
        </div>
      </div>
    </section>
  );
}
