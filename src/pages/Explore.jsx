import { useState } from 'react';
import RegionExplorer from '../components/RegionExplorer';
import DestinationDetailModal from '../components/DestinationDetailModal';
import { useLanguage } from '../context/LanguageContext';

const DIVISIONS = ['All Karnataka', 'Bengaluru Division', 'Mysuru Division', 'Belagavi Division', 'Kalaburagi Division'];
const CATEGORIES = ['Heritage', 'Nature', 'Adventure', 'Wildlife', 'Coastal', 'Hill stations', 'Food', 'Waterfalls'];

const ALL_DESTINATIONS = [
  { id:1, name:'Hampi', kannada:'ಹಂಪಿ', location:'Hospet, Vijayanagara', district:'Vijayanagara', desc:'UNESCO ruins of the Vijayanagara Empire with stone chariot and boulder landscapes', cat:'Heritage', crowd:'High', crowdCls:'crowd-high', time:'Afternoon', img:'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80', duration:'4h', entry:'₹40', video:true, gem:false, div:'Kalaburagi Division', roadType:'Paved All-Weather' },
  { id:2, name:'Badami Caves', kannada:'ಬಾದಾಮಿ ಗುಹೆಗಳು', location:'Badami, Bagalkot', district:'Bagalkot', desc:'Rock-cut Chalukya cave temples overlooking sacred Agastya Lake', cat:'Heritage', crowd:'Moderate', crowdCls:'crowd-moderate', time:'Afternoon', img:'https://images.unsplash.com/photo-1598978483810-21f41a7e8064?w=400&q=80', duration:'3h', entry:'₹25', video:true, gem:false, div:'Kalaburagi Division', roadType:'Paved All-Weather' },
  { id:3, name:'Aihole', kannada:'ಐಹೊಳೆ', location:'Hungund, Bagalkot', district:'Bagalkot', desc:'Cradle of Indian temple architecture with 120 stone structures', cat:'Heritage', crowd:'Low', crowdCls:'crowd-low', time:'Afternoon', img:'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&q=80', duration:'3h', entry:'₹25', video:true, gem:true, div:'Kalaburagi Division', roadType:'Paved Highway' },
  { id:4, name:'Pattadakal', kannada:'ಪಟ್ಟದಕಲ್ಲು', location:'Badami, Bagalkot', district:'Bagalkot', desc:'UNESCO Chalukya temples complex blending Rekha Nagara and Dravidian architecture', cat:'Heritage', crowd:'Moderate', crowdCls:'crowd-moderate', time:'Afternoon', img:'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&q=80', duration:'3h', entry:'₹40', video:true, gem:false, div:'Kalaburagi Division', roadType:'Paved Highway' },
  { id:5, name:'Gol Gumbaz', kannada:'ಗೋಲ್ ಗುಂಬಜ್', location:'Vijayapura, Vijayapura', district:'Vijayapura', desc:'Second largest circular dome in the world with acoustic whispering gallery', cat:'Heritage', crowd:'Moderate', crowdCls:'crowd-moderate', time:'Afternoon', img:'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=400&q=80', duration:'2h', entry:'₹25', video:true, gem:false, div:'Kalaburagi Division', roadType:'City Paved' },
  { id:6, name:'Mysore Palace', kannada:'ಮೈಸೂರು ಅರಮನೆ', location:'Mysuru, Mysuru', district:'Mysuru', desc:'Royal palace of the Wadiyar dynasty illuminated by 100,000 bulbs on Sundays', cat:'Heritage', crowd:'High', crowdCls:'crowd-high', time:'Afternoon', img:'https://images.unsplash.com/photo-1546961342-ea5f60b193cb?w=400&q=80', duration:'3h', entry:'₹70', video:true, gem:false, div:'Mysuru Division', roadType:'Expressway Connected' },
  { id:7, name:'Coorg (Madikeri)', kannada:'ಕೊಡಗು', location:'Madikeri, Kodagu', district:'Kodagu', desc:'Scotland of India — coffee estates, misty viewpoints and Raja Seat sunsets', cat:'Nature', crowd:'Moderate', crowdCls:'crowd-moderate', time:'Morning', img:'https://images.unsplash.com/photo-1562679299-a6f9a3a5de9f?w=400&q=80', duration:'Full day', entry:'Free', video:true, gem:false, div:'Mysuru Division', roadType:'Paved Ghat Road' },
  { id:8, name:'Jog Falls', kannada:'ಜೋಗ ಜಲಪಾತ', location:'Sagara, Shivamogga', district:'Shivamogga', desc:'One of the highest plunge waterfalls in India dropping 253m on Sharavathi River', cat:'Nature', crowd:'Moderate', crowdCls:'crowd-moderate', time:'Morning', img:'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=80', duration:'3h', entry:'₹20', video:true, gem:false, div:'Belagavi Division', roadType:'NH69 Paved' },
  { id:9, name:'Gokarna (Om Beach)', kannada:'ಗೋಕರ್ಣ', location:'Kumta, Uttara Kannada', district:'Uttara Kannada', desc:'Sacred coastline with natural Om-shaped cliff beach and Mahabaleshwara temple', cat:'Coastal', crowd:'Moderate', crowdCls:'crowd-moderate', time:'Sunset', img:'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=80', duration:'Full day', entry:'Free', video:true, gem:false, div:'Belagavi Division', roadType:'NH66 Coastal Paved' },
  { id:10, name:'Mullayanagiri Peak', kannada:'ಮುಳ್ಳಯ್ಯನಗಿರಿ', location:'Chikkamagaluru', district:'Chikkamagaluru', desc:'Highest mountain summit in Karnataka (1,930m) enveloped in misty clouds', cat:'Hill stations', crowd:'Moderate', crowdCls:'crowd-moderate', time:'Morning', img:'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80', duration:'4h', entry:'Free', video:true, gem:false, div:'Mysuru Division', roadType:'Paved Narrow Ghat' },
  { id:11, name:'Udupi Sri Krishna Matha', kannada:'ಉಡುಪಿ ಕೃಷ್ಣ ಮಠ', location:'Car Street, Udupi', district:'Udupi', desc:'13th century Vedic monastery with Kanakana Kindi window and legendary cuisine', cat:'Spiritual', crowd:'High', crowdCls:'crowd-high', time:'Morning', img:'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80', duration:'2.5h', entry:'Free', video:false, gem:false, div:'Mysuru Division', roadType:'NH66 Paved 4-lane' },
  { id:12, name:'Belur Chennakeshava', kannada:'ಬೇಲೂರು', location:'Belur, Hassan', district:'Hassan', desc:'Hoysala soapstone marvel with gravity-defying bracket dancer figurines', cat:'Heritage', crowd:'Moderate', crowdCls:'crowd-moderate', time:'Morning', img:'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&q=80', duration:'2.5h', entry:'₹25', video:true, gem:false, div:'Mysuru Division', roadType:'NH75 4-lane Paved' },
];

export default function Explore() {
  const { t, isKannada } = useLanguage();
  const [search, setSearch] = useState('');
  const [activeDivision, setActiveDivision] = useState('All Karnataka');
  const [activeCat, setActiveCat] = useState(null);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [showHierarchy, setShowHierarchy] = useState(false);
  const [activeModalDest, setActiveModalDest] = useState(null);

  const filtered = ALL_DESTINATIONS.filter(d => {
    const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.location.toLowerCase().includes(search.toLowerCase()) || (d.kannada && d.kannada.includes(search));
    const matchDiv = activeDivision === 'All Karnataka' || d.div === activeDivision;
    const matchCat = !activeCat || d.cat === activeCat;
    return matchSearch && matchDiv && matchCat;
  });

  return (
    <div className="page-bg pb-16">
      {/* Header */}
      <div className="bg-[#1a3d2e]/5 border-b border-gray-200 px-6 py-4">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {isKannada ? 'ಪ್ರವಾಸಿ ತಾಣಗಳನ್ನು ಅನ್ವೇಷಿಸಿ' : 'Explore Destinations'}
            </h1>
            <p className="text-gray-500 text-sm">
              {isKannada ? 'ಕರ್ನಾಟಕದ 31 ಜಿಲ್ಲೆಗಳಲ್ಲಿ 159 ಪರಿಶೀಲಿಸಿದ ಪ್ರವಾಸಿ ತಾಣಗಳು' : '159 verified destinations across all 31 districts of Karnataka'}
            </p>
          </div>

          <button
            onClick={() => setShowHierarchy(!showHierarchy)}
            className="btn-green text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm"
          >
            <span>{showHierarchy ? (isKannada ? 'ಮರೆಮಾಡಿ' : 'Hide') : (isKannada ? 'ತೋರಿಸಿ' : 'Show')} Cascading Region Explorer</span>
            <span>{showHierarchy ? '▲' : '▼'}</span>
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
        {/* Cascading Region Explorer (Specification Feature) */}
        {showHierarchy && (
          <RegionExplorer onSelectDestination={(dest) => setActiveModalDest(dest)} />
        )}

        {/* Search */}
        <div className="bg-white rounded-xl border border-gray-200 px-4 py-3 mb-5 shadow-sm">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" /></svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={isKannada ? 'ತಾಣದ ಹೆಸರು, ಜಿಲ್ಲೆ ಅಥವಾ ತಾಲೂಕಿನ ಮೂಲಕ ಹುಡುಕಿ...' : 'Search by destination name, district, or taluk...'}
              className="text-sm text-gray-700 placeholder-gray-400 outline-none flex-1"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" /></svg>
            <span className="text-sm font-semibold text-gray-700">Administrative Divisions</span>
            <div className="ml-auto">
              <button onClick={() => setShowMoreFilters(f => !f)} className="text-xs text-gray-500 hover:text-[#1a3d2e] flex items-center gap-1">
                More filters <span>{showMoreFilters ? '▲' : '▼'}</span>
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {DIVISIONS.map(d => (
              <button key={d} onClick={() => setActiveDivision(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${activeDivision === d ? 'bg-[#1a3d2e] text-white border-[#1a3d2e]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#1a3d2e]'}`}>
                {d}
              </button>
            ))}
          </div>
          {showMoreFilters && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-600 mb-2">Category</p>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setActiveCat(null)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${!activeCat ? 'bg-[#1a3d2e] text-white border-[#1a3d2e]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#1a3d2e]'}`}>All</button>
                {CATEGORIES.map(c => (
                  <button key={c} onClick={() => setActiveCat(c === activeCat ? null : c)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${activeCat === c ? 'bg-[#1a3d2e] text-white border-[#1a3d2e]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#1a3d2e]'}`}>{c}</button>
                ))}
              </div>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-500 mb-4">Showing <strong>{filtered.length}</strong> destinations</p>

        {/* Destination Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map(d => (
            <div
              key={d.id}
              onClick={() => setActiveModalDest(d)}
              className="cursor-pointer"
            >
              <DestCard dest={d} />
            </div>
          ))}
        </div>
      </div>

      {/* Destination Detail Modal */}
      {activeModalDest && (
        <DestinationDetailModal
          destination={activeModalDest}
          onClose={() => setActiveModalDest(null)}
          onAddToTrip={(item) => {
            alert(`Added ${item.name} to itinerary!`);
          }}
        />
      )}
    </div>
  );
}

function DestCard({ dest }) {
  const { t, isKannada } = useLanguage();
  const [liked, setLiked] = useState(false);
  const tagClass = { Heritage:'tag-heritage', Nature:'tag-nature', Adventure:'tag-adventure', Spiritual:'tag-spiritual', Coastal:'tag-beach', Wildlife:'tag-wildlife', Food:'tag-food' }[dest.cat] || 'tag-heritage';

  return (
    <div className="dest-card group">
      <div className="relative h-44 overflow-hidden bg-gray-100">
        <img src={dest.img} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={e => { e.target.src = 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80'; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        <div className="absolute top-2 left-2 flex gap-1.5 flex-wrap">
          <span className={tagClass}>{dest.cat}</span>
          <span className="bg-black/50 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block"></span> {dest.time}
          </span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(l => !l); }}
          className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
        >
          <span className={`text-sm ${liked ? 'text-red-500' : 'text-gray-400'}`}>{liked ? '♥' : '♡'}</span>
        </button>
        <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
          {dest.gem && <span className="bg-green-700/80 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1"><span>💎</span> {isKannada ? 'ಗುಪ್ತ ತಾಣ' : 'Hidden Gem'}</span>}
          {dest.video && <span className="bg-black/60 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1"><span>▶</span> Video</span>}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-0.5">
          <h3 className="font-bold text-gray-900 group-hover:text-[#1a3d2e] transition-colors">
            {isKannada && dest.kannada ? dest.kannada : dest.name}
          </h3>
          <div className="flex items-center gap-1 ml-2">
            <span className={dest.crowdCls}></span>
            <span className="text-xs text-gray-500">{dest.crowd}</span>
          </div>
        </div>
        {isKannada ? (
          <p className="text-gray-400 text-xs mb-1">{dest.name} • {dest.location}</p>
        ) : (
          dest.kannada && <p className="text-gray-400 text-xs mb-1">{dest.kannada}</p>
        )}
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-2"><span>📍</span> {dest.location}</div>
        <p className="text-gray-600 text-xs mb-2.5 leading-relaxed">{dest.desc}</p>
        <div className="flex items-center gap-1.5 flex-wrap mb-2.5">
          <span className="text-[10px] bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
            <span>🚌</span> {t('tag_transit', 'Transit')}
          </span>
          <span className="text-[10px] bg-amber-50 text-amber-800 font-semibold px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
            <span>🏨</span> {t('tag_stays', 'Stays')}
          </span>
          <span className="text-[10px] bg-orange-50 text-orange-800 font-semibold px-2 py-0.5 rounded border border-orange-200 flex items-center gap-1">
            <span>🍽️</span> {t('tag_menu', 'Menu')}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-2">
          <span>⏱ {dest.duration}</span>
          <span>🎟 {dest.entry}</span>
          <span className="text-[#1a3d2e] font-semibold">{t('details_btn', 'View details ›')}</span>
        </div>
      </div>
    </div>
  );
}
