'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Activity,
  Heart,
  TrendingUp,
  TrendingDown,
  Calendar,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react'
import { Header } from '@/components/header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import type { UserAnalysis } from '@/lib/types'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
} from 'recharts'

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

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [analyses, setAnalyses] = useState<UserAnalysis[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push('/auth/login?returnTo=/dashboard')
      return
    }

    setUser({ email: user.email || '' })
    fetchAnalyses(user.id)
  }

  const fetchAnalyses = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_analyses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Failed to fetch analyses:', error)
    } else {
      setAnalyses(data || [])
    }
    setIsLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('이 분석 기록을 삭제하시겠습니까?')) return

    const { error } = await supabase.from('user_analyses').delete().eq('id', id)

    if (error) {
      console.error('Failed to delete:', error)
      alert('삭제에 실패했습니다.')
    } else {
      setAnalyses(analyses.filter((a) => a.id !== id))
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  // Calculate stats
  const latestAnalysis = analyses[0]
  const avgPerformance =
    analyses.length > 0
      ? analyses.reduce((sum, a) => sum + Number(a.performance_score), 0) / analyses.length
      : 0
  const avgWellbeing =
    analyses.length > 0
      ? analyses.reduce((sum, a) => sum + Number(a.wellbeing_score), 0) / analyses.length
      : 0

  // Chart data
  const chartData = analyses
    .slice(0, 10)
    .reverse()
    .map((a) => ({
      date: new Date(a.created_at).toLocaleDateString('ko-KR', {
        month: 'short',
        day: 'numeric',
      }),
      performance: Math.round(Number(a.performance_score) * 100),
      wellbeing: Math.round(Number(a.wellbeing_score) * 100),
    }))

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header user={user} onSignOut={handleSignOut} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">대시보드</h1>
            <p className="text-muted-foreground">디지털 웰빙 분석 기록을 확인하세요.</p>
          </div>
          <Link href="/analyze">
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              새 분석
            </Button>
          </Link>
        </div>

        {analyses.length === 0 ? (
          <Card className="flex flex-col items-center justify-center border-border/50 bg-card/50 p-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Activity className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">아직 분석 기록이 없습니다</h2>
            <p className="mb-6 text-muted-foreground">
              첫 번째 디지털 웰빙 분석을 시작해보세요.
            </p>
            <Link href="/analyze">
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4" />
                분석 시작하기
              </Button>
            </Link>
          </Card>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="mb-8 grid gap-4 md:grid-cols-4">
              <Card className="border-border/50 bg-card/50 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">총 분석 횟수</p>
                    <p className="mt-1 text-3xl font-bold">{analyses.length}</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </Card>

              <Card className="border-border/50 bg-card/50 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">평균 집중력</p>
                    <p className="mt-1 text-3xl font-bold text-chart-1">
                      {Math.round(avgPerformance * 100)}
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-1/10">
                    <Activity className="h-5 w-5 text-chart-1" />
                  </div>
                </div>
              </Card>

              <Card className="border-border/50 bg-card/50 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">평균 웰빙</p>
                    <p className="mt-1 text-3xl font-bold text-chart-2">
                      {Math.round(avgWellbeing * 100)}
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/10">
                    <Heart className="h-5 w-5 text-chart-2" />
                  </div>
                </div>
              </Card>

              <Card
                className={cn(
                  'border-border/50 p-6',
                  latestAnalysis && riskBgColors[latestAnalysis.risk_level as keyof typeof riskBgColors]
                )}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">최근 위험도</p>
                    <p
                      className={cn(
                        'mt-1 text-3xl font-bold',
                        latestAnalysis && riskColors[latestAnalysis.risk_level as keyof typeof riskColors]
                      )}
                    >
                      {latestAnalysis
                        ? riskLabels[latestAnalysis.risk_level as keyof typeof riskLabels]
                        : '-'}
                    </p>
                  </div>
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-lg',
                      latestAnalysis && riskBgColors[latestAnalysis.risk_level as keyof typeof riskBgColors]
                    )}
                  >
                    {latestAnalysis?.risk_level === 'low' ? (
                      <CheckCircle
                        className={cn(
                          'h-5 w-5',
                          riskColors[latestAnalysis.risk_level as keyof typeof riskColors]
                        )}
                      />
                    ) : (
                      <AlertTriangle
                        className={cn(
                          'h-5 w-5',
                          latestAnalysis && riskColors[latestAnalysis.risk_level as keyof typeof riskColors]
                        )}
                      />
                    )}
                  </div>
                </div>
              </Card>
            </div>

            {/* Chart */}
            {chartData.length > 1 && (
              <Card className="mb-8 border-border/50 bg-card/50 p-6">
                <h3 className="mb-4 font-semibold">점수 추이</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorPerformance" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="oklch(0.65 0.2 285)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="oklch(0.65 0.2 285)" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorWellbeing" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="oklch(0.7 0.15 195)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="oklch(0.7 0.15 195)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="date"
                        tick={{ fill: 'oklch(0.65 0.02 285)', fontSize: 12 }}
                        axisLine={{ stroke: 'oklch(0.3 0.02 285)' }}
                      />
                      <YAxis
                        tick={{ fill: 'oklch(0.65 0.02 285)', fontSize: 12 }}
                        axisLine={{ stroke: 'oklch(0.3 0.02 285)' }}
                        domain={[0, 100]}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'oklch(0.15 0.01 285)',
                          border: '1px solid oklch(0.25 0.02 285)',
                          borderRadius: '8px',
                        }}
                        labelStyle={{ color: 'oklch(0.97 0.01 285)' }}
                      />
                      <Area
                        type="monotone"
                        dataKey="performance"
                        name="집중력"
                        stroke="oklch(0.65 0.2 285)"
                        fill="url(#colorPerformance)"
                        strokeWidth={2}
                      />
                      <Area
                        type="monotone"
                        dataKey="wellbeing"
                        name="웰빙"
                        stroke="oklch(0.7 0.15 195)"
                        fill="url(#colorWellbeing)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded bg-chart-1" />
                    <span className="text-muted-foreground">집중력</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded bg-chart-2" />
                    <span className="text-muted-foreground">웰빙</span>
                  </div>
                </div>
              </Card>
            )}

            {/* Analysis History */}
            <Card className="border-border/50 bg-card/50 p-6">
              <h3 className="mb-4 font-semibold">분석 기록</h3>
              <div className="space-y-4">
                {analyses.map((analysis) => (
                  <div
                    key={analysis.id}
                    className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/30 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-lg',
                          riskBgColors[analysis.risk_level as keyof typeof riskBgColors]
                        )}
                      >
                        {analysis.risk_level === 'low' ? (
                          <CheckCircle
                            className={cn(
                              'h-5 w-5',
                              riskColors[analysis.risk_level as keyof typeof riskColors]
                            )}
                          />
                        ) : (
                          <AlertTriangle
                            className={cn(
                              'h-5 w-5',
                              riskColors[analysis.risk_level as keyof typeof riskColors]
                            )}
                          />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            집중력 {Math.round(Number(analysis.performance_score) * 100)}
                          </span>
                          <span className="text-muted-foreground">/</span>
                          <span className="font-medium">
                            웰빙 {Math.round(Number(analysis.wellbeing_score) * 100)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{analysis.job_type}</span>
                          <span>·</span>
                          <span>{analysis.age}세</span>
                          <span>·</span>
                          <span>
                            {new Date(analysis.created_at).toLocaleDateString('ko-KR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(analysis.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}
      </main>
    </div>
  )
}
