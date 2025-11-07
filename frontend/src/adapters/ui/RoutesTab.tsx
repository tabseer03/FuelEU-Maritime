import React, { useEffect, useState } from 'react';
import { RouteEntity } from '../..//types';
import axios from 'axios';

export default function RoutesTab() {
  const [routes, setRoutes] = useState<RouteEntity[]>([]);
  const [filters, setFilters] = useState({ vesselType: '', fuelType: '', year: '' });

  async function load() {
    const q = [];
    if (filters.vesselType) q.push(`vesselType=${encodeURIComponent(filters.vesselType)}`);
    if (filters.fuelType) q.push(`fuelType=${encodeURIComponent(filters.fuelType)}`);
    if (filters.year) q.push(`year=${encodeURIComponent(filters.year)}`);
    const qs = q.length ? `?${q.join('&')}` : '';
    const res = await axios.get<RouteEntity[]>(`/api/routes${qs}`);
    setRoutes(res.data);
  }

  useEffect(() => { load(); }, []);

  const setBaseline = async (id: number) => {
    await axios.post(`/api/routes/${id}/baseline`);
    await load();
  };

  return (
    <div>
      <div className="mb-4 grid grid-cols-3 gap-2">
        <input placeholder="Vessel type" value={filters.vesselType} onChange={e => setFilters(s => ({ ...s, vesselType: e.target.value }))} className="border p-2" />
        <input placeholder="Fuel type" value={filters.fuelType} onChange={e => setFilters(s => ({ ...s, fuelType: e.target.value }))} className="border p-2" />
        <input placeholder="Year" value={filters.year} onChange={e => setFilters(s => ({ ...s, year: e.target.value }))} className="border p-2" />
        <button onClick={load} className="col-span-3 mt-2 bg-blue-600 text-white p-2 rounded">Apply filters</button>
      </div>

      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2">routeId</th><th>vesselType</th><th>fuelType</th><th>year</th><th>ghgIntensity</th><th>fuelConsumption</th><th>distance</th><th>totalEmissions</th><th>actions</th>
          </tr>
        </thead>
        <tbody>
          {routes.map(r => (
            <tr key={r.id} className="border-b">
              <td className="p-2">{r.routeId}</td>
              <td>{r.vesselType}</td>
              <td>{r.fuelType}</td>
              <td>{r.year}</td>
              <td>{r.ghgIntensity}</td>
              <td>{r.fuelConsumption}</td>
              <td>{r.distanceKm}</td>
              <td>{r.totalEmissions}</td>
              <td>
                <button onClick={() => setBaseline(r.id)} className="bg-green-600 text-white px-2 py-1 rounded">Set Baseline</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
