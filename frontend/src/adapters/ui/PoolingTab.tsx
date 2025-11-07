import React, { useState } from 'react';
import axios from 'axios';

export default function PoolingTab() {
  const [members, setMembers] = useState<{ shipId: string; cbBefore: number }[]>([
    { shipId: 'R001', cbBefore: -100 },
    { shipId: 'R002', cbBefore: 50 },
    { shipId: 'R003', cbBefore: 60 }
  ]);
  const [year, setYear] = useState(2025);
  const [allocation, setAllocation] = useState<any[]>([]);

  const canCreate = members.reduce((s, m) => s + m.cbBefore, 0) >= 0;

  const createPool = async () => {
    if (!canCreate) return alert('Pool invalid: sum(cbBefore) < 0');
    try {
      const res = await axios.post('/api/pools', { year, members });
      setAllocation(res.data.allocation);
    } catch (err: any) {
      alert(err?.response?.data?.error ?? err.message);
    }
  };

  return (
    <div>
      <div className="mb-3">
        <h3>Members</h3>
        <table className="w-full">
          <thead><tr><th>shipId</th><th>cbBefore</th></tr></thead>
          <tbody>
            {members.map((m, i) => (
              <tr key={i}>
                <td><input value={m.shipId} onChange={e => setMembers(s => s.map((x, idx) => idx === i ? { ...x, shipId: e.target.value } : x))} className="border p-1" /></td>
                <td><input type="number" value={m.cbBefore} onChange={e => setMembers(s => s.map((x, idx) => idx === i ? { ...x, cbBefore: Number(e.target.value) } : x))} className="border p-1" /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-2">
          <button onClick={() => setMembers(m => [...m, { shipId: `R00${m.length+1}`, cbBefore: 0 }])} className="bg-gray-200 px-2 py-1">Add</button>
          <button onClick={() => setMembers(m => m.slice(0, -1))} className="bg-gray-200 ml-2 px-2 py-1">Remove</button>
        </div>
      </div>

      <div className="mb-3">
        <div>Pool Sum: {members.reduce((s, m) => s + m.cbBefore, 0)}</div>
        <button onClick={createPool} disabled={!canCreate} className={`mt-2 px-3 py-1 rounded ${canCreate ? 'bg-green-600 text-white' : 'bg-red-400 text-white'}`}>Create Pool</button>
      </div>

      {allocation.length > 0 && (
        <div>
          <h4 className="font-semibold">Allocation</h4>
          <table className="w-full">
            <thead><tr><th>shipId</th><th>cbBefore</th><th>cbAfter</th></tr></thead>
            <tbody>
              {allocation.map((a:any) => (
                <tr key={a.shipId}><td>{a.shipId}</td><td>{a.cbBefore}</td><td>{a.cbAfter}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
