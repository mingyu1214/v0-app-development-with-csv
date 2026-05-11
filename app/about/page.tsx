'use client'

import { Header } from '@/components/header'
import { Card } from '@/components/ui/card'
import { 
  Brain, 
  FileText, 
  Sparkles, 
  Shield, 
  BarChart3, 
  Eye,
  ExternalLink,
  AlertTriangle
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Slide 01 - BrainTox 위험도 분석 (3개 카드)
const analysisFeatures = [
  {
    color: 'bg-blue-400',
    title: '연구 근거',
    description: '스크린 사용 장애 메타분석과 아동·청소년 스마트폰 사용 연구 반영',
  },
  {
    color: 'bg-teal-400',
    title: '위험도 모델',
    description: '15,000행 위험도 데이터로 학습한 Random Forest 모델 사용',
  },
  {
    color: 'bg-green-400',
    title: 'Azure ML',
    description: 'scoring script와 endpoint/deployment 설정 기반 클라우드 배포 구조',
  },
]

// Slide 02 - 기술 스택 (6개 카드)
const techFeatures = [
  {
    color: 'bg-gradient-to-br from-blue-400 to-purple-400',
    title: '논문 기반 위험 신호 계산',
    description: '효과 크기와 사용 시간 기준을 반영해 위험 신호를 산정합니다.',
  },
  {
    color: 'bg-teal-400',
    title: '간결한 입력 설계',
    description: '나이, 사용 시간, 수면 시간만으로 빠르게 분석합니다.',
  },
  {
    color: 'bg-green-400',
    title: 'Azure 기반 클라우드 ML',
    description: 'Azure ML 배포용 scoring script와 설정을 준비했습니다.',
  },
  {
    color: 'bg-amber-400',
    title: '위험도 전용 모델',
    description: 'Random Forest 기반 위험도 분류 결과를 제공합니다.',
  },
  {
    color: 'bg-rose-400',
    title: '성능 지표 기반 검증',
    description: 'Macro F1 0.726 모델을 대표 지표로 제시합니다.',
  },
  {
    color: 'bg-blue-300',
    title: '해석 가능한 결과',
    description: '연구 점수와 ML 예측을 함께 보여줍니다.',
  },
]

// Slide 03 - 대표 숫자
const stats = [
  {
    value: '15,000',
    label: '위험도 학습 행',
    color: 'text-green-400',
  },
  {
    value: '0.726',
    label: '위험도 Macro F1',
    color: 'text-green-400',
  },
  {
    value: 'g=.50',
    label: '주의·집중 효과',
    color: 'text-green-400',
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
        {/* Section 1: BrainTox 위험도 분석 */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-4">
              <span className="inline-block rounded-full border border-teal-500/50 bg-teal-500/10 px-4 py-1.5 text-sm font-medium text-teal-400">
                BrainTox Product Preview
              </span>
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
              BrainTox 위험도 분석
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              논문 근거와 Azure ML 위험도 모델을 중심으로 디지털 과의존 위험 신호를 분석합니다.
            </p>
            
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {analysisFeatures.map((feature, index) => (
                <Card 
                  key={index} 
                  className="border-border/50 bg-card/50 p-6"
                >
                  <div className={`h-4 w-4 rounded-full ${feature.color}`} />
                  <h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>

            {/* 핵심 문장 */}
            <div className="mt-12">
              <h3 className="text-lg font-semibold text-amber-400">홈페이지 핵심 문장</h3>
              <p className="mt-2 text-muted-foreground">
                BrainTox는 논문 기반 위험 신호 계산과 Azure ML 위험도 모델을 결합해 스마트폰 사용량과 수면 패턴의 디지털 과의존 위험도를 분석합니다.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: 기술 스택 */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold md:text-4xl">기술 스택</h2>
            <p className="mt-4 text-muted-foreground">
              연구 기반 계산, 간결한 입력, Azure ML 위험도 모델을 하나의 서비스 흐름으로 연결합니다.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {techFeatures.map((feature, index) => (
                <Card 
                  key={index} 
                  className="border-border/50 bg-card/50 p-6 transition-all hover:border-primary/30"
                >
                  <div className={`h-4 w-4 rounded-full ${feature.color}`} />
                  <h3 className="mt-6 text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: 대표 숫자와 고지 문구 */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold md:text-4xl">대표 숫자와 고지 문구</h2>
            <p className="mt-4 text-muted-foreground">
              위험도 분석에 필요한 수치와 안전 고지만 명확하게 노출합니다.
            </p>
            
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {stats.map((stat, index) => (
                <Card 
                  key={index} 
                  className="border-border/50 bg-card/50 p-8 text-center"
                >
                  <div className={`text-5xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                  <p className="mt-3 text-muted-foreground">{stat.label}</p>
                </Card>
              ))}
            </div>

            {/* 결과 화면 고지 */}
            <Card className="mt-8 border-amber-500/30 bg-amber-500/5 p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-amber-400">
                <AlertTriangle className="h-5 w-5" />
                결과 화면 고지
              </h3>
              <p className="mt-3 text-muted-foreground">
                이 결과는 연구 기반 계산과 위험도 분류 모델의 참고용 예측이며, 의료 또는 상담 진단이 아닙니다.
              </p>
            </Card>

            <p className="mt-6 text-sm text-muted-foreground">
              노출 기준: 위험도 학습 행 / 위험도 Macro F1 / 논문 효과 크기 중심
            </p>
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
