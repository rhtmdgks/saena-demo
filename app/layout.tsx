import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import LiquidEtherWrapper from "@/components/liquid-ether-wrapper"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: {
    default: "GOODWILL(KE) | 3D Animation Made Simple, Reliable & Scalable",
    template: "%s | GOODWILL(KE)"
  },
  description:
    "From product launches to full-scale campaigns, GOODWILL(KE) delivers 3D animation that's fast, consistent, and built to wow your audience.",
  keywords: ["3D animation", "product animation", "brand animation", "3D modeling", "animation services"],
  authors: [{ name: "GOODWILL(KE)" }],
  creator: "GOODWILL(KE)",
  publisher: "GOODWILL(KE)",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://theskitbit.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "GOODWILL(KE) | 3D Animation Made Simple, Reliable & Scalable",
    description: "From product launches to full-scale campaigns, GOODWILL(KE) delivers 3D animation that's fast, consistent, and built to wow your audience.",
    url: 'https://theskitbit.com',
    siteName: 'GOODWILL(KE)',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "GOODWILL(KE) | 3D Animation Made Simple, Reliable & Scalable",
    description: "From product launches to full-scale campaigns, GOODWILL(KE) delivers 3D animation that's fast, consistent, and built to wow your audience.",
    creator: '@theskitbit',
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
    <html lang="en" className={inter.className}>
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
