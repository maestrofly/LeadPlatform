import { TrendingUp, TrendingDown } from 'lucide-react'

interface InsightCardProps {
  title: string
  campaign: string
  leads: number
  conversionRate: number
  trend: 'up' | 'down'
}

export function InsightCard({ title, campaign, leads, conversionRate, trend }: InsightCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-bold text-foreground mb-4">{title}</h3>
      
      <div className="mb-4">
        <p className="text-sm text-muted-foreground mb-1">Campaign</p>
        <p className="text-foreground font-medium">{campaign}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-secondary/50 rounded-lg p-3">
          <p className="text-sm text-muted-foreground mb-1">Total Leads</p>
          <p className="text-xl font-bold text-foreground">{leads}</p>
        </div>
        <div className="bg-secondary/50 rounded-lg p-3">
          <p className="text-sm text-muted-foreground mb-1">Conversion</p>
          <p className="text-xl font-bold text-foreground">{conversionRate}%</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        {trend === 'up' ? (
          <>
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400">Trending up</span>
          </>
        ) : (
          <>
            <TrendingDown className="w-4 h-4 text-red-400" />
            <span className="text-sm text-red-400">Needs attention</span>
          </>
        )}
      </div>
    </div>
  )
}
