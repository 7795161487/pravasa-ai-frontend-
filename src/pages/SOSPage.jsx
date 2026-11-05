import { useState } from 'react';

const EMERGENCY_CATEGORIES = [
  { id: 'medical', icon: '🫀', label: 'Medical Emergency', desc: 'Injury, acute illness, cardiac event, allergic reaction' },
  { id: 'road', icon: '🚗', label: 'Road Accident', desc: 'Vehicle collision, breakdown, rollover, road hazard' },
  { id: 'missing', icon: '🔍', label: 'Missing / Lost Person', desc: 'Separated from group, stranded without trail' },
  { id: 'trekking', icon: '⛰️', label: 'Trekking Distress', desc: 'Trail injury, wildlife encounter, extreme fatigue' },
  { id: 'fire', icon: '🔥', label: 'Fire / Disaster', desc: 'Forest fire, structural fire, natural disaster' },
  { id: 'crime', icon: '🚨', label: 'Crime / Theft', desc: 'Robbery, assault, harassment, bag snatching' },
];

export default function SOSPage() {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [desc, setDesc] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SOS Header */}
      <div className="bg-gradient-to-b from-[#8b2020] to-[#a93226] text-white py-10 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-4">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-sm font-medium">Data connection active</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Emergency Services</h1>
          <p className="text-white/80">Stay safe with instant access to emergency services</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Dial 112 */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider text-center">National Emergency Response System</p>
          </div>
          <div className="p-6">
            <a href="tel:112" className="w-full bg-[#c0392b] hover:bg-[#a93226] text-white font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-3 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Dial 112 (Emergency Central)
            </a>
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[{ label:'Police', num:'100' }, { label:'Fire', num:'101' }, { label:'Ambulance', num:'102' }].map(e => (
                <a key={e.num} href={`tel:${e.num}`} className="bg-gray-50 border border-gray-200 rounded-lg py-2.5 text-center hover:border-[#c0392b] transition-colors">
                  <div className="font-bold text-gray-900">{e.label}: {e.num}</div>
                </a>
              ))}
            </div>
            <div className="mt-3 text-center">
              <a href="tel:18004254425" className="text-sm text-gray-500 hover:text-[#1a3d2e]">Karnataka Tourism Helpline: 1800-425-4425</a>
            </div>
          </div>
        </div>

        {/* Incident Report */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Record Incident & Geolocation</h2>
          <p className="text-gray-500 text-sm mb-5">Capture exact coordinates and log an incident report before calling emergency operators.</p>

          <p className="text-sm font-semibold text-gray-700 mb-3">Select Emergency Category <span className="text-red-500">*</span></p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {EMERGENCY_CATEGORIES.map(c => (
              <button key={c.id} onClick={() => setSelected(c.id)}
                className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all ${selected === c.id ? 'border-[#c0392b] bg-red-50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
                <span className="text-2xl flex-shrink-0">{c.icon}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{c.label}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{c.desc}</p>
                </div>
              </button>
            ))}
          </div>

          {selected && !submitted && (
            <>
              <div className="mb-4">
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Brief description</label>
                <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3}
                  placeholder="Describe the situation, your exact location, number of people involved..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 resize-none" />
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-4 flex items-center gap-2 text-sm text-blue-700">
                <span>📍</span>
                <span>Your location will be automatically captured when you submit this report.</span>
              </div>
              <button onClick={() => setSubmitted(true)}
                className="w-full bg-[#c0392b] hover:bg-[#a93226] text-white font-bold py-3.5 rounded-xl transition-colors">
                Submit Emergency Report
              </button>
            </>
          )}

          {submitted && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="font-bold text-green-800 text-lg mb-1">Report Submitted</h3>
              <p className="text-green-700 text-sm">Your incident has been logged. Emergency services have been notified with your location.</p>
              <p className="text-green-600 text-sm font-semibold mt-2">Reference ID: #KA-{Date.now().toString().slice(-6)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

