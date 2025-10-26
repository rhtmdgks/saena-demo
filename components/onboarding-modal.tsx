"use client";

import { useState, useEffect } from "react";
import Stepper, { Step } from "@/components/stepper/Stepper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (data: UserData) => void;
}

export interface UserData {
  name: string;
  email: string;
  company: string;
  role: string;
  goals: string;
}

export function OnboardingModal({ isOpen, onComplete }: OnboardingModalProps) {
  const [formData, setFormData] = useState<UserData>({
    name: "",
    email: "",
    company: "",
    role: "",
    goals: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Import and register the bouncy loader
    import("ldrs").then(({ bouncy }) => {
      bouncy.register();
    });
  }, []);

  const validateStep = (step: number): boolean => {
    if (step === 2) {
      const newErrors = { name: "", email: "" };
      let isValid = true;

      if (!formData.name.trim()) {
        newErrors.name = "필수 항목이에요. 입력해 주세요.";
        isValid = false;
      }

      if (!formData.email.trim()) {
        newErrors.email = "필수 항목이에요. 입력해 주세요.";
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "이메일 형식을 확인해 주세요.";
        isValid = false;
      }

      setErrors(newErrors);
      return isValid;
    }

    return true;
  };

  const handleComplete = async () => {
    console.log("User data:", formData);
    setIsLoading(true);

    try {
      // Save to Supabase
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        console.error("Failed to save onboarding data:", result.error);
        // Continue anyway - don't block user experience
      }

      // 로딩 애니메이션 (2초)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      onComplete(formData);
    } catch (error) {
      console.error("Error saving onboarding data:", error);
      // Continue anyway - don't block user experience
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onComplete(formData);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, stepNumber: number) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (stepNumber === 2 && validateStep(2)) {
        // Step 2에서 Enter 누르면 다음으로
        const nextButton = document.querySelector(
          "[data-stepper-next]"
        ) as HTMLButtonElement;
        nextButton?.click();
      } else if (stepNumber === 3) {
        // Step 3에서 Enter 누르면 다음으로
        const nextButton = document.querySelector(
          "[data-stepper-next]"
        ) as HTMLButtonElement;
        nextButton?.click();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Loading Screen */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/90 backdrop-blur-lg"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center space-y-6"
              >
                {/* @ts-ignore - Custom web component from ldrs */}
                <l-bouncy size="45" speed="1.75" color="rgb(198, 255, 58)" />
                <div className="space-y-1">
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl font-bold text-white"
                  >
                    입력하신 목표를 분석 중이에요
                  </motion.h2>
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-3xl font-bold text-white"
                  >
                    세나가 데모를 준비하고 있어요
                  </motion.h2>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 gap-8"
            style={{ fontFamily: "Paperlogy, sans-serif" }}
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="flex items-center justify-center gap-2 mb-4"
              >
                <Image
                  src="/icons/goodwill_white.svg"
                  alt="GOODWILL(KE) logo"
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />
                <h1 className="text-2xl font-bold text-white">SAENA</h1>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-neutral-400"
              >
                시작하기 전에 몇 가지 정보를 알려주세요
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full max-w-2xl"
            >
              <Stepper
                initialStep={1}
                onStepChange={(step) => {
                  setCurrentStep(step);
                  setErrors({ name: "", email: "" });
                }}
                onBeforeStepChange={(current) => {
                  if (current === 2) {
                    return validateStep(2);
                  }
                  return true;
                }}
                onFinalStepCompleted={handleComplete}
                backButtonText="이전"
                nextButtonText="다음으로"
                stepCircleContainerClassName="bg-[#0f0f0f]"
              >
                <Step>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <h2 className="text-xl font-semibold text-white">
                        세나에 오신 걸 환영해요!
                      </h2>
                      <p className="text-neutral-400 leading-relaxed">
                        시작하기 전에, 몇 가지 정보를 입력해 주세요.
                      </p>
                      <p className="text-neutral-400 leading-relaxed">
                        정보는 데모 안내에만 사용해요.
                      </p>
                    </div>
                  </div>
                </Step>

                <Step>
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">
                      먼저 이름과 이메일을 알려주세요
                    </h2>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-neutral-200">
                          이름 *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            if (errors.name) setErrors({ ...errors, name: "" });
                          }}
                          onKeyDown={(e) => handleKeyPress(e, 2)}
                          placeholder="홍길동"
                          className={`bg-[#1a1a1a] text-white ${
                            errors.name
                              ? "border-red-500/70"
                              : "border-neutral-700"
                          }`}
                          required
                        />
                        {errors.name && (
                          <p className="text-red-400/90 text-sm">
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-neutral-200">
                          이메일 *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email)
                              setErrors({ ...errors, email: "" });
                          }}
                          onKeyDown={(e) => handleKeyPress(e, 2)}
                          placeholder="example@company.com"
                          className={`bg-[#1a1a1a] text-white ${
                            errors.email
                              ? "border-red-500/70"
                              : "border-neutral-700"
                          }`}
                          required
                        />
                        {errors.email && (
                          <p className="text-red-400/90 text-sm">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Step>

                <Step>
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">
                      이번엔 회사명과 직책을 알려주세요
                    </h2>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-neutral-200">
                          회사명
                        </Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              company: e.target.value,
                            })
                          }
                          onKeyDown={(e) => handleKeyPress(e, 3)}
                          placeholder="회사명을 입력하세요"
                          className="bg-[#1a1a1a] border-neutral-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role" className="text-neutral-200">
                          직책
                        </Label>
                        <Input
                          id="role"
                          value={formData.role}
                          onChange={(e) =>
                            setFormData({ ...formData, role: e.target.value })
                          }
                          onKeyDown={(e) => handleKeyPress(e, 3)}
                          placeholder="예: 마케팅 매니저"
                          className="bg-[#1a1a1a] border-neutral-700 text-white"
                        />
                      </div>
                    </div>
                  </div>
                </Step>

                <Step>
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">
                      마지막으로, 세나에서 이루고 싶은 목표를 적어주세요
                    </h2>
                    <div className="space-y-2">
                      <Textarea
                        id="goals"
                        value={formData.goals}
                        onChange={(e) =>
                          setFormData({ ...formData, goals: e.target.value })
                        }
                        placeholder="예: AI 검색에서 브랜드 노출 상승, 인용률 비교, 전환 흐름 파악"
                        className="bg-[#1a1a1a] border-neutral-700 text-white min-h-[120px]"
                      />
                    </div>
                  </div>
                </Step>

                <Step>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <h2 className="text-xl font-semibold text-white">
                        입력이 모두 완료됐어요. 이제 세나 데모를 준비할게요.
                      </h2>
                      <p className="text-neutral-400 leading-relaxed">
                        데모가 마음에 드신다면, 이어서 Waitlist에도 참여해
                        보세요.
                      </p>
                    </div>
                    <div className="bg-[#1a1a1a] border border-neutral-700 rounded-lg p-4 space-y-3 w-full">
                      <table className="w-full table-auto">
                        <tbody>
                          <tr>
                            <td className="text-neutral-400 whitespace-nowrap pr-12">
                              이름:
                            </td>
                            <td className="text-white text-right whitespace-nowrap w-full">
                              {formData.name || "-"}
                            </td>
                          </tr>
                          <tr>
                            <td className="text-neutral-400 whitespace-nowrap pr-12 pt-3">
                              이메일:
                            </td>
                            <td className="text-white text-right whitespace-nowrap w-full pt-3">
                              {formData.email || "-"}
                            </td>
                          </tr>
                          <tr>
                            <td className="text-neutral-400 whitespace-nowrap pr-12 pt-3">
                              회사:
                            </td>
                            <td className="text-white text-right whitespace-nowrap w-full pt-3">
                              {formData.company || "-"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Step>
              </Stepper>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
