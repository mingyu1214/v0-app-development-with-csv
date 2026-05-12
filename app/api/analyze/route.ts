import { NextRequest, NextResponse } from 'next/server'

const AZURE_ML_ENDPOINT = 'https://focus-guard-endpoint.koreacentral.inference.ml.azure.com/score'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { age, jobType, dailyUsageHours, sleepHours } = body

    // 정규화 (CSV 데이터 기준)
    // age: 10-80 → 0-1
    // usage_h: 0-16 → 0-1  
    // sleep_h: 2-10 → 0-1
    const ageNorm = (age - 10) / 70
    const usageNorm = dailyUsageHours / 16
    const sleepNorm = (sleepHours - 2) / 8

    const apiKey = process.env.AZURE_ML_API_KEY
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Azure ML API Key not configured' },
        { status: 500 }
      )
    }

    const inputData = {
      input_data: {
        columns: ['age', 'job_type', 'usage_h', 'sleep_h'],
        data: [[ageNorm, jobType, usageNorm, sleepNorm]]
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
