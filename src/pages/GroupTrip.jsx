import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

const SAMPLE_MEMBERS = [
  { id: 1, name: 'Priya K.', avatar: '👩', role: 'organizer', city: 'Bangalore', online: true },
  { id: 2, name: 'Ravi M.', avatar: '👨', role: 'member', city: 'Mysuru', online: true },
  { id: 3, name: 'Deepa S.', avatar: '👩', role: 'member', city: 'Mangaluru', online: false },
  { id: 4, name: 'You', avatar: '🧑', role: 'member', city: 'Bangalore', online: true, isYou: true },
];

const INITIAL_MESSAGES = [
  { id: 1, user: 'Priya K.', avatar: '👩', text: 'Hey everyone! Super excited for the Coorg trip 🌿', time: '10:02 AM', isYou: false },
  { id: 2, user: 'Ravi M.', avatar: '👨', text: 'Same! Should we plan the coffee estate visit on Day 1 or Day 2?', time: '10:05 AM', isYou: false },
  { id: 3, user: 'Priya K.', avatar: '👩', text: 'Day 1 morning makes more sense — fresh start ☕', time: '10:07 AM', isYou: false },
];

const ITINERARY_ITEMS = [
  { id: 1, day: 'Day 1', activity: 'Coffee Estate Tour', time: '09:00 AM', votes: 4, voted: true },
  { id: 2, day: 'Day 1', activity: 'Abbey Falls Trek', time: '03:00 PM', votes: 3, voted: false },
  { id: 3, day: 'Day 2', activity: 'Brahmagiri Peak Sunrise', time: '05:30 AM', votes: 4, voted: true },
  { id: 4, day: 'Day 2', activity: 'Talacauvery Visit', time: '10:00 AM', votes: 2, voted: false },
  { id: 5, day: 'Day 3', activity: 'Namdroling Golden Temple', time: '11:00 AM', votes: 3, voted: false },
];

const EXPENSES = [
  { id: 1, desc: 'Hotel (3 nights)', amount: 12000, paidBy: 'Priya K.', split: 4 },
  { id: 2, desc: 'Coorg bus tickets', amount: 2800, paidBy: 'Ravi M.', split: 4 },
  { id: 3, desc: 'Coffee estate entry', amount: 1200, paidBy: 'You', split: 4 },
];

export default function GroupTrip() {
  const { roomId } = useParams();
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [itinerary, setItinerary] = useState(ITINERARY_ITEMS);
  const [newActivity, setNewActivity] = useState('');
  const [expenses, setExpenses] = useState(EXPENSES);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(m => [...m, {
      id: Date.now(),
      user: 'You',
      avatar: '🧑',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isYou: true,
    }]);
    setInput('');

    // Simulate a reply
    setTimeout(() => {
      setMessages(m => [...m, {
        id: Date.now() + 1,
        user: 'Priya K.',
        avatar: '👩',
        text: 'Great idea! Let\'s add it to the itinerary 🌿',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isYou: false,
      }]);
    }, 1500);
  };

  const toggleVote = (id) => {
    setItinerary(items =>
      items.map(item =>
        item.id === id
          ? { ...item, voted: !item.voted, votes: item.voted ? item.votes - 1 : item.votes + 1 }
          : item
      )
    );
  };

  const addActivity = (e) => {
    e.preventDefault();
    if (!newActivity.trim()) return;
    setItinerary(items => [...items, {
      id: Date.now(),
      day: 'Day 1',
      activity: newActivity,
      time: 'TBD',
      votes: 1,
      voted: true,
    }]);
    setNewActivity('');
  };

  const totalExpenses = expenses.reduce((a, e) => a + e.amount, 0);
  const perPerson = (totalExpenses / 4).toFixed(0);

  return (
    <div className="min-h-screen bg-[#0a0f0a] pb-16">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="tag mb-3 inline-block">👥 Group Trip</span>
            <h1 className="text-3xl font-black text-white capitalize">{roomId?.replace(/-/g, ' ')}</h1>
            <p className="text-white/40 text-sm mt-1">Coorg · 3 days · 4 members · Nov 2025</p>
          </div>
          <div className="flex items-center gap-3">
            {SAMPLE_MEMBERS.map(m => (
              <div key={m.id} className="relative tooltip" data-tip={m.name}>
                <div className={`w-9 h-9 rounded-full glass border-2 flex items-center justify-center text-lg ${m.isYou ? 'border-green-500' : 'border-white/10'}`}>
                  {m.avatar}
                </div>
                {m.online && <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border border-black"></div>}
              </div>
            ))}
            <button className="glass px-4 py-2 rounded-xl text-sm text-white/60 border border-white/10 hover:border-green-500/30 transition-all">
              + Invite
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {['chat', 'itinerary', 'expenses', 'members'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium capitalize whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'glass text-white/50 border border-white/5 hover:text-white/80'
              }`}
            >
              {tab === 'chat' ? '💬 Chat' : tab === 'itinerary' ? '🗓️ Itinerary' : tab === 'expenses' ? '💰 Expenses' : '👥 Members'}
            </button>
          ))}
        </div>

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="glass rounded-2xl border border-white/5 overflow-hidden flex flex-col" style={{ height: '65vh' }}>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className={`flex gap-3 ${msg.isYou ? 'flex-row-reverse' : ''}`}>
                  <div className="w-9 h-9 rounded-full glass border border-white/10 flex items-center justify-center text-lg flex-shrink-0">
                    {msg.avatar}
                  </div>
                  <div className={`max-w-xs sm:max-w-md ${msg.isYou ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    {!msg.isYou && <span className="text-white/40 text-xs ml-1">{msg.user}</span>}
                    <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.isYou
                        ? 'bg-green-500/20 text-green-100 border border-green-500/30 rounded-tr-sm'
                        : 'glass text-white/80 border border-white/5 rounded-tl-sm'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-white/20 text-xs mx-1">{msg.time}</span>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-white/5 p-4">
              <form onSubmit={sendMessage} className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 input-dark rounded-xl px-4 py-3 text-sm"
                />
                <button type="submit" className="btn-primary px-5 py-3 rounded-xl font-semibold text-sm">
                  Send →
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Itinerary Tab */}
        {activeTab === 'itinerary' && (
          <div>
            {/* Add activity */}
            <form onSubmit={addActivity} className="flex gap-3 mb-8">
              <input
                type="text"
                value={newActivity}
                onChange={e => setNewActivity(e.target.value)}
                placeholder="Suggest an activity..."
                className="flex-1 input-dark rounded-xl px-4 py-3.5 text-sm"
              />
              <button type="submit" className="btn-primary px-6 py-3.5 rounded-xl font-semibold text-sm">
                + Add
              </button>
            </form>

            {/* Group by day */}
            {['Day 1', 'Day 2', 'Day 3'].map(day => {
              const dayItems = itinerary.filter(i => i.day === day);
              if (!dayItems.length) return null;
              return (
                <div key={day} className="mb-6">
                  <h3 className="text-white/50 text-sm font-semibold mb-3 uppercase tracking-wider">{day}</h3>
                  <div className="space-y-3">
                    {dayItems.map(item => (
                      <div key={item.id} className="glass rounded-xl p-4 border border-white/5 flex items-center gap-4">
                        <div className="text-white/40 text-xs w-16 text-center">{item.time}</div>
                        <div className="flex-1 text-white font-medium">{item.activity}</div>
                        <button
                          onClick={() => toggleVote(item.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                            item.voted
                              ? 'glass-green text-green-400 border border-green-500/30'
                              : 'glass text-white/40 border border-white/5 hover:text-white/70'
                          }`}
                        >
                          👍 {item.votes}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Expenses Tab */}
        {activeTab === 'expenses' && (
          <div>
            {/* Summary */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Total Expenses', value: `₹${totalExpenses.toLocaleString()}`, icon: '💰' },
                { label: 'Per Person', value: `₹${perPerson}`, icon: '👤' },
                { label: 'Members', value: '4', icon: '👥' },
              ].map(s => (
                <div key={s.label} className="glass rounded-xl p-5 text-center border border-white/5">
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div className="text-white font-black text-xl">{s.value}</div>
                  <div className="text-white/40 text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Expense list */}
            <div className="glass rounded-2xl border border-white/5 overflow-hidden mb-6">
              <div className="p-5 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-white font-bold">Expense Log</h3>
                <button className="btn-primary px-4 py-2 rounded-lg text-sm font-semibold">
                  + Add Expense
                </button>
              </div>
              {expenses.map(exp => (
                <div key={exp.id} className="flex items-center gap-4 p-5 border-b border-white/5 last:border-0">
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{exp.desc}</p>
                    <p className="text-white/40 text-xs mt-0.5">Paid by {exp.paidBy} · Split {exp.split} ways</p>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">₹{exp.amount.toLocaleString()}</div>
                    <div className="text-green-400 text-xs">₹{(exp.amount / exp.split).toFixed(0)}/person</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Settlements */}
            <div className="glass rounded-2xl border border-white/5 p-5">
              <h3 className="text-white font-bold mb-4">Settlements</h3>
              <div className="space-y-3">
                {[
                  { from: 'Ravi M.', to: 'Priya K.', amount: 2700 },
                  { from: 'Deepa S.', to: 'Priya K.', amount: 2700 },
                  { from: 'You', to: 'Priya K.', amount: 2400 },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 glass rounded-xl">
                    <span className="text-white/60 text-sm flex-1">
                      <span className="text-white font-medium">{s.from}</span> → <span className="text-white font-medium">{s.to}</span>
                    </span>
                    <span className="text-green-400 font-bold">₹{s.amount.toLocaleString()}</span>
                    {s.from === 'You' && (
                      <button className="btn-primary px-3 py-1.5 rounded-lg text-xs font-semibold">Pay</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Members Tab */}
        {activeTab === 'members' && (
          <div className="space-y-4">
            {SAMPLE_MEMBERS.map(m => (
              <div key={m.id} className={`glass rounded-xl p-5 border flex items-center gap-4 ${m.isYou ? 'glass-green border-green-500/20' : 'border-white/5'}`}>
                <div className="relative">
                  <div className="w-14 h-14 rounded-full glass border border-white/10 flex items-center justify-center text-3xl">
                    {m.avatar}
                  </div>
                  {m.online && <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-black"></div>}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className={`font-bold ${m.isYou ? 'text-green-300' : 'text-white'}`}>{m.name}</p>
                    {m.isYou && <span className="tag text-xs">You</span>}
                    {m.role === 'organizer' && <span className="tag text-xs">Organizer</span>}
                  </div>
                  <p className="text-white/40 text-sm">{m.city}</p>
                  <p className="text-xs mt-1">{m.online ? <span className="text-green-400">● Online</span> : <span className="text-white/30">● Offline</span>}</p>
                </div>
                {!m.isYou && (
                  <button className="glass px-4 py-2 rounded-lg text-sm text-white/50 border border-white/5 hover:text-white/80 transition-colors">
                    Message
                  </button>
                )}
              </div>
            ))}

            {/* Invite */}
            <div className="glass rounded-xl p-6 border border-dashed border-white/10 text-center">
              <div className="text-3xl mb-3">✉️</div>
              <p className="text-white/60 text-sm mb-4">Invite friends to join this group trip</p>
              <div className="flex gap-3 max-w-sm mx-auto">
                <input
                  type="email"
                  placeholder="friend@email.com"
                  className="flex-1 input-dark rounded-xl px-4 py-3 text-sm"
                />
                <button className="btn-primary px-5 py-3 rounded-xl text-sm font-semibold">Invite</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
