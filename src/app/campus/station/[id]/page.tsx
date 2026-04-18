"use client";

import Link from "next/link";
import { useChat } from "ai/react";

export default function StationPage({ params }: { params: { id: string } }) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  const title = `Estación Teórica 0${params.id}`;

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-12 font-sans flex flex-col md:flex-row gap-8">
      
      {/* Columna Izquierda: Lectura Teórica */}
      <div className="flex-1 max-w-3xl">
        <Link href="/campus" className="text-neutral-500 hover:text-white mb-8 inline-block">← Volver al Campus</Link>
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 mb-8">
          <h1 className="text-3xl font-extrabold text-indigo-400 mb-6">{title}</h1>
          <div className="prose prose-invert prose-indigo max-w-none">
            <p className="text-xl leading-relaxed text-neutral-300">
              Bienvenido a la estación teórica. Aquí es donde pondremos el concepto exacto que deseas que el alumno aprenda en esta etapa.
            </p>
            <p className="mt-4 text-neutral-400">
              Por ejemplo, si esta es la estación sobre <strong>La Curtosis</strong>, aquí habrá una lectura de dos párrafos explicando cómo interactúa la desviación estándar al concentrar los datos en el centro...
            </p>
            <div className="mt-8 p-6 bg-indigo-900/20 border border-indigo-500/30 rounded-xl">
              <h3 className="text-indigo-300 font-bold mb-2">Desafío Mentora Sigma</h3>
              <p className="text-neutral-300">
                Lee el texto de arriba y usa tu razonamiento lógico en el chat de la derecha. Explícale a la Mentora con tus propias palabras qué entendiste de este concepto. No te dejará avanzar al simulador hasta que esté convencida de que lo entiendes profundamente.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Columna Derecha: IA Tutora */}
      <div className="w-full md:w-[450px] flex flex-col pt-12 md:pt-0">
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl flex-1 flex flex-col overflow-hidden max-h-[800px]">
          <div className="p-6 border-b border-neutral-800 bg-neutral-950">
             <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Mentora Sigma (IA)</h2>
             <p className="text-sm text-neutral-500">Evaluadora Socrática Activa</p>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.length === 0 && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center font-bold">Σ</div>
                <div>
                  <div className="bg-neutral-800 text-white rounded-2xl rounded-tl-sm p-4 text-sm prose prose-invert">
                    Hola. Soy tu Mentora Sigma. Cuéntame, después de leer tu texto de la izquierda, ¿cuál es tu conclusión principal?
                  </div>
                </div>
              </div>
            )}
            
            {messages.map(m => (
              <div key={m.id} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {m.role !== 'user' && (
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center font-bold text-xs">Σ</div>
                )}
                <div>
                  <div className={`rounded-2xl p-4 text-sm whitespace-pre-wrap ${
                    m.role === 'user' 
                      ? 'bg-neutral-700 text-white rounded-tr-sm' 
                      : 'bg-neutral-800 text-white rounded-tl-sm prose prose-invert'
                  }`}>
                    {m.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center font-bold text-xs animate-pulse">Σ</div>
                 <div className="bg-neutral-800 rounded-2xl rounded-tl-sm p-4 animate-pulse w-32 flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-neutral-500" />
                   <div className="w-2 h-2 rounded-full bg-neutral-500" />
                   <div className="w-2 h-2 rounded-full bg-neutral-500" />
                 </div>
               </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-neutral-800 bg-neutral-950 relative">
            <textarea
              required
              value={input}
              onChange={handleInputChange}
              placeholder="Explica tu razonamiento aquí..."
              className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-4 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              rows={3}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e as any);
                }
              }}
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="absolute right-8 bottom-8 text-indigo-400 hover:text-indigo-300 disabled:opacity-50"
            >
              Enviar ↗
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}
