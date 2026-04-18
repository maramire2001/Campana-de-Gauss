"use client";

import { useChat } from "ai/react";
import BellCurve from "@/components/d3/BellCurve";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";

import { MISSIONS_DATA } from "@/lib/missionsData";

function SimulatorContent() {
  const searchParams = useSearchParams();
  const rawId = searchParams.get("id");
  const m = Number(searchParams.get("mean")) || 50;
  const dev = Number(searchParams.get("stdDev")) || 15;
  const skew = Number(searchParams.get("skew")) || 0;
  
  const mission = rawId ? MISSIONS_DATA.find(x => x.id === parseInt(rawId)) : null;

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  const med = m - (skew * 5); 

  return (
    <div className="max-w-6xl mx-auto space-y-12 relative z-10 w-full">
      <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
        <div>
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
            GAUSS LAB
          </h1>
          <p className="text-xl text-neutral-400 mt-2 font-light">Simulador Interactivo de la Distribución Normal</p>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 border border-neutral-800 bg-neutral-900/50 backdrop-blur-md rounded-2xl p-6 lg:p-8 flex flex-col justify-between shadow-2xl">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">
              {mission ? `Misión 0${mission.id}` : "Laboratorio Abierto"}
            </h2>
            <h3 className="text-2xl font-bold mb-4">{mission ? mission.title : "Modo Libre"}</h3>
            <p className="text-neutral-300 leading-relaxed">
              {mission ? mission.desc : "Interactúa libremente con la campana."}
            </p>
            
            {mission && (
              <div className="mt-6 p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-xl">
                 <h4 className="text-indigo-300 font-bold mb-1 text-sm">Objetivo Principal:</h4>
                 <p className="text-neutral-300 text-sm italic">{mission.reflection}</p>
                 <p className="text-indigo-400 mt-3 text-xs font-bold uppercase">{mission.tip}</p>
              </div>
            )}

            <div className="mt-8">
                <Link href="/campus" className="px-5 py-2 inline-block rounded-lg bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 transition w-full text-center">← Volver al Menú</Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 border border-neutral-800 bg-neutral-900/50 backdrop-blur-md rounded-2xl p-6 overflow-x-auto shadow-2xl">
            <BellCurve initialMean={m} initialMedian={med} initialDeviation={dev} />
        </div>
      </section>

      <section className="border border-neutral-800 bg-neutral-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-indigo-300">
           <span>Mentora Sigma Libre (IA)</span>
        </h3>
        
        <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
          {messages.length === 0 && (
            <p className="text-neutral-500 italic">Aquí la IA te responderá sobre lo que ocurra libremente en tu simulación...</p>
          )}
          {messages.map(m => (
            <div key={m.id} className={`p-4 rounded-xl max-w-[85%] ${m.role === 'user' ? 'bg-indigo-600/20 text-indigo-100 ml-auto border border-indigo-500/30' : 'bg-neutral-800 border border-neutral-700 text-neutral-200'}`}>
              <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">
                {m.role === 'user' ? 'Tú (Conclusión)' : 'Mentora Sigma'}
              </p>
              <p className="leading-relaxed whitespace-pre-wrap">{m.content}</p>
            </div>
          ))}
          {isLoading && <p className="text-neutral-500 animate-pulse">Escribiendo análisis matemático...</p>}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            required
            value={input}
            onChange={handleInputChange}
            placeholder="Analiza el comportamiento que observas al manipular la gráfica..."
            className="flex-1 bg-neutral-950 border border-neutral-700 hover:border-neutral-600 focus:border-indigo-500 transition-colors rounded-xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 transition-colors rounded-xl font-bold tracking-wide shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
            Validar
          </button>
        </form>

        {mission && (
          <div className="mt-8 pt-6 border-t border-neutral-800 flex justify-center">
            <Link 
              href="/missions"
              className="px-12 py-4 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-black tracking-widest uppercase shadow-[0_0_30px_rgba(34,197,94,0.3)] transition transform hover:scale-105"
            >
              ✅ Concluir Misión y Reportar
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

export default function SimulatorPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-12 font-sans relative overflow-hidden flex flex-col items-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <Suspense fallback={<div className="text-white text-xl animate-pulse">Calibrando componentes D3...</div>}>
         <SimulatorContent />
      </Suspense>
    </div>
  );
}
