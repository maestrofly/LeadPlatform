import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'storage', 'leads.json')

function ensureFile() {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, '[]')
  }
}

export async function POST(req: Request) {
  try {
    ensureFile()

    const body = await req.json()

    // 🧠 Normalize incoming ad data (VERY IMPORTANT)
    const lead = {
      id: Date.now(),
      name: body.name || 'Unknown Lead',
      phone: body.phone || '',
      email: body.email || '',
      source: body.source || 'Ad Campaign',
      campaign: body.campaign || 'Unknown Campaign',
      brand: body.brand || 'Unassigned',
      status: 'New',
      createdDate: new Date().toISOString(),

      // 🔥 tracking metadata (VERY IMPORTANT for ads)
      utm_source: body.utm_source,
      utm_campaign: body.utm_campaign,
      ad_id: body.ad_id,
      platform: body.platform,
    }

    const leads = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    leads.unshift(lead)

    fs.writeFileSync(filePath, JSON.stringify(leads, null, 2))

    return NextResponse.json({
      success: true,
      lead,
    })
  } catch (err) {
    console.error(err)

    return NextResponse.json(
      { error: 'Webhook failed' },
      { status: 500 }
    )
  }
}