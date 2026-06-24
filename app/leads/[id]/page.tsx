'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { DashboardHeader } from '@/components/dashboard-header'
import { LeadTimeline } from '@/components/lead-timeline'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

type Lead = {
  id: number
  name: string
  email: string
  phone: string
  source: string
  campaign: string
  status: string
  revenue: string
  createdDate: string
  timeline: { date: string; event: string; status: string }[]
  notes: { author: string; date: string; text: string }[]
}

// Sample lead data
const sampleLeads: Record<string, Lead> = {
  '1': {
    id: 1,
    name: 'Chioma Okonkwo',
    email: 'chioma.okonkwo@email.com',
    phone: '+234 805 123 4567',
    source: 'Instagram',
    campaign: 'Summer Sale Campaign',
    status: 'Won',
    revenue: '₦125,000',
    createdDate: '2024-02-15',
    timeline: [
      { date: '2024-02-15', event: 'Lead created', status: 'created' },
      { date: '2024-02-16', event: 'Contacted via WhatsApp', status: 'contacted' },
      { date: '2024-02-18', event: 'Interested in product', status: 'interested' },
      { date: '2024-02-21', event: 'Conversion completed', status: 'won' },
    ],
    notes: [
      { author: 'Sales Team', date: '2024-02-16', text: 'Very responsive customer, high intent' },
      { author: 'Account Manager', date: '2024-02-18', text: 'Discussed custom package, interested in bulk order' },
    ],
  },
  '2': {
    id: 2,
    name: 'Tunde Adeyemi',
    email: 'tunde.adeyemi@email.com',
    phone: '+234 803 456 7890',
    source: 'Facebook',
    campaign: 'Product Launch',
    status: 'Interested',
    revenue: '₦85,000',
    createdDate: '2024-03-01',
    timeline: [
      { date: '2024-03-01', event: 'Lead created', status: 'created' },
      { date: '2024-03-02', event: 'Contacted via Email', status: 'contacted' },
      { date: '2024-03-05', event: 'Sent proposal', status: 'interested' },
    ],
    notes: [
      { author: 'Sales Team', date: '2024-03-02', text: 'B2B prospect, needs customization' },
    ],
  },
}

export default function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // ✅ FIX: Next.js 15 requires unwrapping params
  const { id } = use(params)

  const lead = sampleLeads[id] || sampleLeads['1']

  const [notes, setNotes] = useState(lead.notes)
  const [newNote, setNewNote] = useState('')

  const handleAddNote = () => {
    if (!newNote.trim()) return

    setNotes((prev) => [
      ...prev,
      {
        author: 'You',
        date: new Date().toISOString().split('T')[0],
        text: newNote,
      },
    ])

    setNewNote('')
  }

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
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Link href="/leads">
            <Button
              variant="ghost"
              size="sm"
              className="mb-6 text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Leads
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* MAIN */}
            <div className="lg:col-span-2">
              {/* Profile Card */}
              <div className="bg-card border border-border rounded-lg p-6 mb-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">
                      {lead.name}
                    </h1>
                    <p className="text-muted-foreground mt-2">
                      {lead.email}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                      lead.status
                    )}`}
                  >
                    {lead.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Phone
                    </p>
                    <p className="text-foreground font-medium">
                      {lead.phone}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Revenue Value
                    </p>
                    <p className="text-foreground font-medium">
                      {lead.revenue}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Source
                    </p>
                    <p className="text-foreground font-medium">
                      {lead.source}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Campaign
                    </p>
                    <p className="text-foreground font-medium">
                      {lead.campaign}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Created
                  </p>
                  <p className="text-foreground">
                    {new Date(lead.createdDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-card border border-border rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold text-foreground mb-6">
                  Lead Journey
                </h2>
                <LeadTimeline timeline={lead.timeline} />
              </div>

              {/* Notes */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold text-foreground mb-6">
                  Sales Notes
                </h2>

                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a note..."
                  className="w-full bg-secondary border border-border rounded-lg p-3 text-foreground"
                  rows={3}
                />

                <button
                  onClick={handleAddNote}
                  className="mt-3 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
                >
                  Add Note
                </button>

                <div className="space-y-4 mt-6">
                  {notes.map((note, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-accent pl-4 py-2"
                    >
                      <div className="flex justify-between mb-1">
                        <p className="font-medium">{note.author}</p>
                        <span className="text-sm text-muted-foreground">
                          {note.date}
                        </span>
                      </div>
                      <p>{note.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4">Quick Actions</h3>

                <div className="space-y-3">
                  <button className="w-full px-4 py-2 bg-primary text-white rounded-lg">
                    Update Status
                  </button>
                  <button className="w-full px-4 py-2 bg-secondary border rounded-lg">
                    Send Message
                  </button>
                  <button className="w-full px-4 py-2 bg-secondary border rounded-lg">
                    Schedule Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}




// 'use client'

// import { useState } from 'react'
// import Link from 'next/link'
// import { DashboardHeader } from '@/components/dashboard-header'
// import { LeadTimeline } from '@/components/lead-timeline'
// import { Button } from '@/components/ui/button'
// import { ChevronLeft } from 'lucide-react'

// // Sample lead data
// const sampleLeads: Record<string, any> = {
//   '1': {
//     id: 1,
//     name: 'Chioma Okonkwo',
//     email: 'chioma.okonkwo@email.com',
//     phone: '+234 805 123 4567',
//     source: 'Instagram',
//     campaign: 'Summer Sale Campaign',
//     status: 'Won',
//     revenue: '₦125,000',
//     createdDate: '2024-02-15',
//     timeline: [
//       { date: '2024-02-15', event: 'Lead created', status: 'created' },
//       { date: '2024-02-16', event: 'Contacted via WhatsApp', status: 'contacted' },
//       { date: '2024-02-18', event: 'Interested in product', status: 'interested' },
//       { date: '2024-02-21', event: 'Conversion completed', status: 'won' },
//     ],
//     notes: [
//       { author: 'Sales Team', date: '2024-02-16', text: 'Very responsive customer, high intent' },
//       { author: 'Account Manager', date: '2024-02-18', text: 'Discussed custom package, interested in bulk order' },
//     ],
//   },
//   '2': {
//     id: 2,
//     name: 'Tunde Adeyemi',
//     email: 'tunde.adeyemi@email.com',
//     phone: '+234 803 456 7890',
//     source: 'Facebook',
//     campaign: 'Product Launch',
//     status: 'Interested',
//     revenue: '₦85,000',
//     createdDate: '2024-03-01',
//     timeline: [
//       { date: '2024-03-01', event: 'Lead created', status: 'created' },
//       { date: '2024-03-02', event: 'Contacted via Email', status: 'contacted' },
//       { date: '2024-03-05', event: 'Sent proposal', status: 'interested' },
//     ],
//     notes: [
//       { author: 'Sales Team', date: '2024-03-02', text: 'B2B prospect, needs customization' },
//     ],
//   },
// }

// export default function LeadDetailPage({ params }: { params: { id: string } }) {
//   const lead = sampleLeads[params.id] || sampleLeads['1']
//   const [notes, setNotes] = useState(lead.notes)
//   const [newNote, setNewNote] = useState('')

//   const handleAddNote = () => {
//     if (newNote.trim()) {
//       setNotes([
//         ...notes,
//         {
//           author: 'You',
//           date: new Date().toISOString().split('T')[0],
//           text: newNote,
//         },
//       ])
//       setNewNote('')
//     }
//   }

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'Won':
//         return 'bg-green-500/10 text-green-400 border-green-500/20'
//       case 'Lost':
//         return 'bg-red-500/10 text-red-400 border-red-500/20'
//       case 'New':
//         return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
//       case 'Interested':
//         return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
//       case 'Contacted':
//         return 'bg-purple-500/10 text-purple-400 border-purple-500/20'
//       default:
//         return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
//     }
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <DashboardHeader />
      
//       <main className="flex-1 overflow-auto">
//         <div className="p-8">
//           <Link href="/leads">
//             <Button variant="ghost" size="sm" className="mb-6 text-muted-foreground hover:text-foreground">
//               <ChevronLeft className="w-4 h-4 mr-2" />
//               Back to Leads
//             </Button>
//           </Link>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Main Content */}
//             <div className="lg:col-span-2">
//               {/* Profile Card */}
//               <div className="bg-card border border-border rounded-lg p-6 mb-6">
//                 <div className="flex items-start justify-between mb-6">
//                   <div>
//                     <h1 className="text-3xl font-bold text-foreground">{lead.name}</h1>
//                     <p className="text-muted-foreground mt-2">{lead.email}</p>
//                   </div>
//                   <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(lead.status)}`}>
//                     {lead.status}
//                   </span>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4 mb-6">
//                   <div>
//                     <p className="text-sm text-muted-foreground mb-1">Phone</p>
//                     <p className="text-foreground font-medium">{lead.phone}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-muted-foreground mb-1">Revenue Value</p>
//                     <p className="text-foreground font-medium">{lead.revenue}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-muted-foreground mb-1">Source</p>
//                     <p className="text-foreground font-medium">{lead.source}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-muted-foreground mb-1">Campaign</p>
//                     <p className="text-foreground font-medium">{lead.campaign}</p>
//                   </div>
//                 </div>

//                 <div>
//                   <p className="text-sm text-muted-foreground mb-1">Created</p>
//                   <p className="text-foreground">{new Date(lead.createdDate).toLocaleDateString()}</p>
//                 </div>
//               </div>

//               {/* Timeline */}
//               <div className="bg-card border border-border rounded-lg p-6 mb-6">
//                 <h2 className="text-xl font-bold text-foreground mb-6">Lead Journey</h2>
//                 <LeadTimeline timeline={lead.timeline} />
//               </div>

//               {/* Notes Section */}
//               <div className="bg-card border border-border rounded-lg p-6">
//                 <h2 className="text-xl font-bold text-foreground mb-6">Sales Notes</h2>
                
//                 <div className="mb-6">
//                   <textarea
//                     value={newNote}
//                     onChange={(e) => setNewNote(e.target.value)}
//                     placeholder="Add a note..."
//                     className="w-full bg-secondary border border-border rounded-lg p-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
//                     rows={3}
//                   />
//                   <button
//                     onClick={handleAddNote}
//                     className="mt-3 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
//                   >
//                     Add Note
//                   </button>
//                 </div>

//                 <div className="space-y-4">
//                   {notes.map((note, index) => (
//                     <div key={index} className="border-l-2 border-accent pl-4 py-2">
//                       <div className="flex justify-between items-start mb-1">
//                         <p className="font-medium text-foreground">{note.author}</p>
//                         <span className="text-sm text-muted-foreground">{note.date}</span>
//                       </div>
//                       <p className="text-foreground">{note.text}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Sidebar */}
//             <div className="lg:col-span-1">
//               <div className="bg-card border border-border rounded-lg p-6">
//                 <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
//                 <div className="space-y-3">
//                   <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
//                     Update Status
//                   </button>
//                   <button className="w-full px-4 py-2 bg-secondary text-foreground border border-border rounded-lg font-medium hover:bg-secondary/80 transition-colors">
//                     Send Message
//                   </button>
//                   <button className="w-full px-4 py-2 bg-secondary text-foreground border border-border rounded-lg font-medium hover:bg-secondary/80 transition-colors">
//                     Schedule Call
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }
