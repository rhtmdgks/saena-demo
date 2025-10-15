"use client";

import { InputForm } from "@/components/waitlist-form-floating";
import { WaitlistWrapper } from "@/components/waitlist-wrapper";

export default function WaitlistPage() {
  return (
    <WaitlistWrapper>
      {/* Heading */}
      <div className="space-y-7">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-12 whitespace-pre-wrap text-pretty">
          Claim Your Brand's{"\n"}Place Inside the AI Era
        </h1>
        <div className="text-slate-10 [&>p]:tracking-tight text-pretty">
          <p>
            Be part of the next evolution in digital marketing where visibility
            is defined by answers, not ads.
          </p>
          <p className="mt-2">
            Join SAENA to access early tools that measure, optimize, and expand
            your brand's presence across AI platforms.
          </p>
        </div>
      </div>
      {/* Form */}
      <div className="px-1 flex flex-col w-full self-stretch">
        <InputForm
          buttonCopy={{
            idle: "Join Waitlist",
            success: "You're on the list!",
            loading: "Joining...",
          }}
          formAction={async (data) => {
            try {
              const email = data.get("email");

              // Here you would normally send to your backend/database
              console.log("Email submitted:", email);

              // Simulate API delay
              await new Promise((resolve) => setTimeout(resolve, 1000));

              return { success: true };
            } catch (error) {
              console.error(error);
              return {
                success: false,
                error: "There was an error while submitting the form",
              };
            }
          }}
        />
      </div>
    </WaitlistWrapper>
  );
}
