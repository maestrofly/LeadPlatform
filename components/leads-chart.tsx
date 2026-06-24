'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Facebook', value: 450 },
  { name: 'Instagram', value: 680 },
  { name: 'Website', value: 320 },
  { name: 'TikTok', value: 540 },
]

export function LeadsChart() {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-bold text-foreground mb-4">Leads by Source</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
          <XAxis dataKey="name" stroke="#8b949e" />
          <YAxis stroke="#8b949e" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#161b22', 
              border: '1px solid #30363d',
              borderRadius: '8px'
            }}
            labelStyle={{ color: '#e6edf3' }}
          />
          <Bar dataKey="value" fill="#1f6feb" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
