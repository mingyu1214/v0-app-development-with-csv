import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const searchParams = request.nextUrl.searchParams
  const ageGroup = searchParams.get('ageGroup')
  const jobType = searchParams.get('jobType')

  try {
    let query = supabase.from('reference_data').select('*')

    if (ageGroup) {
      query = query.eq('age_group', ageGroup)
    }

    if (jobType) {
      query = query.eq('job_type', jobType)
    }

    // Get sample data for stats (limit to prevent huge responses)
    const { data, error } = await query.limit(1000)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data || data.length === 0) {
      return NextResponse.json({
        avgUsage: 5.5,
        avgSleep: 6.8,
        avgPerformance: 0.65,
        avgWellbeing: 0.62,
        sampleSize: 0,
      })
    }

    // Calculate averages
    const stats = {
      avgUsage:
        data.reduce((sum, row) => sum + (Number(row.usage_h) * 16), 0) / data.length, // Denormalize
      avgSleep:
        data.reduce((sum, row) => sum + (Number(row.sleep_h) * 8 + 2), 0) / data.length, // Denormalize
      avgPerformance:
        data.reduce((sum, row) => sum + Number(row.performance_score), 0) / data.length,
      avgWellbeing:
        data.reduce((sum, row) => sum + Number(row.wellbeing_score), 0) / data.length,
      highRiskPercentage:
        (data.filter((row) => row.high_risk_flag === 1).length / data.length) * 100,
      sampleSize: data.length,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
