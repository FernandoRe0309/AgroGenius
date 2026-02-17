import React, { useState, useEffect } from 'react';
import { Thermometer, Droplets, Wind, AlertTriangle, CheckCircle2, Cpu, Wifi, ArrowUp, Activity } from 'lucide-react';
import HistoryChart from '../components/HistoryChart';

export default function Dashboard() {
  // Estado inicial con valores en 0
  const [data, setData] = useState({
    temperatura: 0,
    humedad_suelo: 0,
    humedad_aire: 0,
    co2: 0,
    ml_decision: "INICIANDO...",
    alert_level: "success"
  });

  const [isConnected, setIsConnected] = useState(false);

  // FUNCIÓN PARA OBTENER DATOS REALES
  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/sensors');
      const result = await response.json();
      setData(result);
      setIsConnected(true);
    } catch (error) {
      console.error("Error conectando con Python:", error);
      setIsConnected(false);
    }
  };

  // "Efecto" que se ejecuta cada 2 segundos
  useEffect(() => {
    fetchData(); // Primera llamada inmediata
    const interval = setInterval(fetchData, 2000); // Polling cada 2s
    return () => clearInterval(interval); // Limpieza al salir
  }, []);

  return (
    <div className="animate-fade-in space-y-6 md:space-y-8 pb-10">

      {/* HEADER CON ESTADO DE CONEXIÓN */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl md:text-4xl font-black text-slate-800 tracking-tight">Monitor de Cultivo</h2>
          <p className="text-slate-500 font-medium">Datos en tiempo real desde Python</p>
        </div>
        <div className="flex gap-3">
          <StatusBadge 
            icon={<Cpu size={14} />} 
            label={isConnected ? "BACKEND: ONLINE" : "BACKEND: ERROR"} 
            color={isConnected ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700 animate-pulse"} 
          />
        </div>
      </div>

      {/* GRID DE SENSORES VIVOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <SensorCard title="Temperatura" value={data.temperatura} unit="°C" icon={<Thermometer />} color="orange" />
        <SensorCard title="Humedad Suelo" value={data.humedad_suelo} unit="%" icon={<Droplets />} color="blue" />
        <SensorCard title="Humedad Aire" value={data.humedad_aire} unit="%" icon={<Wind />} color="cyan" />
        <SensorCard title="CO2 ppm" value={data.co2} unit="" icon={<Activity />} color="purple" />
      </div>

      {/* GRÁFICA */}
      <div className="w-full">
         <HistoryChart />
      </div>

      {/* PANEL DE IA (DECISIÓN DEL SERVIDOR) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`col-span-1 lg:col-span-3 p-8 rounded-[2rem] text-white shadow-xl transition-colors duration-500 ${
          data.alert_level === 'critical' ? 'bg-red-600' : 
          data.alert_level === 'warning' ? 'bg-amber-500' : 'bg-slate-900'
        }`}>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
              <CheckCircle2 className="text-white" size={32} />
            </div>
            <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">MODELO ACTIVO</span>
          </div>
          <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Decisión del Sistema</p>
          <h3 className="text-4xl font-black mt-2">{data.ml_decision}</h3>
        </div>
      </div>

    </div>
  );
}

// Componentes visuales simples
const StatusBadge = ({ icon, label, color }) => (
  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border border-transparent shadow-sm ${color}`}>
    {icon} <span className="text-xs font-bold">{label}</span>
  </div>
);

const SensorCard = ({ title, value, unit, icon, color }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm transition-all hover:scale-105">
    <div className={`p-3 rounded-2xl bg-${color}-50 text-${color}-500 w-min mb-4`}>{icon}</div>
    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
    <div className="flex items-end gap-1">
      <span className="text-4xl font-black text-slate-800">{value}</span>
      <span className="text-lg text-slate-300 font-bold mb-1">{unit}</span>
    </div>
  </div>
);