"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { ExamplesDialog } from "./examples-dialog";
import SlotCounter from "react-slot-counter";

type Feature = { text: string; muted?: boolean };

const ACCENT = "#C6FF3A";

function FeatureItem({ text, muted = false }: Feature) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle2 className="mt-0.5 h-4 w-4" style={{ color: ACCENT }} />
      <span
        className={`text-sm ${muted ? "text-neutral-500" : "text-neutral-200"}`}
      >
        {text}
      </span>
    </li>
  );
}

type Currency = "INR" | "USD";

const PRICES: Record<
  Currency,
  {
    starter: { monthly: string; yearly: string };
    basic: { monthly: string; yearly: string };
    professional: { monthly: string; yearly: string };
    enterprise: string;
    save: string;
  }
> = {
  INR: {
    starter: { monthly: "₹0", yearly: "₹0" },
    basic: { monthly: "₹12,500/-", yearly: "₹10,000/-" },
    professional: { monthly: "₹41,500/-", yearly: "₹34,250/-" },
    enterprise: "Custom",
    save: "Save 20%",
  },
  USD: {
    starter: { monthly: "$0", yearly: "$0" },
    basic: { monthly: "$149", yearly: "$119" },
    professional: { monthly: "$499", yearly: "$411" },
    enterprise: "Custom",
    save: "Save 20%",
  },
};

function guessLocalCurrency(): Currency {
  const lang = typeof navigator !== "undefined" ? navigator.language : "";
  const tz =
    typeof Intl !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : "";
  if (/-(IN|PK|BD)\b/i.test(lang) || /(Kolkata|Karachi|Dhaka)/i.test(tz || ""))
    return "INR";
  return "USD";
}

// Startup demo videos
const startupVideos = [
  "ysz5S6PUM-U",
  "aqz-KE-bpKQ",
  "ScMzIvxBSi4",
  "dQw4w9WgXcQ",
  "VYOjWnS4cMY",
  "9bZkp7q19f0",
  "3JZ_D3ELwOQ",
  "e-ORhEE9VVg",
  "fJ9rUzIMcZQ",
];

// Pro demo videos
const proVideos = [
  "ASV2myPRfKA",
  "eTfS2lqwf6A",
  "KALbYHmGV4I",
  "Go0AA9hZ4as",
  "sB7RZ9QCOAg",
  "TK2WboJOJaw",
  "5Xq7UdXXOxI",
  "kMjWCidQSK0",
  "RKKdQvwKOhQ",
];

// Premium demo videos
const premiumVideos = [
  "v2AC41dglnM",
  "pRpeEdMmmQ0",
  "3AtDnEC4zak",
  "JRfuAukYTKg",
  "LsoLEjrDogU",
  "RB-RcX5DS5A",
  "hTWKbfoikeg",
  "YQHsXMglC9A",
  "09R8_2nJtjg",
];

export function Pricing() {
  const [openPlan, setOpenPlan] = useState<
    null | "Starter" | "Basic" | "Professional" | "Enterprise"
  >(null);
  const [currency, setCurrency] = useState<Currency>("USD");
  const [isYearlyBasic, setIsYearlyBasic] = useState(false);
  const [isYearlyProfessional, setIsYearlyProfessional] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/geo", { 
          cache: "no-store",
          signal: AbortSignal.timeout(5000) // Add timeout
        });
        if (!res.ok) throw new Error("geo failed");
        const data = await res.json();
        if (!cancelled && data?.currency) {
          setCurrency(data.currency === "INR" ? "INR" : "USD");
        }
      } catch (error) {
        // Log error for debugging but don't expose to user
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to fetch geo data:', error);
        }
        if (!cancelled) setCurrency(guessLocalCurrency());
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="pricing"
      className="text-white"
      itemScope
      itemType="https://schema.org/PriceSpecification"
    >
      <div className="container mx-auto px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="mx-auto mb-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
            style={{ backgroundColor: "rgba(198,255,58,0.12)", color: ACCENT }}
          >
            가격 플랜
          </div>
          <h2
            className="text-4xl font-extrabold tracking-tight sm:text-5xl"
            itemProp="name"
          >
            Our Pricing.
          </h2>
          <p
            className="mx-auto mt-2 max-w-xl text-sm text-neutral-400"
            itemProp="description"
          >
            숨겨진 비용 없이, 당신의 비즈니스에 맞는 AI 브랜드 모니터링 솔루션
          </p>
          <div className="mt-6">
            <Button
              asChild
              className="rounded-full px-5 text-neutral-900 hover:brightness-95"
              style={{ backgroundColor: "#f2f2f2" }}
            >
              <Link href="/waitlist">
                지금 시작하기
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {/* Starter */}
          <Card
            className="relative overflow-hidden rounded-2xl liquid-glass shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-300"
            itemScope
            itemType="https://schema.org/Offer"
          >
            <CardHeader className="space-y-3 pb-4">
              <div
                className="text-sm font-semibold text-neutral-200"
                itemProp="name"
              >
                Starter
              </div>
              <div className="flex items-end gap-1 text-neutral-100">
                <div
                  className="text-xl font-bold tracking-tight"
                  itemProp="price"
                >
                  {PRICES[currency].starter.monthly}
                </div>
                <span className="pb-0.5 text-[11px] text-neutral-400">
                  /month
                </span>
                <meta itemProp="priceCurrency" content={currency} />
              </div>
              <div className="h-[2rem]"></div>
              <Button
                asChild
                className="w-full rounded-full px-4 py-2 text-sm font-medium text-black shadow transition-[box-shadow,transform,filter] active:translate-y-[1px]"
                style={{ backgroundColor: ACCENT }}
              >
                <Link href="/waitlist">선택하기</Link>
              </Button>
            </CardHeader>

            <CardContent className="pt-0">
              <ul className="grid gap-2" itemProp="description">
                {[
                  "5개 LLM 모니터링",
                  "주간 리포트",
                  "기본 브랜드 추적",
                  "이메일 알림",
                  "대시보드 접근",
                  "커뮤니티 지원",
                ].map((f, i) => (
                  <FeatureItem key={i} text={f} />
                ))}
              </ul>
            </CardContent>
            <CardFooter />
          </Card>

          {/* Basic */}
          <Card
            className="relative overflow-hidden rounded-2xl liquid-glass shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-300"
            itemScope
            itemType="https://schema.org/Offer"
          >
            <CardHeader className="space-y-3 pb-4">
              <div
                className="text-sm font-semibold text-neutral-200"
                itemProp="name"
              >
                Basic
              </div>
              <div className="flex items-end gap-1 text-neutral-100 transition-all duration-300">
                <div
                  className="text-xl font-bold tracking-tight flex items-end"
                  itemProp="price"
                >
                  <span>{currency === "USD" ? "$" : "₹"}</span>
                  <SlotCounter
                    value={(isYearlyBasic
                      ? PRICES[currency].basic.yearly
                      : PRICES[currency].basic.monthly
                    ).replace(/[$₹]/g, "")}
                    duration={0.5}
                    animateOnVisible={false}
                    direction={isYearlyBasic ? "bottom-up" : "top-down"}
                    startValueOnce={false}
                    autoAnimationStart={true}
                  />
                </div>
                <span className="pb-0.5 text-[11px] text-neutral-400 transition-all duration-300">
                  /month
                </span>
                <meta itemProp="priceCurrency" content={currency} />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <button
                  onClick={() => setIsYearlyBasic(!isYearlyBasic)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    isYearlyBasic ? "bg-lime-400" : "bg-neutral-600"
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                      isYearlyBasic ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
                <span className="text-neutral-400 text-xs">Billed yearly</span>
              </div>

              <Button
                asChild
                className="w-full rounded-full px-4 py-2 text-sm font-medium text-black shadow transition-[box-shadow,transform,filter] active:translate-y-[1px]"
                style={{ backgroundColor: ACCENT }}
              >
                <Link href="/waitlist">선택하기</Link>
              </Button>
            </CardHeader>

            <CardContent className="pt-0">
              <ul className="grid gap-2" itemProp="description">
                {[
                  "9개 LLM 모니터링",
                  "일일 리포트",
                  "경쟁사 비교 분석",
                  "실시간 알림",
                  "API 접근",
                  "우선 지원",
                ].map((f, i) => (
                  <FeatureItem key={i} text={f} />
                ))}
              </ul>
            </CardContent>
            <CardFooter />
          </Card>

          {/* Professional */}
          <Card
            className="relative overflow-hidden rounded-2xl liquid-glass shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-300"
            itemScope
            itemType="https://schema.org/Offer"
          >
            <CardHeader className="space-y-3 pb-4">
              <div
                className="text-sm font-semibold text-neutral-200"
                itemProp="name"
              >
                Professional
              </div>
              <div className="flex items-end gap-1 text-neutral-100 transition-all duration-300">
                <div
                  className="text-xl font-bold tracking-tight flex items-end"
                  itemProp="price"
                >
                  <span>{currency === "USD" ? "$" : "₹"}</span>
                  <SlotCounter
                    value={(isYearlyProfessional
                      ? PRICES[currency].professional.yearly
                      : PRICES[currency].professional.monthly
                    ).replace(/[$₹]/g, "")}
                    duration={0.5}
                    animateOnVisible={false}
                    direction={isYearlyProfessional ? "bottom-up" : "top-down"}
                    startValueOnce={false}
                    autoAnimationStart={true}
                  />
                </div>
                <span className="pb-0.5 text-[11px] text-neutral-400 transition-all duration-300">
                  /month
                </span>
                <meta itemProp="priceCurrency" content={currency} />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <button
                  onClick={() => setIsYearlyProfessional(!isYearlyProfessional)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    isYearlyProfessional ? "bg-lime-400" : "bg-neutral-600"
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                      isYearlyProfessional ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
                <span className="text-neutral-400 text-xs">Billed yearly</span>
              </div>

              <Button
                asChild
                className="w-full rounded-full px-4 py-2 text-sm font-medium text-black shadow transition-[box-shadow,transform,filter] active:translate-y-[1px]"
                style={{ backgroundColor: ACCENT }}
              >
                <Link href="/waitlist">선택하기</Link>
              </Button>
            </CardHeader>

            <CardContent className="pt-0">
              <ul className="grid gap-2" itemProp="description">
                {[
                  "무제한 LLM 모니터링",
                  "실시간 리포트",
                  "고급 분석 및 인사이트",
                  "커스텀 알림 설정",
                  "전용 API 및 웹훅",
                  "전담 계정 매니저",
                ].map((f, i) => (
                  <FeatureItem key={i} text={f} />
                ))}
              </ul>
            </CardContent>
            <CardFooter />
          </Card>

          {/* Enterprise */}
          <Card
            className="relative overflow-hidden rounded-2xl liquid-glass-enhanced shadow-[0_16px_50px_rgba(0,0,0,0.4)] transition-all duration-300"
            itemScope
            itemType="https://schema.org/Offer"
          >
            <CardHeader className="relative space-y-3 pb-4">
              <div
                className="text-sm font-semibold text-neutral-200"
                itemProp="name"
              >
                Enterprise
              </div>
              <div className="flex items-end gap-1 text-white">
                <div
                  className="text-xl font-bold tracking-tight"
                  itemProp="price"
                >
                  {PRICES[currency].enterprise}
                </div>
                <meta itemProp="priceCurrency" content={currency} />
              </div>
              <div className="h-[2rem]"></div>
              <Button
                asChild
                className="w-full rounded-full px-4 py-2 text-sm font-medium text-black shadow transition-[box-shadow,transform,filter] active:translate-y-[1px]"
                style={{ backgroundColor: ACCENT }}
              >
                <Link href="/waitlist">선택하기</Link>
              </Button>
            </CardHeader>

            <CardContent className="relative pt-0">
              <ul className="grid gap-2" itemProp="description">
                {[
                  "엔터프라이즈급 모니터링",
                  "커스텀 통합",
                  "온프레미스 옵션",
                  "SLA 보장",
                  "무제한 사용자",
                  "전담 기술 지원",
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4"
                      style={{ color: ACCENT }}
                    />
                    <span className="text-sm text-neutral-200">{f}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter />
          </Card>
        </div>
      </div>

      {/* Modals */}
      <ExamplesDialog
        open={openPlan === "Starter"}
        onOpenChange={(v) => setOpenPlan(v ? "Starter" : null)}
        planName="Starter Plan"
        price={PRICES[currency].starter.monthly}
        videoIds={startupVideos}
      />
      <ExamplesDialog
        open={openPlan === "Basic"}
        onOpenChange={(v) => setOpenPlan(v ? "Basic" : null)}
        planName="Basic Plan"
        price={
          isYearlyBasic
            ? PRICES[currency].basic.yearly
            : PRICES[currency].basic.monthly
        }
        videoIds={proVideos}
      />
      <ExamplesDialog
        open={openPlan === "Professional"}
        onOpenChange={(v) => setOpenPlan(v ? "Professional" : null)}
        planName="Professional Plan"
        price={
          isYearlyProfessional
            ? PRICES[currency].professional.yearly
            : PRICES[currency].professional.monthly
        }
        videoIds={premiumVideos}
      />
      <ExamplesDialog
        open={openPlan === "Enterprise"}
        onOpenChange={(v) => setOpenPlan(v ? "Enterprise" : null)}
        planName="Enterprise Plan"
        price={PRICES[currency].enterprise}
        videoIds={premiumVideos}
      />
    </section>
  );
}
