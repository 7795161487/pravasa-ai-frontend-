import { useState } from 'react';
import { ADVENTURE_ROADS, VEHICLE_MODES } from '../data/karnatakaData';
import VehicleModeSelector from '../components/VehicleModeSelector';

const DIFFICULTIES = ['All', 'Moderate', 'Challenging', 'Expert 4x4 Only'];

export default function AdventureRoads() {
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedVehicle, setSelectedVehicle] = useState(VEHICLE_MODES[3]); // Default SUV
  const [search, setSearch] = useState('');

  const filteredRoutes = ADVENTURE_ROADS.filter(route => {
    const matchDiff = selectedDifficulty === 'All' || route.difficulty.toLowerCase().includes(selectedDifficulty.toLowerCase());
    const matchSearch = !search || route.name.toLowerCase().includes(search.toLowerCase()) || route.district.toLowerCase().includes(search.toLowerCase());
    return matchDiff && matchSearch;
  });

  return (
    <div className="page-bg pb-16">
      {/* Header */}
      <div className="bg-[#1a3d2e] text-white py-12 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-[#95d5b2] mb-3">
            <span>🏍️</span>
            <span>Western Ghats & Off-Road Corridors</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Adventure Roads & Mountain Passes
          </h1>
          <p className="text-white/70 text-sm max-w-2xl leading-relaxed">
            Vehicle-aware route surface analysis, ghat road permits, difficulty grading, and safety clearances for Karnataka's thrilling mountain trails.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-6">
        {/* Vehicle Mode Selector Component */}
        <VehicleModeSelector
          selectedVehicle={selectedVehicle.id}
          onSelectVehicle={(v) => setSelectedVehicle(v)}
        />

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-1">Difficulty:</span>
            {DIFFICULTIES.map(d => (
              <button
                key={d}
                type="button"
                onClick={() => setSelectedDifficulty(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  selectedDifficulty === d
                    ? 'bg-[#1a3d2e] text-white border-[#1a3d2e]'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 w-full sm:w-64">
            <span className="text-gray-400 text-xs mr-2">🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ghat pass or district..."
              className="w-full bg-transparent text-xs text-gray-800 placeholder-gray-400 outline-none"
            />
          </div>
        </div>

        {/* Route Cards Grid */}
        <div className="space-y-5">
          {filteredRoutes.map((route) => {
            // Check vehicle suitability
            const isSuitable = route.suitableVehicles.some(sv =>
              sv.toLowerCase().includes(selectedVehicle.name.toLowerCase()) ||
              sv.toLowerCase().includes('all')
            );

            return (
              <div
                key={route.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:border-[#1a3d2e] transition-all"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-100">
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-lg font-bold text-gray-900">{route.name}</h3>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded ${
                        route.difficulty.includes('Expert')
                          ? 'bg-red-100 text-red-800'
                          : route.difficulty.includes('Challenging')
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {route.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      📍 {route.district} • Distance: <b>{route.distanceKm} km</b> • Approx Duration: <b>{route.durationHours}</b>
                    </p>
                  </div>

                  {/* Vehicle Compatibility Badge */}
                  <div className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 ${
                    isSuitable
                      ? 'bg-green-50 border-green-200 text-green-800'
                      : 'bg-red-50 border-red-200 text-red-800'
                  }`}>
                    <span>{isSuitable ? '✓' : '⚠️'}</span>
                    <span>{selectedVehicle.name}: {isSuitable ? 'Recommended' : 'Caution / Not Recommended'}</span>
                  </div>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs mb-4">
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="text-gray-400 block font-medium">Road Surface:</span>
                    <span className="font-semibold text-gray-800 mt-0.5 block">{route.surface}</span>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="text-gray-400 block font-medium">Access & Forest Clearance:</span>
                    <span className="font-semibold text-[#1a3d2e] mt-0.5 block">{route.accessStatus}</span>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="text-gray-400 block font-medium">Last Verified by Observers:</span>
                    <span className="font-semibold text-gray-800 mt-0.5 block">{route.lastVerified}</span>
                  </div>
                </div>

                {/* Safety Tips & Highlights */}
                <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-3.5 text-xs text-amber-950 mb-4">
                  <span className="font-bold">⚠️ Critical Safety Briefing: </span>
                  {route.safetyTip}
                </div>

                {/* Highlights tags */}
                <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] text-gray-400 font-medium">Highlights:</span>
                    {route.highlights.map((h, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 text-[11px] px-2.5 py-0.5 rounded-full">
                        {h}
                      </span>
                    ))}
                  </div>

                  <a
                    href={`/plan?search=${encodeURIComponent(route.name)}`}
                    className="text-xs font-semibold text-[#1a3d2e] hover:underline flex items-center gap-1"
                  >
                    <span>Add to AI Itinerary</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

