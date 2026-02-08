import React from 'react';
import { CloudSun, Wind, Droplets } from 'lucide-react';

export default function GoogleWeather() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-black mb-6">Pronóstico Externo</h2>
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-8 rounded-[2.5rem] text-white shadow-xl">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-5xl font-black">21°C</p>
            <p className="text-xl opacity-80 font-bold">San Francisco Magú, Méx.</p>
          </div>
          <CloudSun size={80} />
        </div>
      </div>
    </div>
  );
}