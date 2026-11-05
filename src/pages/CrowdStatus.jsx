import { useState } from 'react';

const CROWD_DATA = [
  { id:1, name:'Hampi', location:'Hospet, Vijayanagara', level:'High', levelCls:'crowd-high', levelColor:'text-red-600', reports: 0, source:'Historical seasonal average' },
  { id:2, name:'Badami Caves', location:'Badami, Bagalkot', level:'Moderate', levelCls:'crowd-moderate', levelColor:'text-orange-500', reports: 0, source:'Historical seasonal average' },
  { id:3, name:'Aihole', location:'Hungund, Bagalkot', level:'Low', levelCls:'crowd-low', levelColor:'text-green-600', reports: 0, source:'Historical seasonal average' },
  { id:4, name:'Pattadakal', location:'Badami, Bagalkot', level:'Moderate', levelCls:'crowd-moderate', levelColor:'text-orange-500', reports: 0, source:'Historical seasonal average' },
  { id:5, name:'Gol Gumbaz', location:'Vijayapura, Vijayapura', level:'Moderate', levelCls:'crowd-moderate', levelColor:'text-orange-500', reports: 0, source:'Historical seasonal average' },
  { id:6, name:'Bidar Fort', location:'Bidar, Bidar', level:'Low', levelCls:'crowd-low', levelColor:'text-green-600', reports: 0, source:'Historical seasonal average' },
  { id:7, name:'Mysore Palace', location:'Mysuru, Mysuru', level:'High', levelCls:'crowd-high', levelColor:'text-red-600', reports: 2, source:'Live report (<6h)' },
  { id:8, name:'Belur Temple', location:'Belur, Hassan', level:'Moderate', levelCls:'crowd-moderate', levelColor:'text-orange-500', reports: 1, source:'Live report (<6h)' },
  { id:9, name:'Coorg (Madikeri)', location:'Madikeri, Kodagu', level:'High', levelCls:'crowd-high', levelColor:'text-red-600', reports: 0, source:'Historical seasonal average' },
];

const LEVELS = [
  { label: 'Low', cls: 'crowd-low', color: 'text-green-600' },
  { label: 'Moderate', cls: 'crowd-moderate', color: 'text-orange-500' },
  { label: 'High', cls: 'crowd-high', color: 'text-red-600' },
  { label: 'Very High', cls: 'bg-red-700 w-2 h-2 rounded-full inline-block', color: 'text-red-800' },
];

export default function CrowdStatus() {
  const [reported, setReported] = useState({});

  const report = (id) => {
    setReported(r => ({ ...r, [id]: true }));
  };

  return (
    <div className="page-bg">
      <div className="bg-[#1a3d2e]/5 border-b border-gray-200 px-6 py-4">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-xl font-bold text-gray-900">Crowd Status</h1>
          <p className="text-gray-500 text-sm">Real-time and historical crowd density at popular Karnataka destinations</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
        {/* Info banner */}
        <div className="info-banner mb-6">
          <span className="text-blue-500 mt-0.5">ℹ</span>
          <span>Congestion levels combine historical visitor footfall trends with crowd submissions from on-site travellers. Always plan early morning departures for high-traffic destinations.</span>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex flex-wrap items-center gap-6">
          <span className="text-sm font-semibold text-gray-700">Density Guide:</span>
          {LEVELS.map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <span className={l.cls}></span>
              <span className={`text-sm font-medium ${l.color}`}>{l.label}</span>
            </div>
          ))}
          <div className="ml-auto flex items-center gap-4 text-xs text-gray-500">
            <span>● Live report (&lt;6h)</span>
            <span>● Historical baseline</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CROWD_DATA.map(d => (
            <div key={d.id} className="crowd-card">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-gray-900">{d.name}</h3>
                  <p className="text-gray-500 text-xs">{d.location}</p>
                </div>
                <div className="flex items-center gap-1.5 ml-3">
                  <span className={d.levelCls}></span>
                  <span className={`text-sm font-semibold ${d.levelColor}`}>{d.level}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-1">
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs text-gray-500">
                  {d.reports > 0 ? `${d.reports} recent report${d.reports > 1 ? 's' : ''}` : 'No recent reports'}
                  <span className="ml-1 text-gray-400">· Baseline</span>
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-4">Source: {d.source}</p>

              {reported[d.id] ? (
                <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 rounded-lg px-3 py-2">
                  <span>✓</span> Thank you for reporting! Your update helps other travellers.
                </div>
              ) : (
                <button onClick={() => report(d.id)}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1a3d2e] font-medium transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Report current crowd
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

