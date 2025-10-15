import { WaitlistWrapper } from "@/components/waitlist-wrapper";
import { Alex_Brush } from "next/font/google";
import clsx from "clsx";
import { Metadata } from "next";

const font = Alex_Brush({
  variable: "--font-alex-brush",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Manifesto | GOODWILL(KE)",
  description: "Our vision and mission for 3D animation services",
};

export default function Manifesto() {
  return (
    <WaitlistWrapper>
      <div className="flex flex-col gap-10">
        <div className="text-slate-11 [&>p]:tracking-tight [&>p]:leading-[1.6] [&>p:not(:last-child)]:mb-3 text-pretty text-start">
          <p>
            We believe that every brand deserves to be seen, understood, and
            represented not just ranked on a search result.
          </p>
          <p>
            Our mission is to empower creators, marketers, and companies to
            thrive in the Answer Engine Era, where AI doesn’t just find
            information it shapes perception.
          </p>
          <p>
            We’re building tools that make brand presence measurable,
            controllable, and expandable across AI platforms like ChatGPT,
            Perplexity, and Copilot so your identity stays clear in every
            answer.
          </p>
          <p>
            From startups to global enterprises, we help brands earn trust and
            recognition in the new cognitive web.
          </p>
          <p>
            Join us as we redefine what it means to be visible not on the
            internet, but inside intelligence itself.
          </p>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-0.5 items-start">
            <p
              className={clsx(
                "text-slate-12 text-4xl font-medium italic transform -rotate-12",
                font.className
              )}
            >
              Edmond Ko
            </p>
            <p className="text-slate-11 text-sm font-medium">
              Edmond Ko{" "}
              <span className="text-slate-10 text-xs">
                CEO @ GOODWILL(KE) Inc.
              </span>
            </p>
          </div>
        </div>
      </div>
    </WaitlistWrapper>
  );
}
