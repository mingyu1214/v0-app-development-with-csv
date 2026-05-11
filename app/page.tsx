import Link from 'next/link'
import { Brain, Activity, Moon, TrendingUp, Shield, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Header } from '@/components/header'

const features = [
  {
    icon: Activity,
    title: '사용 패턴 분석',
    description: '일일 디지털 사용 시간과 패턴을 AI가 정밀 분석합니다.',
  },
  {
    icon: Moon,
    title: '수면 효율 측정',
    description: '수면 시간과 디지털 사용의 상관관계를 파악합니다.',
  },
  {
    icon: TrendingUp,
    title: '집중력 점수',
    description: '업무/학습 집중도를 수치화하여 개선점을 제시합니다.',
  },
  {
    icon: Shield,
    title: '위험도 평가',
    description: '디지털 과의존 위험도를 평가하고 경고합니다.',
  },
]

const stats = [
  { value: '25,000+', label: '분석 데이터' },
  { value: '85%', label: '정확도' },
  { value: '4.8', label: '사용자 만족도' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
        </div>

        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">AI 기반 디지털 웰빙 분석</span>
            </div>
            
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              <span className="text-balance">건강한 디지털</span>
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                라이프스타일
              </span>
            </h1>
            
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              BrainTox는 25,000개 이상의 데이터를 기반으로 당신의 디지털 사용 습관을 분석하고 
              맞춤형 개선 가이드를 제공합니다.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/analyze">
                <Button size="lg" className="gap-2 bg-primary px-8 hover:bg-primary/90">
                  무료로 분석하기
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/privacy">
                <Button size="lg" variant="outline" className="gap-2 px-8">
                  개인정보 처리방침
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border/40 bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary md:text-4xl">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">주요 기능</h2>
            <p className="text-muted-foreground">
              AI가 분석하는 4가지 핵심 지표로 디지털 웰빙을 관리하세요.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card
                  key={feature.title}
                  className="group relative overflow-hidden border-border/50 bg-card/50 p-6 transition-all hover:border-primary/50 hover:bg-card"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                  
                  {/* Hover gradient */}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="relative overflow-hidden border-border/50 bg-gradient-to-br from-card to-secondary/50 p-8 md:p-16">
            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent">
                <Brain className="h-8 w-8 text-primary-foreground" />
              </div>
              <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                지금 바로 분석을 시작하세요
              </h2>
              <p className="mb-8 text-muted-foreground">
                간단한 설문으로 당신의 디지털 웰빙 상태를 확인하고 
                맞춤형 개선 방안을 받아보세요.
              </p>
              <Link href="/analyze">
                <Button size="lg" className="gap-2 bg-primary px-8 hover:bg-primary/90">
                  분석 시작하기
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            {/* Background decoration */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <span className="font-semibold">BrainTox</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                개인정보 처리방침
              </Link>
              <span>|</span>
              <span>AI 기반 디지털 웰빙 분석 플랫폼</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
