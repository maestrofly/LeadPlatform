'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewLeadPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    source: '',
    campaign: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()

  const existingLeads =
    JSON.parse(localStorage.getItem('leads') || '[]')

  const newLead = {
    id: Date.now(),
    ...formData,
    status: 'New',
    createdDate: new Date().toISOString(),
  }

  existingLeads.push(newLead)

  localStorage.setItem(
    'leads',
    JSON.stringify(existingLeads)
  )

  alert('Lead Created Successfully')

  router.push('/leads')
}

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Create New Lead
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label className="block mb-2">
            Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2">
            Phone
          </label>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2">
            Source
          </label>

          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          >
            <option value="">Select Source</option>
            <option value="Facebook">
              Facebook
            </option>
            <option value="Instagram">
              Instagram
            </option>
            <option value="WhatsApp">
              WhatsApp
            </option>
            <option value="Website">
              Website
            </option>
          </select>
        </div>

        <div>
          <label className="block mb-2">
            Campaign
          </label>

          <input
            type="text"
            name="campaign"
            value={formData.campaign}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Create Lead
        </button>
      </form>
    </div>
  )
}