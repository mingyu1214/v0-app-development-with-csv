import Link from 'next/link'
import { Brain, Smartphone, Moon, TrendingDown, Lightbulb, BarChart3, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Header } from '@/components/header'

// 6개 기능 카드
const features = [
  {
    icon: Smartphone,
    title: '스크린 타임 분석',
    description: '일일 미디어 사용 습관을 상세히 분석하여 생활 패턴에 미치는 영향을 파악합니다.',
  },
  {
    icon: BarChart3,
    title: '연령별 사용 패턴 분석',
    description: '연령별로 사용 패턴에 따른 영향도를 데이터로 예측합니다.',
  },
  {
    icon: Moon,
    title: '수면 시간 분석',
    description: '수면 시간이 다음 날 집중력과 생산성에 미치는 영향을 분석합니다.',
  },
  {
    icon: TrendingDown,
    title: 'Azure Platform 기반',
    description: '신뢰할 수 있는 MS Azure Platform을 기반으로 위험도 모델을 시뮬레이션합니다.',
  },
  {
    icon: Lightbulb,
    title: 'AI 맞춤 솔루션',
    description: 'AI가 당신만을 위한 디지털 디톡스 가이드라인을 제시합니다.',
  },
  {
    icon: BarChart3,
    title: '행동 변화 추적',
    description: '개선된 습관이 생활에 얼마나 기여하는지 지속적으로 모니터링합니다.',
  },
]

const stats = [
  { icon: Brain, value: '18,500명+', label: '분석 완료' },
  { icon: Sparkles, value: '97%', label: '예측 정확도' },
  { icon: BarChart3, value: '100%', label: '개인정보 보호' },
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
              <span className="text-muted-foreground">AI 기반 디지털 습관 분석</span>
            </div>
            
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              <span className="text-balance">디지털 미디어가</span>
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                당신의 생활에 미치는 영향
              </span>
              을
              <br />
              확인하세요
            </h1>
            
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              무분별한 숏폼 시청과 장시간의 게임이 미치는 악영향을 수치화하여 경각심을 주고, 
              잃어버린 집중력을 되찾기 위한 AI 맞춤형 솔루션을 제공합니다.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/analyze">
                <Button size="lg" className="gap-2 bg-primary px-8 hover:bg-primary/90">
                  무료로 분석 시작하기
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="gap-2 px-8">
                  자세히 알아보기
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
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground md:text-4xl">{stat.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section - 6 Cards Grid */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              과학적 접근으로 건강한 디지털 습관을 만드세요
            </h2>
            <p className="text-muted-foreground">
              뇌톡스는 검증된 데이터와 머신러닝 기술을 활용하여 당신의 디지털 습관이 생활에 미치는 영향을 정확하게 분석합니다.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={feature.title}
                  className={`group relative overflow-hidden border-border/50 bg-card/50 p-6 transition-all hover:border-primary/50 hover:bg-card ${index === 1 ? 'md:border-primary/30' : ''}`}
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
              <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                나의 디지털 습관을 점검해보세요
              </h2>
              <p className="mb-8 text-muted-foreground">
                3분이면 충분합니다. 간단한 설문을 통해 디지털 사용 습관을 분석하고, 맞춤형 개선 가이드를 받아보세요.
              </p>
              <Link href="/analyze">
                <Button size="lg" className="gap-2 bg-primary px-8 hover:bg-primary/90">
                  무료 분석 시작
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
              <span className="font-semibold">뇌톡스</span>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              &copy; 2026 뇌톡스. 디지털 웰빙을 위한 첫걸음.
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <Link href="/privacy" className="transition-colors hover:text-foreground">
                개인정보처리방침
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
