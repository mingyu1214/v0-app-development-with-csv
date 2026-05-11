'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, User, Clock, Moon, Briefcase, Shield, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { JOB_TYPES, type UserInput } from '@/lib/types'
import Link from 'next/link'

interface AnalysisWizardProps {
  onComplete: (data: UserInput) => void
  isLoading?: boolean
}

const steps = [
  { id: 0, title: '개인정보 동의', icon: Shield, description: '분석을 위한 정보 수집에 동의해주세요' },
  { id: 1, title: '나이', icon: User, description: '연령대를 선택해주세요' },
  { id: 2, title: '직업', icon: Briefcase, description: '직업을 선택해주세요' },
  { id: 3, title: '디지털 사용', icon: Clock, description: '하루 평균 디지털 기기 사용 시간' },
  { id: 4, title: '수면', icon: Moon, description: '하루 평균 수면 시간' },
]

export function AnalysisWizard({ onComplete, isLoading }: AnalysisWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [privacyAgreed, setPrivacyAgreed] = useState(false)
  const [formData, setFormData] = useState<UserInput>({
    age: 20,
    jobType: '',
    dailyUsageHours: 6,
    sleepHours: 7,
  })

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete(formData)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return privacyAgreed
      case 1:
        return formData.age >= 14 && formData.age <= 80
      case 2:
        return formData.jobType !== ''
      case 3:
        return formData.dailyUsageHours >= 0
      case 4:
        return formData.sleepHours >= 0
      default:
        return true
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <Card className="border-primary/30 bg-primary/5 p-4">
              <h3 className="mb-3 font-semibold">수집하는 정보</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  나이 (연령대 파악 목적)
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  직업 유형 (사용 패턴 분석)
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  일일 디지털 기기 사용 시간
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  일일 수면 시간
                </li>
              </ul>
            </Card>

            <Card className="border-green-500/30 bg-green-500/5 p-4">
              <h3 className="mb-3 font-semibold text-green-400">데이터 처리 방식</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                  입력된 정보는 분석 결과 도출 즉시 휘발됩니다
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                  서버나 데이터베이스에 저장되지 않습니다
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                  제3자에게 제공되지 않습니다
                </li>
              </ul>
            </Card>

            <button
              onClick={() => setPrivacyAgreed(!privacyAgreed)}
              className={cn(
                'flex w-full items-center gap-3 rounded-xl border-2 p-4 transition-all',
                privacyAgreed
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              )}
            >
              <div
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded-md border-2 transition-colors',
                  privacyAgreed
                    ? 'border-primary bg-primary'
                    : 'border-muted-foreground'
                )}
              >
                {privacyAgreed && <Check className="h-4 w-4 text-primary-foreground" />}
              </div>
              <span className="text-left text-sm">
                <Link href="/privacy" className="text-primary underline" target="_blank">
                  개인정보 처리방침
                </Link>
                을 읽었으며, 위 정보 수집에 동의합니다.
              </span>
            </button>
          </div>
        )

      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <div className="mb-2 text-6xl font-bold text-primary">{formData.age}</div>
              <div className="text-muted-foreground">세</div>
            </div>
            <div className="px-4">
              <Slider
                value={[formData.age]}
                onValueChange={([value]) => setFormData({ ...formData, age: value })}
                min={14}
                max={80}
                step={1}
                className="w-full"
              />
              <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                <span>14세</span>
                <span>80세</span>
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              14세 미만은 법정대리인 동의가 필요하여 이용이 제한됩니다.
            </p>
          </div>
        )

      case 2:
        return (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {JOB_TYPES.map((job) => (
              <button
                key={job.value}
                onClick={() => setFormData({ ...formData, jobType: job.value })}
                className={cn(
                  'rounded-xl border-2 p-4 text-center transition-all',
                  formData.jobType === job.value
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/50 hover:bg-secondary'
                )}
              >
                <div className="font-medium">{job.label}</div>
              </button>
            ))}
          </div>
        )

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <div className="mb-2 text-6xl font-bold text-primary">{formData.dailyUsageHours}</div>
              <div className="text-muted-foreground">시간 / 일</div>
            </div>
            <div className="px-4">
              <Slider
                value={[formData.dailyUsageHours]}
                onValueChange={([value]) => setFormData({ ...formData, dailyUsageHours: value })}
                min={0}
                max={16}
                step={0.5}
                className="w-full"
              />
              <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                <span>0시간</span>
                <span>16시간</span>
              </div>
            </div>
            <div className="rounded-lg bg-secondary/50 p-4 text-sm text-muted-foreground">
              <p>
                {formData.dailyUsageHours <= 4
                  ? '적정 사용량입니다.'
                  : formData.dailyUsageHours <= 8
                  ? '평균적인 사용량입니다.'
                  : '다소 높은 사용량입니다.'}
              </p>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <div className="mb-2 text-6xl font-bold text-primary">{formData.sleepHours}</div>
              <div className="text-muted-foreground">시간 / 일</div>
            </div>
            <div className="px-4">
              <Slider
                value={[formData.sleepHours]}
                onValueChange={([value]) => setFormData({ ...formData, sleepHours: value })}
                min={2}
                max={12}
                step={0.5}
                className="w-full"
              />
              <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                <span>2시간</span>
                <span>12시간</span>
              </div>
            </div>
            <div className="rounded-lg bg-secondary/50 p-4 text-sm text-muted-foreground">
              <p>
                {formData.sleepHours >= 7 && formData.sleepHours <= 9
                  ? '적정 수면 시간입니다.'
                  : formData.sleepHours < 7
                  ? '수면 시간이 부족할 수 있습니다.'
                  : '수면 시간이 다소 깁니다.'}
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const currentStepData = steps[currentStep]
  const StepIcon = currentStepData.icon

  return (
    <Card className="w-full max-w-lg border-border/50 bg-card/50 p-6 md:p-8">
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">단계 {currentStep + 1} / {steps.length}</span>
          <span className="text-primary">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-secondary">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Step Header */}
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <StepIcon className="h-7 w-7 text-primary" />
        </div>
        <h2 className="mb-2 text-2xl font-bold">{currentStepData.title}</h2>
        <p className="text-muted-foreground">{currentStepData.description}</p>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="min-h-[200px]"
        >
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          이전
        </Button>
        <Button
          onClick={handleNext}
          disabled={!canProceed() || isLoading}
          className="gap-2 bg-primary hover:bg-primary/90"
        >
          {currentStep === steps.length - 1 ? (
            isLoading ? '분석 중...' : '분석하기'
          ) : (
            <>
              다음
              <ChevronRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </Card>
  )
}
