import React from 'react';
import { Brain, CheckCircle } from 'lucide-react';

export default function MLPredictions() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-black mb-6">Análisis de Inteligencia Artificial</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border shadow-sm">
          <div className="flex items-center gap-4 mb-4 text-purple-600">
            <Brain size={32} />
            <h3 className="font-bold text-lg">Modelo: Árbol de Decisión</h3>
          </div>
          <p className="text-gray-600 mb-4">Precisión del modelo: <span className="font-bold text-green-600">84%</span></p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm"><span>Entrenamiento (Training)</span><span className="font-bold">80%</span></div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full w-[80%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}