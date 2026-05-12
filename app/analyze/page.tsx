'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { AnalysisWizard } from '@/components/analysis-wizard'
import { AnalysisResultDisplay } from '@/components/analysis-result'
import { analyzeDigitalWellbeing } from '@/lib/analysis'
import type { UserInput, AnalysisResult } from '@/lib/types'

export default function AnalyzePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [input, setInput] = useState<UserInput | null>(null)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const handleAnalyze = async (data: UserInput) => {
    setIsLoading(true)
    setInput(data)

    try {
      // Azure ML 엔드포인트 호출
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const azureResult = await response.json()
        console.log('[v0] Azure ML result:', azureResult)
        
        // Azure ML 결과를 기존 형식으로 변환
        const analysisResult = analyzeDigitalWellbeing(data, azureResult.prediction)
        setResult(analysisResult)
      } else {
        // Azure ML 실패 시 로컬 분석으로 폴백
        console.log('[v0] Azure ML failed, using local analysis')
        const analysisResult = analyzeDigitalWellbeing(data)
        setResult(analysisResult)
      }
    } catch (error) {
      // 에러 시 로컬 분석으로 폴백
      console.log('[v0] Error calling Azure ML:', error)
      const analysisResult = analyzeDigitalWellbeing(data)
      setResult(analysisResult)
    }

    setIsLoading(false)
  }

  const handleReset = () => {
    // 모든 데이터 휘발
    setInput(null)
    setResult(null)
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
              />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
