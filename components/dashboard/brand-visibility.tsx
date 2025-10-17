"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useState, useRef, useMemo } from "react";
import { motion, useInView } from "motion/react";
import { LineChart } from "@mui/x-charts/LineChart";
import { createTheme, ThemeProvider } from "@mui/material/styles";

interface BrandRanking {
  rank: number;
  brand: string;
  visibility: number;
  change: number;
  trending: string;
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

export default function BrandVisibility() {
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

  const brandRankings = [
    { rank: 1, brand: "Chase", visibility: 92, change: 5, trending: "up" },
    { rank: 2, brand: "Rho", visibility: 89.8, change: 1, trending: "up" },
    {
      rank: 3,
      brand: "American Express",
      visibility: 85.2,
      change: -1,
      trending: "down",
    },
    {
      rank: 4,
      brand: "Capital on Tap",
      visibility: 78,
      change: 5,
      trending: "up",
    },
    {
      rank: 5,
      brand: "US Bank",
      visibility: 76.9,
      change: -2,
      trending: "down",
    },
    { rank: 6, brand: "Bill", visibility: 72.3, change: 1.8, trending: "up" },
    { rank: 7, brand: "Brex", visibility: 71.5, change: 3.2, trending: "up" },
    {
      rank: 8,
      brand: "Mercury",
      visibility: 68.4,
      change: 2.1,
      trending: "up",
    },
    {
      rank: 9,
      brand: "Divvy",
      visibility: 65.8,
      change: -1.5,
      trending: "down",
    },
    {
      rank: 10,
      brand: "Expensify",
      visibility: 63.2,
      change: 1.2,
      trending: "up",
    },
    {
      rank: 11,
      brand: "Stripe",
      visibility: 61.7,
      change: 4.3,
      trending: "up",
    },
    {
      rank: 12,
      brand: "Square",
      visibility: 59.3,
      change: -0.8,
      trending: "down",
    },
    {
      rank: 13,
      brand: "PayPal",
      visibility: 57.9,
      change: 2.5,
      trending: "up",
    },
    { rank: 14, brand: "Wise", visibility: 55.4, change: 3.7, trending: "up" },
    {
      rank: 15,
      brand: "Revolut",
      visibility: 53.1,
      change: -2.1,
      trending: "down",
    },
    { rank: 16, brand: "N26", visibility: 50.8, change: 1.9, trending: "up" },
    { rank: 17, brand: "Chime", visibility: 48.5, change: 0.6, trending: "up" },
    {
      rank: 18,
      brand: "Varo",
      visibility: 46.2,
      change: -1.3,
      trending: "down",
    },
    {
      rank: 19,
      brand: "Current",
      visibility: 43.9,
      change: 2.8,
      trending: "up",
    },
    { rank: 20, brand: "Novo", visibility: 41.5, change: 1.4, trending: "up" },
  ];

  const chartData = [65, 70, 68, 75, 82, 78, 85, 89.8];
  const dates = [
    "Jan 29",
    "Jan 30",
    "Jan 31",
    "Feb 01",
    "Feb 02",
    "Feb 03",
    "Feb 04",
    "Feb 05",
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      {/* Visibility Chart */}
      <div className="lg:col-span-2">
        <div className="mb-4">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">
              89.8%
            </span>
            <span className="text-accent-green-glow text-base font-medium flex items-center gap-1">
              <ArrowUpRight className="h-5 w-5" />
              1% vs last week
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
