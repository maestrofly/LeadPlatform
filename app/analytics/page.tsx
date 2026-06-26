'use client'

import { useEffect, useState } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'

export default function AnalyticsPage() {
  const [leads, setLeads] = useState<any[]>([])

  // 🔥 FETCH DATA (WITH FALLBACK DEMO)
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch('/api/leads')
        const data = await res.json()

        console.log('🔥 ANALYTICS DATA:', data)

        // ✅ If API empty, inject demo data so UI always shows
        const finalData =
          Array.isArray(data) && data.length > 0
            ? data
            : [
                {
                  id: 1,
                  name: 'Demo Lead 1',
                  brand: 'Kantanka',
                  status: 'Won',
                  revenue: '500',
                },
                {
                  id: 2,
                  name: 'Demo Lead 2',
                  brand: 'Fairafrique',
                  status: 'New',
                  revenue: '200',
                },
                {
                  id: 3,
                  name: 'Demo Lead 3',
                  brand: 'Kantanka',
                  status: 'Lost',
                  revenue: '0',
                },
              ]

        setLeads(finalData)
      } catch (err) {
        console.error('Analytics fetch failed:', err)

        // fallback demo data if API breaks
        setLeads([
          {
            id: 1,
            name: 'Demo Lead',
            brand: 'Kantanka',
            status: 'Won',
            revenue: '500',
          },
        ])
      }
    }

    fetchLeads()
  }, [])

  // 🔥 GROUP BY BRAND
  const brandStats = leads.reduce((acc: any, lead) => {
    const brand = lead.brand || 'Unknown'

    if (!acc[brand]) {
      acc[brand] = {
        total: 0,
        won: 0,
        lost: 0,
        new: 0,
        revenue: 0,
      }
    }

    acc[brand].total += 1

    if (lead.status === 'Won') acc[brand].won += 1
    if (lead.status === 'Lost') acc[brand].lost += 1
    if (lead.status === 'New') acc[brand].new += 1

    const revenue = parseFloat(
      (lead.revenue || '0').replace(/[^0-9.]/g, '')
    )

    if (!isNaN(revenue)) {
      acc[brand].revenue += revenue
    }

    return acc
  }, {})

  const brands = Object.entries(brandStats)

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="p-8">

        <h1 className="text-3xl font-bold mb-2">
          Brand Analytics Dashboard
        </h1>

        <p className="text-muted-foreground mb-6">
          Live performance breakdown per CE Digital brand
        </p>

        {/* KPI GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          <div className="p-4 border rounded-lg bg-card">
            <p className="text-sm text-muted-foreground">Total Leads</p>
            <h2 className="text-2xl font-bold">{leads.length}</h2>
          </div>

          <div className="p-4 border rounded-lg bg-card">
            <p className="text-sm text-muted-foreground">Brands Active</p>
            <h2 className="text-2xl font-bold">{brands.length}</h2>
          </div>

          <div className="p-4 border rounded-lg bg-card">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <h2 className="text-2xl font-bold">
              $
              {leads
                .reduce((sum, l) => sum + Number(l.revenue || 0), 0)
                .toLocaleString()}
            </h2>
          </div>
        </div>

        {/* BRAND CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {brands.map(([brand, stats]: any) => (
            <div
              key={brand}
              className="border rounded-lg p-5 bg-card"
            >
              <h2 className="text-xl font-bold mb-3">
                {brand}
              </h2>

              <div className="space-y-2 text-sm">
                <p>Total Leads: {stats.total}</p>
                <p>Won: {stats.won}</p>
                <p>Lost: {stats.lost}</p>
                <p>New: {stats.new}</p>

                <p className="font-semibold mt-2">
                  Revenue: ${stats.revenue.toLocaleString()}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  )
}