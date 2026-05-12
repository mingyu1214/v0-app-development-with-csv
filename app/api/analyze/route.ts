import { NextRequest, NextResponse } from 'next/server'

const AZURE_ML_ENDPOINT = 'https://focus-guard-endpoint.koreacentral.inference.ml.azure.com/score'

// 나이를 age_group으로 변환
function getAgeGroup(age: number): string {
  if (age < 20) return 'Teenager'
  if (age < 30) return '20s'
  if (age < 40) return '30s'
  if (age < 50) return '40s'
  return '50s+'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { age, jobType, dailyUsageHours, sleepHours } = body

    // CSV 데이터 형식에 맞게 변환
    // usage_h: 원본값 그대로 (0-10시간)
    // sleep_h: 원본값 그대로 (4-9시간)
    // age_group: 나이를 그룹으로 변환
    const ageGroup = getAgeGroup(age)

    const apiKey = process.env.AZURE_ML_API_KEY
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Azure ML API Key not configured' },
        { status: 500 }
      )
    }

    // CSV 컬럼명에 맞춰서 전송
    const inputData = {
      input_data: {
        columns: ['usage_h', 'sleep_h', 'job_type', 'age_group'],
        data: [[dailyUsageHours, sleepHours, jobType, ageGroup]]
      }
    }

    const response = await fetch(AZURE_ML_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(inputData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.log('[v0] Azure ML Error:', response.status, errorText)
      return NextResponse.json(
        { error: `Azure ML Error: ${response.status}`, details: errorText },
        { status: response.status }
      )
    }

    const result = await response.json()
    console.log('[v0] Azure ML Response:', result)

    return NextResponse.json({
      success: true,
      prediction: result,
      input: { age, jobType, dailyUsageHours, sleepHours }
    })

  } catch (error) {
    console.log('[v0] API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    )
  }
}
