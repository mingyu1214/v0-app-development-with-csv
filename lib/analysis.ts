import type { UserInput, AnalysisResult, Recommendation, ComparisonData } from './types'

// CSV 데이터에서의 정규화 역변환 (0-1 -> 실제 값)
const denormalizeAge = (normalized: number): number => normalized * 60 + 10 // 10-70세
const denormalizeUsage = (normalized: number): number => normalized * 16 // 0-16시간
const denormalizeSleep = (normalized: number): number => normalized * 8 + 2 // 2-10시간

// 실제 값 -> 정규화 (0-1)
const normalizeAge = (age: number): number => Math.max(0, Math.min(1, (age - 10) / 60))
const normalizeUsage = (usage: number): number => Math.max(0, Math.min(1, usage / 16))
const normalizeSleep = (sleep: number): number => Math.max(0, Math.min(1, (sleep - 2) / 8))

// 수면 효율 계산 (CSV 데이터 기준)
const calculateSleepEfficiency = (sleepNorm: number, usageNorm: number): number => {
  // 수면이 적절하고 사용량이 적을수록 효율이 높음
  const sleepFactor = sleepNorm >= 0.5 && sleepNorm <= 0.875 ? 1 : 0.7 // 6-9시간이 적정
  const usageFactor = 1 - usageNorm * 0.5
  return Math.min(1, sleepFactor * usageFactor * (0.7 + Math.random() * 0.3))
}

// 고위험군 판정 (CSV 데이터 기준)
const isHighRisk = (usageNorm: number, sleepNorm: number, performanceScore: number): boolean => {
  return usageNorm > 0.6 && sleepNorm < 0.5 && performanceScore < 0.5
}

// 적정 수면 판정
const isOptimalSleep = (sleepHours: number): boolean => {
  return sleepHours >= 6 && sleepHours <= 9
}

// 로컬 성능 점수 계산 (Azure ML 폴백용)
const calculateLocalPerformance = (dailyUsageHours: number, sleepHours: number, age: number): number => {
  const basePerformance = 0.7
  const usageImpact = dailyUsageHours > 6 ? -0.05 * (dailyUsageHours - 6) : 0.02 * (6 - dailyUsageHours)
  const sleepImpact = sleepHours >= 7 && sleepHours <= 8 ? 0.1 : -0.05 * Math.abs(sleepHours - 7.5)
  const ageBonus = age >= 25 && age <= 40 ? 0.05 : 0
  return basePerformance + usageImpact + sleepImpact + ageBonus + (Math.random() * 0.1 - 0.05)
}

// 로컬 웰빙 점수 계산 (Azure ML 폴백용)
const calculateLocalWellbeing = (dailyUsageHours: number, sleepHours: number): number => {
  const baseWellbeing = 0.65
  const usageWellbeingImpact = dailyUsageHours > 4 ? -0.04 * (dailyUsageHours - 4) : 0.03 * (4 - dailyUsageHours)
  const sleepWellbeingImpact = isOptimalSleep(sleepHours) ? 0.15 : -0.1
  return baseWellbeing + usageWellbeingImpact + sleepWellbeingImpact + (Math.random() * 0.1 - 0.05)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function analyzeDigitalWellbeing(input: UserInput, azurePrediction?: any): AnalysisResult {
  const { age, jobType, dailyUsageHours, sleepHours } = input

  // 정규화
  const ageNorm = normalizeAge(age)
  const usageNorm = normalizeUsage(dailyUsageHours)
  const sleepNorm = normalizeSleep(sleepHours)

  let performanceScore: number
  let wellbeingScore: number

  // Azure ML 예측 결과가 있으면 사용
  if (azurePrediction) {
    // Azure ML 결과 형식에 따라 파싱 (형식 확인 후 조정 필요)
    // 일반적으로 [예측값] 또는 {result: 예측값} 형태
    if (Array.isArray(azurePrediction)) {
      // [performance, wellbeing] 또는 [risk_level] 형태일 수 있음
      performanceScore = azurePrediction[0] ?? 0.5
      wellbeingScore = azurePrediction[1] ?? azurePrediction[0] ?? 0.5
    } else if (typeof azurePrediction === 'object') {
      performanceScore = azurePrediction.performance_score ?? azurePrediction.score ?? 0.5
      wellbeingScore = azurePrediction.wellbeing_score ?? azurePrediction.performance_score ?? 0.5
    } else if (typeof azurePrediction === 'number') {
      // 단일 위험도 점수인 경우
      performanceScore = 1 - azurePrediction // 위험도가 높으면 성능 낮음
      wellbeingScore = 1 - azurePrediction
    } else {
      // 파싱 실패 시 로컬 계산
      performanceScore = calculateLocalPerformance(dailyUsageHours, sleepHours, age)
      wellbeingScore = calculateLocalWellbeing(dailyUsageHours, sleepHours)
    }
  } else {
    // 로컬 계산 (폴백)
    performanceScore = calculateLocalPerformance(dailyUsageHours, sleepHours, age)
    wellbeingScore = calculateLocalWellbeing(dailyUsageHours, sleepHours)
  }

  // 점수 범위 보정
  performanceScore = Math.max(0.1, Math.min(0.95, performanceScore))
  wellbeingScore = Math.max(0.1, Math.min(0.95, wellbeingScore))

  // 위험 레벨 판정 (건강 권고 기준 적용)
  // - 권장 수면: 7-9시간
  // - 권장 스크린 타임: 4시간 이하
  const highRisk = isHighRisk(usageNorm, sleepNorm, performanceScore)
  let riskLevel: 'low' | 'medium' | 'high' = 'low'
  
  if (highRisk || (dailyUsageHours >= 10 && sleepHours < 5)) {
    riskLevel = 'high'
  } else if (
    dailyUsageHours >= 8 || 
    sleepHours < 5 || 
    (dailyUsageHours >= 6 && sleepHours < 6) ||
    performanceScore < 0.4
  ) {
    riskLevel = 'high'
  } else if (
    dailyUsageHours >= 5 || 
    sleepHours < 7 || 
    performanceScore < 0.6 ||
    wellbeingScore < 0.5
  ) {
    riskLevel = 'medium'
  }

  // 맞춤 추천 생성
  const recommendations = generateRecommendations(input, performanceScore, wellbeingScore, riskLevel)

  // 비교 데이터 (동일 연령대/직업 기준 평균)
  const comparisonData = generateComparisonData(input, performanceScore, wellbeingScore)

  return {
    performanceScore,
    wellbeingScore,
    riskLevel,
    recommendations,
    comparisonData,
  }
}

function generateRecommendations(
  input: UserInput,
  performanceScore: number,
  wellbeingScore: number,
  riskLevel: 'low' | 'medium' | 'high'
): Recommendation[] {
  const recommendations: Recommendation[] = []

  // 사용 시간 기반 추천
  if (input.dailyUsageHours > 6) {
    recommendations.push({
      category: '디지털 디톡스',
      title: '스크린 타임 줄이기',
      description: `현재 하루 ${input.dailyUsageHours}시간 사용 중입니다. 2시간 줄이면 집중력이 15% 향상될 수 있습니다.`,
      priority: input.dailyUsageHours > 10 ? 'high' : 'medium',
    })
  }

  if (input.dailyUsageHours > 4) {
    recommendations.push({
      category: '집중 환경',
      title: '포모도로 기법 활용',
      description: '25분 집중 + 5분 휴식 패턴으로 디지털 피로를 줄이세요.',
      priority: 'medium',
    })
  }

  // 수면 기반 추천
  if (input.sleepHours < 6) {
    recommendations.push({
      category: '수면 개선',
      title: '취침 전 블루라이트 차단',
      description: '잠자리에 들기 1시간 전부터 디지털 기기 사용을 자제하세요.',
      priority: 'high',
    })
  }

  if (input.sleepHours < 7) {
    recommendations.push({
      category: '수면 개선',
      title: '규칙적인 수면 패턴',
      description: `현재 ${input.sleepHours}시간 수면 중입니다. 7-8시간이 최적입니다.`,
      priority: input.sleepHours < 5 ? 'high' : 'medium',
    })
  }

  // 웰빙 점수 기반 추천
  if (wellbeingScore < 0.5) {
    recommendations.push({
      category: '마음 건강',
      title: '디지털 프리 타임 설정',
      description: '하루에 1시간씩 모든 디지털 기기를 내려놓는 시간을 가지세요.',
      priority: 'high',
    })
  }

  // 직업별 맞춤 추천
  if (input.jobType === 'Student') {
    recommendations.push({
      category: '학습 효율',
      title: '앱 차단 기능 활용',
      description: '공부 시간에 SNS와 게임 앱을 자동으로 차단하세요.',
      priority: 'medium',
    })
  }

  if (input.jobType === 'Developer' || input.jobType === 'Designer') {
    recommendations.push({
      category: '눈 건강',
      title: '20-20-20 규칙',
      description: '20분마다 20초간 20피트(6m) 멀리 바라보세요.',
      priority: 'medium',
    })
  }

  // 위험 레벨 기반 추천
  if (riskLevel === 'high') {
    recommendations.unshift({
      category: '긴급 조치',
      title: '즉시 사용 패턴 점검 필요',
      description: '현재 디지털 사용 패턴이 건강에 부정적 영향을 줄 수 있습니다. 전문가 상담을 권장합니다.',
      priority: 'high',
    })
  }

  return recommendations.slice(0, 5)
}

function generateComparisonData(
  input: UserInput,
  performanceScore: number,
  wellbeingScore: number
): ComparisonData {
  // 동일 조건 평균 데이터 시뮬레이션 (실제로는 DB에서 조회)
  const avgUsage = input.jobType === 'Student' ? 5.5 : input.jobType === 'Developer' ? 7.2 : 4.8
  const avgSleep = 6.8
  const avgPerformance = 0.65
  const avgWellbeing = 0.62

  return {
    userUsage: input.dailyUsageHours,
    avgUsage,
    userSleep: input.sleepHours,
    avgSleep,
    userPerformance: performanceScore,
    avgPerformance,
    userWellbeing: wellbeingScore,
    avgWellbeing,
  }
}
