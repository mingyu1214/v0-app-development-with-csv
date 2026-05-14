import { Header } from '@/components/header'
import { Card } from '@/components/ui/card'
import { Shield, Database, Trash2, Lock, Eye, Clock } from 'lucide-react'

export default function PrivacyPage() {
  const sections = [
    {
      icon: Database,
      title: '수집하는 정보',
      content: `본 서비스는 디지털 웰빙 분석을 위해 다음 정보를 일시적으로 처리합니다:
      
• 나이 (연령대 파악 목적)
• 일일 디지털 기기 사용 시간
• 일일 수면 시간

위 정보는 개인을 식별할 수 없는 통계적 정보로만 활용됩니다.`,
    },
    {
      icon: Trash2,
      title: '정보의 휘발성 처리',
      content: `사용자가 입력한 모든 정보는 분석 결과 도출 즉시 휘발됩니다.

• 서버에 저장되지 않습니다
• 데이터베이스에 기록되지 않습니다
• 쿠키나 로컬 스토리지에 저장되지 않습니다
• 브라우저를 닫으면 모든 정보가 완전히 삭제됩니다`,
    },
    {
      icon: Lock,
      title: '정보 보안',
      content: `모든 데이터 처리는 HTTPS 암호화된 연결을 통해 이루어지며, 
클라이언트 측에서만 분석이 수행됩니다. 
서버로 개인정보가 전송되거나 저장되지 않습니다.`,
    },
    {
      icon: Eye,
      title: '제3자 제공',
      content: `수집된 정보는 어떠한 제3자에게도 제공, 공유, 판매되지 않습니다.
외부 분석 도구나 광고 플랫폼과 연동되지 않습니다.`,
    },
    {
      icon: Clock,
      title: '정보 보유 기간',
      content: `정보 보유 기간: 0초

분석 완료 즉시 모든 입력 정보는 메모리에서 삭제됩니다.
어떠한 형태로도 영구 저장되지 않습니다.`,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">개인정보 처리방침</h1>
            <p className="text-muted-foreground">
              뇌톡스는 사용자의 개인정보 보호를 최우선으로 합니다.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              최종 수정일: 2026년 5월 14일
            </p>
          </div>

          {/* Key Point */}
          <Card className="mb-8 border-primary/30 bg-primary/10 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20">
                <Trash2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-primary">핵심 원칙: 데이터 미저장</h3>
                <p className="text-sm text-foreground/70">
                  뇌톡스는 사용자의 어떠한 정보도 저장하지 않습니다. 
                  입력된 정보는 분석 결과 도출 후 즉시 휘발되며, 
                  서버나 데이터베이스에 기록되지 않습니다.
                </p>
              </div>
            </div>
          </Card>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => {
              const Icon = section.icon
              return (
                <Card key={index} className="border-border/50 bg-card p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                  </div>
                  <p className="whitespace-pre-line text-foreground/70">
                    {section.content}
                  </p>
                </Card>
              )
            })}
          </div>

          {/* Contact */}
          <Card className="mt-8 border-border/50 bg-card p-6">
            <h2 className="mb-4 text-xl font-semibold text-foreground">문의</h2>
            <p className="text-foreground/70">
              개인정보 처리방침에 대한 문의사항이 있으시면 아래로 연락해주세요.
            </p>
            <p className="mt-2 text-primary">contact@outlook.com</p>
          </Card>
        </div>
      </main>
    </div>
  )
}
