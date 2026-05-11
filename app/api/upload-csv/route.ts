import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Papa from 'papaparse'

// Admin client for bulk operations (bypasses RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface CSVRow {
  age: string
  job_type: string
  usage_h: string
  sleep_h: string
  performance_score: string
  wellbeing_score: string
  age_group: string
  sleep_efficiency: string
  optimal_sleep_flag: string
  high_risk_flag: string
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const text = await file.text()
    const { data, errors } = Papa.parse<CSVRow>(text, {
      header: true,
      skipEmptyLines: true,
    })

    if (errors.length > 0) {
      return NextResponse.json({ error: 'CSV parsing failed', details: errors }, { status: 400 })
    }

    // Batch insert (in chunks of 1000)
    const BATCH_SIZE = 1000
    let totalInserted = 0

    for (let i = 0; i < data.length; i += BATCH_SIZE) {
      const batch = data.slice(i, i + BATCH_SIZE).map((row) => ({
        age: parseFloat(row.age) || 0,
        job_type: row.job_type || 'Other',
        usage_h: parseFloat(row.usage_h) || 0,
        sleep_h: parseFloat(row.sleep_h) || 0,
        performance_score: parseFloat(row.performance_score) || 0,
        wellbeing_score: parseFloat(row.wellbeing_score) || 0,
        age_group: row.age_group || 'Unknown',
        sleep_efficiency: parseFloat(row.sleep_efficiency) || 0,
        optimal_sleep_flag: parseInt(row.optimal_sleep_flag) || 0,
        high_risk_flag: parseInt(row.high_risk_flag) || 0,
      }))

      const { error } = await supabaseAdmin.from('reference_data').insert(batch)

      if (error) {
        console.error('Batch insert error:', error)
        return NextResponse.json(
          { error: 'Database insert failed', details: error.message },
          { status: 500 }
        )
      }

      totalInserted += batch.length
    }

    return NextResponse.json({
      success: true,
      inserted: totalInserted,
      message: `Successfully uploaded ${totalInserted} records`,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed', details: String(error) },
      { status: 500 }
    )
  }
}
