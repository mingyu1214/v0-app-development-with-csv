'use client'

import { Header } from '@/components/header'
import { Card } from '@/components/ui/card'
import { 
  Brain, 
  FileText, 
  Sparkles, 
  Shield, 
  Code2, 
  Zap,
  ExternalLink
} from 'lucide-react'

const techFeatures = [
  {
    icon: Brain,
    title: '학술 연구 기반 알고리즘',
    description: '34개 연구를 종합한 메타분석과 최신 신경심리학 연구를 기반으로 인지 기능 영향도를 계산합니다.',
  },
  {
    icon: FileText,
    title: '근거 중심 분석',
    description: 'WHO 권장 기준(2시간)과 학술 연구에서 확인된 임계값(4시간)을 기반으로 위험도를 산정합니다.',
  },
  {
    icon: Sparkles,
    title: 'AI 맞춤 솔루션',
    description: '분석 결과와 연구에서 검증된 중재법을 바탕으로 개인화된 디지털 디톡스 가이드를 생성합니다.',
  },
  {
    icon: Shield,
    title: '개인정보 보호',
    description: '모든 분석은 클라이언트 측에서 처리되며, 어떤 개인정보도 서버에 저장되지 않습니다.',
  },
  {
    icon: Code2,
    title: '효과 크기 기반 계산',
    description: "메타분석에서 도출된 효과 크기(Hedges' g)를 활용하여 인지 영역별 영향도를 정량화합니다.",
  },
  {
    icon: Zap,
    title: '즉시 사용 가능',
    description: '별도 설치 없이 웹 브라우저에서 바로 분석을 시작할 수 있습니다.',
  },
]

const howItWorks = [
  {
    step: 1,
    title: '데이터 수집',
    description: '사용자가 입력한 미디어 사용 습관 정보를 수집합니다. 숏폼 시청 시간, 게임 시간, 취침 전 사용 패턴, 사용 장소 등을 분석합니다.',
  },
  {
    step: 2,
    title: 'AI 분석',
    description: '머신러닝 모델이 수집된 데이터를 분석하여 인지 기능 저하 위험도를 계산합니다. 주의력, 기억력, 정보처리속도, 창의력 등 영역별 영향을 예측합니다.',
  },
  {
    step: 3,
    title: '맞춤 솔루션 제공',
    description: 'LLM이 분석 결과를 바탕으로 개인화된 디지털 디톡스 가이드라인을 생성합니다. 실천 가능한 구체적인 행동 지침과 함께 인지 기능 회복을 위한 솔루션을 제안합니다.',
  },
]

const references = [
  {
    title: '스크린 사용 장애의 신경심리학적 결손: 체계적 문헌 고찰 및 메타분석',
    journal: 'Neuropsychology Review',
    year: 2023,
    description: '34개 연구 종합 분석 결과, 스크린 과의존자는 인지 기능이 g=0.38 감소. 주의력(g=0.50)이 가장 큰 영향을 받음.',
    doi: '10.1007/s11065-023-09612-4',
  },
  {
    title: '잦은 스마트폰 사용이 아동의 인지 기능에 미치는 영향',
    journal: 'International Journal of Science and Research Archive',
    year: 2024,
    description: '하루 4시간 이상 스마트폰 사용 아동의 66.7%에서 인지 기능 저하 관찰. 6시간 이상 사용 시 인지 유연성 점수 정상 이하.',
    doi: '10.30574/ijsra.2024.12.1.0875',
  },
  {
    title: '스마트폰 중독이 중학생의 인지 기능과 신체 활동에 미치는 영향',
    journal: 'Frontiers in Psychology',
    year: 2023,
    description: '스마트폰 중독과 신체 활동 감소 간 유의미한 상관관계(p<0.001). 선택적 주의력 정확도에서 유의미한 차이(p=0.005).',
    doi: '10.3389/fpsyg.2023.1182749',
  },
  {
    title: '청소년 스마트폰 사용과 수면의 질 및 정신건강의 관계',
    journal: 'Journal of Korean Academy of Nursing',
    year: 2023,
    description: '취침 전 스마트폰 사용이 수면의 질 저하와 우울, 불안 증상 증가에 유의미한 영향. 1시간 이상 사용 시 수면 효율 15% 감소.',
    doi: '10.4040/jkan.22135',
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                BrainTox
              </span>{' '}
              소개
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
              디지털 미디어 과의존에 따른 뇌 인지 기능 저하를 예측하고, AI 기반의 맞춤형 솔루션을 제공하는 혁신적인 서비스입니다.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Card className="border-border/50 bg-card/50 p-8 md:p-12">
              <h2 className="text-2xl font-bold text-primary md:text-3xl">프로젝트 미션</h2>
              <p className="mt-6 text-pretty leading-relaxed text-muted-foreground md:text-lg">
                무분별한 숏폼 시청과 장시간의 게임이 전두엽 기능에 미치는 악영향을 수치화하여 경각심을 주고, 
                잃어버린 집중력을 되찾기 위한 구체적인 솔루션을 제공합니다. BrainTox는 단순한 스크린 타임 추적을 넘어, 
                과학적 데이터와 AI 기술을 결합하여 당신의 뇌 건강을 지키는 디지털 웰빙 파트너입니다.
              </p>
            </Card>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-3xl font-bold md:text-4xl">기술 스택</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {techFeatures.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card 
                    key={index} 
                    className="group border-border/50 bg-card/50 p-6 transition-all hover:border-primary/50 hover:bg-card"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-3xl font-bold md:text-4xl">작동 원리</h2>
            <div className="mx-auto mt-12 max-w-3xl">
              <Card className="border-border/50 bg-card/50 p-8">
                <div className="space-y-8">
                  {howItWorks.map((item) => (
                    <div key={item.step} className="flex gap-6">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
                        <p className="mt-2 leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* References Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-3xl font-bold md:text-4xl">참고 학술 연구</h2>
            <div className="mx-auto mt-12 max-w-4xl space-y-6">
              {references.map((ref, index) => (
                <Card 
                  key={index} 
                  className="border-border/50 bg-card/50 p-6 transition-all hover:border-primary/30"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold leading-tight">{ref.title}</h3>
                      <p className="mt-1 text-sm italic text-primary/80">{ref.journal}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {ref.description}
                      </p>
                      <a 
                        href={`https://doi.org/${ref.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1 text-sm text-primary hover:underline"
                      >
                        DOI: {ref.doi}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <div className="shrink-0 rounded-md border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                      {ref.year}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <span className="font-semibold">BrainTox</span>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              &copy; 2026 BrainTox. 디지털 웰빙을 위한 첫걸음.
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <a href="/privacy" className="transition-colors hover:text-foreground">
                개인정보처리방침
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
