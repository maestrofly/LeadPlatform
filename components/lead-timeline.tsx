import { CheckCircle2 } from 'lucide-react'

interface TimelineEvent {
  date: string
  event: string
  status: string
}

interface LeadTimelineProps {
  timeline: TimelineEvent[]
}

export function LeadTimeline({ timeline }: LeadTimelineProps) {
  const getEventColor = (status: string) => {
    switch (status) {
      case 'created':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'contacted':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'interested':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'won':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'lost':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <div className="space-y-4">
      {timeline.map((event, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-accent" />
            </div>
            {index !== timeline.length - 1 && (
              <div className="w-0.5 h-12 bg-border my-2" />
            )}
          </div>
          <div className="pb-4 flex-1">
            <p className="text-sm text-muted-foreground mb-1">
              {new Date(event.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getEventColor(event.status)}`}>
              {event.event}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
