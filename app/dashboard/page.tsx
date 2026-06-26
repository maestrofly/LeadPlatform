'use client'

import { useEffect, useState } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
import { KpiCard } from '@/components/kpi-card'
import { LeadsChart } from '@/components/leads-chart'
import { TrendChart } from '@/components/trend-chart'
import { InsightCard } from '@/components/insight-card'


type Lead = {
  id: string | number
  status: string
  revenue?: string
  createdDate?: string
  brand?: string
  campaign?: string
}

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([])

  // 🔁 FETCH FROM API
  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/leads')

      if (!res.ok) throw new Error('Failed to fetch leads')

      const data = await res.json()

      setLeads(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Dashboard fetch error:', err)
    }
  }

  // 🔁 INITIAL + REAL TIME POLLING
  useEffect(() => {
    fetchLeads()

    const interval = setInterval(() => {
      fetchLeads()
    }, 4000) // updates every 4 seconds

    return () => clearInterval(interval)
  }, [])

  // 📊 KPI CALCULATIONS (LIVE)
  const totalLeads = leads.length

  const newLeadsToday = leads.filter(
    l =>
      new Date(l.createdDate).toDateString() ===
      new Date().toDateString()
  ).length

  const contactedLeads = leads.filter(l => l.status === 'Contacted').length
  const convertedLeads = leads.filter(l => l.status === 'Won').length

  const revenue = leads.reduce((sum, l) => {
    const val = parseFloat((l.revenue || '0').replace(/[^0-9.]/g, ''))
    return sum + (isNaN(val) ? 0 : val)
  }, 0)

  const conversionRate =
    totalLeads === 0
      ? 0
      : ((convertedLeads / totalLeads) * 100).toFixed(1)

  const kpis = [
    { label: 'Total Leads', value: totalLeads.toString(), change: 0 },
    { label: 'New Leads Today', value: newLeadsToday.toString(), change: 0 },
    { label: 'Contacted Leads', value: contactedLeads.toString(), change: 0 },
    { label: 'Converted Leads', value: convertedLeads.toString(), change: 0 },
    { label: 'Revenue Generated', value: `₦${revenue.toLocaleString()}`, change: 0 },
    { label: 'Conversion Rate', value: `${conversionRate}%`, change: 0 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      

      <main className="flex-1 overflow-auto">
        <div className="p-8">

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Live CRM overview (updates every 4 seconds)
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {kpis.map((kpi, index) => (
              <KpiCard key={index} {...kpi} />
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <LeadsChart />
            <TrendChart />
          </div>

          {/* Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InsightCard
              title="Best Performing Campaign"
              campaign="Live Data"
              leads={leads.length}
              conversionRate={Number(conversionRate)}
              trend="up"
            />

            <InsightCard
              title="System Activity"
              campaign="Real-time tracking enabled"
              leads={newLeadsToday}
              conversionRate={Number(conversionRate)}
              trend="up"
            />
          </div>
        </div>
      </main>
    </div>
  )
}






// 'use client'

// import { DashboardHeader } from '@/components/dashboard-header'
// import { KpiCard } from '@/components/kpi-card'
// import { LeadsChart } from '@/components/leads-chart'
// import { TrendChart } from '@/components/trend-chart'
// import { InsightCard } from '@/components/insight-card'

// export default function DashboardPage() {
//   // Sample data
//   const kpis = [
//     { label: 'Total Leads', value: '2,847', change: 12 },
//     { label: 'New Leads Today', value: '43', change: 5 },
//     { label: 'Contacted Leads', value: '1,204', change: 8 },
//     { label: 'Converted Leads', value: '312', change: 15 },
//     { label: 'Revenue Generated', value: '$1.8M', change: 22 },
//     { label: 'Conversion Rate', value: '11.0%', change: 3 },
//   ]

//   return (
//     <div className="min-h-screen bg-background">
//       <DashboardHeader />
      
//       <main className="flex-1 overflow-auto">
//         <div className="p-8">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
//             <p className="text-muted-foreground">Welcome back! Here's your lead performance overview.</p>
//           </div>

//           {/* KPI Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//             {kpis.map((kpi, index) => (
//               <KpiCard key={index} {...kpi} />
//             ))}
//           </div>

//           {/* Charts Section */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//             <LeadsChart />
//             <TrendChart />
//           </div>

//           {/* Insights Section */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <InsightCard 
//               title="Best Performing Campaign"
//               campaign="Instagram Ads - Q2 Launch"
//               leads={456}
//               conversionRate={14.2}
//               trend="up"
//             />
//             <InsightCard 
//               title="Campaign Needing Attention"
//               campaign="Facebook Ads - Retargeting"
//               leads={128}
//               conversionRate={6.8}
//               trend="down"
//             />
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }
