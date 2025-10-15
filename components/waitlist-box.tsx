"use client"

import clsx from "clsx"
import { PropsWithChildren } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function WaitlistWrapper({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-[500px]">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div
          className={clsx(
            "w-full mx-auto max-w-[500px] flex flex-col justify-center items-center bg-white/5 backdrop-blur-xl pb-0 overflow-hidden rounded-2xl border border-white/10",
            "shadow-[0px_170px_48px_0px_rgba(18,_18,_19,_0.00),_0px_109px_44px_0px_rgba(18,_18,_19,_0.01),_0px_61px_37px_0px_rgba(18,_18,_19,_0.05),_0px_27px_27px_0px_rgba(18,_18,_19,_0.09),_0px_7px_15px_0px_rgba(18,_18,_19,_0.10)]"
          )}
        >
          <div className="flex flex-col items-center gap-4 flex-1 text-center w-full p-8 pb-4">
            <div>
              <div className="flex justify-center w-32 h-auto items-center mx-auto">
                <Image
                  src="/icons/goodwill_white.svg"
                  alt="GOODWILL(KE) logo"
                  width={128}
                  height={128}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
            <div className="flex flex-col gap-10">{children}</div>
          </div>
          <footer className="flex justify-between items-center w-full self-stretch px-8 py-3 text-sm bg-white/5 overflow-hidden">
            <p className="text-xs text-gray-400">© 2025 — GOODWILL(KE)</p>
          </footer>
        </div>
      </div>
    </div>
  )
}
