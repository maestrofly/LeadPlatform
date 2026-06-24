'use client'

interface LeadsFilterProps {
  onFilterChange: (filter: string) => void
  currentFilter: string
}

export function LeadsFilter({ onFilterChange, currentFilter }: LeadsFilterProps) {
  const filters = [
    { label: 'All Leads', value: 'all' },
    { label: 'New', value: 'New' },
    { label: 'Contacted', value: 'Contacted' },
    { label: 'Won', value: 'Won' },
    { label: 'Lost', value: 'Lost' },
    { label: 'Facebook', value: 'Facebook' },
    { label: 'Instagram', value: 'Instagram' },
  ]

  return (
    <div className="flex gap-3 flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            currentFilter === filter.value
              ? 'bg-primary text-primary-foreground'
              : 'bg-card border border-border text-muted-foreground hover:text-foreground'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
