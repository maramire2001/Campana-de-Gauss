"use client";

import Link from "next/link";
import { MISSIONS_DATA } from "@/lib/missionsData";

export default function MissionsPage() {
  // Extract unique blocks
  const blocks = Array.from(new Set(MISSIONS_DATA.map(m => m.block)));

  return (
    <div className="min-h-screen bg-neutral-950 p-8 md:p-16 text-white font-sans relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full max-w-3xl h-80 bg-blue-600/10 blur-[150px] pointer-events-none" />
      <Link href="/campus" className="text-neutral-500 hover:text-white mb-8 inline-block relative z-10">← Volver al Campus</Link>
      
      <header className="mb-12 relative z-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">
          Panel Táctico de 15 Misiones
        </h1>
        <p className="text-neutral-400 max-w-3xl">Ponte a prueba. Analiza la reflexión, manipula la campana en el simulador y discute tus estrategias con la regla empírica haciendo caso a los Tips de la Mentora Sigma.</p>
      </header>

      <div className="space-y-16 relative z-10">
        {blocks.map((blockName, i) => (
          <div key={i}>
            <h2 className="text-xl font-bold uppercase tracking-widest text-indigo-400 mb-6 border-b border-neutral-800 pb-2">{blockName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MISSIONS_DATA.filter(m => m.block === blockName).map(m => (
                <Link key={m.id} href={`/simulator?id=${m.id}&mean=${m.mean}&stdDev=${m.stdDev}&skew=${m.skew}`}>
                  <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-3xl hover:border-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition group cursor-pointer h-full flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="text-indigo-500 font-mono text-xl group-hover:text-indigo-400 transition">#{m.id}</div>
                      </div>
                      <h3 className="font-bold text-xl mb-3 text-neutral-200">{m.title}</h3>
                      <p className="text-neutral-400 text-sm leading-relaxed mb-4">{m.desc}</p>
                      <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                         <span className="text-xs uppercase tracking-widest text-neutral-500 block mb-1">Reflexión</span>
                         <p className="text-sm text-neutral-300 italic">{m.reflection}</p>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-neutral-800 text-indigo-400 text-sm font-medium flex justify-between">
                      <span>Ir al Simulador y Resolver</span>
                      <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
