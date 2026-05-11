'use client'

import { motion } from 'framer-motion'
import {
  Activity,
  Heart,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { AnalysisResult, UserInput } from '@/lib/types'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Cell,
} from 'recharts'

interface AnalysisResultProps {
  result: AnalysisResult
  input: UserInput
  onReset: () => void
}

const riskColors = {
  low: 'text-chart-3',
  medium: 'text-chart-4',
  high: 'text-destructive',
}

const riskBgColors = {
  low: 'bg-chart-3/10',
  medium: 'bg-chart-4/10',
  high: 'bg-destructive/10',
}

const riskLabels = {
  low: '양호',
  medium: '주의',
  high: '위험',
}

const priorityColors = {
  high: 'border-l-destructive',
  medium: 'border-l-chart-4',
  low: 'border-l-chart-3',
}

export function AnalysisResultDisplay({
  result,
  input,
  onReset,
}: AnalysisResultProps) {
  const { performanceScore, wellbeingScore, riskLevel, recommendations, comparisonData } = result

  const radarData = [
    { subject: '집중력', value: performanceScore * 100, fullMark: 100 },
    { subject: '웰빙', value: wellbeingScore * 100, fullMark: 100 },
    { subject: '수면효율', value: (input.sleepHours / 9) * 100, fullMark: 100 },
    { subject: '디지털균형', value: Math.max(0, (1 - input.dailyUsageHours / 12)) * 100, fullMark: 100 },
  ]

  const comparisonChartData = [
    {
      name: '디지털 사용',
      user: comparisonData.userUsage,
      average: comparisonData.avgUsage,
    },
    {
      name: '수면',
      user: comparisonData.userSleep,
      average: comparisonData.avgSleep,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Main Score Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="relative overflow-hidden border-border/50 bg-card/50 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">집중력 점수</p>
                <p className="mt-1 text-3xl font-bold text-chart-1">
                  {Math.round(performanceScore * 100)}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-1/10">
                <Activity className="h-5 w-5 text-chart-1" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm">
              {performanceScore >= comparisonData.avgPerformance ? (
                <>
                  <TrendingUp className="h-4 w-4 text-chart-3" />
                  <span className="text-chart-3">평균 대비 상위</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-4 w-4 text-chart-4" />
                  <span className="text-chart-4">평균 대비 하위</span>
                </>
              )}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="relative overflow-hidden border-border/50 bg-card/50 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">웰빙 점수</p>
                <p className="mt-1 text-3xl font-bold text-chart-2">
                  {Math.round(wellbeingScore * 100)}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/10">
                <Heart className="h-5 w-5 text-chart-2" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm">
              {wellbeingScore >= comparisonData.avgWellbeing ? (
                <>
                  <TrendingUp className="h-4 w-4 text-chart-3" />
                  <span className="text-chart-3">평균 대비 상위</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-4 w-4 text-chart-4" />
                  <span className="text-chart-4">평균 대비 하위</span>
                </>
              )}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className={cn('relative overflow-hidden border-border/50 p-6', riskBgColors[riskLevel])}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">위험도</p>
                <p className={cn('mt-1 text-3xl font-bold', riskColors[riskLevel])}>
                  {riskLabels[riskLevel]}
                </p>
              </div>
              <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', riskBgColors[riskLevel])}>
                {riskLevel === 'low' ? (
                  <CheckCircle className={cn('h-5 w-5', riskColors[riskLevel])} />
                ) : (
                  <AlertTriangle className={cn('h-5 w-5', riskColors[riskLevel])} />
                )}
              </div>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              {riskLevel === 'low' && '현재 건강한 디지털 사용 패턴입니다.'}
              {riskLevel === 'medium' && '일부 개선이 필요한 부분이 있습니다.'}
              {riskLevel === 'high' && '즉각적인 개선이 필요합니다.'}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-border/50 bg-card/50 p-6">
            <h3 className="mb-4 font-semibold">종합 지표</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="oklch(0.3 0.02 285)" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: 'oklch(0.65 0.02 285)', fontSize: 12 }}
                  />
                  <Radar
                    name="Score"
                    dataKey="value"
                    stroke="oklch(0.65 0.2 285)"
                    fill="oklch(0.65 0.2 285)"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-border/50 bg-card/50 p-6">
            <h3 className="mb-4 font-semibold">평균 비교</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonChartData} layout="vertical">
                  <XAxis type="number" tick={{ fill: 'oklch(0.65 0.02 285)', fontSize: 12 }} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tick={{ fill: 'oklch(0.65 0.02 285)', fontSize: 12 }}
                    width={80}
                  />
                  <Bar dataKey="user" name="나" radius={[0, 4, 4, 0]}>
                    {comparisonChartData.map((_, index) => (
                      <Cell key={`cell-user-${index}`} fill="oklch(0.65 0.2 285)" />
                    ))}
                  </Bar>
                  <Bar dataKey="average" name="평균" radius={[0, 4, 4, 0]}>
                    {comparisonChartData.map((_, index) => (
                      <Cell key={`cell-avg-${index}`} fill="oklch(0.4 0.05 285)" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-primary" />
                <span className="text-muted-foreground">나</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-muted" />
                <span className="text-muted-foreground">평균</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="border-border/50 bg-card/50 p-6">
          <h3 className="mb-4 font-semibold">맞춤 추천</h3>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className={cn(
                  'rounded-lg border border-border/50 border-l-4 bg-secondary/30 p-4',
                  priorityColors[rec.priority]
                )}
              >
                <div className="mb-1 flex items-center gap-2">
                  <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {rec.category}
                  </span>
                  {rec.priority === 'high' && (
                    <span className="text-xs text-destructive">긴급</span>
                  )}
                </div>
                <h4 className="font-medium">{rec.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{rec.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col gap-3 sm:flex-row sm:justify-center"
      >
        <Button variant="outline" onClick={onReset}>
          다시 분석하기
        </Button>
      </motion.div>

      {/* Data Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-sm text-muted-foreground"
      >
        입력하신 정보는 저장되지 않으며, 페이지를 떠나면 자동으로 삭제됩니다.
      </motion.div>
    </div>
  )
}
