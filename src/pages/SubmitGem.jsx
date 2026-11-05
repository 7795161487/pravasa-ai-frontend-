import { useState } from 'react';

const DISTRICTS = [
  'Bangalore Urban', 'Bangalore Rural', 'Mysuru', 'Kodagu', 'Hassan', 'Chikmagalur',
  'Dakshina Kannada', 'Udupi', 'Uttara Kannada', 'Shivamogga', 'Tumkur', 'Mandya',
  'Ramanagara', 'Chamarajanagara', 'Ballari', 'Vijayanagara', 'Raichur', 'Koppal',
  'Gadag', 'Dharwad', 'Belagavi', 'Bagalkot', 'Bijapur (Vijayapura)', 'Bidar',
  'Kalaburagi (Gulbarga)', 'Yadgir', 'Haveri', 'Davangere', 'Chitradurga', 'Tumkur',
];

const CATEGORIES = ['Nature', 'Heritage', 'Adventure', 'Beach', 'Wildlife', 'Spiritual', 'Food & Cuisine', 'Art & Culture'];

const RECENT_GEMS = [
  {
    id: 1,
    name: 'Devarayanadurga Fort',
    district: 'Tumkur',
    cat: 'Heritage',
    emoji: '🏯',
    submittedBy: 'Ravi M.',
    desc: 'An ancient hilltop fort with panoramic views. Much less crowded than Nandi Hills.',
    upvotes: 24,
    verified: true,
  },
  {
    id: 2,
    name: 'Bisle Ghat Viewpoint',
    district: 'Hassan',
    cat: 'Nature',
    emoji: '🌲',
    submittedBy: 'Priya K.',
    desc: 'Misty forest viewpoint at 1600m. Best visited Oct–Jan for cloud sea views.',
    upvotes: 38,
    verified: true,
  },
  {
    id: 3,
    name: 'Kalhatti Falls Trail',
    district: 'Nilgiris (border)',
    cat: 'Adventure',
    emoji: '💧',
    submittedBy: 'Arjun T.',
    desc: 'Hidden waterfall trail near Ooty border. 8km trek through shola forest.',
    upvotes: 15,
    verified: false,
  },
  {
    id: 4,
    name: 'Hirekolale Lake Sunrise',
    district: 'Chikmagalur',
    cat: 'Nature',
    emoji: '🌅',
    submittedBy: 'Deepa S.',
    desc: 'Quiet sunrise spot by the lake near Chikmagalur town. Zero crowds before 7am.',
    upvotes: 29,
    verified: true,
  },
];

export default function SubmitGem() {
  const [form, setForm] = useState({
    name: '',
    district: '',
    category: '',
    description: '',
    bestTime: '',
    tips: '',
    howToReach: '',
    ecoScore: 3,
    contactAllowed: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [upvoted, setUpvoted] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.district || !form.category || !form.description) return;
    setSubmitted(true);
  };

  const toggleUpvote = (id) => {
    setUpvoted(u => ({ ...u, [id]: !u[id] }));
  };

  const ECO_LABELS = ['', 'Very Crowded', 'Somewhat Crowded', 'Moderate', 'Off-beat', 'Truly Hidden'];

  return (
    <div className="min-h-screen bg-[#0a0f0a] pb-16">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-white/5 py-16 px-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/8 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-6xl mx-auto">
          <span className="tag mb-4 inline-block">💎 Submit a Gem</span>
          <h1 className="text-5xl font-black text-white mb-4">
            Share a <span className="gradient-text">hidden gem</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl">
            Know an off-beat place in Karnataka that deserves more love? Share it with the community!
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="glass-green rounded-3xl p-10 border border-green-500/20 text-center">
                <div className="text-7xl mb-6 float">💎</div>
                <h2 className="text-3xl font-black text-white mb-3">Gem Submitted!</h2>
                <p className="text-white/60 mb-6">
                  Thank you for sharing <span className="text-green-400 font-bold">{form.name}</span>!<br />
                  Our team will review and verify it within 48 hours.
                </p>
                <div className="glass rounded-xl p-4 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-white/40">District:</span> <span className="text-white">{form.district}</span></div>
                    <div><span className="text-white/40">Category:</span> <span className="text-white">{form.category}</span></div>
                    <div><span className="text-white/40">Eco Score:</span> <span className="text-green-400">{ECO_LABELS[form.ecoScore]}</span></div>
                  </div>
                </div>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name:'',district:'',category:'',description:'',bestTime:'',tips:'',howToReach:'',ecoScore:3,contactAllowed:false }); }}
                  className="btn-primary px-8 py-4 rounded-xl font-bold"
                >
                  Submit Another Gem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 border border-white/5">
                <h2 className="text-xl font-bold text-white mb-6">Tell us about this place</h2>

                {/* Name */}
                <div className="mb-5">
                  <label className="text-white/60 text-sm mb-2 block">Place Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. Ettina Bhuja Peak"
                    className="w-full input-dark rounded-xl px-4 py-3.5 text-sm"
                    required
                  />
                </div>

                {/* District + Category */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">District *</label>
                    <select
                      value={form.district}
                      onChange={e => setForm(f => ({ ...f, district: e.target.value }))}
                      className="w-full input-dark rounded-xl px-4 py-3.5 text-sm"
                      required
                    >
                      <option value="">Select district</option>
                      {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Category *</label>
                    <select
                      value={form.category}
                      onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                      className="w-full input-dark rounded-xl px-4 py-3.5 text-sm"
                      required
                    >
                      <option value="">Select category</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-5">
                  <label className="text-white/60 text-sm mb-2 block">Description * <span className="text-white/30 text-xs">(What makes this place special?)</span></label>
                  <textarea
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    placeholder="Describe the place, what makes it unique, the experience you had..."
                    rows={4}
                    className="w-full input-dark rounded-xl px-4 py-3.5 text-sm resize-none"
                    required
                  />
                </div>

                {/* Best Time */}
                <div className="mb-5">
                  <label className="text-white/60 text-sm mb-2 block">Best Time to Visit</label>
                  <input
                    type="text"
                    value={form.bestTime}
                    onChange={e => setForm(f => ({ ...f, bestTime: e.target.value }))}
                    placeholder="e.g. October to February, early morning"
                    className="w-full input-dark rounded-xl px-4 py-3.5 text-sm"
                  />
                </div>

                {/* How to reach */}
                <div className="mb-5">
                  <label className="text-white/60 text-sm mb-2 block">How to Reach</label>
                  <textarea
                    value={form.howToReach}
                    onChange={e => setForm(f => ({ ...f, howToReach: e.target.value }))}
                    placeholder="Directions, nearest town, transport options..."
                    rows={2}
                    className="w-full input-dark rounded-xl px-4 py-3.5 text-sm resize-none"
                  />
                </div>

                {/* Insider Tips */}
                <div className="mb-5">
                  <label className="text-white/60 text-sm mb-2 block">Insider Tips 💡</label>
                  <textarea
                    value={form.tips}
                    onChange={e => setForm(f => ({ ...f, tips: e.target.value }))}
                    placeholder="Things to know before going, what to carry, what to avoid..."
                    rows={2}
                    className="w-full input-dark rounded-xl px-4 py-3.5 text-sm resize-none"
                  />
                </div>

                {/* Eco/Crowd Score */}
                <div className="mb-6">
                  <label className="text-white/60 text-sm mb-3 flex justify-between">
                    <span>Crowd Level</span>
                    <span className="text-green-400 font-medium">{ECO_LABELS[form.ecoScore]}</span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={form.ecoScore}
                    onChange={e => setForm(f => ({ ...f, ecoScore: +e.target.value }))}
                    className="w-full accent-green-500"
                  />
                  <div className="flex justify-between text-white/25 text-xs mt-1">
                    <span>Very Crowded</span>
                    <span>Truly Hidden</span>
                  </div>
                </div>

                {/* Contact toggle */}
                <div className="mb-8 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, contactAllowed: !f.contactAllowed }))}
                    className={`w-12 h-6 rounded-full transition-all relative ${form.contactAllowed ? 'bg-green-500' : 'bg-white/10'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${form.contactAllowed ? 'left-7' : 'left-1'}`}></div>
                  </button>
                  <span className="text-white/60 text-sm">Allow community to contact me for more details</span>
                </div>

                <button type="submit" className="btn-primary w-full py-4 rounded-xl font-bold text-base">
                  💎 Submit Hidden Gem
                </button>
              </form>
            )}
          </div>

          {/* Recent Gems sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <h3 className="text-white font-bold mb-5">✨ Recent Community Gems</h3>
              <div className="space-y-4">
                {RECENT_GEMS.map(gem => (
                  <div key={gem.id} className="glass rounded-xl p-5 border border-white/5 card-hover">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl">{gem.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <h4 className="text-white font-semibold text-sm">{gem.name}</h4>
                          {gem.verified && <span className="text-green-400 text-xs">✓ Verified</span>}
                        </div>
                        <p className="text-white/40 text-xs">{gem.district} · {gem.cat}</p>
                      </div>
                    </div>
                    <p className="text-white/60 text-xs mb-4 leading-relaxed">{gem.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/30 text-xs">by {gem.submittedBy}</span>
                      <button
                        onClick={() => toggleUpvote(gem.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          upvoted[gem.id]
                            ? 'glass-green text-green-400 border border-green-500/30'
                            : 'glass text-white/40 border border-white/5'
                        }`}
                      >
                        👍 {gem.upvotes + (upvoted[gem.id] ? 1 : 0)}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="glass-green rounded-xl p-5 border border-green-500/20 mt-5">
                <h4 className="text-green-400 font-bold mb-4 text-sm">Community Stats</h4>
                <div className="space-y-3">
                  {[
                    { label: 'Gems Submitted', value: '1,284' },
                    { label: 'Verified Gems', value: '856' },
                    { label: 'Districts Covered', value: '30/30' },
                    { label: 'Active Contributors', value: '3,200+' },
                  ].map(s => (
                    <div key={s.label} className="flex justify-between text-sm">
                      <span className="text-white/50">{s.label}</span>
                      <span className="text-white font-bold">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
