import { useState } from 'react';
import KarnatakaMap, { KARNATAKA_MARKERS } from '../components/KarnatakaMap';
import DestinationDetailModal from '../components/DestinationDetailModal';
import {
  getDestinationPublicTransport,
  getDestinationHotels,
  getDestinationDining,
} from '../data/karnatakaData';

const STARTING_GATEWAYS = [
  'Bengaluru',
  'Mysuru',
  'Mangaluru',
  'Hubballi-Dharwad',
  'Belagavi',
  'Kalaburagi',
  'Ballari',
  'Vijayapura',
  'Shivamogga',
  'Tumakuru',
  'Davangere',
  'Udupi',
  'Chikkamagaluru',
  'Madikeri (Kodagu)',
  'Hassan',
  'Bidar',
  'Bagalkot',
  'Raichur',
  'Kolar',
  'Chitradurga',
];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const BUDGET_STYLES = ['Low', 'Medium', 'Premium'];

const INTERESTS = [
  'Heritage',
  'Nature',
  'Adventure',
  'Spiritual',
  'Beach',
  'Food',
  'Wildlife',
  'Hills',
  'Waterfalls',
  'Family',
];

const GROUP_TYPES = ['Solo', 'Couple', 'Family', 'Friends Group', 'Corporate Offsite'];
const PACES = ['Relaxed', 'Balanced', 'Intensive'];
const TRANSPORT_MODES = [
  'Taxi',
  'Self-drive Car',
  'KSRTC Green Bus',
  'Indian Railways Train',
  'EV Rental',
  'Motorcycle',
];

export default function PlanTrip() {
  const [showMap, setShowMap] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [mapSearchTrigger, setMapSearchTrigger] = useState('');

  const [form, setForm] = useState({
    startingPoint: 'Bengaluru',
    duration: 4,
    month: 'November',
    budget: '25000',
    budgetStyle: 'Medium',
    interests: ['Heritage', 'Nature'],
    groupType: 'Couple',
    travelPace: 'Balanced',
    transport: 'Taxi',
    prioritizeGems: false,
    specialNeeds: false,
  });

  const [generating, setGenerating] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [activeModalDest, setActiveModalDest] = useState(null);

  const toggleInterest = (interest) => {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSampleProfile = () => {
    setForm({
      startingPoint: 'Bengaluru',
      duration: 3,
      month: 'December',
      budget: '18000',
      budgetStyle: 'Medium',
      interests: ['Heritage', 'Food', 'Spiritual'],
      groupType: 'Family',
      travelPace: 'Relaxed',
      transport: 'KSRTC Green Bus',
      prioritizeGems: true,
      specialNeeds: false,
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setMapSearchTrigger(searchQuery.trim());
      if (!showMap) setShowMap(true);
    }
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);

      const targetObj = selectedDestination || {
        name: form.startingPoint === 'Mysuru' ? 'Hampi' : 'Mysuru Palace',
        district: form.startingPoint === 'Mysuru' ? 'Vijayanagara' : 'Mysuru',
        cat: form.interests[0] || 'Heritage',
      };

      const transportData = getDestinationPublicTransport(targetObj);
      const hotelsData = getDestinationHotels(targetObj);
      const diningData = getDestinationDining(targetObj);

      setItinerary({
        title: `${form.duration}-Day ${form.startingPoint} Gateway Itinerary`,
        targetPlace: targetObj.name,
        targetObj,
        transport: transportData,
        hotels: hotelsData,
        dining: diningData,
        budgetEst: `₹${Number(form.budget).toLocaleString('en-IN')}`,
        carbonScore: form.transport.includes('Bus') || form.transport.includes('Train') ? 'Low Carbon (A+)' : 'Standard Carbon (B)',
        days: [
          {
            day: 1,
            route: `${form.startingPoint} → ${targetObj.name}`,
            activities: [
              'Morning departure via Expressway / Scenic Rail',
              `${targetObj.name} guided tour (10:30 AM)`,
              'Authentic local Karnataka lunch',
              'Evening sunset viewpoint & heritage walk',
            ],
            stay: `Heritage Stay, ${targetObj.district || 'Heritage Hub'}`,
          },
          {
            day: 2,
            route: 'Scenic Ghats & Coffee Hills Explorer',
            activities: [
              'Early morning nature trail and birding',
              'Local spice plantation walk & artisanal filter coffee tasting',
              'Visit to nearby cascades and viewpoints',
              'Sunset stargazing from viewpoint',
            ],
            stay: 'Eco Homestay',
          },
          {
            day: 3,
            route: 'Cultural & Sacred Circuit',
            activities: [
              'Historic temple architecture & stone inscription exploration',
              'Local market handicrafts shopping (Channapatna toys / Mysore silk)',
              'Evening cultural folk performance / Aarti',
            ],
            stay: 'Heritage Hotel',
          },
          {
            day: 4,
            route: 'Return Gateway Journey',
            activities: [
              'Morning leisure breakfast & local breakfast delicacies (Masala Dosa, Thatte Idli)',
              'Scenic return drive with roadside tender coconut stops',
              `Comfortable evening arrival back at ${form.startingPoint}`,
            ],
            stay: 'Tour Conclusion',
          },
        ].slice(0, form.duration),
      });
    }, 1100);
  };

  return (
    <div className="page-bg pb-16">
      {/* Search Header Banner */}
      <div className="bg-white border-b border-gray-200 py-3.5 px-4 sm:px-6">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-3xl flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2 focus-within:border-[#1a3d2e] focus-within:bg-white transition-all">
            <span className="text-gray-400 mr-2.5">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any district, taluk, city, or place (e.g. Shivamogga, Thirthahalli, Badami, Bidar, Hampi, Udupi)..."
              className="bg-transparent text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none w-full"
            />
            {searchQuery && (
              <button
                type="submit"
                className="bg-[#1a3d2e] text-white text-xs px-2.5 py-1 rounded ml-2 font-medium hover:bg-[#145236] transition-colors whitespace-nowrap"
              >
                Locate on Map ↗
              </button>
            )}
          </form>

          <button
            onClick={() => setShowMap(!showMap)}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-700 hover:text-[#1a3d2e] transition-colors self-end md:self-center"
          >
            <span>🗺</span>
            <span>{showMap ? 'Hide Real-Time Map' : 'Show Real-Time Map'}</span>
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-6">
        <div className={`grid grid-cols-1 ${showMap ? 'lg:grid-cols-12' : 'max-w-3xl mx-auto'} gap-6`}>
          {/* Left Form Column */}
          <div className={showMap ? 'lg:col-span-6 space-y-5' : 'space-y-5'}>
            {/* Planner Engine Banner */}
            <div className="bg-[#eef5fa] border border-[#d2e4f0] rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-[#204969] leading-relaxed">
              <span className="text-sm mt-0.5">ⓘ</span>
              <div>
                <span className="font-semibold">Planner Engine:</span> Deterministic offline planner active. Real-time OpenStreetMap spatial directory loaded with 45+ verified markers.
              </div>
            </div>

            {/* Target Destination notification if selected from map */}
            {selectedDestination && (
              <div className="bg-[#eef8f3] border border-[#b2e2ca] rounded-xl p-3 flex items-center justify-between text-xs text-[#134e34] animate-in fade-in">
                <div className="flex items-center gap-2">
                  <span className="text-base">📍</span>
                  <div>
                    <span className="font-bold">{selectedDestination.name}</span> selected as target destination
                    <span className="text-gray-500 block text-[11px]">{selectedDestination.district} • {selectedDestination.cat}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedDestination(null)}
                  className="text-gray-400 hover:text-gray-600 text-sm font-bold px-1"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Main Configuration Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
              {/* Row 1: Starting point & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Starting Point / Gateway
                    <span className="text-gray-400 block text-[11px] font-normal">(31 Districts & Taluks)</span>
                  </label>
                  <select
                    value={form.startingPoint}
                    onChange={(e) => setForm({ ...form, startingPoint: e.target.value })}
                    className="form-select"
                  >
                    {STARTING_GATEWAYS.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Duration (days) (1-10)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: Math.max(1, Math.min(10, Number(e.target.value))) })}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Row 2: Travel month & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Travel month</label>
                  <select
                    value={form.month}
                    onChange={(e) => setForm({ ...form, month: e.target.value })}
                    className="form-select"
                  >
                    {MONTHS.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Budget (₹ INR) (₹ INR)</label>
                  <input
                    type="number"
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className="form-input"
                    placeholder="25000"
                  />
                </div>
              </div>

              {/* Row 3: Budget Style Pills */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Budget style</label>
                <div className="grid grid-cols-3 gap-2">
                  {BUDGET_STYLES.map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => setForm({ ...form, budgetStyle: style })}
                      className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                        form.budgetStyle === style
                          ? 'bg-[#1a3d2e] text-white border-[#1a3d2e]'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 4: Travel Interests */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">Travel Interests</label>
                <div className="flex flex-wrap gap-1.5">
                  {INTERESTS.map((interest) => {
                    const isSelected = form.interests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                          isSelected
                            ? 'bg-[#1a3d2e] text-white border-[#1a3d2e]'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 5: Group type, Pace, Transport */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Group type</label>
                  <select
                    value={form.groupType}
                    onChange={(e) => setForm({ ...form, groupType: e.target.value })}
                    className="form-select text-xs"
                  >
                    {GROUP_TYPES.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Travel pace</label>
                  <select
                    value={form.travelPace}
                    onChange={(e) => setForm({ ...form, travelPace: e.target.value })}
                    className="form-select text-xs"
                  >
                    {PACES.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Transport & Carbon Mode</label>
                  <select
                    value={form.transport}
                    onChange={(e) => setForm({ ...form, transport: e.target.value })}
                    className="form-select text-xs"
                  >
                    {TRANSPORT_MODES.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.prioritizeGems}
                    onChange={(e) => setForm({ ...form, prioritizeGems: e.target.checked })}
                    className="rounded text-[#1a3d2e] focus:ring-[#1a3d2e]"
                  />
                  <span>Prioritize hidden gems & off-beat destinations</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.specialNeeds}
                    onChange={(e) => setForm({ ...form, specialNeeds: e.target.checked })}
                    className="rounded text-[#1a3d2e] focus:ring-[#1a3d2e]"
                  />
                  <span>Special accessibility needs (Wheelchair ramps, flat terrain)</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={generating}
                className="flex-1 bg-[#1a3d2e] hover:bg-[#145236] text-white text-xs sm:text-sm font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                {generating ? (
                  <>
                    <span className="animate-spin text-base">⟳</span>
                    <span>Building your itinerary...</span>
                  </>
                ) : (
                  <>
                    <span>⚙</span>
                    <span>Generate Itinerary</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleSampleProfile}
                className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 text-xs sm:text-sm font-medium py-3 px-4 rounded-xl transition-all"
              >
                Sample Profile
              </button>
            </div>

            {/* Generated Itinerary Preview */}
            {itinerary && (
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4 animate-in fade-in">
                <div className="flex items-start justify-between pb-3 border-b border-gray-100">
                  <div>
                    <h3 className="font-bold text-[#1a3d2e] text-base">{itinerary.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Budget Target: <b>{itinerary.budgetEst}</b> • {itinerary.carbonScore}</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-[11px] font-semibold px-2 py-0.5 rounded">
                    Ready
                  </span>
                </div>

                {/* Day-by-Day Activity Flow */}
                <div className="space-y-3">
                  {itinerary.days.map((d) => (
                    <div key={d.day} className="bg-gray-50 border border-gray-100 rounded-lg p-3 text-xs">
                      <div className="font-semibold text-gray-800 mb-1 flex items-center justify-between">
                        <span>Day {d.day}: {d.route}</span>
                        <span className="text-[11px] text-[#1a3d2e] font-normal">🏨 {d.stay}</span>
                      </div>
                      <ul className="list-disc list-inside space-y-0.5 text-gray-600 pl-1">
                        {d.activities.map((act, idx) => (
                          <li key={idx}>{act}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* 🚌 Public Transport Connectivity Panel */}
                {itinerary.transport && (
                  <div className="bg-[#f0f9f4] border border-[#c4e8d4] rounded-xl p-4 text-xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🚌</span>
                        <div>
                          <span className="font-bold text-[#145236] text-xs sm:text-sm block">Public Transport & KSRTC Transit</span>
                          <span className="text-gray-500 text-[11px]">{itinerary.transport.nearestBusStand}</span>
                        </div>
                      </div>
                      <a
                        href="https://ksrtc.in"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#1a3d2e] text-white text-[10px] font-bold px-2.5 py-1 rounded hover:bg-[#145236] transition-colors"
                      >
                        Book Bus ↗
                      </a>
                    </div>

                    <div className="grid grid-cols-1 gap-2 pt-1">
                      {(itinerary.transport.busDetails || []).slice(0, 2).map((bus, i) => (
                        <div key={i} className="bg-white rounded-lg p-2.5 border border-[#d2edd9] flex items-center justify-between text-xs">
                          <div>
                            <span className="bg-[#1a3d2e] text-white text-[9px] font-bold px-1.5 py-0.5 rounded mr-1.5">{bus.type}</span>
                            <span className="font-semibold text-gray-800">{bus.route}</span>
                            <div className="text-[10px] text-gray-400 mt-0.5">🔄 {bus.frequency} • 🕒 {bus.timings}</div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span className="font-extrabold text-[#1a3d2e] text-xs block">{bus.fare}</span>
                            <span className="text-[9px] text-gray-400">Govt Fare</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-white/80 rounded-lg p-2 border border-[#d2edd9] text-[11px] text-gray-600 flex items-start gap-1.5">
                      <span className="font-bold text-[#145236]">🚆 Rail:</span>
                      <span>{itinerary.transport.nearestRailStation}</span>
                    </div>

                    <div className="bg-white/80 rounded-lg p-2 border border-[#d2edd9] text-[11px] text-gray-600 flex items-start gap-1.5">
                      <span className="font-bold text-[#145236]">🛺 Last-Mile:</span>
                      <span>{itinerary.transport.lastMileTransit}</span>
                    </div>
                  </div>
                )}

                {/* 🏨 Nearest Hotels with Ratings & Prices */}
                {itinerary.hotels && (
                  <div className="space-y-2.5 pt-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base">🏨</span>
                        <h4 className="font-bold text-gray-900 text-xs sm:text-sm">Nearest Verified Hotels & Homestays</h4>
                      </div>
                      <span className="text-[11px] text-gray-400 font-medium">Ratings & Pricing</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {itinerary.hotels.slice(0, 4).map((hotel) => (
                        <div key={hotel.id} className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex flex-col justify-between gap-1.5 hover:border-[#1a3d2e] transition-all">
                          <div>
                            <div className="flex items-start justify-between gap-1">
                              <span className="font-bold text-gray-900 text-xs leading-tight">{hotel.name}</span>
                              <span className="bg-amber-100 text-amber-900 font-black text-[10px] px-1.5 py-0.5 rounded flex items-center gap-0.5 flex-shrink-0">
                                ★ {hotel.rating}
                              </span>
                            </div>
                            <span className="text-[10px] text-gray-500 block mt-0.5">{hotel.category} • {hotel.distance}</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {(hotel.amenities || []).slice(0, 2).map((a, i) => (
                                <span key={i} className="text-[9px] bg-white text-gray-600 border border-gray-200 px-1 py-0.2 rounded">✓ {a}</span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between border-t border-gray-200 pt-1.5 mt-1">
                            <span className="text-[10px] text-gray-400">Price/night:</span>
                            <span className="font-extrabold text-[#1a3d2e] text-xs">{hotel.pricePerNight}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 🍽️ Regional Budget Food Menu & Famous Dining */}
                {itinerary.dining && (
                  <div className="space-y-2.5 pt-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base">🍽️</span>
                        <h4 className="font-bold text-gray-900 text-xs sm:text-sm">Regional Dining & Budget Food Menu</h4>
                      </div>
                      <span className="text-[11px] text-amber-700 font-semibold">{itinerary.dining.regionName}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(itinerary.dining.budgetMenu || []).slice(0, 4).map((item, idx) => (
                        <div key={idx} className="bg-amber-50/60 border border-amber-200 rounded-lg p-2.5 flex items-center justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1">
                              <span className="font-bold text-gray-900 text-xs">{item.name}</span>
                              {item.kannada && <span className="text-amber-800 text-[10px] font-medium font-kannada">({item.kannada})</span>}
                            </div>
                            <span className="text-[10px] text-gray-500 line-clamp-1">{item.desc}</span>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span className="font-black text-[#1a3d2e] text-xs block">{item.price}</span>
                            <span className="text-[9px] text-green-700 bg-green-100 px-1 py-0.2 rounded font-semibold">{item.type}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modal Trigger Action */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveModalDest(itinerary.targetObj)}
                    className="bg-[#1a3d2e] hover:bg-[#145236] text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <span>View Full Transport Schedules, Hotel Directory & Menu</span>
                    <span>↗</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Map Column */}
          {showMap && (
            <div className="lg:col-span-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden sticky top-20">
                {/* Map Header */}
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-800">
                    <span>🗺</span>
                    <span>Real-Time Karnataka Tourism Map</span>
                  </div>
                  <a
                    href="/smart-map"
                    className="text-xs font-semibold text-[#1a3d2e] hover:underline flex items-center gap-1"
                  >
                    <span>Full-Screen Map</span>
                    <span>↗</span>
                  </a>
                </div>

                {/* OpenStreetMap Component */}
                <KarnatakaMap
                  searchQuery={mapSearchTrigger}
                  onSelectMarker={(m) => {
                    setSelectedDestination(m);
                  }}
                  onViewDetails={(m) => {
                    setActiveModalDest(m);
                  }}
                  selectedId={selectedDestination?.id}
                  height="490px"
                  interactiveSearch={true}
                />

                {/* Map Footer status */}
                <div className="p-3 bg-gray-50 border-t border-gray-200 space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-gray-500">
                    <span>Karnataka Spatial Directory: 159 verified markers • Data: OpenStreetMap & Survey of India</span>
                    <span className="font-semibold text-[#1a3d2e]">159 Places Active</span>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    💡 Search any location or click any marker on the map to view Public Transport, Nearest Hotels & Budget Menu
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Destination Detail Modal */}
      {activeModalDest && (
        <DestinationDetailModal
          destination={activeModalDest}
          onClose={() => setActiveModalDest(null)}
          onAddToTrip={(d) => setSelectedDestination(d)}
        />
      )}
    </div>
  );
}
