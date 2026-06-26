'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { DashboardHeader } from '@/components/dashboard-header'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

type Lead = {
  id: string
  name: string
  email?: string
  phone: string
  source: string
  campaign: string
  status: string
  brand?: string
  createdDate: string
}

export default function LeadDetailPage() {
  const params = useParams()
  const id = String(params?.id)

  const [lead, setLead] = useState<Lead | null>(null)
  const [loading, setLoading] = useState(true)

  // Sprint 1
  const [status, setStatus] = useState('')

  useEffect(() => {
    async function loadLead() {
      try {
        const response = await fetch('/api/leads')

        if (!response.ok) {
          throw new Error('Failed to fetch leads')
        }

        const allLeads = await response.json()

        const foundLead = allLeads.find(
          (lead: any) =>
            String(lead.id).trim() === String(id).trim()
        )

        if (foundLead) {
          setLead(foundLead)
          setStatus(foundLead.status || 'New')
        } else {
          setLead(null)
        }
      } catch (error) {
        console.error(error)
        setLead(null)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      loadLead()
    }
  }, [id])

  // Sprint 1 Status Update
const updateStatus = async () => {
  try {
    const response = await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    })

    const data = await response.json()

    console.log('API RESPONSE:', data) // 👈 check what backend returns

    if (!response.ok) {
      console.error('API FAILED:', data)
      throw new Error(data.error || 'Failed to update status')
    }

    alert('Lead updated successfully')
  } catch (err) {
    console.error('UPDATE ERROR:', err)
    alert('Failed to update status')
  }
}

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />

        <div className="flex justify-center items-center h-[70vh]">
          <p className="text-muted-foreground">
            Loading lead...
          </p>
        </div>
      </div>
    )
  }

  if (!lead) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />

        <div className="flex justify-center items-center h-[70vh]">
          <p className="text-red-500 text-lg">
            Lead Not Found
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="p-8">
        <Link href="/leads">
          <Button variant="ghost" className="mb-6">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>

        <div className="bg-card border rounded-lg p-6 shadow-sm">
          <h1 className="text-3xl font-bold mb-4">
            {lead.name}
          </h1>

          <div className="space-y-2">
            <p>
              <strong>Email:</strong>{' '}
              {lead.email || 'N/A'}
            </p>

            <p>
              <strong>Phone:</strong>{' '}
              {lead.phone}
            </p>

            <p>
              <strong>Brand:</strong>{' '}
              {lead.brand || 'N/A'}
            </p>

            <p>
              <strong>Source:</strong>{' '}
              {lead.source}
            </p>

            <p>
              <strong>Campaign:</strong>{' '}
              {lead.campaign}
            </p>

            <p>
              <strong>Created:</strong>{' '}
              {new Date(
                lead.createdDate
              ).toLocaleString()}
            </p>
          </div>

          {/* Sprint 1 Status Section */}

          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">
              Lead Status
            </h2>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="border rounded-lg px-4 py-2 w-full max-w-sm"
            >
              <option value="New">
                New
              </option>

              <option value="Contacted">
                Contacted
              </option>

              <option value="Interested">
                Interested
              </option>

              <option value="Won">
                Won
              </option>

              <option value="Lost">
                Lost
              </option>
            </select>

            <Button
              onClick={updateStatus}
              className="mt-4"
            >
              Update Status
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}