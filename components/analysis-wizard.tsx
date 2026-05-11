'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, User, Clock, Moon, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { JOB_TYPES, type UserInput } from '@/lib/types'

interface AnalysisWizardProps {
  onComplete: (data: UserInput) => void
  isLoading?: boolean
}

const steps = [
  { id: 1, title: '나이', icon: User, description: '연령대를 선택해주세요' },
  { id: 2, title: '직업', icon: Briefcase, description: '직업을 선택해주세요' },
  { id: 3, title: '디지털 사용', icon: Clock, description: '하루 평균 디지털 기기 사용 시간' },
  { id: 4, title: '수면', icon: Moon, description: '하루 평균 수면 시간' },
]

export function AnalysisWizard({ onComplete, isLoading }: AnalysisWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<UserInput>({
    age: 25,
    jobType: '',
    dailyUsageHours: 6,
    sleepHours: 7,
  })

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete(formData)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.age >= 10 && formData.age <= 80
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
                min={10}
                max={80}
                step={1}
                className="w-full"
              />
              <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                <span>10세</span>
                <span>80세</span>
              </div>
            </div>
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

  const currentStepData = steps[currentStep - 1]
  const StepIcon = currentStepData.icon

  return (
    <Card className="w-full max-w-lg border-border/50 bg-card/50 p-6 md:p-8">
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">단계 {currentStep} / {steps.length}</span>
          <span className="text-primary">{Math.round((currentStep / steps.length) * 100)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-secondary">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / steps.length) * 100}%` }}
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
          disabled={currentStep === 1}
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
          {currentStep === steps.length ? (
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
