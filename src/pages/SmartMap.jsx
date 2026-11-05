import { useState } from 'react';
import KarnatakaMap, { KARNATAKA_MARKERS } from '../components/KarnatakaMap';
import DestinationDetailModal from '../components/DestinationDetailModal';
import { useLanguage } from '../context/LanguageContext';

const CATEGORIES = ['All', 'Heritage', 'Hill stations', 'Coastal', 'Waterfalls', 'Wildlife', 'Adventure', 'Spiritual'];

export default function SmartMap() {
  const { t, isKannada } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [detailModalPlace, setDetailModalPlace] = useState(null);
  const [search, setSearch] = useState('');

  const filteredMarkers = KARNATAKA_MARKERS.filter(m => {
    const matchCat = activeCategory === 'All' || m.cat === activeCategory;
    const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.district.toLowerCase().includes(search.toLowerCase()) || (m.kannada && m.kannada.includes(search));
    return matchCat && matchSearch;
  });

  return (
    <div className="page-bg pb-12">
      {/* Header bar */}
      <div className="bg-[#1a3d2e]/5 border-b border-gray-200 px-6 py-4">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span>🗺</span>
              <span>{t('map_banner_title', 'Smart Karnataka Tourism Map')}</span>
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
              {t('map_banner_sub', 'Live OpenStreetMap integration with real-time geocoding across 31 districts, taluks & heritage sites')}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5 w-full sm:w-72 shadow-sm focus-within:border-[#1a3d2e] transition-all">
            <span className="text-gray-400 text-xs">🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('search_map_placeholder', 'Search any place in Karnataka...')}
              className="w-full bg-transparent text-xs text-gray-700 outline-none placeholder-gray-400"
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-gray-400 text-xs hover:text-gray-600">✕</button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-5">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-3 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-full border transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#1a3d2e] text-white border-[#1a3d2e]'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="text-xs text-gray-400 ml-auto whitespace-nowrap pl-2">
            Showing <b>{filteredMarkers.length}</b> verified spots
          </span>
        </div>

        {/* Map Container */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="h-[620px] relative">
            <KarnatakaMap
              searchQuery={search}
              onSelectMarker={(m) => setSelectedPlace(m)}
              onViewDetails={(m) => setDetailModalPlace(m)}
              selectedId={selectedPlace?.id}
              height="620px"
              interactiveSearch={true}
            />
          </div>

          {/* Quick list drawer */}
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                {t('fly_instruction', 'Click any destination to fly to location or view public transit & hotel ratings')}
              </h3>
              <span className="text-[11px] text-gray-400">OpenStreetMap Nominatim Geocoding Active</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {filteredMarkers.slice(0, 18).map((place) => (
                <button
                  key={place.id}
                  onClick={() => {
                    setSelectedPlace(place);
                    setSearch(place.name);
                  }}
                  className={`text-left p-2.5 rounded-lg border text-xs transition-all ${
                    selectedPlace?.id === place.id
                      ? 'bg-[#1a3d2e] text-white border-[#1a3d2e] shadow-sm'
                      : 'bg-white text-gray-800 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold truncate">
                    {isKannada && place.kannada ? place.kannada : place.name}
                  </div>
                  <div className={`text-[10px] mt-0.5 ${selectedPlace?.id === place.id ? 'text-white/70' : 'text-gray-400'}`}>
                    {place.district} • {place.cat}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Destination Detail Modal */}
      {detailModalPlace && (
        <DestinationDetailModal
          destination={detailModalPlace}
          onClose={() => setDetailModalPlace(null)}
        />
      )}
    </div>
  );
}
