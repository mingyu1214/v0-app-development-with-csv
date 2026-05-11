export interface UserInput {
  age: number
  jobType: string
  dailyUsageHours: number
  sleepHours: number
}

export interface AnalysisResult {
  performanceScore: number
  wellbeingScore: number
  riskLevel: 'low' | 'medium' | 'high'
  recommendations: Recommendation[]
  comparisonData: ComparisonData
}

export interface Recommendation {
  category: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
}

export interface ComparisonData {
  userUsage: number
  avgUsage: number
  userSleep: number
  avgSleep: number
  userPerformance: number
  avgPerformance: number
  userWellbeing: number
  avgWellbeing: number
}

export interface UserAnalysis {
  id: string
  user_id: string
  age: number
  job_type: string
  daily_usage_hours: number
  sleep_hours: number
  performance_score: number
  wellbeing_score: number
  risk_level: string
  recommendations: Recommendation[]
  created_at: string
}

export const JOB_TYPES = [
  { value: 'Student', label: '학생' },
  { value: 'Designer', label: '디자이너' },
  { value: 'Teacher', label: '교사' },
  { value: 'Manager', label: '관리직' },
  { value: 'Developer', label: '개발자' },
  { value: 'Other', label: '기타' },
] as const

export const AGE_GROUPS = [
  { min: 10, max: 19, label: 'Teens', displayLabel: '10대' },
  { min: 20, max: 29, label: '20s', displayLabel: '20대' },
  { min: 30, max: 39, label: '30s', displayLabel: '30대' },
  { min: 40, max: 49, label: '40s', displayLabel: '40대' },
  { min: 50, max: 100, label: '50s+', displayLabel: '50대 이상' },
] as const
