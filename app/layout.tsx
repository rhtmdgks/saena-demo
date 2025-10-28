import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import LiquidEtherWrapper from "@/components/liquid-ether-wrapper"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: {
    default: "SAENA | AI Brand Presence Monitoring Platform",
    template: "%s | SAENA"
  },
  description:
    "Track and optimize how AI engines like GPT, Claude, and Perplexity perceive and mention your brand. Real-time monitoring, analytics, and insights for the AI era.",
  keywords: ["AI monitoring", "brand visibility", "LLM tracking", "AI analytics", "brand presence", "GPT monitoring", "Claude tracking", "Perplexity analytics"],
  authors: [{ name: "SAENA by GOODWILL(KE)" }],
  creator: "SAENA by GOODWILL(KE)",
  publisher: "SAENA by GOODWILL(KE)",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://the-saena.ai'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "SAENA | AI Brand Presence Monitoring Platform",
    description: "Track and optimize how AI engines like GPT, Claude, and Perplexity perceive and mention your brand. Real-time monitoring, analytics, and insights for the AI era.",
    url: 'https://the-saena.ai',
    siteName: 'SAENA',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "SAENA | AI Brand Presence Monitoring Platform",
    description: "Track and optimize how AI engines like GPT, Claude, and Perplexity perceive and mention your brand. Real-time monitoring, analytics, and insights for the AI era.",
    creator: '@saena_ai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'G-W6LV22900R',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="relative">
        {/* Dynamic Favicon Script */}
        <Script id="dynamic-favicon" strategy="afterInteractive">
          {`
            function updateFavicon() {
              const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const faviconHref = darkMode ? '/icons/goodwill_white.svg' : '/icons/goodwill_black.svg';
              let link = document.querySelector("link[rel~='icon']");
              if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.getElementsByTagName('head')[0].appendChild(link);
              }
              link.href = faviconHref;
            }
            updateFavicon();
            // Listen for changes in theme
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);
          `}
        </Script>

        {/* Google Tag Manager (deferred) */}
        <Script id="gtm-script" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NFLHXXGK');`}
        </Script>

        {/* Google Analytics (deferred) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-W6LV22900R"
          strategy="lazyOnload"
        />
        <Script id="gtag-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W6LV22900R');
          `}
        </Script>

        <div className="fixed inset-0 z-0 pointer-events-none">
          <LiquidEtherWrapper />
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}
