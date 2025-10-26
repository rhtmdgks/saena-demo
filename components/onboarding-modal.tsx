"use client"

import { useState } from "react"
import Stepper, { Step } from "@/components/stepper/Stepper"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"

interface OnboardingModalProps {
  isOpen: boolean
  onComplete: (data: UserData) => void
}

export interface UserData {
  name: string
  email: string
  company: string
  role: string
  goals: string
}

export function OnboardingModal({ isOpen, onComplete }: OnboardingModalProps) {
  const [formData, setFormData] = useState<UserData>({
    name: "",
    email: "",
    company: "",
    role: "",
    goals: ""
  })

  const handleComplete = () => {
    console.log("User data:", formData)
    onComplete(formData)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ fontFamily: 'Paperlogy, sans-serif' }}
          >
            <div className="w-full max-w-2xl">
              <div className="text-center mb-8">
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
              >
                <Stepper
                  initialStep={1}
                  onStepChange={(step) => {
                    console.log("Current step:", step)
                  }}
                  onFinalStepCompleted={handleComplete}
                  backButtonText="이전"
                  nextButtonText="다음"
                  stepCircleContainerClassName="bg-[#0f0f0f]"
                >
                  <Step>
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-white">환영합니다! 👋</h2>
                      <p className="text-neutral-400">
                        SAENA는 AI 시대의 브랜드 가시성을 측정하고 최적화하는 플랫폼입니다.
                      </p>
                      <p className="text-neutral-400">
                        시작하기 전에 간단한 정보를 입력해주세요.
                      </p>
                    </div>
                  </Step>

                  <Step>
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-white">기본 정보</h2>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-neutral-200">
                            이름 *
                          </Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="홍길동"
                            className="bg-[#1a1a1a] border-neutral-700 text-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-neutral-200">
                            이메일 *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="example@company.com"
                            className="bg-[#1a1a1a] border-neutral-700 text-white"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </Step>

                  <Step>
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-white">회사 정보</h2>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor="company" className="text-neutral-200">
                            회사명
                          </Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
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
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            placeholder="예: 마케팅 매니저"
                            className="bg-[#1a1a1a] border-neutral-700 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </Step>

                  <Step>
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-white">목표 설정</h2>
                      <div className="space-y-2">
                        <Label htmlFor="goals" className="text-neutral-200">
                          SAENA를 통해 달성하고 싶은 목표는 무엇인가요?
                        </Label>
                        <Textarea
                          id="goals"
                          value={formData.goals}
                          onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                          placeholder="예: AI 검색 결과에서 우리 브랜드의 가시성을 높이고 싶습니다."
                          className="bg-[#1a1a1a] border-neutral-700 text-white min-h-[120px]"
                        />
                      </div>
                    </div>
                  </Step>

                  <Step>
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-white">준비 완료! 🎉</h2>
                      <p className="text-neutral-400">
                        모든 정보가 입력되었습니다. 이제 SAENA 데모를 체험해보세요!
                      </p>
                      <div className="bg-[#1a1a1a] border border-neutral-700 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-neutral-400">이름:</span>
                          <span className="text-white">{formData.name || "-"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">이메일:</span>
                          <span className="text-white">{formData.email || "-"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">회사:</span>
                          <span className="text-white">{formData.company || "-"}</span>
                        </div>
                      </div>
                    </div>
                  </Step>
                </Stepper>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
