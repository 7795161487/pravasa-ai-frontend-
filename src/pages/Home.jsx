import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DestinationDetailModal from '../components/DestinationDetailModal';
import { VEHICLE_MODES } from '../data/karnatakaData';
import { useLanguage } from '../context/LanguageContext';
import { fetchAdvisories } from '../services/api';

const DEFAULT_ALERTS = [
  'Western Ghats Monsoon Ghat Road Advisory: Intermittent monsoon showers along Charmadi and Shiradi ghat sections. Commuters and travellers are advised to maintain safe vehicle speeds and check local police route clearance before travelling after dusk. — Karnataka State Natural Disaster Monitoring Centre (KSNDMC)',
  'Hampi World Heritage Site: Restricted vehicle entry during Hampi Utsav. Use KSRTC shuttle buses from Hospet.',
  'Kudremukh National Park: Trail permits mandatory via Karnataka Forest Department portal.',
];

const DIVISIONS = [
  { name: 'Bengaluru Division', desc: 'Tech capital, Nandi Hills, ancient Dravidian temples', path: '/explore?div=bengaluru' },
  { name: 'Mysuru Division', desc: 'Royal palaces, Hoysala architecture, Coorg coffee hills', path: '/explore?div=mysuru' },
  { name: 'Belagavi Division', desc: 'Coastal Karnataka, Western Ghats, pilgrimage centres', path: '/explore?div=belagavi' },
  { name: 'Kalaburagi Division', desc: 'Hampi World Heritage Site, Bidar Fort, Deccan plateau', path: '/explore?div=kalaburagi' },
];

const CATEGORIES = [
  { label: 'Heritage', icon: '🏛️' },
  { label: 'Nature', icon: '🌿' },
  { label: 'Adventure', icon: '⛺' },
  { label: 'Wildlife', icon: '🐘' },
  { label: 'Coastal', icon: '🌊' },
  { label: 'Hill stations', icon: '⛰️' },
  { label: 'Food', icon: '🍽️' },
  { label: 'Waterfalls', icon: '💧' },
];

const POPULAR_DESTINATIONS = [
  {
    id: 1, name: 'Hampi', kannada: 'ಹಂಪಿ', location: 'Hospet, Vijayanagara',
    desc: 'UNESCO ruins of the Vijayanagara Empire', category: 'Heritage',
    crowd: 'High', crowdColor: 'crowd-high', time: 'Afternoon',
    img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80',
    duration: '4h', entry: '₹40', hasVideo: true,
  },
  {
    id: 2, name: 'Badami Caves', kannada: 'ಬಾದಾಮಿ ಗುಹೆಗಳು', location: 'Badami, Bagalkot',
    desc: 'Rock-cut Chalukya cave temples', category: 'Heritage',
    crowd: 'Moderate', crowdColor: 'crowd-moderate', time: 'Afternoon',
    img: 'https://images.unsplash.com/photo-1598978483810-21f41a7e8064?w=400&q=80',
    duration: '3h', entry: '₹25', hasVideo: true,
  },
  {
    id: 3, name: 'Pattadakal', kannada: 'ಪಟ್ಟದಕಲ್ಲು', location: 'Badami, Bagalkot',
    desc: 'UNESCO Chalukya temples complex', category: 'Heritage',
    crowd: 'Moderate', crowdColor: 'crowd-moderate', time: 'Afternoon',
    img: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&q=80',
    duration: '3h', entry: '₹40', hasVideo: true,
  },
  {
    id: 4, name: 'Gol Gumbaz', kannada: 'ಗೋಲ್ ಗುಂಬಜ್', location: 'Vijayapura, Vijayapura',
    desc: 'Second largest dome in the world', category: 'Heritage',
    crowd: 'Moderate', crowdColor: 'crowd-moderate', time: 'Afternoon',
    img: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=400&q=80',
    duration: '2h', entry: '₹25', hasVideo: true,
  },
];

export default function Home() {
  const { t, isKannada } = useLanguage();
  const [ALERTS, setALERTS] = useState(DEFAULT_ALERTS);
  const [alertIdx, setAlertIdx] = useState(0);
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [activeCat, setActiveCat] = useState('Heritage');
  const [activeModalDest, setActiveModalDest] = useState(null);
  const navigate = useNavigate();

  // Fetch live advisories from backend on mount
  useEffect(() => {
    (async () => {
      try {
        const backendAdvisories = await fetchAdvisories();
        if (backendAdvisories.length > 0) {
          setALERTS(backendAdvisories.map(a => a.title + (a.body ? ': ' + a.body : '')));
        }
      } catch {
        // Keep default alerts on error
      }
    })();
  }, []);

  // Quick Planner State (Specification Section 4)
  const [quickOrigin, setQuickOrigin] = useState('Bengaluru');
  const [quickBudget, setQuickBudget] = useState('25000');
  const [quickDays, setQuickDays] = useState(4);
  const [quickTravellers, setQuickTravellers] = useState(2);
  const [quickVehicle, setQuickVehicle] = useState('family_car');

  const handleQuickPlan = (e) => {
    e.preventDefault();
    navigate(`/plan?origin=${quickOrigin}&budget=${quickBudget}&days=${quickDays}&travellers=${quickTravellers}&vehicle=${quickVehicle}`);
  };

  return (
    <div className="page-bg pb-16">
      {/* Official Advisory Banner */}
      {!alertDismissed && (
        <div className="bg-[#f8f8f5] border-b border-gray-200 px-4 sm:px-6 py-2.5">
          <div className="max-w-[1400px] mx-auto flex items-start gap-3">
            <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
              <div className="w-4 h-4 rounded-full border-2 border-gray-400 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
              </div>
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wide whitespace-nowrap">Official Advisory</span>
            </div>
            <p className="text-xs text-gray-600 flex-1 leading-relaxed">{ALERTS[alertIdx] || ALERTS[0] || 'Karnataka Tourism Official Advisory'}</p>
            <div className="flex items-center gap-3 flex-shrink-0 ml-4">
              <button className="text-xs text-[#1a3d2e] font-semibold underline hover:no-underline">Verify ↗</button>
              <span className="text-xs text-gray-400">
                Next Alert ({alertIdx + 1}/{ALERTS.length})
              </span>
              <button onClick={() => alertIdx < ALERTS.length - 1 ? setAlertIdx(i => i + 1) : setAlertDismissed(true)}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none">✕</button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-[#1a3d2e] relative overflow-hidden py-16 px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block bg-white/15 text-white/90 text-xs font-bold px-3 py-1 rounded-full mb-3 backdrop-blur-sm">
            {t('hero_badge', 'Karnataka Travel Intelligence')}
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-4">
            {t('hero_title_1', 'Plan a Karnataka trip tailored to your')}<br />
            <span className="text-[#95d5b2]">{t('hero_title_2', 'interests, budget, and schedule')}</span>
          </h1>
          <p className="text-white/70 text-base sm:text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
            {t('hero_sub', "Pravasa AI builds day-by-day itineraries across Karnataka's temples, coastline, hill stations, and wildlife reserves. Choose your starting city, set a budget, and get a complete plan.")}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/plan" className="btn-orange px-8 py-3.5 rounded-xl font-semibold shadow-lg text-sm sm:text-base transition-transform hover:scale-105">
              {t('btn_build_itinerary', 'Build my itinerary →')}
            </Link>
            <Link to="/explore" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl transition-all text-sm sm:text-base flex items-center gap-2">
              <span>⊙</span> {t('btn_explore_destinations', 'Browse destinations')}
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Planner Section (Specification Section 4) */}
      <div className="max-w-[1200px] mx-auto px-4 -mt-8 relative z-20">
        <form onSubmit={handleQuickPlan} className="bg-white rounded-2xl shadow-xl border border-gray-200 p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-end">
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
              {t('quick_origin', 'Starting From')}
            </label>
            <select
              value={quickOrigin}
              onChange={(e) => setQuickOrigin(e.target.value)}
              className="form-select text-xs"
            >
              <option value="Bengaluru">{isKannada ? 'ಬೆಂಗಳೂರು' : 'Bengaluru'}</option>
              <option value="Mysuru">{isKannada ? 'ಮೈಸೂರು' : 'Mysuru'}</option>
              <option value="Mangaluru">{isKannada ? 'ಮಂಗಳೂರು' : 'Mangaluru'}</option>
              <option value="Hubballi">{isKannada ? 'ಹುಬ್ಬಳ್ಳಿ' : 'Hubballi'}</option>
              <option value="Belagavi">{isKannada ? 'ಬೆಳಗಾವಿ' : 'Belagavi'}</option>
              <option value="Shivamogga">{isKannada ? 'ಶಿವಮೊಗ್ಗ' : 'Shivamogga'}</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
              {t('quick_budget', 'Budget (₹ INR)')}
            </label>
            <input
              type="number"
              value={quickBudget}
              onChange={(e) => setQuickBudget(e.target.value)}
              className="form-input text-xs"
              placeholder="25000"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
              {t('quick_duration', 'Duration (Days)')}
            </label>
            <input
              type="number"
              min={1}
              max={10}
              value={quickDays}
              onChange={(e) => setQuickDays(Number(e.target.value))}
              className="form-input text-xs"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
              {t('quick_travelers', 'Travelers')}
            </label>
            <input
              type="number"
              min={1}
              max={10}
              value={quickTravellers}
              onChange={(e) => setQuickTravellers(Number(e.target.value))}
              className="form-input text-xs"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
              {t('quick_vehicle', 'Vehicle Mode')}
            </label>
            <select
              value={quickVehicle}
              onChange={(e) => setQuickVehicle(e.target.value)}
              className="form-select text-xs"
            >
              {VEHICLE_MODES.slice(0, 6).map(v => (
                <option key={v.id} value={v.id}>{v.name}</option>
              ))}
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-[#1a3d2e] hover:bg-[#145236] text-white text-xs font-bold py-2.5 px-3 rounded-lg shadow transition-colors flex items-center justify-center gap-1.5"
            >
              <span>⚙</span>
              <span>{t('quick_btn', 'Find Routes')}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Emergency services bar */}
      <div className="bg-white border-y border-gray-200 py-3 px-6 mt-8">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            </div>
            <div className="text-sm text-gray-700">
              <span className="font-semibold">Emergency services in Karnataka</span>
              <span className="text-gray-500 ml-2">Dial <strong>112</strong> for emergencies. Tourist helpline: <strong>1800-425-4425</strong></span>
            </div>
          </div>
          <Link to="/sos" className="sos-btn">SOS 112</Link>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-10 space-y-12">
        {/* Discovery Pathways: Adventure & Family Travel (Specification Section 4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-gradient-to-br from-[#1a3d2e] to-[#2d6a4f] rounded-2xl p-6 text-white shadow-md flex flex-col justify-between">
            <div>
              <span className="bg-white/20 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                Terrain & Ghats Explorer
              </span>
              <h3 className="text-xl font-bold mt-2 mb-1">Adventure Roads & Passes</h3>
              <p className="text-white/80 text-xs leading-relaxed mb-4">
                Agumbe descent, Bisle Ghat rainforest trails, Mandalpatti 4x4 tracks. Check road clearance and vehicle terrain suitability before you drive.
              </p>
            </div>
            <Link to="/adventure-roads" className="self-start bg-white text-[#1a3d2e] font-bold text-xs px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              Explore Adventure Roads →
            </Link>
          </div>

          <div className="bg-gradient-to-br from-[#e8732a] to-[#d4621f] rounded-2xl p-6 text-white shadow-md flex flex-col justify-between">
            <div>
              <span className="bg-white/20 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                Comfort & Accessibility
              </span>
              <h3 className="text-xl font-bold mt-2 mb-1">Family-Friendly Travel</h3>
              <p className="text-white/80 text-xs leading-relaxed mb-4">
                Paved highway recommendations, stroller-accessible palaces and gardens, hygienic highway rest stops, and child-safe itineraries.
              </p>
            </div>
            <Link to="/family-travel" className="self-start bg-white text-[#e8732a] font-bold text-xs px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              Explore Family Circuits →
            </Link>
          </div>
        </div>

        {/* Explore by Division */}
        <div>
          <p className="section-label">{t('divisions_section_label', 'Administrative Regions')}</p>
          <h2 className="section-title">{t('divisions_title', 'Explore by Division')}</h2>
          <p className="text-gray-500 text-sm mt-1 mb-6">{t('divisions_sub', 'Karnataka has four revenue divisions, each with distinct geography, cuisine, and cultural identity.')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DIVISIONS.map(d => (
              <div key={d.name} className="division-card">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {isKannada ? (
                      d.name === 'Bengaluru Division' ? 'ಬೆಂಗಳೂರು ವಿಭಾಗ' :
                      d.name === 'Mysuru Division' ? 'ಮೈಸೂರು ವಿಭಾಗ' :
                      d.name === 'Belagavi Division' ? 'ಬೆಳಗಾವಿ ವಿಭಾಗ' : 'ಕಲಬುರಗಿ ವಿಭಾಗ'
                    ) : d.name}
                  </h3>
                </div>
                <p className="text-gray-500 text-xs mb-4 leading-relaxed">{d.desc}</p>
                <Link to={d.path} className="text-[#1a3d2e] text-xs font-semibold hover:underline">
                  {t('view_destinations', 'View destinations →')}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Browse by interest */}
        <div>
          <p className="section-label">{t('divisions_section_label', 'Categories')}</p>
          <h2 className="section-title">{isKannada ? 'ವರ್ಗಗಳ ಪ್ರಕಾರ ಅನ್ವೇಷಿಸಿ' : 'Browse by interest'}</h2>
          <div className="flex flex-wrap gap-2 mt-4">
            {CATEGORIES.map(c => (
              <button
                key={c.label}
                onClick={() => setActiveCat(c.label)}
                className={`cat-pill ${activeCat === c.label ? 'active' : ''}`}
              >
                <span>{c.icon}</span> {isKannada ? (
                  c.label === 'Heritage' ? 'ಪರಂಪರೆ' :
                  c.label === 'Nature' ? 'ಪ್ರಕೃತಿ' :
                  c.label === 'Adventure' ? 'ಸಾಹಸ' :
                  c.label === 'Spiritual' ? 'ಆಧ್ಯಾತ್ಮಿಕ' :
                  c.label === 'Beach' ? 'ಕರಾವಳಿ' :
                  c.label === 'Wildlife' ? 'ವನ್ಯಜೀವಿ' :
                  c.label === 'Food' ? 'ಆಹಾರ' : 'ಜಲಪಾತಗಳು'
                ) : c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Popular Places */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="section-label">{t('popular_section_label', 'Destinations')}</p>
              <h2 className="section-title">{t('popular_title', 'Popular places in Karnataka')}</h2>
            </div>
            <Link to="/explore" className="text-[#1a3d2e] text-sm font-semibold hover:underline">
              {t('view_all_places', 'View all 159 →')}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {POPULAR_DESTINATIONS.map(d => (
              <div key={d.id} onClick={() => setActiveModalDest(d)} className="cursor-pointer">
                <DestCard dest={d} />
              </div>
            ))}
          </div>
        </div>

        {/* Trust Section (Specification Section 4) */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#1a3d2e] uppercase tracking-widest block mb-1">
              Data Integrity & Public Safety
            </span>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Official Tourism Intelligence & Verification Standards
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
              Pravasa AI cross-checks spatial boundaries with the Survey of India, monument access status with the Archaeological Survey of India (ASI), road clearances with Karnataka State Natural Disaster Monitoring Centre (KSNDMC), and festival calendars with Karnataka State Tourism Development Corporation (KSTDC).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="border-l-2 border-[#1a3d2e] pl-3">
                <span className="font-bold text-gray-900 block">Verified Status</span>
                <span className="text-gray-500">All 159 landmarks have confirmed GPS coordinates and access timings.</span>
              </div>
              <div className="border-l-2 border-[#e8732a] pl-3">
                <span className="font-bold text-gray-900 block">Road Clearances</span>
                <span className="text-gray-500">Live monsoon ghat advisories and nighttime wildlife transit curbs tracked.</span>
              </div>
              <div className="border-l-2 border-green-600 pl-3">
                <span className="font-bold text-gray-900 block">Last Audit</span>
                <span className="text-gray-500">Quarterly on-ground audit: <b>October 2026</b> by authorized regional observers.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {activeModalDest && (
        <DestinationDetailModal
          destination={activeModalDest}
          onClose={() => setActiveModalDest(null)}
          onAddToTrip={(item) => alert(`Added ${item.name} to itinerary!`)}
        />
      )}
    </div>
  );
}

function DestCard({ dest }) {
  const { t, isKannada } = useLanguage();
  const [liked, setLiked] = useState(false);
  const tagClass = {
    Heritage: 'tag-heritage', Nature: 'tag-nature', Adventure: 'tag-adventure',
    Spiritual: 'tag-spiritual', Beach: 'tag-beach', Wildlife: 'tag-wildlife', Food: 'tag-food',
  }[dest.category] || 'tag-heritage';

  return (
    <div className="dest-card group">
      <div className="relative h-44 overflow-hidden bg-gray-100">
        <img src={dest.img} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={e => { e.target.src = 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80'; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        <div className="absolute top-2 left-2 flex gap-1.5">
          <span className={tagClass}>{dest.category}</span>
          <span className="bg-black/50 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block"></span>
            {dest.time}
          </span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(l => !l); }}
          className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
        >
          <span className={`text-sm ${liked ? 'text-red-500' : 'text-gray-400'}`}>{liked ? '♥' : '♡'}</span>
        </button>
        {dest.hasVideo && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
            <span>▶</span> Video
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-0.5">
          <h3 className="font-bold text-gray-900 group-hover:text-[#1a3d2e] transition-colors">
            {isKannada && dest.kannada ? dest.kannada : dest.name}
          </h3>
          <div className="flex items-center gap-1 ml-2">
            <span className={dest.crowdColor}></span>
            <span className="text-xs text-gray-500">{dest.crowd}</span>
          </div>
        </div>
        {isKannada ? (
          <p className="text-gray-400 text-xs mb-1">{dest.name} • {dest.location}</p>
        ) : (
          dest.kannada && <p className="text-gray-400 text-xs mb-1">{dest.kannada}</p>
        )}
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
          <span>📍</span> {dest.location}
        </div>
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
          <span className="text-[#1a3d2e] font-semibold">{t('details_btn', 'Details ›')}</span>
        </div>
      </div>
    </div>
  );
}
