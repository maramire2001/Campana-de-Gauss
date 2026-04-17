"use client";

import { useChat } from "ai/react";
import BellCurve from "@/components/d3/BellCurve";
import { useState } from "react";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleAdmin = () => {
    // Para simplificar al máximo durante tu clase: 
    // Un solo click cambia el modo sin passwords ni cuadros de texto.
    setIsAdmin(!isAdmin);
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-6 md:p-12 font-sans relative overflow-hidden">
      
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
              GAUSS LAB
            </h1>
            <p className="text-xl text-neutral-400 mt-2 font-light">Simulador Interactivo de la Distribución Normal</p>
          </div>
          {isAdmin && (
            <div className="bg-neutral-900 border border-neutral-800 px-6 py-2 rounded-full shadow-inner flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               <span className="text-sm font-semibold tracking-widest text-green-400">ADMIN MODE / BYPASS</span>
            </div>
          )}
        </header>

        {/* Challenge Goal & Simulator Area */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Mission Description (ZONA A) */}
          <div className="lg:col-span-1 border border-neutral-800 bg-neutral-900/50 backdrop-blur-md rounded-2xl p-6 lg:p-8 flex flex-col justify-between shadow-2xl">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">Misión Actual</h2>
              <h3 className="text-2xl font-bold mb-4">El Espejo Perfecto</h3>
              <p className="text-neutral-300 leading-relaxed">
                Mueve los puntos amarillos hasta que la <span className="text-green-400 font-bold">Media</span> y la <span className="text-blue-400 font-bold">Desviación</span> formen una campana simétrica.
                ¿Qué sucede con la forma de la curva (curtosis) si concentras todos los datos en el centro? ¿Y si los separas?
              </p>
            </div>
          </div>

          {/* D3 visualizer (ZONA B & C) */}
          <div className="lg:col-span-2 border border-neutral-800 bg-neutral-900/50 backdrop-blur-md rounded-2xl p-6 overflow-x-auto shadow-2xl">
              <BellCurve />
          </div>
        </section>

        {/* Conclusion / Chat Area (ZONA D) */}
        <section className="border border-neutral-800 bg-neutral-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-indigo-300">
             <span>Mentora Sigma (IA)</span>
          </h3>
          
          <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
            {messages.length === 0 && (
              <p className="text-neutral-500 italic">Escribe tu conclusión sobre lo que observaste al mover los puntos. La Mentora Sigma evaluará tu lógica.</p>
            )}
            {messages.map(m => (
              <div key={m.id} className={`p-4 rounded-xl max-w-[85%] ${m.role === 'user' ? 'bg-indigo-600/20 text-indigo-100 ml-auto border border-indigo-500/30' : 'bg-neutral-800 border border-neutral-700 text-neutral-200'}`}>
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">
                  {m.role === 'user' ? 'Tú (Conclusión)' : 'Mentora Sigma'}
                </p>
                <div className="text-base leading-relaxed">{m.content}</div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 items-center text-neutral-500 p-4">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce delay-100" />
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce delay-200" />
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-4">
            <input 
              value={input}
              onChange={handleInputChange}
              className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ej. 'Al juntar los datos, la desviación estándar se reduce y la campana se vuelve Leptocúrtica...'"
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="bg-indigo-600 hover:bg-indigo-500 transition-colors px-6 py-3 rounded-xl font-bold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed">
              Enviar
            </button>
          </form>
        </section>

      </div>
    </main>
  );
}
