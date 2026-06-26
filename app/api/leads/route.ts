import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'storage', 'leads.json')

// 🔥 ENSURE FILE EXISTS
function ensureFile() {
  const dir = path.dirname(filePath)

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]))
  }
}

// POST → CREATE LEAD
export async function POST(req: Request) {
  try {
    ensureFile()

    const body = await req.json()

    const leads = JSON.parse(fs.readFileSync(filePath, 'utf8') || '[]')

    const newLead = {
      id: Date.now(),
      ...body,
      status: body.status || 'New',
      createdDate: new Date().toISOString(),
    }

    leads.push(newLead)

    fs.writeFileSync(filePath, JSON.stringify(leads, null, 2))

    return NextResponse.json(newLead, { status: 201 })
  } catch (error) {
    console.error('CREATE LEAD ERROR:', error)

    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    )
  }
}

// GET → FETCH LEADS
export async function GET() {
  try {
    ensureFile()

    const data = fs.readFileSync(filePath, 'utf8')

    return NextResponse.json(JSON.parse(data || '[]'))
  } catch (error) {
    return NextResponse.json([])
  }
}











// import { NextResponse } from 'next/server'
// import fs from 'fs'
// import path from 'path'

// const filePath = path.join(process.cwd(), 'storage', 'leads.json')

// // GET
// export async function GET() {
//   try {
//     if (!fs.existsSync(filePath)) {
//       return NextResponse.json([])
//     }

//     const data = fs.readFileSync(filePath, 'utf8')

//     if (!data) {
//       return NextResponse.json([])
//     }

//     return NextResponse.json(JSON.parse(data))
//   } catch (err) {
//     console.error(err)
//     return NextResponse.json([])
//   }
// }

// // POST
// export async function POST(req: Request) {
//   try {
//     const body = await req.json()

//     let leads: any[] = []

//     if (fs.existsSync(filePath)) {
//       const fileData = fs.readFileSync(filePath, 'utf8')
//       leads = fileData ? JSON.parse(fileData) : []
//     }

//    const newLead = {
//   id: Date.now().toString(),
//   name,
//   email,
//   phone,
//   source,
//   campaign,

//   // 🔥 THESE ARE REQUIRED FOR ANALYTICS
//   brand: formData.brand || 'Unknown',
//   status: 'New',
//   revenue: '0',
//   createdDate: new Date().toISOString(),
// }
//     leads.push(newLead)

//     fs.writeFileSync(filePath, JSON.stringify(leads, null, 2))

//     return NextResponse.json(newLead)
//   } catch (err) {
//     console.error(err)
//     return NextResponse.json(
//       { error: 'Failed to create lead' },
//       { status: 500 }
//     )
//   }
// }