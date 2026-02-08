import React, { useState } from 'react';
import { Save, Server, Wifi, Activity, Zap, RefreshCw, AlertTriangle } from 'lucide-react';

export default function IoTConfig() {
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState({
    serverIp: '192.168.1.100',
    port: '5000',
    samplingRate: 5, // Segundos
    pumpManualOverride: false,
    soilThreshold: 30, // % mínimo para regar
    tempAlert: 35,     // °C máximo para alerta
  });

  const handleSave = () => {
    setLoading(true);
    // Simulación de envío a la Raspberry Pi
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800">Configuración IoT</h2>
          <p className="text-slate-500 font-medium">Ajustes del controlador y sensores</p>
        </div>
        <button 
          onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all ${
            loading ? 'bg-slate-400 cursor-wait' : 'bg-slate-900 hover:bg-slate-800 shadow-lg hover:shadow-xl'
          }`}
        >
          {loading ? <RefreshCw className="animate-spin" size={20}/> : <Save size={20}/>}
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* 1. CONECTIVIDAD (Red y Puertos) */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-6 text-slate-800">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Wifi size={24}/></div>
            <h3 className="text-xl font-bold">Conectividad Local</h3>
          </div>
          
          <div className="space-y-6">
            <InputGroup 
              label="Dirección IP (Raspberry Pi)" 
              value={config.serverIp} 
              onChange={(e) => setConfig({...config, serverIp: e.target.value})}
              icon={<Server size={18}/>}
            />
            <InputGroup 
              label="Puerto del Servidor API" 
              value={config.port} 
              onChange={(e) => setConfig({...config, port: e.target.value})}
              icon={<Activity size={18}/>}
            />
            <div>
              <label className="block text-sm font-bold text-slate-500 mb-2">Frecuencia de Muestreo (seg)</label>
              <div className="flex items-center gap-4">
                <input 
                  type="range" min="1" max="60" 
                  value={config.samplingRate}
                  onChange={(e) => setConfig({...config, samplingRate: e.target.value})}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <span className="font-black text-slate-700 w-12 text-center">{config.samplingRate}s</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. CALIBRACIÓN DE SENSORES (Lógica de Negocio) */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-6 text-slate-800">
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><AlertTriangle size={24}/></div>
            <h3 className="text-xl font-bold">Umbrales de Alerta</h3>
          </div>
          
          <div className="space-y-8">
            <RangeControl 
              label="Humedad de Suelo Mínima (%)" 
              sublabel="Debajo de este nivel, el ML considerará regar."
              value={config.soilThreshold} 
              max={100}
              color="accent-blue-500"
              onChange={(e) => setConfig({...config, soilThreshold: e.target.value})}
            />
            <RangeControl 
              label="Alerta de Temperatura Máxima (°C)" 
              sublabel="Se enviará notificación si se supera."
              value={config.tempAlert} 
              max={50}
              color="accent-orange-500"
              onChange={(e) => setConfig({...config, tempAlert: e.target.value})}
            />
          </div>
        </div>

        {/* 3. CONTROL MANUAL (Actuadores) */}
        <div className="md:col-span-2 bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white/10 rounded-lg"><Zap size={24} className="text-yellow-400"/></div>
                <h3 className="text-2xl font-black">Control Manual de Riego</h3>
              </div>
              <p className="text-slate-400 font-medium max-w-lg">
                Activa la bomba de agua manualmente, ignorando las predicciones de la Inteligencia Artificial. Úsalo solo en emergencias o mantenimiento.
              </p>
            </div>

            {/* Switch Gigante */}
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <span className={`text-sm font-bold uppercase tracking-wider ${config.pumpManualOverride ? 'text-green-400' : 'text-slate-500'}`}>
                {config.pumpManualOverride ? 'Bomba Activa' : 'Sistema en Reposo'}
              </span>
              <button 
                onClick={() => setConfig({...config, pumpManualOverride: !config.pumpManualOverride})}
                className={`w-20 h-10 rounded-full transition-colors relative ${config.pumpManualOverride ? 'bg-green-500' : 'bg-slate-700'}`}
              >
                <div className={`absolute top-1 left-1 bg-white w-8 h-8 rounded-full shadow-md transition-transform transform ${config.pumpManualOverride ? 'translate-x-10' : 'translate-x-0'}`}></div>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Componentes Auxiliares para inputs bonitos
const InputGroup = ({ label, value, onChange, icon }) => (
  <div>
    <label className="block text-sm font-bold text-slate-500 mb-2">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
        {icon}
      </div>
      <input 
        type="text" 
        value={value} 
        onChange={onChange}
        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
      />
    </div>
  </div>
);

const RangeControl = ({ label, sublabel, value, max, color, onChange }) => (
  <div>
    <div className="flex justify-between mb-2">
      <label className="text-sm font-bold text-slate-700">{label}</label>
      <span className="font-black text-slate-900">{value}</span>
    </div>
    <input 
      type="range" min="0" max={max} 
      value={value}
      onChange={onChange}
      className={`w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer ${color}`}
    />
    <p className="text-xs text-slate-400 mt-2 font-medium">{sublabel}</p>
  </div>
);