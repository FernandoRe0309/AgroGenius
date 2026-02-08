import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Brain, CloudSun, Droplets, Menu, X, Thermometer } from 'lucide-react';

export default function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [data, setData] = useState({ temp: 23.5, soil: 45, hum: 61, co2: 419 });

  // Simulación de tiempo real (HU-01)
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        temp: (prev.temp + (Math.random() - 0.5)).toFixed(1),
        soil: (prev.soil + (Math.random() - 0.2)).toFixed(1)
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* SIDEBAR LATERAL IZQUIERDO EMERGENTE */}
      <aside className={`${isOpen ? 'w-64' : 'w-20'} bg-green-900 text-white transition-all duration-300 flex flex-col shadow-xl`}>
        <div className="p-6 flex items-center justify-between border-b border-green-800">
          {isOpen && <h1 className="font-black text-xl tracking-tighter text-green-400">AGROGENIUS</h1>}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 hover:bg-green-800 rounded-lg transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 mt-6 space-y-2">
          <NavItem icon={<LayoutDashboard />} label="Dashboard" active={isOpen} isSelected />
          <NavItem icon={<Brain />} label="Inteligencia ML" active={isOpen} />
          <NavItem icon={<CloudSun />} label="Clima Google" active={isOpen} />
        </nav>

        <div className="p-4 border-t border-green-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-400"></div>
            {isOpen && <p className="text-xs font-bold">Admin Invernadero</p>}
          </div>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-black text-gray-800">Monitor de Cultivo</h2>
            <p className="text-gray-500 font-medium">
              Estado: <span className="text-green-500 font-bold">● SISTEMA CONECTADO</span>
            </p>
          </div>
          <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100 text-sm font-bold text-gray-400">
            {new Date().toLocaleDateString()}
          </div>
        </header>

        {/* GRID DE SENSORES IOT (HU-01) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SensorCard title="Temperatura" value={data.temp} unit="°C" icon={<Thermometer />} color="text-orange-500" />
          <SensorCard title="Humedad Suelo" value={data.soil} unit="%" icon={<Droplets />} color="text-blue-500" />
          <SensorCard title="Humedad Aire" value={data.hum} unit="%" icon={<Droplets />} color="text-cyan-500" />
          <SensorCard title="CO2 Ambiental" value={data.co2} unit="ppm" icon={<CloudSun />} color="text-green-500" />
        </div>

        {/* RECOMENDACIÓN DE MACHINE LEARNING (CAPÍTULO III) */}
        <section className="mt-10 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl">
              <Brain size={32} />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-800">Análisis Predictivo</h3>
              <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Modelo: Árbol de Decisión (84% Precisión)</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <p className="text-gray-600 leading-relaxed">
                Basado en la humedad de suelo actual y el pronóstico de la API de Google, 
                el sistema ha determinado que las condiciones son críticas para el jitomate[cite: 74, 118].
              </p>
            </div>
            <div className="px-10 py-5 bg-purple-600 text-white font-black rounded-3xl shadow-xl shadow-purple-200 text-center">
              ACCIÓN: ACTIVAR RIEGO
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// COMPONENTES AUXILIARES
const NavItem = ({ icon, label, active, isSelected }) => (
  <div className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all ${
    isSelected ? 'bg-green-800 text-white' : 'text-green-300 hover:bg-green-800 hover:text-white'
  }`}>
    {icon}
    {active && <span className="text-sm font-bold tracking-tight">{label}</span>}
  </div>
);

const SensorCard = ({ title, value, unit, icon, color }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className={`mb-4 p-3 bg-gray-50 inline-block rounded-2xl ${color}`}>
      {icon}
    </div>
    <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">{title}</p>
    <div className="flex items-baseline gap-1">
      <span className="text-4xl font-black text-gray-800">{value}</span>
      <span className="text-lg text-gray-300 font-bold">{unit}</span>
    </div>
  </div>
);