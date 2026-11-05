import { useState, useEffect } from 'react';

const INITIAL_SAVED_TRIPS = [
  {
    id: 'trip-1',
    title: 'Hampi & Chalukya Heritage Trail',
    startingPoint: 'Bengaluru',
    duration: 4,
    budget: '₹22,000',
    vehicle: 'SUV',
    savedDate: '02 Nov 2026',
    days: [
      { day: 1, route: 'Bengaluru → Hospet (NH48)', stay: 'Hotel Malligi, Hospet', note: 'Early morning start at 6 AM' },
      { day: 2, route: 'Virupaksha, Vittala Stone Chariot, Sunset at Hemakuta', stay: 'Hampi Boulders Resort', note: 'Hire battery buggy for Vittala' },
      { day: 3, route: 'Hampi → Badami Caves → Pattadakal', stay: 'Badami Court', note: 'Afternoon light is best for cave photography' },
      { day: 4, route: 'Aihole Durga Temple → Bengaluru Return', stay: 'Home', note: 'Stop for North Karnataka Jolada Rotti lunch' },
    ]
  },
  {
    id: 'trip-2',
    title: 'Western Ghats & Coorg Coffee Circuit',
    startingPoint: 'Mysuru',
    duration: 3,
    budget: '₹16,500',
    vehicle: 'Family Car',
    savedDate: '28 Oct 2026',
    days: [
      { day: 1, route: 'Mysuru → Bylakuppe Golden Temple → Madikeri', stay: 'Estate Homestay, Madikeri', note: 'Tibetan momos lunch at Bylakuppe' },
      { day: 2, route: 'Abbey Falls, Raja\'s Seat, Coffee plantation tour', stay: 'Estate Homestay, Madikeri', note: 'Purchase fresh estate pepper and cardamom' },
      { day: 3, route: 'Dubare Elephant Camp → Mysuru Return', stay: 'Home', note: 'Arrive at Dubare before 9 AM for elephant interaction' },
    ]
  }
];

export default function SavedTrips() {
  const [trips, setTrips] = useState(() => {
    const saved = localStorage.getItem('pravasa_saved_trips');
    return saved ? JSON.parse(saved) : INITIAL_SAVED_TRIPS;
  });

  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    localStorage.setItem('pravasa_saved_trips', JSON.stringify(trips));
  }, [trips]);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to remove this saved trip?')) {
      setTrips(trips.filter(t => t.id !== id));
    }
  };

  const handleShare = (id) => {
    const shareUrl = `${window.location.origin}/plan?savedId=${id}`;
    navigator.clipboard?.writeText(shareUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="page-bg pb-16">
      {/* Header */}
      <div className="bg-[#1a3d2e] text-white py-12 px-6">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-[#95d5b2] mb-3">
              <span>💼</span>
              <span>Personal Itinerary Vault</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
              My Saved Karnataka Trips
            </h1>
            <p className="text-white/70 text-sm max-w-2xl leading-relaxed">
              Review your customized day-by-day plans, budget breakdowns, and vehicle-tailored routes. Export or share with fellow travellers.
            </p>
          </div>

          <a
            href="/plan"
            className="btn-orange px-5 py-2.5 rounded-xl text-xs font-semibold shadow-md whitespace-nowrap"
          >
            + Create New Trip
          </a>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-6">
        {trips.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center text-gray-500">
            <span className="text-4xl block mb-3">🗺️</span>
            <h3 className="font-bold text-gray-800 text-lg mb-1">No Saved Trips Yet</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto mb-6">
              Use our AI Trip Planner to build and customize your Karnataka itinerary, then hit "Save" to access it anytime here.
            </p>
            <a href="/plan" className="btn-green text-xs font-semibold px-5 py-2.5 rounded-lg">
              Start Planning →
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-xs text-gray-500 font-medium">
              You have <b>{trips.length}</b> saved itinerary plans
            </div>

            {trips.map((trip) => (
              <div
                key={trip.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:border-[#1a3d2e] transition-all"
              >
                {/* Trip Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-100">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{trip.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1 flex-wrap">
                      <span>Gateway: <b>{trip.startingPoint}</b></span>
                      <span>•</span>
                      <span>Duration: <b>{trip.duration} Days</b></span>
                      <span>•</span>
                      <span>Vehicle: <b>{trip.vehicle}</b></span>
                      <span>•</span>
                      <span>Saved: <b>{trip.savedDate}</b></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleShare(trip.id)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <span>{copiedId === trip.id ? '✓ Copied' : '🔗 Share'}</span>
                    </button>
                    <button
                      onClick={() => handleDelete(trip.id)}
                      className="text-red-500 hover:text-red-700 text-xs font-semibold px-2 py-1.5 rounded transition-colors"
                      title="Delete trip"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Day-by-Day Timeline */}
                <div className="space-y-3 mb-5">
                  {trip.days.map((d) => (
                    <div
                      key={d.day}
                      className="bg-gray-50 border border-gray-100 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-[#1a3d2e] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                          {d.day}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{d.route}</p>
                          <p className="text-gray-500 text-[11px] mt-0.5">🏨 Stay: {d.stay}</p>
                        </div>
                      </div>

                      {d.note && (
                        <div className="text-[11px] text-[#1a3d2e] bg-[#eef5fa] px-2.5 py-1 rounded-lg border border-[#d2e4f0] font-medium">
                          💡 {d.note}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    Estimated Budget Target: <b className="text-gray-900">{trip.budget}</b>
                  </span>

                  <a
                    href={`/plan?tripId=${trip.id}`}
                    className="btn-green text-xs font-semibold px-4 py-2 rounded-lg"
                  >
                    Open in Planner & Edit →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

