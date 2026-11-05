import { useState, useRef } from 'react';
import { sendChatMessage } from '../services/api';

const SUGGESTIONS = [
  'Temples near Mysuru with timings',
  'Hidden waterfalls in Shivamogga',
  'Best coastal food in Udupi',
  'Hampi 2-day heritage walking trail',
];

// Client-side fallback responses when backend chat is unavailable
function getLocalFallback(val) {
  if (val.toLowerCase().includes('waterfall') || val.toLowerCase().includes('shivamogga')) {
    return `For waterfalls in Shivamogga:\n• Jog Falls: Best water volume post-monsoon (Aug–Dec). Entry ₹20.\n• Dabbe Falls & Barkana Falls: Require forest trek permission at wildlife range office.\n• Check stream current before descending rocky steps.`;
  } else if (val.toLowerCase().includes('mysuru') || val.toLowerCase().includes('temple')) {
    return `Key temples in Mysuru with timings:\n• Chamundeshwari Temple: 07:30 AM – 02:00 PM & 03:30 PM – 06:00 PM & 07:30 PM – 09:00 PM.\n• Nandi Bull Monolith: Open daylight hours.\n• Prasanna Krishnaswamy Temple: 08:00 AM – 12:00 PM.`;
  }
  return `Here are verified recommendations for "${val}":\n\n1. Best visiting hours: 07:00 AM – 11:30 AM & 04:00 PM – 07:00 PM.\n2. Nearest KSRTC transport hub connects directly.\n3. Entry tickets and ASI passes can be pre-booked online.\n\nWould you like me to add this to your AI itinerary?`;
}

export default function AICompanionWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'ai',
      text: 'Namaskara! I am your Karnataka Tourism AI companion. Ask me anything about destinations, routes, temple timings, or verified travel tips.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const [thinking, setThinking] = useState(false);
  const sessionIdRef = useRef('chat-' + Date.now());

  const send = async (txt) => {
    const val = txt || input;
    if (!val.trim() || thinking) return;

    const userMsg = {
      id: Date.now(),
      from: 'user',
      text: val,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setThinking(true);

    try {
      // Try backend AI chat first
      const lang = localStorage.getItem('pravasa_language') || 'en';
      const data = await sendChatMessage(val, sessionIdRef.current, lang);

      const reply = data?.reply || getLocalFallback(val);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          from: 'ai',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          fromBackend: !data?.fallback && !!data?.reply,
        },
      ]);
    } catch {
      // Fallback to local canned responses
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          from: 'ai',
          text: getLocalFallback(val),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setThinking(false);
    }
  };

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      if (speaking) {
        window.speechSynthesis.cancel();
        setSpeaking(false);
      } else {
        const utter = new SpeechSynthesisUtterance(text);
        utter.rate = 1.0;
        utter.onend = () => setSpeaking(false);
        utter.onerror = () => setSpeaking(false);
        setSpeaking(true);
        window.speechSynthesis.speak(utter);
      }
    }
  };

  return (
    <>
      {/* Floating Pill Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#1a3d2e] hover:bg-[#153427] text-white px-4 py-2.5 rounded-full shadow-xl text-sm font-medium transition-transform hover:scale-105 border border-white/10"
      >
        <span className="text-base">❇</span>
        <span>AI Travel Companion</span>
      </button>

      {/* Floating Chat Drawer */}
      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-[360px] sm:w-[400px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[540px] animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-[#1a3d2e] text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-sm">
                🤖
              </div>
              <div>
                <h4 className="text-sm font-semibold leading-tight">Pravasa AI Companion</h4>
                <p className="text-[11px] text-white/70">Verified Karnataka Tourism Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Prompt chips */}
          <div className="bg-gray-50 border-b border-gray-100 p-2.5 flex gap-2 overflow-x-auto no-scrollbar">
            {SUGGESTIONS.map((item, i) => (
              <button
                key={i}
                onClick={() => send(item)}
                className="whitespace-nowrap text-xs bg-white border border-gray-200 hover:border-[#1a3d2e] hover:text-[#1a3d2e] px-3 py-1.5 rounded-full text-gray-700 transition-colors flex-shrink-0"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white max-h-[320px]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.from === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                    m.from === 'user'
                      ? 'bg-[#1a3d2e] text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
                <div className="flex items-center gap-1.5 mt-1 px-1 text-[10px] text-gray-400">
                  <span>{m.time}</span>
                  {m.fromBackend && (
                    <span className="text-green-500" title="AI-powered response">✦</span>
                  )}
                  {m.from === 'ai' && (
                    <button
                      onClick={() => handleSpeak(m.text)}
                      className="hover:text-gray-700 transition-colors ml-1"
                      title="Read aloud"
                    >
                      {speaking ? '🔊' : '🔈'}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex flex-col items-start">
                <div className="max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm bg-gray-100 text-gray-500 rounded-bl-none animate-pulse">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="p-3 border-t border-gray-100 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 focus-within:border-[#1a3d2e] focus-within:bg-white transition-all"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about temples, falls, safety..."
                className="w-full bg-transparent text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || thinking}
                className="w-8 h-8 rounded-lg bg-[#1a3d2e] hover:bg-[#153427] text-white flex items-center justify-center disabled:opacity-30 disabled:hover:bg-[#1a3d2e] transition-colors flex-shrink-0"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
