'use client'

export default function AdSimulator() {
  const sendLead = async () => {
    await fetch('/api/webhooks/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Live Ad Lead ' + Math.floor(Math.random() * 1000),
        phone: '233' + Math.floor(Math.random() * 999999999),
        campaign: 'Live Demo Campaign',
        brand: 'Kantanka',
        source: 'Facebook Ads',
        utm_source: 'facebook',
        platform: 'meta',
      }),
    })

    alert('Lead sent from Ad!')
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">
        Ad Simulation Panel
      </h1>

      <button
        onClick={sendLead}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Simulate Ad Lead
      </button>
    </div>
  )
}