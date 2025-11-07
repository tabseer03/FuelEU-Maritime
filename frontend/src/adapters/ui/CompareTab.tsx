import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface RouteCompare {
  routeId: string;
  ghgIntensity: number;
  percentDiff: number;
  compliant: boolean;
}

export default function CompareTab() {
  const [data, setData] = useState<RouteCompare[]>([]);
  const [target, setTarget] = useState<number>(0);
  const [baseline, setBaseline] = useState<string>("");

  useEffect(() => {
    axios.get("/api/routes/comparison").then((res) => {
      setData(res.data.comparison);
      setTarget(res.data.target);
      setBaseline(res.data.baseline.routeId);
    });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">
        GHG Intensity Comparison
      </h2>

      <p className="mb-3 text-gray-600">
        Target intensity: <strong>{target.toFixed(4)} gCO₂e/MJ</strong> |{" "}
        Baseline route: <strong>{baseline}</strong>
      </p>

      <table className="border-collapse border w-full mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Route ID</th>
            <th className="border p-2">GHG Intensity</th>
            <th className="border p-2">% Difference</th>
            <th className="border p-2">Compliant</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => (
            <tr key={r.routeId}>
              <td className="border p-2">{r.routeId}</td>
              <td className="border p-2">{r.ghgIntensity}</td>
              <td className="border p-2">
                {r.percentDiff.toFixed(2)}%
              </td>
              <td className="border p-2">
                {r.compliant ? "✅" : "❌"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="routeId" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="ghgIntensity" fill="#60a5fa" name="GHG Intensity" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
