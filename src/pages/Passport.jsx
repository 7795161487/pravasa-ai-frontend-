import { useState } from 'react';

const HERITAGE_SITES = [
  {
    id: 1,
    name: 'Hampi',
    type: 'UNESCO World Heritage',
    district: 'Vijayanagara',
    emoji: '🏛️',
    description: 'Ruins of the Vijayanagara Empire — 1336–1646 CE',
    year: '1986',
    stamp: 'HAMPI',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    visited: true,
    visitDate: '15 Jan 2025',
    points: 500,
  },
  {
    id: 2,
    name: 'Pattadakal',
    type: 'UNESCO World Heritage',
    district: 'Bagalkot',
    emoji: '🕌',
    description: 'Chalukya dynasty temples — 7th–8th century CE',
    year: '1987',
    stamp: 'PATTADAKAL',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    visited: true,
    visitDate: '22 Feb 2025',
    points: 500,
  },
  {
    id: 3,
    name: 'Mysore Palace',
    type: 'State Heritage',
    district: 'Mysuru',
    emoji: '👑',
    description: 'Royal residence of the Wodeyar dynasty',
    year: '1912',
    stamp: 'MYSORE',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    visited: true,
    visitDate: '5 Mar 2025',
    points: 300,
  },
  {
    id: 4,
    name: 'Gol Gumbaz',
    type: 'ASI Monument',
    district: 'Bijapur',
    emoji: '🕌',
    description: 'Second largest dome in the world — 1626 CE',
    year: '1659',
    stamp: 'GOL GUMBAZ',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    visited: false,
    points: 400,
  },
  {
    id: 5,
    name: 'Belur & Halebidu',
    type: 'ASI Monument',
    district: 'Hassan',
    emoji: '🗿',
    description: 'Hoysala temples — intricate star-shaped architecture',
    year: '12th century',
    stamp: 'HOYSALA',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    visited: false,
    points: 450,
  },
  {
    id: 6,
    name: 'Shravanabelagola',
    type: 'Religious Heritage',
    district: 'Hassan',
    emoji: '🙏',
    description: 'Monolithic statue of Gommateshwara — 10th century CE',
    year: '983 CE',
    stamp: 'SHRAVANA',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/30',
    visited: false,
    points: 350,
  },
  {
    id: 7,
    name: 'Aihole',
    type: 'ASI Monument',
    district: 'Bagalkot',
    emoji: '🏯',
    description: 'Cradle of Indian architecture — Chalukya temples',
    year: '450–750 CE',
    stamp: 'AIHOLE',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    visited: false,
    points: 350,
  },
  {
    id: 8,
    name: 'Murudeshwar',
    type: 'Religious Heritage',
    district: 'Uttara Kannada',
    emoji: '🛕',
    description: 'World\'s second-tallest Shiva statue on Arabian Sea coast',
    year: 'Modern',
    stamp: 'MURUDESHWAR',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    visited: false,
    points: 250,
  },
];

const BADGES = [
  { id: 1, name: 'Heritage Pilgrim', icon: '🏅', desc: 'Visited 3+ heritage sites', earned: true },
  { id: 2, name: 'UNESCO Explorer', icon: '🌍', desc: 'Visited all UNESCO sites in Karnataka', earned: false },
  { id: 3, name: 'Royal Trail', icon: '👑', desc: 'Completed the Mysuru Royal Circuit', earned: false },
  { id: 4, name: 'Chalukya Trail', icon: '🕌', desc: 'Visited Pattadakal, Aihole & Badami', earned: false },
  { id: 5, name: 'Hoysala Heart', icon: '🗿', desc: 'Completed the Hoysala Heritage Trail', earned: false },
];

export default function Passport() {
  const [visited, setVisited] = useState(HERITAGE_SITES.filter(s => s.visited).map(s => s.id));
  const [activeTab, setActiveTab] = useState('stamps');

  const totalPoints = HERITAGE_SITES.filter(s => visited.includes(s.id)).reduce((acc, s) => acc + s.points, 0);
  const progress = (visited.length / HERITAGE_SITES.length) * 100;

  const toggleVisit = (id) => {
    setVisited(v => v.includes(id) ? v.filter(x => x !== id) : [...v, id]);
  };

  return (
    <div className="min-h-screen bg-[#0a0f0a] pb-16">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-white/5 py-16 px-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-6xl mx-auto">
          <span className="tag mb-4 inline-block">🏛️ Heritage Passport</span>
          <h1 className="text-5xl font-black text-white mb-4">
            Your <span className="gradient-text-gold">Heritage Journey</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl">
            Collect digital stamps at UNESCO, ASI, and state heritage sites across Karnataka.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-10">
        {/* Passport Card */}
        <div className="glass-green rounded-3xl p-6 border border-green-500/20 mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/5 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Passport icon */}
            <div className="w-24 h-32 glass rounded-2xl border border-yellow-500/30 flex flex-col items-center justify-center gap-2 flex-shrink-0">
              <span className="text-3xl">📔</span>
              <div className="text-yellow-400 font-black text-xs text-center">PRAVASA<br/>PASSPORT</div>
            </div>

            {/* Stats */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Sites Visited', value: visited.length, suffix: `/${HERITAGE_SITES.length}` },
                { label: 'Heritage Points', value: totalPoints.toLocaleString(), suffix: 'pts' },
                { label: 'UNESCO Sites', value: visited.filter(id => HERITAGE_SITES.find(s => s.id === id)?.type === 'UNESCO World Heritage').length, suffix: '/2' },
                { label: 'Badges Earned', value: BADGES.filter(b => b.earned).length, suffix: `/${BADGES.length}` },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-black gradient-text-gold">{s.value}<span className="text-white/40 text-sm">{s.suffix}</span></div>
                  <div className="text-white/50 text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div className="mt-6">
            <div className="flex justify-between text-xs text-white/50 mb-2">
              <span>Heritage Completion</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-2.5">
              <div className="progress-bar h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {['stamps', 'badges', 'leaderboard'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${
                activeTab === tab
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'glass text-white/50 border border-white/5 hover:text-white/80'
              }`}
            >
              {tab === 'stamps' ? '📍 Stamps' : tab === 'badges' ? '🏅 Badges' : '🏆 Leaderboard'}
            </button>
          ))}
        </div>

        {/* Stamps Tab */}
        {activeTab === 'stamps' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {HERITAGE_SITES.map(site => {
              const isVisited = visited.includes(site.id);
              return (
                <div
                  key={site.id}
                  onClick={() => toggleVisit(site.id)}
                  className={`glass rounded-2xl p-5 border cursor-pointer card-hover transition-all ${
                    isVisited ? `${site.bg} ${site.border}` : 'border-white/5 opacity-60 hover:opacity-80'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{site.emoji}</span>
                    {isVisited && <span className="text-green-400 text-xs font-bold">✓ Visited</span>}
                  </div>

                  {/* Stamp effect */}
                  <div className={`inline-block mb-3 ${site.color}`}>
                    <div className={`stamp text-xs ${site.color}`} style={{ borderColor: 'currentColor' }}>
                      {site.stamp}
                    </div>
                  </div>

                  <h3 className="text-white font-bold text-sm mb-1">{site.name}</h3>
                  <p className="text-white/40 text-xs mb-2">{site.district}</p>
                  <p className="text-white/30 text-xs mb-3">{site.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="tag text-xs">{site.type}</span>
                    <span className={`text-xs font-bold ${site.color}`}>+{site.points}pts</span>
                  </div>

                  {isVisited && site.visitDate && (
                    <p className="text-white/25 text-xs mt-2">Visited: {site.visitDate}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Badges Tab */}
        {activeTab === 'badges' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BADGES.map(b => (
              <div key={b.id} className={`glass rounded-2xl p-6 border card-hover ${b.earned ? 'glass-green border-green-500/20' : 'border-white/5 opacity-50'}`}>
                <div className="text-5xl mb-4 text-center">{b.icon}</div>
                <h3 className={`font-bold text-center mb-2 ${b.earned ? 'text-white' : 'text-white/50'}`}>{b.name}</h3>
                <p className="text-white/40 text-sm text-center">{b.desc}</p>
                {b.earned && (
                  <div className="mt-4 text-center">
                    <span className="tag">🏅 Earned</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="glass rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-5 border-b border-white/5">
              <h3 className="text-white font-bold">Top Heritage Explorers</h3>
            </div>
            {[
              { rank: 1, name: 'Priya K.', city: 'Bangalore', points: 3200, sites: 7, avatar: '👩' },
              { rank: 2, name: 'Ravi M.', city: 'Mysuru', points: 2850, sites: 6, avatar: '👨' },
              { rank: 3, name: 'You', city: 'Bangalore', points: totalPoints, sites: visited.length, avatar: '🧑', isYou: true },
              { rank: 4, name: 'Deepa S.', city: 'Mangaluru', points: 1950, sites: 4, avatar: '👩' },
              { rank: 5, name: 'Arjun T.', city: 'Hubli', points: 1700, sites: 4, avatar: '👨' },
            ].map(u => (
              <div key={u.rank} className={`flex items-center gap-4 p-4 border-b border-white/5 ${u.isYou ? 'glass-green' : 'hover:bg-white/3'} transition-colors`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
                  u.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                  u.rank === 2 ? 'bg-gray-500/20 text-gray-300' :
                  u.rank === 3 && u.isYou ? 'bg-green-500/20 text-green-400' :
                  'bg-white/5 text-white/40'
                }`}>
                  {u.rank === 1 ? '🥇' : u.rank === 2 ? '🥈' : u.isYou ? '→' : u.rank}
                </div>
                <span className="text-2xl">{u.avatar}</span>
                <div className="flex-1">
                  <p className={`font-semibold text-sm ${u.isYou ? 'text-green-300' : 'text-white'}`}>
                    {u.name} {u.isYou && <span className="tag ml-2 text-xs">You</span>}
                  </p>
                  <p className="text-white/40 text-xs">{u.city} · {u.sites} sites visited</p>
                </div>
                <div className="text-right">
                  <div className={`font-black text-lg ${u.isYou ? 'gradient-text' : 'text-white'}`}>{u.points.toLocaleString()}</div>
                  <div className="text-white/30 text-xs">pts</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
