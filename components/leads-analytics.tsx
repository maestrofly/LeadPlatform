export function LeadsAnalytics({ leads }: { leads: any[] }) {
  const total = leads.length
  const won = leads.filter(l => l.status === 'Won').length
  const interested = leads.filter(l => l.status === 'Interested').length
  const newLeads = leads.filter(l => l.status === 'New').length

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card label="Total Leads" value={total} />
      <Card label="Won" value={won} />
      <Card label="Interested" value={interested} />
      <Card label="New Leads" value={newLeads} />
    </div>
  )
}

function Card({ label, value }: any) {
  return (
    <div className="p-4 border rounded-lg bg-card">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}