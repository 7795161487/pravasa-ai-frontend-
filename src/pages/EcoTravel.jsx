import { useState } from 'react';

const MODES = [
  { id: 'car', label: 'Car', emoji: '🚗', factor: 0.192, color: '#ef4444', description: 'Private vehicle' },
  { id: 'suv', label: 'SUV', emoji: '🚙', factor: 0.258, color: '#f97316', description: 'Large vehicle' },
  { id: 'bus', label: 'Bus', emoji: '🚌', factor: 0.027, color: '#22c55e', description: 'State or express bus' },
  { id: 'train', label: 'Train', emoji: '🚂', factor: 0.014, color: '#10b981', description: 'Indian Railways' },
  { id: 'ev', label: 'EV Car', emoji: '⚡', factor: 0.053, color: '#3b82f6', description: 'Electric vehicle' },
  { id: 'bike', label: 'Bike/Cycle', emoji: '🚲', factor: 0.0, color: '#06b6d4', description: 'Zero emissions' },
  { id: 'auto', label: 'Auto', emoji: '🛺', factor: 0.08, color: '#eab308', description: 'CNG auto-rickshaw' },
  { id: 'flight', label: 'Flight', emoji: '✈️', factor: 0.255, color: '#8b5cf6', description: 'Short haul domestic' },
];

const ROUTES = [
  { from: 'Bangalore', to: 'Mysuru', km: 150 },
  { from: 'Bangalore', to: 'Coorg', km: 270 },
  { from: 'Bangalore', to: 'Hampi', km: 350 },
  { from: 'Bangalore', to: 'Gokarna', km: 490 },
  { from: 'Bangalore', to: 'Chikmagalur', km: 240 },
  { from: 'Mysuru', to: 'Coorg', km: 120 },
];

const TIPS = [
  { icon: '🚂', tip: 'Karnataka Rail network covers most major destinations — Hampi, Mysuru, Mangaluru, Hubli.', label: 'Rail First' },
  { icon: '🌿', tip: 'Karnataka KSRTC Green buses run on major routes with AC. Up to 70% less CO₂ vs private car.', label: 'Green Bus' },
  { icon: '⚡', tip: 'EV rentals are available in Bangalore, Mysuru. Great for 100–300 km day trips.', label: 'EV Rental' },
  { icon: '🚲', tip: 'Hampi, Gokarna, Coorg — explore locally on rented cycles for zero emissions!', label: 'Cycle Local' },
];

export default function EcoTravel() {
  const [km, setKm] = useState(150);
  const [selectedRoute, setSelectedRoute] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [activeMode, setActiveMode] = useState('car');

  const maxCO2 = Math.max(...MODES.map(m => m.factor * km * passengers));
  const best = MODES.reduce((a, b) => (a.factor < b.factor ? a : b));
  const selectedModeObj = MODES.find(m => m.id === activeMode);
  const saving = ((MODES.find(m => m.id === 'car').factor - selectedModeObj.factor) * km * passengers).toFixed(2);

  const handleRouteChange = (routeStr) => {
    setSelectedRoute(routeStr);
    const route = ROUTES.find(r => `${r.from}-${r.to}` === routeStr);
    if (route) setKm(route.km);
  };

  return (
    <div className="min-h-screen bg-[#0a0f0a] pb-16">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-white/5 py-16 px-6">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/8 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-6xl mx-auto">
          <span className="tag mb-4 inline-block">🌿 Eco Travel</span>
          <h1 className="text-5xl font-black text-white mb-4">
            Travel <span className="gradient-text">greener</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl">
            Compare carbon footprints across transport modes and make conscious travel choices across Karnataka.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-10">
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="glass rounded-2xl p-6 border border-white/5">
            <h3 className="text-white font-bold mb-5">Configure Journey</h3>

            {/* Route picker */}
            <div className="mb-5">
              <label className="text-white/50 text-sm mb-2 block">Popular Routes</label>
              <select
                value={selectedRoute}
                onChange={e => handleRouteChange(e.target.value)}
                className="w-full input-dark rounded-xl px-4 py-3 text-sm"
              >
                <option value="">Custom distance</option>
                {ROUTES.map(r => (
                  <option key={`${r.from}-${r.to}`} value={`${r.from}-${r.to}`}>
                    {r.from} → {r.to} ({r.km} km)
                  </option>
                ))}
              </select>
            </div>

            {/* Distance slider */}
            <div className="mb-5">
              <label className="text-white/50 text-sm mb-2 flex justify-between">
                <span>Distance</span>
                <span className="text-green-400 font-bold">{km} km</span>
              </label>
              <input
                type="range"
                min={10}
                max={1000}
                value={km}
                onChange={e => setKm(+e.target.value)}
                className="w-full accent-green-500"
              />
              <div className="flex justify-between text-white/25 text-xs mt-1">
                <span>10 km</span>
                <span>1000 km</span>
              </div>
            </div>

            {/* Or manual input */}
            <div className="mb-5">
              <label className="text-white/50 text-sm mb-2 block">Or enter manually</label>
              <div className="relative">
                <input
                  type="number"
                  value={km}
                  onChange={e => setKm(Math.max(1, +e.target.value))}
                  className="w-full input-dark rounded-xl px-4 py-3 text-sm pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 text-sm">km</span>
              </div>
            </div>

            {/* Passengers */}
            <div>
              <label className="text-white/50 text-sm mb-3 block">Passengers</label>
              <div className="flex items-center gap-4">
                <button onClick={() => setPassengers(p => Math.max(1, p - 1))} className="w-10 h-10 glass rounded-xl text-white font-bold">-</button>
                <span className="text-white font-bold text-xl">{passengers}</span>
                <button onClick={() => setPassengers(p => Math.min(10, p + 1))} className="w-10 h-10 glass rounded-xl text-white font-bold">+</button>
                <span className="text-white/40 text-sm">person{passengers > 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>

          {/* Summary card */}
          <div className="glass-green rounded-2xl p-6 border border-green-500/20">
            <h3 className="text-white font-bold mb-5">Your Selection</h3>
            <div className="text-center py-4">
              <div className="text-6xl mb-3">{selectedModeObj.emoji}</div>
              <h2 className="text-white font-black text-2xl mb-1">{selectedModeObj.label}</h2>
              <p className="text-white/40 text-sm mb-4">{selectedModeObj.description}</p>
              <div className="text-4xl font-black gradient-text mb-1">
                {(selectedModeObj.factor * km * passengers).toFixed(2)}
              </div>
              <div className="text-white/50 text-sm">kg CO₂ for {km} km × {passengers} pax</div>
            </div>

            {selectedModeObj.id !== 'car' && (
              <div className="mt-4 p-4 bg-green-500/10 rounded-xl border border-green-500/20 text-center">
                <p className="text-green-400 font-bold">
                  {parseFloat(saving) > 0 ? `You save ${saving} kg CO₂ vs driving!` : saving === '0.00' ? '🌿 Zero emissions!' : ''}
                </p>
                <p className="text-white/40 text-xs mt-1">
                  {parseFloat(saving) > 0 ? `Equivalent to planting ${(parseFloat(saving) / 20).toFixed(1)} trees 🌳` : ''}
                </p>
              </div>
            )}

            <div className="mt-4 text-center">
              <span className="tag">
                {selectedModeObj.factor === 0 ? '🌿 Zero Emission' : selectedModeObj.factor < 0.05 ? '✅ Low Carbon' : selectedModeObj.factor < 0.15 ? '⚠️ Moderate' : '🔴 High Emission'}
              </span>
            </div>
          </div>
        </div>

        {/* CO2 Comparison Chart */}
        <div className="glass rounded-2xl p-6 border border-white/5 mb-10">
          <h3 className="text-white font-bold mb-6">CO₂ Comparison — {km} km × {passengers} passenger{passengers > 1 ? 's' : ''}</h3>
          <div className="space-y-4">
            {MODES.sort((a, b) => a.factor - b.factor).map(mode => {
              const co2 = +(mode.factor * km * passengers).toFixed(2);
              const pct = maxCO2 > 0 ? (co2 / maxCO2) * 100 : 0;
              return (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode.id)}
                  className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all group ${
                    activeMode === mode.id ? 'glass-green border border-green-500/30' : 'hover:bg-white/3'
                  }`}
                >
                  <span className="text-2xl w-10 text-center">{mode.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`font-semibold text-sm ${activeMode === mode.id ? 'text-green-300' : 'text-white/80'}`}>
                        {mode.label}
                      </span>
                      <span className="text-white/60 text-sm font-bold">{co2} kg CO₂</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2">
                      <div
                        className="co2-bar rounded-full h-2"
                        style={{ width: `${pct}%`, background: mode.color }}
                      ></div>
                    </div>
                  </div>
                  {mode.id === best.id && <span className="text-green-400 text-xs font-bold whitespace-nowrap">🏆 Best</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Eco Tips */}
        <div>
          <h3 className="text-white font-bold mb-6">🌿 Eco Travel Tips for Karnataka</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TIPS.map(t => (
              <div key={t.label} className="glass rounded-xl p-5 border border-white/5 card-hover">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{t.icon}</span>
                  <div>
                    <span className="text-green-400 font-bold text-sm block mb-1">{t.label}</span>
                    <p className="text-white/60 text-sm">{t.tip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
