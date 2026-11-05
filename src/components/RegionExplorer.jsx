import { useState, useMemo } from 'react';
import { ADMINISTRATIVE_DIVISIONS, DISTRICT_HIERARCHY } from '../data/karnatakaData';

export default function RegionExplorer({ onSelectDestination }) {
  const [selectedDivision, setSelectedDivision] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedTaluk, setSelectedTaluk] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Filter districts based on selected division
  const availableDistricts = useMemo(() => {
    if (selectedDivision === 'all') {
      return ADMINISTRATIVE_DIVISIONS.flatMap(d => d.districts);
    }
    const div = ADMINISTRATIVE_DIVISIONS.find(d => d.id === selectedDivision);
    return div ? div.districts : [];
  }, [selectedDivision]);

  // Filter taluks based on selected district
  const availableTaluks = useMemo(() => {
    if (selectedDistrict === 'all') return [];
    return DISTRICT_HIERARCHY[selectedDistrict]?.taluks || [];
  }, [selectedDistrict]);

  // Gather attractions matching current cascade filters
  const filteredAttractions = useMemo(() => {
    let list = [];
    const districtsToScan = selectedDistrict === 'all'
      ? availableDistricts
      : [selectedDistrict];

    districtsToScan.forEach(distName => {
      const data = DISTRICT_HIERARCHY[distName];
      if (data && data.attractions) {
        data.attractions.forEach(attr => {
          list.push({ ...attr, district: distName });
        });
      }
    });

    if (selectedTaluk !== 'all') {
      list = list.filter(item => item.taluk === selectedTaluk);
    }

    if (categoryFilter !== 'all') {
      list = list.filter(item => item.category.toLowerCase().includes(categoryFilter.toLowerCase()));
    }

    return list;
  }, [selectedDistrict, availableDistricts, selectedTaluk, categoryFilter]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-gray-100">
        <div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Hierarchical Exploration</span>
          <h2 className="text-lg font-bold text-gray-900 mt-0.5">Karnataka Region Explorer</h2>
          <p className="text-xs text-gray-500">
            Cascade down from Division → District → Taluk → Local Attraction
          </p>
        </div>
        <div className="bg-[#eef5fa] text-[#1a3d2e] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#d2e4f0]">
          {filteredAttractions.length} Verified Spots Found
        </div>
      </div>

      {/* Cascading Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {/* 1. Division Selector */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            1. Administrative Division
          </label>
          <select
            value={selectedDivision}
            onChange={(e) => {
              setSelectedDivision(e.target.value);
              setSelectedDistrict('all');
              setSelectedTaluk('all');
            }}
            className="form-select text-xs"
          >
            <option value="all">All 4 Revenue Divisions</option>
            {ADMINISTRATIVE_DIVISIONS.map(div => (
              <option key={div.id} value={div.id}>
                {div.name} ({div.totalAttractions} spots)
              </option>
            ))}
          </select>
        </div>

        {/* 2. District Selector */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            2. District ({availableDistricts.length})
          </label>
          <select
            value={selectedDistrict}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setSelectedTaluk('all');
            }}
            className="form-select text-xs"
          >
            <option value="all">All Districts in Division</option>
            {availableDistricts.map(dist => (
              <option key={dist} value={dist}>{dist}</option>
            ))}
          </select>
        </div>

        {/* 3. Taluk Selector */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            3. Taluk / Sub-District
          </label>
          <select
            value={selectedTaluk}
            disabled={selectedDistrict === 'all' || availableTaluks.length === 0}
            onChange={(e) => setSelectedTaluk(e.target.value)}
            className="form-select text-xs disabled:opacity-50 disabled:bg-gray-50"
          >
            <option value="all">
              {selectedDistrict === 'all' ? 'Select district first' : 'All Taluks'}
            </option>
            {availableTaluks.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* 4. Category Filter */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            4. Attraction Type
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="form-select text-xs"
          >
            <option value="all">All Types</option>
            <option value="heritage">Heritage & Monuments</option>
            <option value="waterfalls">Waterfalls & Springs</option>
            <option value="hill">Hills & Viewpoints</option>
            <option value="wildlife">Wildlife & Sanctuaries</option>
            <option value="coastal">Beaches & Coastal</option>
            <option value="spiritual">Spiritual Centers</option>
            <option value="adventure">Adventure & Treks</option>
          </select>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredAttractions.map(item => (
          <div
            key={item.id}
            onClick={() => onSelectDestination && onSelectDestination(item)}
            className="bg-[#fafaf8] border border-gray-200 rounded-xl p-4 hover:border-[#1a3d2e] hover:bg-white hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <h4 className="font-semibold text-gray-900 text-sm group-hover:text-[#1a3d2e] transition-colors leading-snug">
                {item.name}
              </h4>
              <span className="text-[10px] bg-green-100 text-green-800 font-semibold px-2 py-0.5 rounded flex-shrink-0">
                ✓ Verified
              </span>
            </div>

            <p className="text-xs text-gray-500 mb-3">
              {item.district} • {item.taluk} Taluk
            </p>

            <div className="space-y-1 text-[11px] text-gray-600 border-t border-gray-100 pt-2.5">
              <div className="flex justify-between">
                <span className="text-gray-400">Road Quality:</span>
                <span className="font-medium text-gray-700">{item.roadType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Estimated Cost:</span>
                <span className="font-medium text-[#1a3d2e]">{item.cost}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Family Suitable:</span>
                <span className={item.familyFriendly ? 'text-green-600 font-semibold' : 'text-amber-600 font-medium'}>
                  {item.familyFriendly ? 'Yes (Paved access)' : 'Moderate / Active'}
                </span>
              </div>
            </div>

            <div className="mt-3 pt-2 text-right">
              <span className="text-xs text-[#1a3d2e] font-semibold group-hover:underline">
                View Destination Details →
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredAttractions.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-gray-500 text-xs">
          <p className="font-medium text-gray-700 text-sm mb-1">No attractions matching this specific taluk filter</p>
          <p>Try resetting the category filter or choosing "All Taluks" for broader district coverage.</p>
        </div>
      )}
    </div>
  );
}

