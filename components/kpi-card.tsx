import { TrendingUp, TrendingDown } from 'lucide-react'

interface KpiCardProps {
  label: string
  value: string
  change: number
}

export function KpiCard({ label, value, change }: KpiCardProps) {
  const isPositive = change >= 0

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all">
      <p className="text-sm text-muted-foreground font-medium mb-3">{label}</p>
      <div className="flex items-end justify-between">
        <h3 className="text-2xl font-bold text-foreground">{value}</h3>
        <div className={`flex items-center gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="text-sm font-medium">{Math.abs(change)}%</span>
        </div>
      </div>
    </div>
  )
}
