import { useState } from 'react';
import {
  getDestinationPublicTransport,
  getDestinationHotels,
  getDestinationDining,
} from '../data/karnatakaData';
import { useLanguage } from '../context/LanguageContext';

export default function DestinationDetailModal({ destination, onClose, onAddToTrip }) {
  const { t, isKannada } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'transport' | 'hotels' | 'dining'
  const [hotelFilter, setHotelFilter] = useState('All');
  const [foodFilter, setFoodFilter] = useState('All');
  const [added, setAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!destination) return null;

  const transport = getDestinationPublicTransport(destination);
  const hotels = getDestinationHotels(destination);
  const dining = getDestinationDining(destination);

  const handleAdd = () => {
    setAdded(true);
    if (onAddToTrip) onAddToTrip(destination);
    setTimeout(() => setAdded(false), 2200);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const filteredHotels = hotels.filter((h) => {
    if (hotelFilter === 'All') return true;
    if (hotelFilter === 'Luxury') return h.category.toLowerCase().includes('luxury') || h.category.toLowerCase().includes('premium');
    if (hotelFilter === 'Comfort') return h.category.toLowerCase().includes('comfort') || h.category.toLowerCase().includes('resort');
    if (hotelFilter === 'Budget') return h.category.toLowerCase().includes('budget') || h.category.toLowerCase().includes('hostel');
    if (hotelFilter === 'KSTDC') return h.category.toLowerCase().includes('government') || h.category.toLowerCase().includes('kstdc') || h.badge.includes('KSTDC');
    return true;
  });

  const filteredBudgetMenu = (dining?.budgetMenu || []).filter((item) => {
    if (foodFilter === 'All') return true;
    if (foodFilter === 'Veg') return item.type === 'Veg';
    if (foodFilter === 'Non-Veg') return item.type.includes('Non-Veg');
    return true;
  });

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-gray-200 my-6 flex flex-col max-h-[92vh]">
        {/* Modal Hero Header */}
        <div className="relative h-56 sm:h-64 bg-gray-950 flex-shrink-0">
          <img
            src={destination.img || 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1000&q=80'}
            alt={destination.name}
            className="w-full h-full object-cover opacity-80"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1000&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

          {/* Close & Share Buttons */}
          <div className="absolute top-3.5 right-3.5 flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="bg-black/50 hover:bg-black/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors border border-white/20"
              title={t('btn_share', 'Share')}
            >
              <span>{copiedLink ? t('btn_copied', '✓ Copied') : `🔗 ${t('btn_share', 'Share')}`}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 bg-black/60 hover:bg-black/90 text-white rounded-full flex items-center justify-center text-sm transition-colors border border-white/20"
              title={t('btn_close', 'Close')}
            >
              ✕
            </button>
          </div>

          {/* Destination Header Info */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-[11px] font-bold text-amber-300 tracking-wider mb-1 flex items-center gap-1.5 flex-wrap">
              <span>{t('modal_title_region', 'KARNATAKA')}</span>
              <span>›</span>
              <span>{destination.div || destination.district || (isKannada ? 'ಕಂದಾಯ ವಿಭಾಗ' : 'HERITAGE DIVISION')}</span>
              <span>›</span>
              <span>{destination.taluk || destination.district}</span>
              {destination.verified !== false && (
                <span className="bg-emerald-600/90 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold ml-1">
                  {t('verified_tag', '✓ Verified by Dept of Tourism')}
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {isKannada && destination.kannada ? destination.kannada : destination.name}
            </h2>

            <div className="flex items-center gap-3 mt-1 text-white/80 text-xs sm:text-sm">
              {isKannada ? (
                <span className="font-semibold text-amber-200">{destination.name}</span>
              ) : (
                destination.kannada && <span className="font-semibold text-amber-200">{destination.kannada}</span>
              )}
              <span>•</span>
              <span>{destination.cat || destination.category || 'Heritage'}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-300 font-medium">
                <span>📍</span>
                <span>{destination.district || 'Karnataka'}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-[#1a3d2e] px-4 sm:px-6 py-2 flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar border-b border-[#25523f] flex-shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'bg-white text-[#1a3d2e] shadow-sm'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>📋</span>
            <span>{t('tab_overview', 'Overview & Access')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('transport')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'transport'
                ? 'bg-white text-[#1a3d2e] shadow-sm'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>🚌</span>
            <span>{t('tab_transport', 'Public Transport')}</span>
            <span className="bg-emerald-500/30 text-emerald-200 text-[10px] px-1.5 py-0.2 rounded-full">
              {t('tab_transport_sub', 'KSRTC & Rail')}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('hotels')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'hotels'
                ? 'bg-white text-[#1a3d2e] shadow-sm'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>🏨</span>
            <span>{t('tab_hotels', 'Nearest Hotels')}</span>
            <span className="bg-amber-400 text-amber-950 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
              {t('tab_hotels_sub', '★ Ratings')}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('dining')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'dining'
                ? 'bg-white text-[#1a3d2e] shadow-sm'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>🍽️</span>
            <span>{t('tab_dining', 'Budget Menu & Dining')}</span>
            <span className="bg-orange-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
              {t('tab_dining_sub', 'Authentic')}
            </span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 text-xs sm:text-sm bg-gray-50/50">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4 animate-in fade-in">
              {/* Badges strip */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#1a3d2e]/10 text-[#1a3d2e] font-semibold px-3 py-1 rounded-full text-xs flex items-center gap-1">
                  <span>Category:</span>
                  <b>{destination.cat || destination.category || 'Heritage Landmark'}</b>
                </span>
                <span className="bg-amber-100 text-amber-800 font-semibold px-3 py-1 rounded-full text-xs">
                  Footfall: {destination.crowd || 'Moderate Density'}
                </span>
                <span className="bg-emerald-100 text-emerald-800 font-semibold px-3 py-1 rounded-full text-xs">
                  ASI / KSTDC Registered Spot
                </span>
                {destination.familyFriendly && (
                  <span className="bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-full text-xs">
                    👨‍👩‍👧 Family Friendly Circuit
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-1.5 text-sm flex items-center gap-1.5">
                  <span>🏛</span>
                  <span>About Destination</span>
                </h4>
                <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                  {destination.desc ||
                    'One of Karnataka\'s premier heritage and cultural landmarks, featuring extraordinary architectural mastery, rich historical significance, and scenic natural surroundings.'}
                </p>
              </div>

              {/* Road, Access & Cost Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-white border border-gray-200 rounded-xl p-4 text-xs">
                <div>
                  <span className="text-gray-400 font-medium block">{t('road_surface', 'Road Surface & Condition:')}</span>
                  <span className="text-gray-800 font-bold">{destination.roadType || 'Paved All-Weather NH/SH Highway'}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium block">{t('official_ticket', 'Official Ticket / Entry:')}</span>
                  <span className="text-[#1a3d2e] font-bold text-sm">{destination.cost || destination.entry || '₹25 - ₹40 (ASI Standard)'}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium block">{t('suitable_vehicles', 'Suitable Vehicle Modes:')}</span>
                  <span className="text-gray-800 font-medium">{isKannada ? 'ಕಾರು, ಎಸ್‌ಯುವಿ, ಬೈಕ್ ಮತ್ತು ಬಸ್‌ಗಳು' : 'Hatchbacks, Sedans, SUVs, KSRTC Buses & Bikes'}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium block">{t('best_time', 'Best Time of Day:')}</span>
                  <span className="text-gray-800 font-medium">{destination.time || (isKannada ? 'ಬೆಳಿಗ್ಗೆ 07:00 - 11:00 & ಸಂಜೆ 04:00 - 06:30' : '07:00 AM - 11:00 AM & 04:00 PM - 06:30 PM')}</span>
                </div>
              </div>

              {/* Quick Jump Callout to Public Transport & Dining */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('transport')}
                  className="bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 rounded-xl p-3 text-left transition-all group"
                >
                  <div className="text-emerald-800 font-bold text-xs flex items-center justify-between">
                    <span>🚌 Public Transit</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-[11px] text-emerald-700/80 mt-1">
                    Direct KSRTC buses, trains & last-mile auto fares
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('hotels')}
                  className="bg-amber-50 hover:bg-amber-100/80 border border-amber-200 rounded-xl p-3 text-left transition-all group"
                >
                  <div className="text-amber-800 font-bold text-xs flex items-center justify-between">
                    <span>🏨 Nearest Hotels</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-[11px] text-amber-700/80 mt-1">
                    {hotels.length} verified stays with ratings & prices
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('dining')}
                  className="bg-orange-50 hover:bg-orange-100/80 border border-orange-200 rounded-xl p-3 text-left transition-all group"
                >
                  <div className="text-orange-800 font-bold text-xs flex items-center justify-between">
                    <span>🍽️ Budget Menus</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-[11px] text-orange-700/80 mt-1">
                    Authentic regional dishes from ₹25
                  </p>
                </button>
              </div>

              {/* Verified Source */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 flex items-start gap-2.5">
                <span className="text-base">🛡️</span>
                <div className="leading-relaxed">
                  <b>Government Spatial Authority:</b> Geological Survey of India, Archaeological Survey of India (ASI) & Karnataka State Tourism Development Corporation (KSTDC).
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PUBLIC TRANSPORT & CONNECTIVITY */}
          {activeTab === 'transport' && (
            <div className="space-y-4 animate-in fade-in">
              {/* Bus Connectivity Banner */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🚌</span>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Nearest KSRTC Bus Stand & Depot</h4>
                      <p className="text-gray-500 text-[11px]">{transport.nearestBusStand}</p>
                    </div>
                  </div>
                  <a
                    href="https://ksrtc.in"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#1a3d2e] hover:bg-[#145236] text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors whitespace-nowrap"
                  >
                    <span>KSRTC Portal ↗</span>
                  </a>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    Available Bus Services & Fares
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {(transport.busDetails || []).map((bus, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-50 hover:bg-[#f5faf7] border border-gray-200 rounded-lg p-3 text-xs transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="bg-[#1a3d2e] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                              {bus.type}
                            </span>
                            <span className="font-bold text-gray-900">{bus.route}</span>
                          </div>
                          <div className="text-[11px] text-gray-500 flex items-center gap-3">
                            <span>🕒 {bus.timings}</span>
                            <span>•</span>
                            <span>🔄 Frequency: <b>{bus.frequency}</b></span>
                          </div>
                        </div>

                        <div className="text-left sm:text-right flex-shrink-0">
                          <div className="font-extrabold text-[#1a3d2e] text-sm">{bus.fare}</div>
                          <span className="text-[10px] text-gray-400">Govt Regulated Fare</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Railway Connectivity Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🚆</span>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Nearest Railway Station</h4>
                      <p className="text-gray-500 text-[11px]">{transport.nearestRailStation}</p>
                    </div>
                  </div>
                  <a
                    href="https://www.irctc.co.in"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-700 hover:bg-blue-800 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors whitespace-nowrap"
                  >
                    <span>IRCTC Rail ↗</span>
                  </a>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    Direct Train Connectivity
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {(transport.trainDetails || []).map((trn, idx) => (
                      <div
                        key={idx}
                        className="bg-blue-50/50 border border-blue-100 rounded-lg p-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div className="space-y-0.5">
                          <span className="font-bold text-blue-950 block">{trn.name}</span>
                          <span className="text-gray-600 text-[11px]">{trn.route}</span>
                          <span className="text-[10px] text-blue-700 block font-medium">Schedule: {trn.schedule}</span>
                        </div>
                        <div className="text-left sm:text-right flex-shrink-0">
                          <span className="font-bold text-blue-900 text-sm block">{trn.fare}</span>
                          <span className="text-[10px] text-gray-400">Standard Fares</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Last Mile Transit Box */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-xs space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
                  <span>🛺</span>
                  <span>Last-Mile Transit & Local Fares</span>
                </div>
                <p className="text-amber-950/90 leading-relaxed text-xs">
                  {transport.lastMileTransit}
                </p>
                <div className="text-[11px] text-amber-800 font-medium pt-1 flex items-center gap-1">
                  <span>💡 Tip:</span>
                  <span>Confirm meter or agree on union rates before boarding. Namma Yatri and prepaid auto stands are available at major rail junctions.</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: NEAREST HOTELS & HOMESTAYS */}
          {activeTab === 'hotels' && (
            <div className="space-y-4 animate-in fade-in">
              {/* Hotel Filter Pills */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  {['All', 'Luxury', 'Comfort', 'Budget', 'KSTDC'].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setHotelFilter(f)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        hotelFilter === f
                          ? 'bg-[#1a3d2e] text-white shadow-sm'
                          : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {f === 'KSTDC' ? '🏛 KSTDC Official' : f}
                    </button>
                  ))}
                </div>
                <span className="text-[11px] text-gray-400 font-medium">
                  {filteredHotels.length} Verified Accommodations
                </span>
              </div>

              {/* Hotels Grid */}
              <div className="grid grid-cols-1 gap-3">
                {filteredHotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="bg-white rounded-xl border border-gray-200 hover:border-[#1a3d2e] p-4 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row justify-between gap-3"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-start justify-between sm:justify-start gap-2 flex-wrap">
                        <h4 className="font-bold text-gray-900 text-base">{hotel.name}</h4>
                        {hotel.badge && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            hotel.badge.includes('KSTDC')
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : hotel.badge.includes('Luxury')
                              ? 'bg-purple-100 text-purple-800 border border-purple-200'
                              : 'bg-amber-100 text-amber-800 border border-amber-200'
                          }`}>
                            {hotel.badge}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                        {/* Rating Pill */}
                        <span className="bg-amber-50 border border-amber-300 text-amber-900 font-black px-2 py-0.5 rounded-md flex items-center gap-1 text-xs">
                          <span className="text-amber-500">★</span>
                          <span>{hotel.rating.toFixed(1)}</span>
                          <span className="font-normal text-gray-500 text-[10px]">({hotel.reviews.toLocaleString()} reviews)</span>
                        </span>

                        <span>•</span>
                        <span className="text-gray-700 font-medium">{hotel.category}</span>
                        <span>•</span>
                        <span className="text-gray-500 flex items-center gap-1">
                          <span>📍</span>
                          <span>{hotel.distance}</span>
                        </span>
                      </div>

                      {/* Amenities Pills */}
                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        {(hotel.amenities || []).map((amenity, i) => (
                          <span
                            key={i}
                            className="bg-gray-100 text-gray-600 text-[10px] font-medium px-2 py-0.5 rounded"
                          >
                            ✓ {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price and Book CTA */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 sm:pl-4 sm:border-l border-gray-100 min-w-[130px]">
                      <div>
                        <span className="text-[10px] text-gray-400 block sm:text-right">Starting from</span>
                        <div className="text-lg font-black text-[#1a3d2e] sm:text-right leading-none">
                          {hotel.pricePerNight}
                        </div>
                        <span className="text-[10px] text-gray-400 block sm:text-right mt-0.5">/ night (taxes incl.)</span>
                      </div>

                      <a
                        href="https://karnatakatourism.org"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 bg-[#1a3d2e] hover:bg-[#145236] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors text-center shadow-sm"
                      >
                        Check Stay ↗
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: BUDGET MENU & REGIONAL DINING */}
          {activeTab === 'dining' && (
            <div className="space-y-4 animate-in fade-in">
              {/* Region Cuisine Header */}
              <div className="bg-[#1a3d2e]/10 border border-[#1a3d2e]/20 rounded-xl p-3.5 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#1a3d2e] uppercase tracking-wider block">Regional Culinary Identity</span>
                  <h4 className="font-black text-gray-900 text-sm sm:text-base">
                    {dining.regionName || 'Authentic Karnataka Regional Flavors'}
                  </h4>
                </div>
                <span className="text-2xl">🍛</span>
              </div>

              {/* Iconic Restaurants Section */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                    <span>⭐</span>
                    <span>Top-Rated Iconic Restaurants & Heritage Dhabas</span>
                  </h4>
                  <span className="text-[11px] text-gray-400">Curated & Rated</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(dining.topRestaurants || []).map((rest, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl border border-gray-200 p-3.5 shadow-sm space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="font-bold text-gray-900 text-xs sm:text-sm leading-tight">
                          {rest.name}
                        </h5>
                        <span className="bg-amber-100 text-amber-900 font-black text-xs px-2 py-0.5 rounded flex items-center gap-0.5 flex-shrink-0">
                          ★ {rest.rating}
                        </span>
                      </div>

                      <p className="text-gray-600 text-xs">
                        <span className="font-medium text-gray-500">Famous For:</span>{' '}
                        <span className="font-semibold text-gray-800">{rest.specialty}</span>
                      </p>

                      <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1 border-t border-gray-100">
                        <span>📍 {rest.address}</span>
                        <span className="font-bold text-[#1a3d2e]">Avg: {rest.avgForTwo} (for two)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget Menu Section */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                      <span>🏷️</span>
                      <span>Local Budget Food Menu (With Kannada Names & Pricing)</span>
                    </h4>
                    <p className="text-[11px] text-gray-500">Pocket-friendly heritage dishes you must taste</p>
                  </div>

                  <div className="flex items-center gap-1">
                    {['All', 'Veg', 'Non-Veg'].map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setFoodFilter(f)}
                        className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                          foodFilter === f
                            ? 'bg-[#1a3d2e] text-white'
                            : 'bg-white text-gray-700 border border-gray-200'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {filteredBudgetMenu.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm hover:border-[#1a3d2e] transition-all flex flex-col justify-between gap-2"
                    >
                      <div className="space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="font-bold text-gray-900 text-xs sm:text-sm block">
                              {item.name}
                            </span>
                            {item.kannada && (
                              <span className="text-amber-800 font-semibold text-xs font-kannada">
                                {item.kannada}
                              </span>
                            )}
                          </div>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${
                            item.type.includes('Non-Veg')
                              ? 'bg-red-100 text-red-800 border border-red-200'
                              : 'bg-green-100 text-green-800 border border-green-200'
                          }`}>
                            {item.type}
                          </span>
                        </div>
                        <p className="text-gray-500 text-[11px] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-gray-100 pt-2 text-xs">
                        <span className="text-[11px] text-gray-400">Budget Price:</span>
                        <span className="font-black text-[#1a3d2e] text-sm">{item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
          >
            {t('btn_close', 'Close')}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAdd}
              className="btn-green text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span>{added ? t('btn_added', '✓ Added to Itinerary') : t('btn_add_to_trip', '+ Add to Trip Itinerary')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
