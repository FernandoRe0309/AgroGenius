// src/components/HistoryChart.jsx
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '08:00', temp: 18, hum: 55 },
  { time: '10:00', temp: 22, hum: 50 },
  { time: '12:00', temp: 28, hum: 35 }, // Punto crítico (Mediodía)
  { time: '14:00', temp: 26, hum: 38 },
  { time: '16:00', temp: 24, hum: 45 },
  { time: '18:00', temp: 21, hum: 58 },
  { time: '20:00', temp: 19, hum: 65 },
];

export default function HistoryChart() {
  return (
    <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100 h-[400px]">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Tendencias Ambientales</h3>
          <p className="text-sm text-slate-400 font-medium">Últimas 12 horas</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
            <span className="w-3 h-3 rounded-full bg-orange-400"></span> Temp (°C)
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
            <span className="w-3 h-3 rounded-full bg-blue-400"></span> Hum (%)
          </div>
        </div>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorHum" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', border: 'none', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Area type="monotone" dataKey="hum" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorHum)" />
            <Area type="monotone" dataKey="temp" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}