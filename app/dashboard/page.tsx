'use client'

import { DashboardHeader } from '@/components/dashboard-header'
import { KpiCard } from '@/components/kpi-card'
import { LeadsChart } from '@/components/leads-chart'
import { TrendChart } from '@/components/trend-chart'
import { InsightCard } from '@/components/insight-card'

export default function DashboardPage() {
  // Sample data
  const kpis = [
    { label: 'Total Leads', value: '2,847', change: 12 },
    { label: 'New Leads Today', value: '43', change: 5 },
    { label: 'Contacted Leads', value: '1,204', change: 8 },
    { label: 'Converted Leads', value: '312', change: 15 },
    { label: 'Revenue Generated', value: '₦1.8M', change: 22 },
    { label: 'Conversion Rate', value: '11.0%', change: 3 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your lead performance overview.</p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {kpis.map((kpi, index) => (
              <KpiCard key={index} {...kpi} />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <LeadsChart />
            <TrendChart />
          </div>

          {/* Insights Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InsightCard 
              title="Best Performing Campaign"
              campaign="Instagram Ads - Q2 Launch"
              leads={456}
              conversionRate={14.2}
              trend="up"
            />
            <InsightCard 
              title="Campaign Needing Attention"
              campaign="Facebook Ads - Retargeting"
              leads={128}
              conversionRate={6.8}
              trend="down"
            />
          </div>
        </div>
      </main>
    </div>
  )
}
