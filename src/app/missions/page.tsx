"use client";

import Link from "next/link";

export default function MissionsPage() {
  const missions = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    title: `Misión Operativa 0${i + 1}`,
    type: i < 5 ? "Normalización" : i < 10 ? "Detección de Anomalías" : "Análisis de Sesgo"
  }));

  return (
    <div className="min-h-screen bg-neutral-950 p-8 md:p-16 text-white font-sans">
      <Link href="/campus" className="text-neutral-500 hover:text-white mb-8 inline-block">← Volver al Campus</Link>
      
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">
          Tabla de 15 Misiones
        </h1>
        <p className="text-neutral-400">Selecciona una misión para cargar los parámetros iniciales en la sala del simulador.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {missions.map(m => (
          <Link key={m.id} href="/simulator">
            <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-cyan-500 hover:bg-neutral-800 transition group cursor-pointer">
              <div className="text-cyan-500/50 font-mono text-xl mb-4 group-hover:text-cyan-400 transition">#{m.id}</div>
              <h3 className="font-bold text-lg mb-1">{m.title}</h3>
              <p className="text-neutral-500 text-sm">{m.type}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
