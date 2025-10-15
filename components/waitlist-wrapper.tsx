import clsx from "clsx";
import { PropsWithChildren } from "react";
import Image from "next/image";

export function WaitlistWrapper({ children }: PropsWithChildren) {
  return (
    <div
      className={clsx(
        "w-full mx-auto max-w-[500px] flex flex-col justify-center items-center pb-0 overflow-hidden rounded-2xl",
        "backdrop-blur-xl bg-black/60 border border-white/20",
        "shadow-[0px_170px_48px_0px_rgba(18,_18,_19,_0.00),_0px_109px_44px_0px_rgba(18,_18,_19,_0.01),_0px_61px_37px_0px_rgba(18,_18,_19,_0.05),_0px_27px_27px_0px_rgba(18,_18,_19,_0.09),_0px_7px_15px_0px_rgba(18,_18,_19,_0.10)]"
      )}
    >
      <div className="flex flex-col items-center gap-4 flex-1 text-center w-full p-8 pb-4">
        <div>
          <div className="flex justify-center w-32 h-auto items-center mx-auto">
            <Image
              src="/icons/goodwill_black.svg"
              alt="Logo"
              width={128}
              height={128}
              className="hidden dark:hidden w-full h-auto"
              priority
            />
            <Image
              src="/icons/goodwill_white.svg"
              alt="Logo"
              width={128}
              height={128}
              className="hidden dark:block w-full h-auto"
              priority
            />
          </div>
        </div>
        <div className="flex flex-col gap-10">{children}</div>
      </div>
      <footer className="flex justify-center items-center w-full self-stretch px-8 py-3 text-sm bg-gray-12/[.07] overflow-hidden">
        <p className="text-xs text-slate-10">
          © 2025 GOODWILL(KE) Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
