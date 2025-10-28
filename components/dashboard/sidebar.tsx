"use client";

import {
  BarChart2,
  Building2,
  CreditCard,
  Folder,
  MessagesSquare,
  Video,
  Settings,
  HelpCircle,
  Menu,
  ShoppingCart,
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  Package,
  Home,
  Users2,
  Shield,
  Presentation,
} from "lucide-react";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  function handleNavigation() {
    setIsMobileMenuOpen(false);
  }

  function handleSubmenuClick(submenu: string) {
    setActiveSubmenu(submenu);
  }

  function handleBackClick() {
    setActiveSubmenu(null);
  }

  function NavItem({
    href,
    icon: Icon,
    children,
    hasSubmenu = false,
    onClick,
  }: {
    href?: string;
    icon: any;
    children: React.ReactNode;
    hasSubmenu?: boolean;
    onClick?: () => void;
  }) {
    const isActive = href && pathname === href;
    const baseClassName =
      "flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors";
    const activeClassName = isActive
      ? "bg-accent-green/10 text-accent-green dark:text-accent-green"
      : "text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-gray-50 dark:hover:bg-[#1F1F23]";
    const className = `${baseClassName} ${activeClassName}`;

    if (hasSubmenu) {
      return (
        <button onClick={onClick} className={`${className} w-full`}>
          <div className="flex items-center">
            <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
            {children}
          </div>
          <ChevronRight className="h-4 w-4 flex-shrink-0" />
        </button>
      );
    }

    return (
      <Link href={href || "#"} onClick={handleNavigation} className={className}>
        <div className="flex items-center">
          <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
          {children}
        </div>
      </Link>
    );
  }

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-200" />
      </button>
      <nav
        className={`
                fixed inset-y-0 left-0 z-[70] w-64 bg-white dark:bg-[#0F0F12] transform transition-transform duration-200 ease-in-out
                lg:translate-x-0 lg:static lg:w-64 border-r border-gray-200 dark:border-[#1F1F23] overflow-hidden
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        {/* Main Menu */}
        <div
          className={`h-full flex flex-col absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform ${
            activeSubmenu ? "-translate-x-full" : "translate-x-0"
          }`}
          style={{
            transform: activeSubmenu
              ? "translate3d(-100%, 0, 0)"
              : "translate3d(0, 0, 0)",
          }}
        >
          <div className="h-16 px-6 flex items-center border-b border-gray-200 dark:border-[#1F1F23]">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                SAENA
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-6">
              <div>
                <div className="px-3 mb-2 text-xs font-semibold tracking-wider text-gray-500 dark:text-gray-300">
                  Answer Engine Insights
                </div>
                <div className="space-y-1">
                  <NavItem href="/prototype" icon={Home}>
                    Home
                  </NavItem>
                  <NavItem href="/prototype/search" icon={BarChart2}>
                    Search
                  </NavItem>
                  <NavItem href="/prototype/industry" icon={Building2}>
                    Industry
                  </NavItem>
                  <NavItem href="/prototype/topic" icon={MessagesSquare}>
                    Topic
                  </NavItem>
                  <NavItem href="/prototype/model" icon={Folder}>
                    Model
                  </NavItem>
                  <NavItem href="/prototype/citation" icon={CreditCard}>
                    Citation
                  </NavItem>
                  <NavItem href="/prototype/improve" icon={Video}>
                    Improve
                  </NavItem>
                  <NavItem href="/prototype/marketing" icon={TrendingUp}>
                    Marketing Strategy
                  </NavItem>
                  <NavItem href="/prototype/stp" icon={Users2}>
                    STP Insight
                  </NavItem>
                  <NavItem href="/prototype/cvi" icon={Shield}>
                    CVI
                  </NavItem>
                </div>
              </div>

              <div className="border-t border-gray-300 dark:border-gray-600 pt-6">
                <div className="space-y-1">
                  <NavItem
                    icon={TrendingUp}
                    hasSubmenu
                    onClick={() => handleSubmenuClick("analytics")}
                  >
                    Analytics
                  </NavItem>
                  <NavItem
                    icon={ShoppingCart}
                    hasSubmenu
                    onClick={() => handleSubmenuClick("shopping")}
                  >
                    Shopping
                  </NavItem>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-4 border-t border-gray-300 dark:border-gray-600">
            <div className="space-y-1">
              <NavItem href="#" icon={Settings}>
                Settings
              </NavItem>
              <NavItem href="#" icon={HelpCircle}>
                Help
              </NavItem>
            </div>
          </div>
        </div>

        {/* Analytics Submenu */}
        <div
          className={`h-full flex flex-col absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform ${
            activeSubmenu === "analytics" ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            transform:
              activeSubmenu === "analytics"
                ? "translate3d(0, 0, 0)"
                : "translate3d(100%, 0, 0)",
          }}
        >
          <div className="h-16 px-6 flex items-center border-b border-gray-200 dark:border-[#1F1F23]">
            <button
              onClick={handleBackClick}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-50 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-6">
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300">
                  Analytics
                </div>
                <div className="space-y-1">
                  <NavItem href="/prototype/analytics/overview" icon={Home}>
                    Overview
                  </NavItem>
                  <NavItem href="/prototype/analytics/brand" icon={CreditCard}>
                    Brand
                  </NavItem>
                  <NavItem href="/prototype/analytics/website" icon={Building2}>
                    Website
                  </NavItem>
                  <NavItem
                    href="/prototype/analytics/conversations"
                    icon={MessagesSquare}
                  >
                    Conversations
                  </NavItem>
                  <NavItem href="/prototype/analytics/copilot" icon={Video}>
                    Copilot
                  </NavItem>
                  <NavItem href="/prototype/analytics/uceg" icon={TrendingUp}>
                    UCEG
                  </NavItem>
                  <NavItem href="/prototype/analytics/aida" icon={BarChart2}>
                    AIDA+
                  </NavItem>
                  <NavItem
                    href="/prototype/analytics/eda"
                    icon={MessagesSquare}
                  >
                    EDA+
                  </NavItem>
                  <NavItem href="/prototype/analytics/pja" icon={Folder}>
                    PJA
                  </NavItem>
                  <NavItem href="/prototype/analytics/bhi" icon={Shield}>
                    BHI
                  </NavItem>
                  <NavItem href="/prototype/analytics/behavioral" icon={Users2}>
                    Behavioral
                  </NavItem>
                  <NavItem
                    href="/prototype/analytics/internal-pulse"
                    icon={Building2}
                  >
                    Internal Pulse
                  </NavItem>
                  <NavItem
                    href="/prototype/analytics/auto-weight"
                    icon={Settings}
                  >
                    Auto-Weight
                  </NavItem>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shopping Submenu */}
        <div
          className={`h-full flex flex-col absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform ${
            activeSubmenu === "shopping" ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            transform:
              activeSubmenu === "shopping"
                ? "translate3d(0, 0, 0)"
                : "translate3d(100%, 0, 0)",
          }}
        >
          <div className="h-16 px-6 flex items-center border-b border-gray-200 dark:border-[#1F1F23]">
            <button
              onClick={handleBackClick}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-50 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-6">
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300">
                  Shopping
                </div>
                <div className="space-y-1">
                  <NavItem href="/prototype/shopping" icon={ShoppingCart}>
                    Overview
                  </NavItem>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
