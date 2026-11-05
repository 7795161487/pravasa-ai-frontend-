import { useState } from 'react';
import { Link } from 'react-router-dom';

const GEMS = [
  { id:1, name:'Aihole', kannada:'ಐಹೊಳೆ', location:'Hungund, Bagalkot', desc:'Cradle of Indian temple architecture', cat:'Heritage', crowd:'Low', crowdCls:'crowd-low', time:'Afternoon', img:'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&q=80', duration:'3h', entry:'₹25', video:true },
  { id:2, name:'Bidar Fort', kannada:'ಬಿದರ್ ಕೋಟೆ', location:'Bidar, Bidar', desc:'Bahmani fort with Persian architecture', cat:'Heritage', crowd:'Low', crowdCls:'crowd-low', time:'Afternoon', img:'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=400&q=80', duration:'3h', entry:'₹25', video:true },
  { id:3, name:'Lakkundi', kannada:'ಲಕ್ಕುಂಡಿ', location:'Gadag, Gadag', desc:'Ancient step wells and Chalukya temples', cat:'Heritage', crowd:'Low', crowdCls:'crowd-low', time:'Afternoon', img:'https://images.unsplash.com/photo-1598978483810-21f41a7e8064?w=400&q=80', duration:'2h', entry:'Free', video:true },
  { id:4, name:'Somanathapura', kannada:'ಸೋಮನಾಥಪುರ', location:'T. Narasipura, Mysuru', desc:'Star-shaped Hoysala masterpiece', cat:'Heritage', crowd:'Low', crowdCls:'crowd-low', time:'Afternoon', img:'https://images.unsplash.com/photo-1546961342-ea5f60b193cb?w=400&q=80', duration:'2h', entry:'₹25', video:true },
  { id:5, name:'Ettina Bhuja Peak', kannada:'ಎತ್ತಿನಬುಜ', location:'Mudigere, Chikmagalur', desc:'Rugged summit trek through shola grasslands', cat:'Adventure', crowd:'Low', crowdCls:'crowd-low', time:'Early Morning', img:'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=80', duration:'Full Day', entry:'Free', video:false },
  { id:6, name:'Nrityagram', kannada:'ನೃತ್ಯಗ್ರಾಮ', location:'Hesaraghatta, Bangalore Rural', desc:'Residential dance village for classical Indian dance', cat:'Heritage', crowd:'Low', crowdCls:'crowd-low', time:'Evening', img:'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80', duration:'2h', entry:'₹200', video:false },
  { id:7, name:'Bisle Ghat', kannada:'ಬಿಸ್ಲೆ ಘಾಟ್', location:'Sakleshpur, Hassan', desc:'Cloud sea viewpoint at 1600m in dense rainforest', cat:'Nature', crowd:'Low', crowdCls:'crowd-low', time:'Early Morning', img:'https://images.unsplash.com/photo-1562679299-a6f9a3a5de9f?w=400&q=80', duration:'Half Day', entry:'Free', video:false },
  { id:8, name:'Yana Rock Caves', kannada:'ಯಾಣ', location:'Sirsi, Uttara Kannada', desc:'Unique black limestone rock formations in forest', cat:'Adventure', crowd:'Low', crowdCls:'crowd-low', time:'Morning', img:'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=80', duration:'Half Day', entry:'₹20', video:true },
];

const CATEGORIES = ['All Types','Heritage','Nature','Adventure','Spiritual','Beach','Food','Wildlife','Hills','Waterfalls','Family'];

function GemCard({ dest }) {
  const [liked, setLiked] = useState(false);
  const tagClass = { Heritage:'tag-heritage', Nature:'tag-nature', Adventure:'tag-adventure', Spiritual:'tag-spiritual' }[dest.cat] || 'tag-heritage';
  return (
    <div className="dest-card group">
      <div className="relative h-44 overflow-hidden bg-gray-100">
        <img src={dest.img} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onError={e => { e.target.src = 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80'; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        <div className="absolute top-2 left-2 flex gap-1.5">
          <span className={tagClass}>{dest.cat}</span>
          <span className="bg-black/50 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block"></span> {dest.time}
          </span>
        </div>
        <button onClick={() => setLiked(l => !l)} className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
          <span className={`text-sm ${liked ? 'text-red-500' : 'text-gray-400'}`}>{liked ? '♥' : '♡'}</span>
        </button>
        <div className="absolute bottom-2 left-2 flex gap-1.5">
          <span className="bg-green-700/80 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1"><span>💎</span> Hidden Gem</span>
          {dest.video && <span className="bg-black/60 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1"><span>▶</span> Video</span>}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-0.5">
          <h3 className="font-bold text-gray-900">{dest.name}</h3>
          <div className="flex items-center gap-1 ml-2">
            <span className={dest.crowdCls}></span>
            <span className="text-xs text-gray-500">{dest.crowd}</span>
          </div>
        </div>
        {dest.kannada && <p className="text-gray-400 text-xs mb-1">{dest.kannada}</p>}
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-2"><span>📍</span> {dest.location}</div>
        <p className="text-gray-600 text-xs mb-3 leading-relaxed">{dest.desc}</p>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          {dest.duration && <span>⏱ {dest.duration}</span>}
          {dest.entry && <span>🎟 {dest.entry}</span>}
        </div>
      </div>
    </div>
  );
}

export default function HiddenGems() {
  const [activeCat, setActiveCat] = useState('All Types');
  const [search, setSearch] = useState('');

  const filtered = GEMS.filter(g => {
    const matchCat = activeCat === 'All Types' || g.cat === activeCat;
    const matchSearch = !search || g.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="page-bg">
      <div className="bg-[#1a3d2e]/5 border-b border-gray-200 px-6 py-4">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-xl font-bold text-gray-900">Hidden Gems</h1>
          <p className="text-gray-500 text-sm">Off-beat destinations with low tourist footfall across Karnataka</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
        {/* Info banner */}
        <div className="info-banner mb-6">
          <span className="text-blue-500 mt-0.5">ℹ</span>
          <span>These destinations receive lower tourist traffic and may have limited road connectivity, mobile reception, or commercial amenities. Plan fuel, food, and daytime arrival accordingly.</span>
        </div>

        {/* Search + Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 flex-1">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" /></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, district, or taluk..." className="text-sm text-gray-700 placeholder-gray-400 outline-none flex-1" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setActiveCat(c)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${activeCat === c ? 'bg-[#1a3d2e] text-white border-[#1a3d2e]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#1a3d2e]'}`}>{c}</button>
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4">Showing <strong>{filtered.length}</strong> verified offbeat destinations</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map(g => <GemCard key={g.id} dest={g} />)}
        </div>
      </div>
    </div>
  );
}

