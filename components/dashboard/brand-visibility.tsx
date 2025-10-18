"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useState, useRef, useMemo } from "react";
import { motion, useInView } from "motion/react";
import { LineChart } from "@mui/x-charts/LineChart";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { BrandVisibilityData } from "@/types/dashboard";

interface BrandRanking {
  rank: number;
  brand: string;
  visibility: number;
  change: number;
  trending: string;
}

interface BrandVisibilityProps {
  data?: BrandVisibilityData;
}

const AnimatedBrandItem = ({
  item,
  index,
  selectedIndex,
  onMouseEnter,
  onClick,
}: {
  item: BrandRanking;
  index: number;
  selectedIndex: number;
  onMouseEnter: () => void;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: false });

  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay: 0.1 }}
      className="mb-4 cursor-pointer"
    >
      <div
        className={`flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-[#1F1F23] hover:bg-gray-100 dark:hover:bg-[#2B2B30] transition-all duration-200 group ${
          selectedIndex === index ? "bg-gray-100 dark:bg-[#2B2B30]" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-gray-500 dark:text-gray-400 text-base w-4 font-medium">
            {item.rank}
          </span>
          <span className="font-medium text-gray-900 dark:text-white text-base group-hover:text-accent-green transition-colors">
            {item.brand}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900 dark:text-white text-base">
            {item.visibility}%
          </span>
          <span
            className={`text-sm flex items-center gap-1 font-medium ${
              item.trending === "up"
                ? "text-accent-green-glow"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {item.trending === "up" ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {Math.abs(item.change)}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const BrandRankingList = ({ items }: { items: BrandRanking[] }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  return (
    <div className="relative w-full">
      <div
        ref={listRef}
        className="max-h-[360px] overflow-y-auto p-4 [&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-[#0F0F12] [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-[#1F1F23] [&::-webkit-scrollbar-thumb]:rounded-[4px]"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#1F1F23 #0F0F12",
        }}
      >
        {items.map((item, index) => (
          <AnimatedBrandItem
            key={item.rank}
            item={item}
            index={index}
            selectedIndex={selectedIndex}
            onMouseEnter={() => setSelectedIndex(index)}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default function BrandVisibility({ data }: BrandVisibilityProps) {
  // Create MUI theme for dark mode support
  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
          background: {
            default: "#0F0F12",
            paper: "#0F0F12",
          },
          text: {
            primary: "#ffffff",
            secondary: "#9ca3af",
          },
        },
      }),
    []
  );

  // 실제 데이터가 없으면 기본값 사용
  if (!data) {
    return <div>Loading...</div>;
  }

  // 데이터 변환
  const brandRankings = data.brandRankings.map((item) => ({
    rank: item.rank,
    brand: item.brandName,
    visibility: item.visibilityScore,
    change: item.changePercent,
    trending: item.trending,
  }));

  // 차트 데이터 준비
  const chartData = data.timeSeriesData.map((item) => item.score);
  const dates = data.timeSeriesData.map((item) => {
    const date = new Date(item.date);
    return date.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      {/* Visibility Chart */}
      <div className="lg:col-span-2">
        <div className="mb-4">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">
              {data.currentScore}%
            </span>
            <span
              className={`text-base font-medium flex items-center gap-1 ${
                data.changeTrend === "up"
                  ? "text-accent-green-glow"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {data.changeTrend === "up" ? (
                <ArrowUpRight className="h-5 w-5" />
              ) : (
                <ArrowDownRight className="h-5 w-5" />
              )}
              {data.changePercent}% vs last week
            </span>
          </div>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Visibility Score
          </p>
        </div>

        {/* Line Chart with MUI */}
        <div className="relative w-full">
          <ThemeProvider theme={muiTheme}>
            <LineChart
              height={330}
              series={[
                {
                  curve: "natural",
                  data: chartData,
                  label: "Visibility Score",
                  color: "#C6FF3A",
                  showMark: true,
                  area: true,
                },
              ]}
              xAxis={[
                {
                  scaleType: "point",
                  data: dates,
                },
              ]}
              yAxis={[
                {
                  min: 60,
                  max: 95,
                  disableLine: true,
                  disableTicks: true,
                },
              ]}
              sx={{
                "& .MuiLineElement-root": {
                  strokeWidth: 3,
                  filter: "drop-shadow(0 0 8px rgba(198, 255, 58, 0.5))",
                },
                "& .MuiMarkElement-root": {
                  fill: "#C6FF3A",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                  r: 4,
                  scale: "1",
                  transition: "all 0.2s",
                  filter: "drop-shadow(0 0 6px rgba(198, 255, 58, 0.8))",
                  "&:hover": {
                    r: 6,
                    scale: "1.5",
                  },
                },
                "& .MuiAreaElement-root": {
                  fill: "url(#lineGradient)",
                  fillOpacity: 1,
                },
                "& .MuiChartsAxis-line": {
                  stroke: "#374151",
                  strokeWidth: 1,
                },
                "& .MuiChartsAxis-tick": {
                  stroke: "#374151",
                },
                "& .MuiChartsAxis-tickLabel": {
                  fill: "#9ca3af",
                  fontSize: "12px",
                },
                "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
                  display: "none",
                },
                "& .MuiChartsGrid-line": {
                  stroke: "#374151",
                  strokeDasharray: "4 4",
                  strokeWidth: 1,
                },
                "& .MuiChartsLegend-series text": {
                  fill: "#ffffff !important",
                },
              }}
              grid={{ vertical: false, horizontal: true }}
              margin={{ left: 10, right: 20, top: 20, bottom: 40 }}
            >
              <defs>
                <linearGradient
                  id="lineGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#C6FF3A" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#C6FF3A" stopOpacity="0.05" />
                </linearGradient>
              </defs>
            </LineChart>
          </ThemeProvider>
        </div>
      </div>

      {/* Brand Ranking Table */}
      <div>
        <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
          Brand Industry Ranking
        </h4>
        <BrandRankingList items={brandRankings} />
      </div>
    </div>
  );
}
