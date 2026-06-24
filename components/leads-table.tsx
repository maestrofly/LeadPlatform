'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Lead {
  id: number
  name: string
  phone: string
  source: string
  campaign: string
  status: string
  revenue: string
}

interface LeadsTableProps {
  leads: Lead[]
}

export function LeadsTable({ leads }: LeadsTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Won':
        return 'bg-green-500/10 text-green-400 border-green-500/20'
      case 'Lost':
        return 'bg-red-500/10 text-red-400 border-red-500/20'
      case 'New':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'Interested':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
      case 'Contacted':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20'
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    }
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-border bg-secondary/50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Source</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Campaign</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Revenue</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                <td className="px-6 py-4 text-foreground font-medium">{lead.name}</td>
                <td className="px-6 py-4 text-muted-foreground">{lead.phone}</td>
                <td className="px-6 py-4 text-muted-foreground">{lead.source}</td>
                <td className="px-6 py-4 text-muted-foreground text-sm">{lead.campaign}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-foreground font-medium">{lead.revenue}</td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/leads/${lead.id}`}>
                    <button className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors">
                      View
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
