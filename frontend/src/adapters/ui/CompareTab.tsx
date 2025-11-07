import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type CompareRow = {
  routeId: string;
  baseline: number;
  comparison: number;
  percentDiff: number;
  compliant: boolean;
};

export default function CompareTab() {
  const [rows, setRows] = useState<CompareRow[]>([]);
  const [baseline, setBaseline] = useState<number | null>(null);

  async function load() {
    const res = await axios.get('/api/routes/comparison');
    setBaseline(res.data.baseline);
    setRows(res.data.results);
  }

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Baseline: {baseline ?? '—'}</h2>
      <div style={{ height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={rows}>
            <XAxis dataKey="routeId" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="comparison" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <table className="min-w-full mt-4">
        <thead className="border-b"><tr><th>route</th><th>baseline</th><th>comparison</th><th>% diff</th><th>compliant</th></tr></thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.routeId} className="border-b">
              <td className="p-2">{r.routeId}</td>
              <td>{r.baseline.toFixed(3)}</td>
              <td>{r.comparison.toFixed(3)}</td>
              <td>{r.percentDiff.toFixed(2)}%</td>
              <td>{r.compliant ? '✅' : '❌'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
