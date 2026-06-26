'use client'

import { DashboardHeader } from '@/components/dashboard-header'
import { useState } from 'react'

export default function ProfilePage() {
  const [user] = useState({
    name: 'CE Digital Admin',
    email: 'admin@cedigital.com',
    role: 'Admin',
  })

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Profile Settings
        </h1>

        {/* PROFILE CARD */}
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="text-lg font-semibold">{user.name}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="text-lg font-semibold">{user.email}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Role</p>
            <p className="text-lg font-semibold">{user.role}</p>
          </div>
        </div>

        {/* FUTURE FEATURES */}
        <div className="mt-6 grid gap-4">
          <div className="p-4 border rounded-lg bg-secondary/30">
            🔌 Connected Ad Accounts (Meta, Google Ads) — coming soon
          </div>

          <div className="p-4 border rounded-lg bg-secondary/30">
            🏢 Brand Access Control — coming soon
          </div>

          <div className="p-4 border rounded-lg bg-secondary/30">
            🔑 API Keys & Webhooks — coming soon
          </div>
        </div>
      </div>
    </div>
  )
}