import { useState } from 'react';
import { VEHICLE_MODES } from '../data/karnatakaData';

export default function VehicleModeSelector({ selectedVehicle, onSelectVehicle }) {
  const [activeVehicleId, setActiveVehicleId] = useState(selectedVehicle || 'family_car');

  const currentVehicle = VEHICLE_MODES.find(v => v.id === activeVehicleId) || VEHICLE_MODES[0];

  const handleSelect = (v) => {
    setActiveVehicleId(v.id);
    if (onSelectVehicle) onSelectVehicle(v);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-gray-100">
        <div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Terrain & Route Adaptation</span>
          <h3 className="text-base font-bold text-gray-900 mt-0.5">Vehicle Mode Selector</h3>
          <p className="text-xs text-gray-500">
            Pravasa AI adapts speed limits, ghat road safety alerts, and terrain suitability to your vehicle.
          </p>
        </div>
        <div className="text-xs font-semibold text-[#1a3d2e] bg-[#eef5fa] px-3 py-1.5 rounded-lg border border-[#d2e4f0]">
          Active: {currentVehicle.name}
        </div>
      </div>

      {/* Vehicle Grid Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 mb-5">
        {VEHICLE_MODES.map((v) => {
          const isSelected = v.id === activeVehicleId;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => handleSelect(v)}
              className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all ${
                isSelected
                  ? 'bg-[#1a3d2e] text-white border-[#1a3d2e] shadow-md scale-105'
                  : 'bg-[#fafaf8] text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-white'
              }`}
            >
              <span className="text-xl mb-1">{v.icon}</span>
              <span className="text-[11px] font-semibold leading-tight line-clamp-1">{v.name}</span>
            </button>
          );
        })}
      </div>

      {/* Vehicle Specification Panel */}
      <div className="bg-[#f8f9f6] border border-gray-200 rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div>
          <span className="text-gray-400 block font-medium">Ground Clearance:</span>
          <span className="text-gray-900 font-bold text-sm">{currentVehicle.groundClearance}</span>
          <span className="text-gray-400 block font-medium mt-2">Avg Fuel / Range:</span>
          <span className="text-gray-900 font-bold text-sm">{currentVehicle.avgMileage}</span>
        </div>

        <div>
          <span className="text-gray-400 block font-medium">Recommended Road Surfaces:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {currentVehicle.suitableRoads.map((road, i) => (
              <span key={i} className="bg-white border border-gray-200 text-gray-700 px-2 py-0.5 rounded text-[11px]">
                ✓ {road}
              </span>
            ))}
          </div>
        </div>

        <div>
          <span className="text-gray-400 block font-medium">Terrain Warning:</span>
          <div className="mt-1 bg-amber-50 border border-amber-200 text-amber-900 p-2 rounded text-[11px] leading-relaxed">
            ⚠️ {currentVehicle.warnings}
          </div>
        </div>
      </div>
    </div>
  );
}

