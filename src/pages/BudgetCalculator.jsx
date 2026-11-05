import { useState } from 'react';
import BudgetBreakdown from '../components/BudgetBreakdown';
import VehicleModeSelector from '../components/VehicleModeSelector';
import { VEHICLE_MODES } from '../data/karnatakaData';

export default function BudgetCalculator() {
  const [totalBudget, setTotalBudget] = useState(35000);
  const [travellers, setTravellers] = useState(2);
  const [durationDays, setDurationDays] = useState(4);
  const [vehicle, setVehicle] = useState(VEHICLE_MODES[0]);

  return (
    <div className="page-bg pb-16">
      {/* Header */}
      <div className="bg-[#1a3d2e] text-white py-12 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-[#95d5b2] mb-3">
            <span>💰</span>
            <span>Real-Time Travel Cost Estimation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Karnataka Travel Budget Calculator
          </h1>
          <p className="text-white/70 text-sm max-w-2xl leading-relaxed">
            Estimate fuel, expressway toll tariffs, hotel stays, food, entry fees and contingency buffers tailored to your group size and vehicle choice.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-6">
        {/* Quick parameters */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            Trip Base Parameters
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Target Trip Budget (₹ INR)
              </label>
              <input
                type="number"
                value={totalBudget}
                onChange={(e) => setTotalBudget(Number(e.target.value))}
                className="form-input text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Trip Duration (Days)
              </label>
              <input
                type="number"
                min={1}
                max={14}
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="form-input text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Number of Travellers
              </label>
              <input
                type="number"
                min={1}
                max={15}
                value={travellers}
                onChange={(e) => setTravellers(Number(e.target.value))}
                className="form-input text-xs"
              />
            </div>
          </div>
        </div>

        {/* Vehicle Mode Selector */}
        <VehicleModeSelector
          selectedVehicle={vehicle.id}
          onSelectVehicle={(v) => setVehicle(v)}
        />

        {/* Recharts Budget Breakdown Component */}
        <BudgetBreakdown
          totalBudget={totalBudget}
          travellers={travellers}
        />
      </div>
    </div>
  );
}

