import type { Viewport } from "next";
import { Geist } from "next/font/google";
import { Providers } from "@/components/providers";
import DarkVeil from "@/components/dark-veil";
import { Header } from "@/components/header";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: true,
});

export const metadata = {
  title: "Join Waitlist | GOODWILL(KE)",
  description:
    "Join our waitlist and be among the first to experience our 3D animation services",
};

export const viewport: Viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
};

export default function WaitlistLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Providers defaultTheme="dark">
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <DarkVeil hueShift={0} speed={3} />
        </div>
        <div className="max-w-screen-sm mx-auto w-full relative z-[1] flex flex-col min-h-screen">
          <div className="px-5 gap-8 flex flex-col flex-1 py-[12vh]">
            <Header />
            <main className="flex justify-center">{children}</main>
          </div>
        </div>
      </Providers>
    </>
  );
}
