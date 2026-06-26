import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'storage', 'leads.json')

// helper: read
function getLeads() {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]))
    }

    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch (err) {
    console.error('READ ERROR:', err)
    return []
  }
}

// helper: write
function saveLeads(data: any[]) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()

    const leads = getLeads()

    const index = leads.findIndex(
      (l: any) => String(l.id) === String(id)
    )

    if (index === -1) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      )
    }

    leads[index] = {
      ...leads[index],
      status: body.status,
      updatedAt: new Date().toISOString(),
    }

    saveLeads(leads)

    return NextResponse.json({
      success: true,
      lead: leads[index],
    })
  } catch (error) {
    console.error('PATCH ERROR:', error)

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}