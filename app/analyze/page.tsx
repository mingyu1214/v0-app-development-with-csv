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

    // 분석 처리 시뮬레이션 (클라이언트 측에서만 수행)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // 클라이언트 측에서 분석 실행 - 서버로 데이터 전송하지 않음
    const analysisResult = analyzeDigitalWellbeing(data)
    setResult(analysisResult)
    setIsLoading(false)

    // 분석 완료 후 input 데이터 즉시 휘발 (메모리에서만 결과 유지)
    // input은 결과 표시에 필요하므로 유지하되, 페이지 이탈 시 자동 삭제됨
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
