'use client'

import { useState, useEffect } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
import { LeadsTable } from '@/components/leads-table'
import { LeadsFilter } from '@/components/leads-filter'

/* =========================
   DEMO DATA
========================= */
const sampleLeads = [
  {
    id: 1,
    name: 'Chioma Okonkwo',
    phone: '+234 805 123 4567',
    source: 'Instagram',
    campaign: 'FIRE Campaign',
    status: 'Won',
    brand: 'Prime Insurance',
    revenue: '$125,000',
    createdDate: '2024-02-15T10:00:00Z',
  },
  {
    id: 2,
    name: 'Tunde Adeyemi',
    phone: '+234 803 456 7890',
    source: 'Facebook',
    campaign: 'Product Launch',
    status: 'Interested',
    brand: 'Cafe Boho',
    revenue: '$85,000',
    createdDate: '2024-03-01T10:00:00Z',
  },
  {
    id: 3,
    name: 'Amara Nwosu',
    phone: '+234 807 789 0123',
    source: 'Website',
    campaign: 'Organic Traffic',
    status: 'Contacted',
    brand: 'Fairafrique',
    revenue: '$0',
    createdDate: '2024-03-05T10:00:00Z',
  },
  {
    id: 4,
    name: 'Kabir Hassan',
    phone: '+234 809 234 5678',
    source: 'TikTok',
    campaign: 'Viral Video Campaign',
    status: 'New',
    brand: 'Kantanka',
    revenue: '$0',
    createdDate: '2024-03-08T10:00:00Z',
  },
]

/* =========================
   MAIN PAGE
========================= */
export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([])
  const [filteredLeads, setFilteredLeads] = useState<any[]>([])

  const [search, setSearch] = useState('')

  const [filters, setFilters] = useState({
    brand: 'all',
    status: 'all',
    source: 'all',
    campaign: '',
  })

  /* =========================
     LOAD DATA
  ========================= */
  useEffect(() => {
    const storedLeads = JSON.parse(localStorage.getItem('leads') || '[]')

    const allLeads = [...sampleLeads, ...storedLeads]

    setLeads(allLeads)
    setFilteredLeads(allLeads)
  }, [])

  /* =========================
     LEAD SCORING (NEW)
  ========================= */
  const calculateScore = (lead: any) => {
    let score = 0

    if (lead.status === 'Won') score += 40
    if (lead.status === 'Interested') score += 25
    if (lead.status === 'Contacted') score += 15
    if (lead.status === 'New') score += 5

    if (lead.source === 'Website') score += 15
    if (lead.source === 'Instagram') score += 10
    if (lead.source === 'Facebook') score += 8

    if (lead.campaign?.toLowerCase().includes('fire')) score += 10

    return Math.min(score, 100)
  }

  /* =========================
     FILTER ENGINE
  ========================= */
  const applyFilters = (f: typeof filters, base: any[]) => {
    let result = base

    // BRAND
    if (f.brand !== 'all') {
      result = result.filter(l => l.brand === f.brand)
    }

    // STATUS
    if (f.status !== 'all') {
      result = result.filter(l => l.status === f.status)
    }

    // SOURCE
    if (f.source !== 'all') {
      result = result.filter(l => l.source === f.source)
    }

    // CAMPAIGN SEARCH
    if (f.campaign.trim()) {
      result = result.filter(l =>
        l.campaign?.toLowerCase().includes(f.campaign.toLowerCase())
      )
    }

    // GLOBAL SEARCH (NEW)
    if (search.trim()) {
      result = result.filter(l =>
        `${l.name} ${l.phone} ${l.brand} ${l.source}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    }

    return result
  }

  /* =========================
     HANDLE FILTER CHANGE
  ========================= */
  const handleFilterChange = (key: string, value: string) => {
    const updated = { ...filters, [key]: value }

    setFilters(updated)
    setFilteredLeads(applyFilters(updated, leads))
  }

  /* =========================
     HANDLE SEARCH
  ========================= */
  const handleSearch = (value: string) => {
    setSearch(value)

    const filtered = applyFilters(filters, leads)
    setFilteredLeads(filtered)
  }

  /* =========================
     ANALYTICS
  ========================= */
  const total = filteredLeads.length
  const won = filteredLeads.filter(l => l.status === 'Won').length
  const interested = filteredLeads.filter(l => l.status === 'Interested').length
  const newLeads = filteredLeads.filter(l => l.status === 'New').length

  const leadsWithScore = filteredLeads.map(l => ({
    ...l,
    score: calculateScore(l),
  }))

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="flex-1 overflow-auto">
        <div className="p-8">

          <h1 className="text-3xl font-bold mb-2 text-foreground">
            Leads
          </h1>

          <p className="text-muted-foreground mb-6">
            Manage and track leads across all CE Digital brands
          </p>

          {/* =========================
              ANALYTICS DASHBOARD
          ========================= */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card title="Total Leads" value={total} />
            <Card title="Won" value={won} />
            <Card title="Interested" value={interested} />
            <Card title="New" value={newLeads} />
          </div>

          {/* =========================
              SEARCH BAR
          ========================= */}
          <input
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search leads by name, phone, brand..."
            className="w-full mb-4 p-3 border rounded-lg bg-background"
          />

          {/* =========================
              FILTERS
          ========================= */}
          <LeadsFilter
            filters={filters}
            onChange={handleFilterChange}
          />

          {/* =========================
              TABLE
          ========================= */}
          <div className="mt-6">
            <LeadsTable leads={leadsWithScore} />
          </div>

        </div>
      </main>
    </div>
  )
}

/* =========================
   SMALL UI CARD COMPONENT
========================= */
function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="p-4 border rounded-lg bg-card">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}




// 'use client'

// import { useState, useEffect } from 'react'
// import { DashboardHeader } from '@/components/dashboard-header'
// import { LeadsTable } from '@/components/leads-table'
// import { LeadsFilter } from '@/components/leads-filter'

// // Demo fallback data
// const sampleLeads = [
//   {
//     id: 1,
//     name: 'Chioma Okonkwo',
//     phone: '+234 805 123 4567',
//     source: 'Instagram',
//     campaign: 'FIRE Campaign',
//     status: 'Won',
//     brand: 'Prime Insurance',
//     revenue: '$125,000',
//     createdDate: '2024-02-15T10:00:00Z',
//   },
//   {
//     id: 2,
//     name: 'Tunde Adeyemi',
//     phone: '+234 803 456 7890',
//     source: 'Facebook',
//     campaign: 'Product Launch',
//     status: 'Interested',
//     brand: 'Cafe Boho',
//     revenue: '$85,000',
//     createdDate: '2024-03-01T10:00:00Z',
//   },
//   {
//     id: 3,
//     name: 'Amara Nwosu',
//     phone: '+234 807 789 0123',
//     source: 'Website',
//     campaign: 'Organic Traffic',
//     status: 'Contacted',
//     brand: 'Fairafrique',
//     revenue: '$0',
//     createdDate: '2024-03-05T10:00:00Z',
//   },
//   {
//     id: 4,
//     name: 'Kabir Hassan',
//     phone: '+234 809 234 5678',
//     source: 'TikTok',
//     campaign: 'Viral Video Campaign',
//     status: 'New',
//     brand: 'Kantanka',
//     revenue: '$0',
//     createdDate: '2024-03-08T10:00:00Z',
//   },
// ]

// export default function LeadsPage() {
//   const [leads, setLeads] = useState<any[]>([])
//   const [filteredLeads, setFilteredLeads] = useState<any[]>([])

//   const [filters, setFilters] = useState({
//     brand: 'all',
//     status: 'all',
//     source: 'all',
//     campaign: '',
//   })

//   // LOAD DATA
//   useEffect(() => {
//     const storedLeads = JSON.parse(localStorage.getItem('leads') || '[]')

//     const allLeads = [...sampleLeads, ...storedLeads]

//     setLeads(allLeads)
//     setFilteredLeads(allLeads)
//   }, [])

//   // FILTER ENGINE
//   const applyFilters = (f: typeof filters, base: any[]) => {
//     let result = base

//     if (f.brand !== 'all') {
//       result = result.filter(l => l.brand === f.brand)
//     }

//     if (f.status !== 'all') {
//       result = result.filter(l => l.status === f.status)
//     }

//     if (f.source !== 'all') {
//       result = result.filter(l => l.source === f.source)
//     }

//     if (f.campaign.trim()) {
//       result = result.filter(l =>
//         l.campaign?.toLowerCase().includes(f.campaign.toLowerCase())
//       )
//     }

//     return result
//   }

//   // HANDLE FILTER CHANGE
//   const handleFilterChange = (key: string, value: string) => {
//     const updated = { ...filters, [key]: value }

//     setFilters(updated)
//     setFilteredLeads(applyFilters(updated, leads))
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <DashboardHeader />

//       <main className="flex-1 overflow-auto">
//         <div className="p-8">

//           <h1 className="text-3xl font-bold mb-2 text-foreground">
//             Leads
//           </h1>

//           <p className="text-muted-foreground mb-6">
//             Manage and track all leads across CE Digital brands
//           </p>

//           {/* FILTER UI */}
//           <LeadsFilter
//             filters={filters}
//             onChange={handleFilterChange}
//           />

//           {/* TABLE */}
//           <div className="mt-6">
//             <LeadsTable leads={filteredLeads} />
//           </div>

//         </div>
//       </main>
//     </div>
//   )
// }


// 'use client'

// import { useState, useEffect } from 'react'
// import { DashboardHeader } from '@/components/dashboard-header'
// import { LeadsTable } from '@/components/leads-table'
// import { LeadsFilter } from '@/components/leads-filter'

// // Demo fallback data
// const sampleLeads = [
//   {
//     id: 1,
//     name: 'Chioma Okonkwo',
//     phone: '+234 805 123 4567',
//     source: 'Instagram',
//     campaign: 'FIRE Campaign',
//     status: 'Won',
//     brand: 'Prime Insurance',
//     revenue: '$125,000',
//     createdDate: '2024-02-15T10:00:00Z',
//   },
//   {
//     id: 2,
//     name: 'Tunde Adeyemi',
//     phone: '+234 803 456 7890',
//     source: 'Facebook',
//     campaign: 'Product Launch',
//     status: 'Interested',
//     brand: 'Aer Power Pocket',
//     revenue: '$85,000',
//     createdDate: '2024-03-01T10:00:00Z',
//   },
//   {
//     id: 3,
//     name: 'Amara Nwosu',
//     phone: '+234 807 789 0123',
//     source: 'Website',
//     campaign: 'Organic Traffic',
//     status: 'Contacted',
//     brand: 'Fairafrique',
//     revenue: '$0',
//     createdDate: '2024-03-05T10:00:00Z',
//   },
//   {
//     id: 4,
//     name: 'Kabir Hassan',
//     phone: '+234 809 234 5678',
//     source: 'TikTok',
//     campaign: 'Viral Video Campaign',
//     status: 'New',
//     brand: 'Bel Aqua',
//     revenue: '$0',
//     createdDate: '2024-03-08T10:00:00Z',
//   },
// ]

// export default function LeadsPage() {
//   const [filter, setFilter] = useState('all')

//   const [filters, setFilters] = useState({
//     brand: 'all',
//     status: 'all',
//     source: 'all',
//     campaign: '',
//   })

//   const [leads, setLeads] = useState<any[]>([])
//   const [filteredLeads, setFilteredLeads] = useState<any[]>([])

//   // Load + merge leads
//   useEffect(() => {
//     const storedLeads = JSON.parse(localStorage.getItem('leads') || '[]')

//     const allLeads = [...sampleLeads, ...storedLeads]

//     setLeads(allLeads)
//     setFilteredLeads(allLeads)
//   }, [])

//   // CORE FILTER ENGINE (PRO CRM STYLE)
//   const applyFilters = (updatedFilters: typeof filters, base: any[]) => {
//     let result = base

//     // BRAND FILTER
//     if (updatedFilters.brand !== 'all') {
//       result = result.filter(l => l.brand === updatedFilters.brand)
//     }

//     // STATUS FILTER
//     if (updatedFilters.status !== 'all') {
//       result = result.filter(l => l.status === updatedFilters.status)
//     }

//     // SOURCE FILTER
//     if (updatedFilters.source !== 'all') {
//       result = result.filter(l => l.source === updatedFilters.source)
//     }

//     // CAMPAIGN FILTER (partial match like real CRM)
//     if (updatedFilters.campaign.trim() !== '') {
//       result = result.filter(l =>
//         l.campaign
//           ?.toLowerCase()
//           .includes(updatedFilters.campaign.toLowerCase())
//       )
//     }

//     return result
//   }

//   // HANDLE FILTER CHANGE
//   const handleFilterChange = (key: string, value: string) => {
//     const updated = {
//       ...filters,
//       [key]: value,
//     }

//     setFilters(updated)

//     const filtered = applyFilters(updated, leads)
//     setFilteredLeads(filtered)
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <DashboardHeader />

//       <main className="flex-1 overflow-auto">
//         <div className="p-8">

//           <h1 className="text-3xl font-bold mb-2 text-foreground">
//             Leads
//           </h1>

//           <p className="text-muted-foreground mb-6">
//             Manage and track all your leads across all CE Digital brands
//           </p>

//           {/* FILTERS */}
//           <LeadsFilter
//             onFilterChange={handleFilterChange}
//             currentFilter={filter}
//           />

//           <div className="mt-6">
//             <LeadsTable leads={filteredLeads} />
//           </div>

//         </div>
//       </main>
//     </div>
//   )
// }

// 'use client'

// import { useState, useEffect } from 'react'
// import { DashboardHeader } from '@/components/dashboard-header'
// import { LeadsTable } from '@/components/leads-table'
// import { LeadsFilter } from '@/components/leads-filter'

// // Demo fallback data
// const sampleLeads = [
//   {
//     id: 1,
//     name: 'Chioma Okonkwo',
//     phone: '+234 805 123 4567',
//     source: 'Instagram',
//     campaign: 'Summer Sale Campaign',
//     status: 'Won',
//     revenue: '$125,000',
//     createdDate: '2024-02-15T10:00:00Z',
//   },
//   {
//     id: 2,
//     name: 'Tunde Adeyemi',
//     phone: '+234 803 456 7890',
//     source: 'Facebook',
//     campaign: 'Product Launch',
//     status: 'Interested',
//     revenue: '$85,000',
//     createdDate: '2024-03-01T10:00:00Z',
//   },
//   {
//     id: 3,
//     name: 'Amara Nwosu',
//     phone: '+234 807 789 0123',
//     source: 'Website',
//     campaign: 'Organic Traffic',
//     status: 'Contacted',
//     revenue: '$0',
//     createdDate: '2024-03-05T10:00:00Z',
//   },
//   {
//     id: 4,
//     name: 'Kabir Hassan',
//     phone: '+234 809 234 5678',
//     source: 'TikTok',
//     campaign: 'Viral Video Campaign',
//     status: 'New',
//     revenue: '$0',
//     createdDate: '2024-03-08T10:00:00Z',
//   },
// ]

// export default function LeadsPage() {
//   const [filter, setFilter] = useState('all')
//   const [leads, setLeads] = useState<any[]>([])
//   const [filteredLeads, setFilteredLeads] = useState<any[]>([])

//   useEffect(() => {
//     const storedLeads = JSON.parse(localStorage.getItem('leads') || '[]')

//     const allLeads = [...sampleLeads, ...storedLeads]

//     setLeads(allLeads)
//     setFilteredLeads(allLeads)
//   }, [])

//   const handleFilterChange = (newFilter: string) => {
//     setFilter(newFilter)

//     const base = leads

//     if (newFilter === 'all') {
//       setFilteredLeads(base)
//       return
//     }

//     const statusFilters = ['New', 'Contacted', 'Interested', 'Won', 'Lost']
//     const sourceFilters = ['Facebook', 'Instagram', 'Website', 'TikTok']

//     if (statusFilters.includes(newFilter)) {
//       setFilteredLeads(base.filter(l => l.status === newFilter))
//     } else if (sourceFilters.includes(newFilter)) {
//       setFilteredLeads(base.filter(l => l.source === newFilter))
//     }
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <DashboardHeader />

//       <main className="flex-1 overflow-auto">
//         <div className="p-8">
//           <h1 className="text-3xl font-bold mb-2 text-foreground">
//             Leads
//           </h1>

//           <p className="text-muted-foreground mb-6">
//             Manage and track all your leads
//           </p>

//           <LeadsFilter
//             onFilterChange={handleFilterChange}
//             currentFilter={filter}
//           />

//           <div className="mt-6">
//             <LeadsTable leads={filteredLeads} />
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }





// 'use client'

// import { useState, useEffect } from 'react'
// import { DashboardHeader } from '@/components/dashboard-header'
// import { LeadsTable } from '@/components/leads-table'
// import { LeadsFilter } from '@/components/leads-filter'

// // Sample leads data (fallback/demo data)
// const sampleLeads = [
//   {
//     id: 1,
//     name: 'Chioma Okonkwo',
//     phone: '+234 805 123 4567',
//     source: 'Instagram',
//     campaign: 'Summer Sale Campaign',
//     status: 'Won',
//     revenue: '$125,000',
//   },
//   {
//     id: 2,
//     name: 'Tunde Adeyemi',
//     phone: '+234 803 456 7890',
//     source: 'Facebook',
//     campaign: 'Product Launch',
//     status: 'Interested',
//     revenue: '$85,000',
//   },
//   {
//     id: 3,
//     name: 'Amara Nwosu',
//     phone: '+234 807 789 0123',
//     source: 'Website',
//     campaign: 'Organic Traffic',
//     status: 'Contacted',
//     revenue: '$0',
//   },
//   {
//     id: 4,
//     name: 'Kabir Hassan',
//     phone: '+234 809 234 5678',
//     source: 'TikTok',
//     campaign: 'Viral Video Campaign',
//     status: 'New',
//     revenue: '$0',
//   },
//   {
//     id: 5,
//     name: 'Zainab Ibrahim',
//     phone: '+234 801 567 8901',
//     source: 'Instagram',
//     campaign: 'Influencer Partnership',
//     status: 'Won',
//     revenue: '$250,000',
//   },
// ]

// export default function LeadsPage() {
//   const [filter, setFilter] = useState('all')
//   const [leads, setLeads] = useState<any[]>([])
//   const [filteredLeads, setFilteredLeads] = useState<any[]>([])

//   // Load leads from localStorage on page load
//   useEffect(() => {
//     const storedLeads = JSON.parse(
//       localStorage.getItem('leads') || '[]'
//     )

//     // merge demo + real leads
//     const allLeads = [...sampleLeads, ...storedLeads]

//     setLeads(allLeads)
//     setFilteredLeads(allLeads)
//   }, [])

//   // Handle filtering
//   const handleFilterChange = (newFilter: string) => {
//     setFilter(newFilter)

//     let base = leads

//     if (newFilter === 'all') {
//       setFilteredLeads(base)
//       return
//     }

//     const statusFilters = [
//       'New',
//       'Contacted',
//       'Interested',
//       'Won',
//       'Lost',
//     ]

//     const sourceFilters = [
//       'Facebook',
//       'Instagram',
//       'Website',
//       'TikTok',
//     ]

//     if (statusFilters.includes(newFilter)) {
//       setFilteredLeads(
//         base.filter((lead) => lead.status === newFilter)
//       )
//     } else if (sourceFilters.includes(newFilter)) {
//       setFilteredLeads(
//         base.filter((lead) => lead.source === newFilter)
//       )
//     }
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <DashboardHeader />

//       <main className="flex-1 overflow-auto">
//         <div className="p-8">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-foreground mb-2">
//               Leads
//             </h1>
//             <p className="text-muted-foreground">
//               Manage and track all your leads
//             </p>
//           </div>

//           <LeadsFilter
//             onFilterChange={handleFilterChange}
//             currentFilter={filter}
//           />

//           <div className="mt-6">
//             <LeadsTable leads={filteredLeads} />
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }







