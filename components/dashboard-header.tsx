'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, Users } from 'lucide-react'

export function DashboardHeader() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname.startsWith(path)

  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      <div className="px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-foreground hover:text-accent transition-colors">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary-foreground" />
            </div>
            CE Digital
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/dashboard"
              className={`text-sm font-medium transition-colors ${
                isActive('/dashboard') && pathname === '/dashboard'
                  ? 'text-accent border-b-2 border-accent pb-4'
                  : 'text-muted-foreground hover:text-foreground pb-4'
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/leads"
              className={`text-sm font-medium transition-colors ${
                isActive('/leads')
                  ? 'text-accent border-b-2 border-accent pb-4'
                  : 'text-muted-foreground hover:text-foreground pb-4'
              }`}
            >
              Leads
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="px-4 py-2 rounded-lg bg-secondary text-foreground font-medium hover:bg-secondary/80 transition-colors">
            Profile
          </button>
        </div>
      </div>
    </header>
  )
}
