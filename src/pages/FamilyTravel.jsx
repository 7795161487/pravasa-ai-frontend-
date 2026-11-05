import { useState } from 'react';
import { FAMILY_TRAVEL_DESTINATIONS } from '../data/karnatakaData';

export default function FamilyTravel() {
  const [activeTab, setActiveTab] = useState('circuits');

  return (
    <div className="page-bg pb-16">
      {/* Header */}
      <div className="bg-[#1a3d2e] text-white py-12 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-[#95d5b2] mb-3">
            <span>👨‍👩‍👧‍👦</span>
            <span>Family Comfort & Accessibility</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Family-Friendly Travel in Karnataka
          </h1>
          <p className="text-white/70 text-sm max-w-2xl leading-relaxed">
            Curated paved-road itineraries, baby-care facilities, senior wheelchair accessibility, verified clean highway rest stops, and comfortable family paces.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-6">
        {/* Value Prop Banners */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-start gap-3">
            <span className="text-2xl">🛣️</span>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">100% Paved Highways</h4>
              <p className="text-xs text-gray-500 mt-0.5">Smooth, pothole-checked 4-lane and 6-lane expressways suitable for sedans and family cars.</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-start gap-3">
            <span className="text-2xl">♿</span>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Ramp & Stroller Access</h4>
              <p className="text-xs text-gray-500 mt-0.5">Verified wheelchair ramps, level pathways, and golf cart transfers at major monuments.</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-start gap-3">
            <span className="text-2xl">🍱</span>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Verified Rest Stops</h4>
              <p className="text-xs text-gray-500 mt-0.5">Hygienic restrooms, vegetarian dining plazas, and baby feeding zones every 50-70 km.</p>
            </div>
          </div>
        </div>

        {/* Family Circuits Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Recommended Itineraries</span>
              <h2 className="text-xl font-bold text-gray-900 mt-0.5">Top Karnataka Family Circuits</h2>
            </div>
            <span className="text-xs text-gray-500">All routes verified for child safety</span>
          </div>

          {FAMILY_TRAVEL_DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:border-[#1a3d2e] transition-all"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-100">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{dest.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    District: <b>{dest.district}</b> • Recommended Duration: <b>{dest.recommendedDuration}</b>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 block font-medium">Estimated Per Person</span>
                  <span className="text-lg font-black text-[#1a3d2e]">{dest.budgetPerPerson}</span>
                </div>
              </div>

              {/* Highway & Accessibility Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-xs">
                <div className="bg-[#f9faf7] p-3.5 rounded-xl border border-gray-100">
                  <span className="text-gray-400 block font-semibold uppercase tracking-wider text-[10px] mb-1">
                    Road Highway Quality:
                  </span>
                  <p className="text-gray-800 font-medium">{dest.roadQuality}</p>
                </div>

                <div className="bg-[#f9faf7] p-3.5 rounded-xl border border-gray-100">
                  <span className="text-gray-400 block font-semibold uppercase tracking-wider text-[10px] mb-1">
                    Accessibility & Senior Support:
                  </span>
                  <p className="text-gray-800 font-medium">{dest.accessibility}</p>
                </div>
              </div>

              {/* Highway Rest Plazas */}
              <div className="mb-4">
                <span className="text-xs font-bold text-gray-700 block mb-2">
                  🍽️ Verified Clean Rest Plazas Enroute:
                </span>
                <div className="flex flex-wrap gap-2">
                  {dest.restStops.map((stop, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-xs font-medium">
                      ✓ {stop}
                    </span>
                  ))}
                </div>
              </div>

              {/* Highlights for Kids & Seniors */}
              <div className="mb-5">
                <span className="text-xs font-bold text-gray-700 block mb-2">
                  🌟 Top Attractions for Children & Seniors:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  {dest.familyHighlights.map((hl, idx) => (
                    <div key={idx} className="bg-[#eef5fa] text-[#204969] p-2.5 rounded-xl border border-[#d2e4f0] font-medium">
                      • {hl}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400">Suitable For: <b>{dest.suitableFor}</b></span>
                <a
                  href={`/plan?search=${encodeURIComponent(dest.name)}`}
                  className="btn-green text-xs font-semibold px-4 py-2 rounded-lg"
                >
                  Plan Family Trip Here →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

