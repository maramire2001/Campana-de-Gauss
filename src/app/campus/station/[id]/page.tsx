"use client";

import Link from "next/link";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useChat } from "ai/react";

export default function StationPage({ params }: { params: { id: string } }) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  const stationId = parseInt(params.id) || 1;

  useEffect(() => {
    const studentId = sessionStorage.getItem("student_id");
    if (studentId) {
      supabase.from("students")
        .update({ current_status: `Estación ${stationId}` })
        .eq("id", studentId)
        .then();
    }
  }, [stationId]);

  const contentMap: Record<number, { title: string, text: React.ReactNode }> = {
    1: {
      title: "La Curva Perfecta 📐",
      text: (
        <>
          <p className="text-xl leading-relaxed text-neutral-300">
            La <strong>Distribución Normal</strong> (o Campana de Gauss) es el modelo matemático más importante de toda la estadística. Describe cómo se distribuyen de forma natural muchísimos fenómenos: desde la estatura humana, hasta los errores de medición y las calificaciones de un examen.
          </p>
          <p className="mt-4 text-neutral-400">
            Su característica principal es que la gran mayoría de los datos se agrupan en el centro, y a medida que nos alejamos hacia los extremos (las "colas"), los casos son cada vez más raros. Además, es perfectamente <strong>SIMÉTRICA</strong>: la mitad izquierda es un espejo exacto de la derecha.
          </p>
        </>
      )
    },
    2: {
      title: "El Centro de Gravedad ⚖️",
      text: (
        <>
          <p className="text-xl leading-relaxed text-neutral-300">
            En una distribución perfectamente normal, las tres medidas de tendencia central son <strong>EXACTAMENTE IGUALES</strong> y caen en el mismo punto exacto: la punta de la campana. 
          </p>
          <p className="mt-4 text-neutral-400">
            1. La <strong>Media</strong> (el promedio aritmético).<br/>
            2. La <strong>Mediana</strong> (el valor que divide todo exactamente a la mitad).<br/>
            3. La <strong>Moda</strong> (el valor que más se repite).<br/>
            Cualquier desviación donde la Media se separe de la Mediana, rompe la simetría y crea un "sesgo".
          </p>
        </>
      )
    },
    3: {
      title: "Estirando la Liga 📏",
      text: (
        <>
          <p className="text-xl leading-relaxed text-neutral-300">
            La <strong>Desviación Estándar (σ)</strong> dicta qué tan "gorda" o "flaca" es tu campana. Es la medida promedio de qué tan dispersos están todos los puntos respecto al centro.
          </p>
          <p className="mt-4 text-neutral-400">
            Si la desviación es muy baja, la campana será estrecha y alta (llamada leptocúrtica), porque casi todos sacaron la misma calificación. Si es muy alta, la campana es plana y ancha (platicúrtica), demostrando que hay muchísima diversidad o desigualdad en los datos.
          </p>
        </>
      )
    },
    4: {
      title: "La Regla Empírica y Z-Scores 🧗",
      text: (
        <>
          <p className="text-xl leading-relaxed text-neutral-300">
            La regla de oro estadística dicta que en una distribución normal perfecta: el <strong>68%</strong> de los datos caen a 1 desviación estándar del centro, el <strong>95%</strong> a 2, y el <strong>99.7%</strong> a 3.
          </p>
          <p className="mt-4 text-neutral-400">
            Un <strong>Z-Score</strong> nos indica a cuántas "desviaciones estándar" de distancia está un dato respecto a la media. Si un alumno tiene un Z-score de +3, significa que tuvo un desempeño excepcional, superando al 99.8% de toda su clase. Un resultado por encima de 3 es virtualmente una anomalía.
          </p>
        </>
      )
    },
    5: {
      title: "Sesgos Peligrosos 🎢",
      text: (
        <>
          <p className="text-xl leading-relaxed text-neutral-300">
            El mundo rara vez es perfecto. Cuando decimos que una población tiene un <strong>Sesgo Positivo (Asimetría a la derecha)</strong>, la "cola" larga apunta hacia los números altos. Esto jala la Media hacia arriba, dejando atrás a la Mediana.
          </p>
          <p className="mt-4 text-neutral-400">
            Por ejemplo, la distribución de la riqueza mundial tiene un fuerte sesgo positivo: hay muy pocos millonarios (cola larga derecha), pero arrastran el promedio aritmético hacia arriba, distorsionando la realidad económica del ciudadano común (la Mediana).
          </p>
        </>
      )
    },
    6: {
      title: "El Examen de Síntesis 🧠",
      text: (
        <>
          <p className="text-xl leading-relaxed text-neutral-300">
            Llegaste al checkpoint final antes del laboratorio. Debes demostrar que no estuviste leyendo en automático.
          </p>
          <p className="mt-4 text-neutral-400">
            Toda herramienta estadística avanzada (como inferencias, pruebas T, o modelos de machine learning clásicos) ASUME que tus datos son "Normales". Si tu campana de Gauss está rota (muy sesgada o deforme), tus predicciones matemáticas colapsarán. Explícale a la IA Mentora por qué es tan peligroso ignorar la normalidad.
          </p>
        </>
      )
    }
  };

  const station = contentMap[stationId] || contentMap[1];

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-12 font-sans flex flex-col md:flex-row gap-8">
      
      {/* Columna Izquierda: Lectura Teórica */}
      <div className="flex-1 max-w-3xl">
        <Link href="/campus" className="text-neutral-500 hover:text-white mb-8 inline-block">← Volver al Campus</Link>
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 mb-8">
          <h1 className="text-3xl font-extrabold text-indigo-400 mb-6">{station.title}</h1>
          <div className="prose prose-invert prose-indigo max-w-none">
            {station.text}
            <div className="mt-8 p-6 bg-indigo-900/20 border border-indigo-500/30 rounded-xl">
              <h3 className="text-indigo-300 font-bold mb-2">Desafío Mentora Sigma</h3>
              <p className="text-neutral-300">
                Lee el texto de arriba y usa tu razonamiento lógico en el chat de la derecha. Explícale a la Mentora con tus propias palabras qué entendiste de este concepto. No te dejará avanzar al simulador hasta que esté convencida de que lo entiendes profundamente.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap gap-4">
            <Link 
              href="/campus"
              className="px-8 py-4 bg-neutral-800 hover:bg-neutral-700 rounded-xl font-bold transition flex-1 text-center"
            >
              ← Terminar y Volver al Mapa
            </Link>
            {stationId < 6 && (
              <Link 
                href={`/campus/station/${stationId + 1}`}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold transition flex-1 text-center"
              >
                Siguiente Estación →
              </Link>
            )}
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
