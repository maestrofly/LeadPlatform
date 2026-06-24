'use client'

import { useState } from 'react'
import Link from 'next/link'
import { DashboardHeader } from '@/components/dashboard-header'
import { LeadsTable } from '@/components/leads-table'
import { LeadsFilter } from '@/components/leads-filter'

// Sample leads data
const sampleLeads = [
  {
    id: 1,
    name: 'Chioma Okonkwo',
    phone: '+234 805 123 4567',
    source: 'Instagram',
    campaign: 'Summer Sale Campaign',
    status: 'Won',
    revenue: '₦125,000',
  },
  {
    id: 2,
    name: 'Tunde Adeyemi',
    phone: '+234 803 456 7890',
    source: 'Facebook',
    campaign: 'Product Launch',
    status: 'Interested',
    revenue: '₦85,000',
  },
  {
    id: 3,
    name: 'Amara Nwosu',
    phone: '+234 807 789 0123',
    source: 'Website',
    campaign: 'Organic Traffic',
    status: 'Contacted',
    revenue: '₦0',
  },
  {
    id: 4,
    name: 'Kabir Hassan',
    phone: '+234 809 234 5678',
    source: 'TikTok',
    campaign: 'Viral Video Campaign',
    status: 'New',
    revenue: '₦0',
  },
  {
    id: 5,
    name: 'Zainab Ibrahim',
    phone: '+234 801 567 8901',
    source: 'Instagram',
    campaign: 'Influencer Partnership',
    status: 'Won',
    revenue: '₦250,000',
  },
  {
    id: 6,
    name: 'Emeka Ejiofor',
    phone: '+234 808 890 1234',
    source: 'Facebook',
    campaign: 'Seasonal Promotion',
    status: 'Lost',
    revenue: '₦0',
  },
  {
    id: 7,
    name: 'Nkechi Okoro',
    phone: '+234 806 123 4567',
    source: 'Website',
    campaign: 'SEO Campaign',
    status: 'Contacted',
    revenue: '₦0',
  },
  {
    id: 8,
    name: 'Segun Oladele',
    phone: '+234 802 456 7890',
    source: 'TikTok',
    campaign: 'Creator Collaboration',
    status: 'Interested',
    revenue: '₦95,000',
  },
]

export default function LeadsPage() {
  const [filter, setFilter] = useState('all')
  const [filteredLeads, setFilteredLeads] = useState(sampleLeads)

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter)
    
    if (newFilter === 'all') {
      setFilteredLeads(sampleLeads)
    } else if (['New', 'Contacted', 'Interested', 'Won', 'Lost'].includes(newFilter)) {
      setFilteredLeads(sampleLeads.filter(lead => lead.status === newFilter))
    } else if (['Facebook', 'Instagram', 'Website', 'TikTok'].includes(newFilter)) {
      setFilteredLeads(sampleLeads.filter(lead => lead.source === newFilter))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Leads</h1>
            <p className="text-muted-foreground">Manage and track all your leads</p>
          </div>

          <LeadsFilter onFilterChange={handleFilterChange} currentFilter={filter} />
          
          <div className="mt-6">
            <LeadsTable leads={filteredLeads} />
          </div>
        </div>
      </main>
    </div>
  )
}
