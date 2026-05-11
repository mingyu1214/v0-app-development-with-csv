'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { AnalysisWizard } from '@/components/analysis-wizard'
import { AnalysisResultDisplay } from '@/components/analysis-result'
import { analyzeDigitalWellbeing } from '@/lib/analysis'
import { createClient } from '@/lib/supabase/client'
import type { UserInput, AnalysisResult } from '@/lib/types'

export default function AnalyzePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [input, setInput] = useState<UserInput | null>(null)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const handleAnalyze = async (data: UserInput) => {
    setIsLoading(true)
    setInput(data)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const analysisResult = analyzeDigitalWellbeing(data)
    setResult(analysisResult)
    setIsLoading(false)
  }

  const handleReset = () => {
    setInput(null)
    setResult(null)
  }

  const handleSave = async () => {
    if (!input || !result) return

    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      // Redirect to login with return URL
      router.push('/auth/login?returnTo=/analyze')
      return
    }

    try {
      const { error } = await supabase.from('user_analyses').insert({
        user_id: user.id,
        age: input.age,
        job_type: input.jobType,
        daily_usage_hours: input.dailyUsageHours,
        sleep_hours: input.sleepHours,
        performance_score: result.performanceScore,
        wellbeing_score: result.wellbeingScore,
        risk_level: result.riskLevel,
        recommendations: result.recommendations,
      })

      if (error) throw error

      router.push('/dashboard')
    } catch (error) {
      console.error('Failed to save analysis:', error)
      alert('저장에 실패했습니다. 다시 시도해주세요.')
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {!result ? (
            <div className="flex flex-col items-center">
              <div className="mb-8 text-center">
                <h1 className="mb-2 text-3xl font-bold md:text-4xl">디지털 웰빙 분석</h1>
                <p className="text-muted-foreground">
                  간단한 질문에 답하고 맞춤형 분석 결과를 받아보세요.
                </p>
              </div>
              <AnalysisWizard onComplete={handleAnalyze} isLoading={isLoading} />
            </div>
          ) : (
            <div>
              <div className="mb-8 text-center">
                <h1 className="mb-2 text-3xl font-bold md:text-4xl">분석 결과</h1>
                <p className="text-muted-foreground">
                  AI가 분석한 당신의 디지털 웰빙 상태입니다.
                </p>
              </div>
              <AnalysisResultDisplay
                result={result}
                input={input!}
                onReset={handleReset}
                onSave={handleSave}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
