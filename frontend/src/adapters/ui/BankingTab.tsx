import React, { useState } from 'react';
import axios from 'axios';

type CBResponse = { shipId: string; year: number; cb_before: number; banked: number; cb_after: number };

export default function BankingTab() {
  const [shipId, setShipId] = useState('R001');
  const [year, setYear] = useState(2025);
  const [cbData, setCbData] = useState<CBResponse | null>(null);
  const [bankAmount, setBankAmount] = useState<number>(0);
  const [applyAmount, setApplyAmount] = useState<number>(0);
  const [records, setRecords] = useState<any[]>([]);

  async function getCB() {
    const res = await axios.get<CBResponse>(`/api/compliance/adjusted-cb?shipId=${shipId}&year=${year}`);
    setCbData(res.data);
    const rec = await axios.get(`/api/banking/records?shipId=${shipId}&year=${year}`);
    setRecords(rec.data);
  }

  async function bank() {
    if (!cbData || cbData.cb_before <= 0) return alert('No positive CB to bank');
    const res = await axios.post('/api/banking/bank', { shipId, year, amount: bankAmount });
    setRecords(r => [...r, res.data]);
    await getCB();
  }

  async function apply() {
    try {
      const res = await axios.post('/api/banking/apply', { shipId, year, amount: applyAmount });
      await getCB();
      alert('Applied');
    } catch (err: any) {
      alert(err?.response?.data?.error ?? err.message);
    }
  }

  return (
    <div>
      <div className="flex gap-2">
        <input value={shipId} onChange={e => setShipId(e.target.value)} className="border p-2" />
        <input type="number" value={year} onChange={e => setYear(Number(e.target.value))} className="border p-2" />
        <button onClick={getCB} className="bg-blue-600 text-white px-3 py-1 rounded">Get CB</button>
      </div>

      {cbData && (
        <div className="mt-4">
          <div>CB before: {cbData.cb_before.toFixed(3)}</div>
          <div>Banked: {cbData.banked.toFixed(3)}</div>
          <div>CB after: {cbData.cb_after.toFixed(3)}</div>
        </div>
      )}

      <div className="mt-4 grid grid-cols-3 gap-2">
        <input type="number" value={bankAmount} onChange={e => setBankAmount(Number(e.target.value))} className="border p-2" placeholder="Amount to bank" />
        <button onClick={bank} className="bg-green-600 text-white px-3 py-1 rounded">Bank</button>
        <div />
        <input type="number" value={applyAmount} onChange={e => setApplyAmount(Number(e.target.value))} className="border p-2" placeholder="Amount to apply" />
        <button onClick={apply} className="bg-yellow-600 text-white px-3 py-1 rounded">Apply</button>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">Bank Records</h3>
        <ul>
          {records.map((r:any, i:number) => <li key={i}>{r.shipId} {r.year} {r.amountGco2eq}</li>)}
        </ul>
      </div>
    </div>
  );
}
