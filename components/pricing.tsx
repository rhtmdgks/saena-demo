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
    awareness: { monthly: string; yearly: string };
    growth: { monthly: string; yearly: string };
    scaleup: { monthly: string; yearly: string };
    enterprise: string;
    save: string;
  }
> = {
  INR: {
    awareness: { monthly: "₹0", yearly: "₹0" },
    growth: { monthly: "₹12,500/-", yearly: "₹1,25,000/-" },
    scaleup: { monthly: "₹33,500/-", yearly: "₹3,35,000/-" },
    enterprise: "Custom",
    save: "Save Flat ₹1,500/-",
  },
  USD: {
    awareness: { monthly: "$0", yearly: "$0" },
    growth: { monthly: "$149", yearly: "$124.17" },
    scaleup: { monthly: "$399", yearly: "$332.50" },
    enterprise: "Custom",
    save: "Save $20",
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
    null | "Awareness" | "Growth" | "ScaleUp" | "Enterprise"
  >(null);
  const [currency, setCurrency] = useState<Currency>("USD");
  const [isYearlyGrowth, setIsYearlyGrowth] = useState(false);
  const [isYearlyScaleup, setIsYearlyScaleup] = useState(false);

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
            Our Pricing and Packages
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
            No hidden fees. Just world-class animation that fits your budget.
          </p>
          <div className="mt-6">
            <Button
              asChild
              className="rounded-full px-5 text-neutral-900 hover:brightness-95"
              style={{ backgroundColor: "#f2f2f2" }}
            >
              <Link href="https://wa.link/rc25na" target="_blank">
                Contact now
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {/* Awareness */}
          <Card
            className="relative overflow-hidden rounded-2xl liquid-glass shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-300"
            itemScope
            itemType="https://schema.org/Offer"
          >
            <div
              className="absolute right-4 top-11 rounded-full px-2 py-0.5 text-[10px]"
              style={{ backgroundColor: "#1f1f1f", color: "#d4d4d4" }}
            >
              {PRICES[currency].save}
            </div>

            <CardHeader className="space-y-3 pb-4">
              <div
                className="text-sm font-semibold text-neutral-200"
                itemProp="name"
              >
                Awareness
              </div>
              <div className="flex items-end gap-1 text-neutral-100">
                <div
                  className="text-xl font-bold tracking-tight"
                  itemProp="price"
                >
                  {PRICES[currency].awareness.monthly}
                </div>
                <span className="pb-0.5 text-[11px] text-neutral-400">
                  /month
                </span>
                <meta itemProp="priceCurrency" content={currency} />
              </div>
              <div className="h-[2rem]"></div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={() => setOpenPlan("Awareness")}
                  onTouchStart={() => setOpenPlan("Awareness")}
                  className="flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: "#0a0a0a",
                    color: "#ffffff",
                    border: "1px solid #333",
                  }}
                >
                  View Example
                </Button>
                <Button
                  asChild
                  className="flex-1 rounded-full px-4 py-2 text-sm font-medium text-black shadow transition-[box-shadow,transform,filter] active:translate-y-[1px]"
                  style={{ backgroundColor: ACCENT }}
                >
                  <Link href="/checkout?plan=awareness">Select</Link>
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <ul className="grid gap-2" itemProp="description">
                {[
                  "10–15s Reel/Teaser (1 SKU)",
                  "Simple background + lighting",
                  "1 revision",
                  "Delivered in 10 days",
                  "Social reel/ad-ready visuals",
                  "3D Modelling - Included",
                ].map((f, i) => (
                  <FeatureItem key={i} text={f} />
                ))}
              </ul>
            </CardContent>
            <CardFooter />
          </Card>

          {/* Growth */}
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
                Growth
              </div>
              <div className="flex items-end gap-1 text-neutral-100 transition-all duration-300">
                <div
                  className="text-xl font-bold tracking-tight flex items-end"
                  itemProp="price"
                >
                  <span>{currency === "USD" ? "$" : "₹"}</span>
                  <SlotCounter
                    value={(isYearlyGrowth
                      ? PRICES[currency].growth.yearly
                      : PRICES[currency].growth.monthly
                    ).replace(/[$₹]/g, "")}
                    duration={0.5}
                    animateOnVisible={false}
                    direction={isYearlyGrowth ? "bottom-up" : "top-down"}
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
                  onClick={() => setIsYearlyGrowth(!isYearlyGrowth)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    isYearlyGrowth ? "bg-lime-400" : "bg-neutral-600"
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                      isYearlyGrowth ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
                <span className="text-neutral-400 text-xs">Billed yearly</span>
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={() => setOpenPlan("Growth")}
                  onTouchStart={() => setOpenPlan("Growth")}
                  className="flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: "#0a0a0a",
                    color: "#ffffff",
                    border: "1px solid #333",
                  }}
                >
                  View Example
                </Button>
                <Button
                  asChild
                  className="flex-1 rounded-full px-4 py-2 text-sm font-medium text-black shadow transition-[box-shadow,transform,filter] active:translate-y-[1px]"
                  style={{ backgroundColor: ACCENT }}
                >
                  <Link href="/checkout?plan=growth">Select</Link>
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <ul className="grid gap-2" itemProp="description">
                {[
                  "20–25s Animation (1 SKU)",
                  "Fixed Shot-list (no surprises)",
                  "Creative background + pro graphics",
                  "2 structured revisions",
                  "Delivered in 3 weeks",
                  "3D Modelling - Included",
                ].map((f, i) => (
                  <FeatureItem key={i} text={f} />
                ))}
              </ul>
            </CardContent>
            <CardFooter />
          </Card>

          {/* Scale-up */}
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
                Scale-up
              </div>
              <div className="flex items-end gap-1 text-neutral-100 transition-all duration-300">
                <div
                  className="text-xl font-bold tracking-tight flex items-end"
                  itemProp="price"
                >
                  <span>{currency === "USD" ? "$" : "₹"}</span>
                  <SlotCounter
                    value={(isYearlyScaleup
                      ? PRICES[currency].scaleup.yearly
                      : PRICES[currency].scaleup.monthly
                    ).replace(/[$₹]/g, "")}
                    duration={0.5}
                    animateOnVisible={false}
                    direction={isYearlyScaleup ? "bottom-up" : "top-down"}
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
                  onClick={() => setIsYearlyScaleup(!isYearlyScaleup)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    isYearlyScaleup ? "bg-lime-400" : "bg-neutral-600"
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                      isYearlyScaleup ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
                <span className="text-neutral-400 text-xs">Billed yearly</span>
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={() => setOpenPlan("ScaleUp")}
                  onTouchStart={() => setOpenPlan("ScaleUp")}
                  className="flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: "#0a0a0a",
                    color: "#ffffff",
                    border: "1px solid #333",
                  }}
                >
                  View Example
                </Button>
                <Button
                  asChild
                  className="flex-1 rounded-full px-4 py-2 text-sm font-medium text-black shadow transition-[box-shadow,transform,filter] active:translate-y-[1px]"
                  style={{ backgroundColor: ACCENT }}
                >
                  <Link href="/checkout?plan=scaleup">Select</Link>
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <ul className="grid gap-2" itemProp="description">
                {[
                  "30–40s Animation (up to 3 SKUs)",
                  "Advanced storyboard + shot design",
                  "Delivered in 4 weeks",
                  "Lighting, Camera Animation, Depth effects",
                  "Up to 3 structured revisions",
                  "3D Modelling - Included",
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
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={() => setOpenPlan("Enterprise")}
                  onTouchStart={() => setOpenPlan("Enterprise")}
                  className="flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: "#0a0a0a",
                    color: "#ffffff",
                    border: "1px solid #333",
                  }}
                >
                  View Example
                </Button>
                <Button
                  asChild
                  className="flex-1 rounded-full px-4 py-2 text-sm font-medium text-black shadow transition-[box-shadow,transform,filter] active:translate-y-[1px]"
                  style={{ backgroundColor: ACCENT }}
                >
                  <Link href="/checkout?plan=enterprise">Select</Link>
                </Button>
              </div>
            </CardHeader>

            <CardContent className="relative pt-0">
              <ul className="grid gap-2" itemProp="description">
                {[
                  "60s+ Animation (up to 10 SKUs)",
                  "Full production pipeline",
                  "Delivered in 6-8 weeks",
                  "Premium lighting, VFX, Post-production",
                  "Unlimited revisions",
                  "3D Modelling - Included",
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
        open={openPlan === "Awareness"}
        onOpenChange={(v) => setOpenPlan(v ? "Awareness" : null)}
        planName="Awareness Plan"
        price={PRICES[currency].awareness.monthly}
        videoIds={startupVideos}
      />
      <ExamplesDialog
        open={openPlan === "Growth"}
        onOpenChange={(v) => setOpenPlan(v ? "Growth" : null)}
        planName="Growth Plan"
        price={
          isYearlyGrowth
            ? PRICES[currency].growth.yearly
            : PRICES[currency].growth.monthly
        }
        videoIds={proVideos}
      />
      <ExamplesDialog
        open={openPlan === "ScaleUp"}
        onOpenChange={(v) => setOpenPlan(v ? "ScaleUp" : null)}
        planName="Scale-up Plan"
        price={
          isYearlyScaleup
            ? PRICES[currency].scaleup.yearly
            : PRICES[currency].scaleup.monthly
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
