import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const DEFAULT_EXPENSES = {
  stay: 12000,
  food: 6500,
  fuel: 4800,
  toll: 950,
  activities: 2500,
  contingency: 2000,
};

const COLORS = ['#1a3d2e', '#e8732a', '#2d6a4f', '#f59e0b', '#3b82f6', '#8b5cf6'];

export default function BudgetBreakdown({ totalBudget = 30000, travellers = 2 }) {
  const [expenses, setExpenses] = useState(DEFAULT_EXPENSES);
  const [people, setPeople] = useState(travellers);

  const totalCalculated = Object.values(expenses).reduce((a, b) => a + Number(b), 0);
  const perPerson = Math.round(totalCalculated / Math.max(1, people));
  const remainingBudget = Number(totalBudget) - totalCalculated;

  const chartData = [
    { name: 'Accommodation (Stay)', value: Number(expenses.stay) },
    { name: 'Food & Dining', value: Number(expenses.food) },
    { name: 'Fuel & Transit', value: Number(expenses.fuel) },
    { name: 'Toll & Parking', value: Number(expenses.toll) },
    { name: 'Sightseeing & Activities', value: Number(expenses.activities) },
    { name: 'Contingency / Safety Fund', value: Number(expenses.contingency) },
  ];

  const handleExpenseChange = (key, val) => {
    setExpenses(prev => ({
      ...prev,
      [key]: Math.max(0, Number(val) || 0)
    }));
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100">
        <div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Financial Planning</span>
          <h2 className="text-lg font-bold text-gray-900 mt-0.5">Trip Budget Calculator & Breakdown</h2>
          <p className="text-xs text-gray-500">
            Real-time recalculation of fuel, food, stays, tolls and sightseeing expenses in Karnataka.
          </p>
        </div>

        {/* Travellers count selector */}
        <div className="flex items-center gap-2 bg-[#f8f9f6] border border-gray-200 px-3 py-1.5 rounded-xl text-xs">
          <span className="text-gray-500 font-medium">Travellers:</span>
          <button
            type="button"
            onClick={() => setPeople(p => Math.max(1, p - 1))}
            className="w-6 h-6 rounded bg-white border border-gray-300 font-bold hover:bg-gray-50"
          >
            -
          </button>
          <span className="font-bold text-gray-900 px-1">{people}</span>
          <button
            type="button"
            onClick={() => setPeople(p => p + 1)}
            className="w-6 h-6 rounded bg-white border border-gray-300 font-bold hover:bg-gray-50"
          >
            +
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#f8f9f6] border border-gray-200 rounded-xl p-4">
          <span className="text-xs text-gray-500 font-medium block">Total Estimated Cost</span>
          <div className="text-2xl font-black text-[#1a3d2e] mt-1">
            ₹{totalCalculated.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-gray-400 mt-0.5 block">
            Target Budget: ₹{Number(totalBudget).toLocaleString('en-IN')}
          </span>
        </div>

        <div className="bg-[#f8f9f6] border border-gray-200 rounded-xl p-4">
          <span className="text-xs text-gray-500 font-medium block">Per-Person Cost</span>
          <div className="text-2xl font-black text-[#e8732a] mt-1">
            ₹{perPerson.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-gray-400 mt-0.5 block">
            Divided equally across {people} traveller{people > 1 ? 's' : ''}
          </span>
        </div>

        <div className={`rounded-xl p-4 border ${remainingBudget >= 0 ? 'bg-[#eef8f3] border-[#b2e2ca] text-[#134e34]' : 'bg-red-50 border-red-200 text-red-800'}`}>
          <span className="text-xs font-medium block">Remaining Buffer</span>
          <div className="text-2xl font-black mt-1">
            {remainingBudget >= 0 ? `+ ₹${remainingBudget.toLocaleString('en-IN')}` : `- ₹${Math.abs(remainingBudget).toLocaleString('en-IN')}`}
          </div>
          <span className="text-[11px] mt-0.5 block">
            {remainingBudget >= 0 ? 'Comfortable buffer remaining' : 'Budget exceeded; adjust stay/transport'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Recharts Pie Chart */}
        <div className="lg:col-span-5 h-[280px] w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(val) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Cost']}
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Interactive Editable Assumptions */}
        <div className="lg:col-span-7 space-y-3">
          <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
            Editable Assumptions & Breakdown
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-gray-600 mb-1 font-medium">🏨 Accommodation / Stay (₹)</label>
              <input
                type="number"
                value={expenses.stay}
                onChange={(e) => handleExpenseChange('stay', e.target.value)}
                className="form-input text-xs"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1 font-medium">🍽️ Food & Traditional Dining (₹)</label>
              <input
                type="number"
                value={expenses.food}
                onChange={(e) => handleExpenseChange('food', e.target.value)}
                className="form-input text-xs"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1 font-medium">⛽ Fuel & Transport (₹)</label>
              <input
                type="number"
                value={expenses.fuel}
                onChange={(e) => handleExpenseChange('fuel', e.target.value)}
                className="form-input text-xs"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1 font-medium">🛣️ Expressway Toll & Parking (₹)</label>
              <input
                type="number"
                value={expenses.toll}
                onChange={(e) => handleExpenseChange('toll', e.target.value)}
                className="form-input text-xs"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1 font-medium">🎟️ Sightseeing, Safari & Guides (₹)</label>
              <input
                type="number"
                value={expenses.activities}
                onChange={(e) => handleExpenseChange('activities', e.target.value)}
                className="form-input text-xs"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1 font-medium">🛡️ Emergency Contingency (₹)</label>
              <input
                type="number"
                value={expenses.contingency}
                onChange={(e) => handleExpenseChange('contingency', e.target.value)}
                className="form-input text-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

