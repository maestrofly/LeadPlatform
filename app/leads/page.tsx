'use client'

import { useState, useEffect } from 'react'
import { DashboardHeader } from '@/components/dashboard-header'
import { LeadsTable } from '@/components/leads-table'
import { LeadsFilter } from '@/components/leads-filter'

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([])
  const [filteredLeads, setFilteredLeads] = useState<any[]>([])

  const [filters, setFilters] = useState({
    brand: 'all',
    status: 'all',
    source: 'all',
    campaign: '',
  })

  // 🔁 FETCH LEADS (SOURCE OF TRUTH = API ONLY)
  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/leads')

if (!res.ok) {
  throw new Error('API failed')
}

const text = await res.text()

let data = []

try {
  data = JSON.parse(text)
} catch (err) {
  console.error('API did not return JSON:', text)
  data = []
}

      setLeads(data)
    } catch (err) {
      console.error('Failed to fetch leads:', err)
      setLeads([])
    }
  }

  // 🔁 INITIAL LOAD + REAL TIME
  useEffect(() => {
    fetchLeads()

    const interval = setInterval(() => {
      fetchLeads()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // 🔍 FILTER ENGINE
  const applyFilters = (f: typeof filters, base: any[]) => {
    let result = base

    if (f.brand !== 'all') {
      result = result.filter(l => l.brand === f.brand)
    }

    if (f.status !== 'all') {
      result = result.filter(l => l.status === f.status)
    }

    if (f.source !== 'all') {
      result = result.filter(l => l.source === f.source)
    }

    if (f.campaign.trim()) {
      result = result.filter(l =>
        l.campaign?.toLowerCase().includes(f.campaign.toLowerCase())
      )
    }

    return result
  }

  // 🔁 APPLY FILTERS WHEN DATA CHANGES
  useEffect(() => {
    setFilteredLeads(applyFilters(filters, leads))
  }, [leads, filters])

  // 🔁 HANDLE FILTER CHANGE
  const handleFilterChange = (key: string, value: string) => {
    const updated = { ...filters, [key]: value }
    setFilters(updated)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="flex-1 overflow-auto">
        <div className="p-8">

          <h1 className="text-3xl font-bold mb-2 text-foreground">
            Leads
          </h1>

          <p className="text-muted-foreground mb-6">
            Live CRM dashboard (API-powered)
          </p>

          {/* FILTERS */}
          <LeadsFilter
            filters={filters}
            onChange={handleFilterChange}
          />

          {/* TABLE */}
          <div className="mt-6">
            <LeadsTable leads={filteredLeads} />
          </div>

        </div>
      </main>
    </div>
  )
}