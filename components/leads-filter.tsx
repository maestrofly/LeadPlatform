'use client'

type Props = {
  filters: {
    brand: string
    status: string
    source: string
    campaign: string
  }
  onChange: (key: string, value: string) => void
}

export function LeadsFilter({ filters, onChange }: Props) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* BRAND */}
        <select
          value={filters.brand}
          onChange={(e) => onChange('brand', e.target.value)}
          className="border rounded-lg p-2 bg-background"
        >
          <option value="all">All Brands</option>
          <option value="Aer Power Pocket">Aer Power Pocket</option>
          <option value="Bel Aqua">Bel Aqua</option>
          <option value="Fairafrique">Fairafrique</option>
          <option value="Charle Toothpaste">Charle toothpaste</option>
          <option value="Glico Health Insurance">Glico Health Insurance</option>
        </select>

        {/* STATUS */}
        <select
          value={filters.status}
          onChange={(e) => onChange('status', e.target.value)}
          className="border rounded-lg p-2 bg-background"
        >
          <option value="all">All Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Interested">Interested</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
        </select>

        {/* SOURCE */}
        <select
          value={filters.source}
          onChange={(e) => onChange('source', e.target.value)}
          className="border rounded-lg p-2 bg-background"
        >
          <option value="all">All Sources</option>
          <option value="Facebook">Facebook</option>
          <option value="Instagram">Instagram</option>
          <option value="Website">Website</option>
          <option value="TikTok">TikTok</option>
        </select>

        {/* CAMPAIGN SEARCH */}
        <input
          value={filters.campaign}
          onChange={(e) => onChange('campaign', e.target.value)}
          placeholder="Search campaign..."
          className="border rounded-lg p-2 bg-background"
        />
      </div>
    </div>
  )
}


