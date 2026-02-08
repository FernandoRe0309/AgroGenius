// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Brain, CloudSun, Menu, X, Settings, Activity, LogOut } from 'lucide-react';

// Importación de las páginas
import Dashboard from './pages/Dashboard';
import MLPredictions from './pages/MLPredictions';
import GoogleWeather from './pages/GoogleWeather';
import IoTConfig from './pages/IoTConfig'; 

export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
        
        {/* BOTÓN FLOTANTE (Visible solo cuando el menú está cerrado) */}
        {!isSidebarOpen && (
          <button 
            onClick={() => setSidebarOpen(true)}
            className="fixed top-4 left-4 z-40 p-3 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-slate-200 text-slate-700 hover:text-green-600 transition-all active:scale-95"
          >
            <Menu size={24} />
          </button>
        )}

        {/* OVERLAY OSCURO (Fondo borroso al abrir menú) */}
        <div 
          className={`fixed inset-0 bg-slate-900/60 z-40 backdrop-blur-sm transition-opacity duration-300 ${
            isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* SIDEBAR RESPONSIVE */}
        <aside 
          className={`fixed top-0 left-0 h-full bg-slate-900 text-white z-50 shadow-2xl transform transition-transform duration-300 ease-out 
          w-[85vw] max-w-[300px] ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="h-full flex flex-col">
            {/* Header del Sidebar */}
            <div className="p-6 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="bg-green-600 p-2 rounded-lg shadow-green-900/20 shadow-lg">
                  <Activity size={20} className="text-white" />
                </div>
                <h1 className="text-lg font-black tracking-wider">AGRO<span className="text-green-400">GENIUS</span></h1>
              </div>
              <button 
                onClick={() => setSidebarOpen(false)} 
                className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navegación */}
            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
              <SidebarLink to="/" icon={<LayoutDashboard size={20} />} label="Panel de Control" onClick={() => setSidebarOpen(false)} />
              <SidebarLink to="/ml" icon={<Brain size={20} />} label="Inteligencia Artificial" onClick={() => setSidebarOpen(false)} />
              <SidebarLink to="/weather" icon={<CloudSun size={20} />} label="Clima Externo" onClick={() => setSidebarOpen(false)} />
              
              <div className="my-4 border-t border-slate-800/50"></div>
              
              {/* CORRECCIÓN 1: Eliminado el typo 'mb0-2' por 'mb-2' */}
              <p className="px-4 text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">Ajustes</p>
              
              <SidebarLink to="/config" icon={<Settings size={20} />} label="Configuración IoT" onClick={() => setSidebarOpen(false)} />
            </nav>

            {/* Footer del Sidebar */}
            <div className="p-4 bg-slate-950/50 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                  alt="User" 
                  className="w-10 h-10 rounded-full border-2 border-green-500 bg-slate-800"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">Fernando Rivas</p>
                  <p className="text-xs text-slate-400 truncate">Ingeniero en Sistemas</p>
                </div>
                <button className="text-slate-400 hover:text-red-400"><LogOut size={18} /></button>
              </div>
            </div>
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL SCROLLABLE */}
        <main className="flex-1 w-full h-screen overflow-y-auto bg-slate-50/50">
          <div className="max-w-7xl mx-auto p-4 md:p-8 pt-20 md:pt-10">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/ml" element={<MLPredictions />} />
              <Route path="/weather" element={<GoogleWeather />} />
              
              {/* CORRECCIÓN 2: Cambiada la ruta duplicada '/weather' por '/config' */}
              <Route path="/config" element={<IoTConfig />} />          
            
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

// Componente de Link Inteligente (Detecta ruta activa)
function SidebarLink({ to, icon, label, onClick }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={`flex items-center gap-4 p-3.5 rounded-xl transition-all duration-200 group ${
        isActive 
          ? 'bg-green-600 text-white shadow-lg shadow-green-900/20 font-bold' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <span className={isActive ? 'text-white' : 'group-hover:text-green-400 transition-colors'}>{icon}</span>
      <span className="text-sm">{label}</span>
    </Link>
  );
}