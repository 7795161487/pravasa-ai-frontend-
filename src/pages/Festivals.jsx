import { useState } from 'react';
import { Link } from 'react-router-dom';

const FESTIVALS = [
  {
    id: 1,
    name: 'Mysuru Dasara (ನವರಾತ್ರಿ & ಜಂಬೂ ಸವಾರಿ)',
    nameEn: 'Mysuru Dasara',
    type: 'CULTURAL & HERITAGE',
    dates: 'September – October',
    location: 'Mysuru Palace & Bannimantap Grounds, Mysuru',
    desc: "Karnataka's state festival celebrating the victory of Goddess Chamundeshwari over Mahishasura. Features the world-famous Jamboo Savari elephant procession and illumination of Mysuru Palace with 97,000 bulbs.",
    highlights: ['Jamboo Savari Procession', 'Palace Illumination', 'Torchlight Parade', 'Dasara Exhibition'],
    accessibility: 'Designated seating zones for senior citizens and persons with disabilities at Bannimantap.',
  },
  {
    id: 2,
    name: 'Hampi Utsav (ಹಂಪಿ ಉತ್ಸವ)',
    nameEn: 'Hampi Utsav',
    type: 'HERITAGE & ARTS',
    dates: 'January / November',
    location: 'Hampi World Heritage Ruins & Gayatri Peetha, Vijayanagara',
    desc: 'Mega cultural extravaganza organized amidst the 14th-century Vijayanagara ruins, showcasing classical music, folk dances, Janapada Kalavahini, puppet shows, and sound-and-light projections on monolithic monuments.',
    highlights: ['Light & Sound Show on Stone Chariot', 'Classical Karnataka Sangeetha', 'Rock Climbing Competitions'],
    accessibility: 'Open-air grounds. Battery buggies operate between monument clusters.',
  },
  {
    id: 3,
    name: 'Kambala Traditional Buffalo Races (ಕಂಬಳ)',
    nameEn: 'Kambala',
    type: 'TRADITIONAL SPORTS',
    dates: 'November – March (Seasonal)',
    location: 'Moodabidri, Aladangadi, Aikala & Mangaluru, Dakshina Kannada & Udupi',
    desc: 'Ancient coastal Karnataka agricultural folk sport where pairs of swift buffaloes dash through slushy paddy tracks guided by traditional jockeys. Celebrated for over a thousand years.',
    highlights: ['Traditional Kare Jockey Races', 'Folk Festivities', 'Coastal Tuluva Cultural Displays'],
    accessibility: 'Spectator galleries along paddy track. Dry elevated viewing decks available.',
  },
  {
    id: 4,
    name: 'Karaga Shaktyotsava',
    nameEn: 'Karaga Shaktyotsava',
    type: 'RELIGIOUS & CULTURAL',
    dates: 'March – April (Chaitra month)',
    location: 'Dharmaraja Temple, Bengaluru',
    desc: 'Ancient Dravidian festival where the Thigala community priest carries a floral pyramid on his head through the streets of old Bengaluru. One of the oldest urban festivals in India.',
    highlights: ['Floral Pyramid Procession', 'Thigala Community Rituals', 'Old City Heritage Walk'],
    accessibility: 'Street procession — wheelchair access limited on narrow lanes.',
  },
  {
    id: 5,
    name: 'Pattadakal Dance Festival',
    nameEn: 'Pattadakal Dance Festival',
    type: 'HERITAGE & ARTS',
    dates: 'January – February',
    location: 'Pattadakal World Heritage Site, Bagalkot',
    desc: 'Classical dance performances staged against the backdrop of UNESCO World Heritage Chalukya temples. Features Bharatanatyam, Kuchipudi, and Odissi by national artists.',
    highlights: ['Classical Dance Performances', 'UNESCO Heritage Backdrop', 'Handicraft Exhibition'],
    accessibility: 'Open-air stone amphitheatre. Limited mobility access available.',
  },
  {
    id: 6,
    name: 'Ugadi (ಯುಗಾದಿ)',
    nameEn: 'Ugadi - Karnataka New Year',
    type: 'RELIGIOUS & CULTURAL',
    dates: 'March – April',
    location: 'Statewide across Karnataka',
    desc: 'Karnataka New Year celebrated with Bevu-Bella (neem & jaggery), Pachadi preparation, and special Panchangashravanam (almanac reading) at temples. Traditional rangoli and home decorations.',
    highlights: ['Panchangashravanam', 'Bevu-Bella Tradition', 'Ugadi Pachadi', 'Cultural Programmes'],
    accessibility: 'Community events at all major temples. Generally accessible.',
  },
];

const GUIDES = [
  { id: 1, name: 'Suresh Kumar', speciality: 'Hampi & Bagalkot Heritage', lang: 'English, Kannada, Hindi', exp: '12 years', certified: true },
  { id: 2, name: 'Lakshmi Devi', speciality: 'Mysuru Royal Circuit', lang: 'English, Kannada, Tamil', exp: '8 years', certified: true },
  { id: 3, name: 'Ravi Shankar', speciality: 'Coastal Karnataka & Udupi', lang: 'English, Kannada, Tulu', exp: '10 years', certified: true },
  { id: 4, name: 'Prabhakara Gowda', speciality: 'Coorg & Western Ghats', lang: 'English, Kannada', exp: '6 years', certified: true },
];

export default function Festivals() {
  const [activeTab, setActiveTab] = useState('festivals');
  const [search, setSearch] = useState('');

  const filtered = FESTIVALS.filter(f =>
    !search || f.nameEn.toLowerCase().includes(search.toLowerCase()) || f.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-bg">
      {/* Header */}
      <div className="bg-[#1a3d2e]/5 border-b border-gray-200 px-6 py-4">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-xl font-bold text-gray-900">Festivals & Guides</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Karnataka hosts 200+ cultural festivals. These listings include only verified events by state tourism authorities and
            certified local guides authorized by the Department of Tourism.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
        {/* Tabs + Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
          <div className="flex gap-2">
            <button onClick={() => setActiveTab('festivals')} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'festivals' ? 'bg-[#1a3d2e] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-[#1a3d2e]'}`}>
              <span>🎭</span> Cultural Festivals ({FESTIVALS.length})
            </button>
            <button onClick={() => setActiveTab('guides')} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'guides' ? 'bg-[#1a3d2e] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-[#1a3d2e]'}`}>
              <span>👤</span> Verified Local Guides ({GUIDES.length})
            </button>
          </div>
          <div className="sm:ml-auto flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" /></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search festival by name or district..." className="text-sm text-gray-600 placeholder-gray-400 outline-none w-52" />
          </div>
        </div>

        {/* Festival Cards */}
        {activeTab === 'festivals' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(f => (
              <div key={f.id} className="festival-card">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2.5 py-1 rounded">{f.type}</span>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span>🗓</span> {f.dates}
                  </div>
                </div>

                <h3 className="font-bold text-gray-900 text-base mb-1 leading-snug">{f.name}</h3>
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                  <span>📍</span> {f.location}
                </div>
                <p className="text-gray-600 text-xs leading-relaxed mb-4">{f.desc}</p>

                {/* Key highlights */}
                <div className="mb-4">
                  <p className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">KEY HIGHLIGHTS:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {f.highlights.map(h => (
                      <span key={h} className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded">{h}</span>
                    ))}
                  </div>
                </div>

                {/* Accessibility */}
                {f.accessibility && (
                  <div className="border-t border-gray-100 pt-3 mt-3">
                    <p className="text-xs text-gray-500"><strong>Accessibility:</strong> {f.accessibility}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <Link to="/plan" className="flex-1 btn-green py-2 rounded-lg text-xs text-center">+ Plan Itinerary</Link>
                  <button className="flex-1 btn-outline py-2 rounded-lg text-xs">Official Details ↗</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Guides Tab */}
        {activeTab === 'guides' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {GUIDES.map(g => (
              <div key={g.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#2d6a4f] hover:shadow-md transition-all">
                <div className="w-14 h-14 rounded-full bg-[#1a3d2e]/10 flex items-center justify-center text-2xl mb-3 mx-auto">👤</div>
                <h3 className="font-bold text-gray-900 text-center mb-1">{g.name}</h3>
                {g.certified && <div className="text-center mb-3"><span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded">✓ Certified Guide</span></div>}
                <div className="space-y-1 text-xs text-gray-500">
                  <p><strong>Speciality:</strong> {g.speciality}</p>
                  <p><strong>Languages:</strong> {g.lang}</p>
                  <p><strong>Experience:</strong> {g.exp}</p>
                </div>
                <button className="w-full mt-4 btn-green py-2 rounded-lg text-xs">Contact Guide</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

