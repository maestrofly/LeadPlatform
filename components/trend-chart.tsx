'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { week: 'Week 1', leads: 240 },
  { week: 'Week 2', leads: 380 },
  { week: 'Week 3', leads: 290 },
  { week: 'Week 4', leads: 420 },
  { week: 'Week 5', leads: 510 },
  { week: 'Week 6', leads: 680 },
  { week: 'Week 7', leads: 750 },
]

export function TrendChart() {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-bold text-foreground mb-4">Weekly Lead Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
          <XAxis dataKey="week" stroke="#8b949e" />
          <YAxis stroke="#8b949e" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#161b22', 
              border: '1px solid #30363d',
              borderRadius: '8px'
            }}
            labelStyle={{ color: '#e6edf3' }}
          />
          <Line 
            type="monotone" 
            dataKey="leads" 
            stroke="#1f6feb" 
            strokeWidth={2}
            dot={{ fill: '#58a6ff', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
