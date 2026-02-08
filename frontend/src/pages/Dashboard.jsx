// src/pages/Dashboard.jsx
import React from 'react';
import { Thermometer, Droplets, Wind, AlertTriangle, CheckCircle2, Cpu, Wifi, ArrowUp, ArrowDown } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="animate-fade-in space-y-6 md:space-y-8">
      
      {/* HEADER: Flex column en móvil, row en desktop */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl md:text-4xl font-black text-slate-800 tracking-tight">Monitor de Cultivo</h2>
          <p className="text-slate-500 font-medium text-sm md:text-base">Vista general del invernadero</p>
        </div>
        
        {/* Badges de estado que se ajustan */}
        <div className="flex flex-wrap gap-2 md:gap-3 w-full md:w-auto">
          <StatusBadge icon={<Cpu size={14} />} label="RPi 400: ONLINE" color="bg-emerald-100 text-emerald-700 border-emerald-200" />
          <StatusBadge icon={<Wifi size={14} />} label="Arduino: 5ms" color="bg-blue-100 text-blue-700 border-blue-200" />
        </div>
      </div>

      {/* GRID DE SENSORES RESPONSIVE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <SensorCard title="Temperatura" value="24.5" unit="°C" icon={<Thermometer />} color="orange" trend="+0.5" isUp={true} />
        <SensorCard title="Humedad Suelo" value="42" unit="%" icon={<Droplets />} color="blue" trend="-2.1" isUp={false} />
        <SensorCard title="Humedad Aire" value="65" unit="%" icon={<Wind />} color="cyan" trend="0.0" isUp={null} />
        <SensorCard title="CO2 ppm" value="419" unit="" icon={<Wind />} color="purple" trend="+12" isUp={true} />
      </div>

      {/* GRID INFERIOR (Alertas y ML) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Columna Ancha: Alertas */}
        <div className="lg:col-span-2 bg-white p-5 md:p-8 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-50 rounded-lg text-amber-500"><AlertTriangle size={24}/></div>
            <h3 className="text-lg md:text-xl font-bold text-slate-800">Diagnóstico del Sistema</h3>
          </div>
          
          <div className="space-y-3">
            <AlertItem level="critical" message="Nivel de tanque de agua crítico (10%)" time="Hace 5m" />
            <AlertItem level="warning" message="Probabilidad de tormenta (Google API)" time="Hace 1h" />
            <AlertItem level="info" message="Sincronización de datos completada" time="Hace 2h" />
          </div>
        </div>

        {/* Columna Estrecha: Estado ML */}
        <div className="bg-slate-900 text-white p-6 md:p-8 rounded-[2rem] shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[250px]">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
                <CheckCircle2 className="text-emerald-400" size={32} />
              </div>
              <span className="text-[10px] font-black bg-emerald-500 text-white px-2 py-1 rounded shadow-lg shadow-emerald-500/20">AUTO MODE</span>
            </div>
            
            <div className="space-y-1">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Próxima Acción</p>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight">ESPERAR</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed mt-2">
                Humedad de suelo en rango óptimo. Ahorro de agua activo.
              </p>
            </div>
          </div>
          
          {/* Decoración de fondo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}

/* --- UI COMPONENTS (Responsive) --- */

const StatusBadge = ({ icon, label, color }) => (
  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${color} shadow-sm transition-transform hover:scale-105`}>
    {icon} <span className="text-xs font-bold whitespace-nowrap">{label}</span>
  </div>
);

const SensorCard = ({ title, value, unit, icon, color, trend, isUp }) => (
  <div className="bg-white p-5 md:p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl bg-${color}-50 text-${color}-500 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${
          isUp === true ? 'bg-red-50 text-red-600' : isUp === false ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
        }`}>
          {isUp === true ? <ArrowUp size={12}/> : isUp === false ? <ArrowDown size={12}/> : null}
          {trend}%
        </div>
      )}
    </div>
    <div className="mt-2">
      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
      <div className="flex items-end gap-1">
        <span className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">{value}</span>
        <span className="text-lg text-slate-300 font-bold mb-1">{unit}</span>
      </div>
    </div>
  </div>
);

const AlertItem = ({ level, message, time }) => {
  const styles = {
    critical: 'bg-red-50 border-red-100 text-red-800',
    warning: 'bg-amber-50 border-amber-100 text-amber-800',
    info: 'bg-blue-50 border-blue-100 text-blue-800'
  };

  return (
    <div className={`p-4 rounded-2xl border ${styles[level]} flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-all hover:brightness-95 cursor-default`}>
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${level === 'critical' ? 'bg-red-500' : level === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
        <span className="font-semibold text-sm">{message}</span>
      </div>
      <span className="text-xs opacity-60 font-bold whitespace-nowrap sm:text-right">{time}</span>
    </div>
  );
};