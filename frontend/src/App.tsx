import React, { useState } from 'react';
import RoutesTab from './adapters/ui/RoutesTab';
import CompareTab from './adapters/ui/CompareTab';
import BankingTab from './adapters/ui/BankingTab';
import PoolingTab from './adapters/ui/PoolingTab';

export default function App() {
  const tabs = ['Routes', 'Compare', 'Banking', 'Pooling'] as const;
  const [active, setActive] = useState<typeof tabs[number]>('Routes');
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">FuelEU Compliance Dashboard</h1>
      </header>
      <nav className="mb-4">
        <div className="flex gap-2">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`px-3 py-1 rounded ${active === t ? 'bg-blue-600 text-white' : 'bg-white border'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </nav>

      <main className="bg-white p-4 rounded shadow">
        {active === 'Routes' && <RoutesTab />}
        {active === 'Compare' && <CompareTab />}
        {active === 'Banking' && <BankingTab />}
        {active === 'Pooling' && <PoolingTab />}
      </main>
    </div>
  );
}
