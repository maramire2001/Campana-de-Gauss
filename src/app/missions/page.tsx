"use client";

import Link from "next/link";

export default function MissionsPage() {
  const missions = [
    { id: 1, title: "La Curva Base de Referencia", type: "Normalización", desc: "La campana de Gauss perfecta con media 50. Úsala como tu base de comparación mental.", route: "/simulator?mean=50&stdDev=15&skew=0" },
    { id: 2, title: "Coeficiente Intelectual (IQ)", type: "Normalización", desc: "El IQ global tiene una Media de 100 y una Desviación de 15. Ajusta para la población general.", route: "/simulator?mean=100&stdDev=15&skew=0" },
    { id: 3, title: "Robótica de Precisión", type: "Anomalías (Leptocúrtica)", desc: "Robots cortando láser. La desviación es bajísima (casi nula). Nota cómo la campana se vuelve un pico cerrado.", route: "/simulator?mean=50&stdDev=2&skew=0" },
    { id: 4, title: "Error de Fabricación", type: "Anomalías (Platicúrtica)", desc: "Una fábrica con cero control de calidad. Desviación estándar gigante de 40.", route: "/simulator?mean=50&stdDev=40&skew=0" },
    { id: 5, title: "Examen Reprobado por Mayoría", type: "Sesgo Positivo A", desc: "Casi todos sacaron 30 o 40, pero dos genios sacaron 100, jalando la media engañosamente hacia arriba.", route: "/simulator?mean=40&stdDev=20&skew=2" },
    { id: 6, title: "Desigualdad de Ingresos", type: "Sesgo Positivo B", desc: "Pocos millonarios distorsionando el promedio. Nota qué pasa cuando la Media se aleja hacia la derecha de la Mediana.", route: "/simulator?mean=50&stdDev=20&skew=3" },
    { id: 7, title: "Examen Muy Fácil", type: "Sesgo Negativo A", desc: "Casi todos pasan con 80 o 90, pero algunos sacan 0.", route: "/simulator?mean=80&stdDev=15&skew=-2" },
    { id: 8, title: "Límite de Tiempo Crítico", type: "Sesgo Negativo B", desc: "Un sesgo negativo extremo (-4). Modela el comportamiento límite de la curva matemática.", route: "/simulator?mean=90&stdDev=10&skew=-4" },
    { id: 9, title: "Tiempo de Respuesta Web", type: "Análisis Táctico", desc: "Media 200ms, pero con demoras extrañas (sesgo derecho extremo). Revisa la cola larga.", route: "/simulator?mean=200&stdDev=50&skew=2.5" },
    { id: 10, title: "Vida útil de una Batería", type: "Normalización", desc: "Duración 1000 horas, SD 100 horas. Campana estándar expandida matemáticamente.", route: "/simulator?mean=1000&stdDev=100&skew=0" },
    { id: 11, title: "Altura Femenina", type: "Normalización", desc: "Media real 162cm. Varianza de 6cm. Observa el 99.7% en este rango empírico.", route: "/simulator?mean=162&stdDev=6&skew=0" },
    { id: 12, title: "El Riesgo Financiero Colapsado", type: "Anomalías Extremas", desc: "Las famosas 'Colas Gordas' que causaron el crack de 2008. Desviación 60.", route: "/simulator?mean=0&stdDev=60&skew=0" },
    { id: 13, title: "Frecuencia Cardíaca Deportistas", type: "Anomalías (Leptocúrtica)", desc: "Ritmo bajo (60) y todos muy parecidos. Poca dispersión.", route: "/simulator?mean=60&stdDev=5&skew=0" },
    { id: 14, title: "Demanda de Pasaportes", type: "Sesgo Leve", desc: "Ligeramente tirado a la derecha por fechas atípicas. (Sesgo 0.8)", route: "/simulator?mean=10&stdDev=3&skew=0.8" },
    { id: 15, title: "El Sandbox Extremo", type: "Sandbox Libre", desc: "Misión final. Valores límite rotos para observar la asimetría inestable.", route: "/simulator?mean=50&stdDev=100&skew=-5" }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 p-8 md:p-16 text-white font-sans relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full max-w-2xl h-80 bg-blue-600/10 blur-[150px] pointer-events-none" />
      <Link href="/campus" className="text-neutral-500 hover:text-white mb-8 inline-block relative z-10">← Volver al Campus</Link>
      
      <header className="mb-12 relative z-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-4">
          Panel de 15 Misiones de Entrenamiento
        </h1>
        <p className="text-neutral-400">Selecciona una misión para inyectar los parámetros poblacionales reales (Media, Desviación, Asimetría) directamente en la sala del simulador.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {missions.map(m => (
          <Link key={m.id} href={m.route}>
            <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-3xl hover:border-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition group cursor-pointer h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="text-cyan-500/50 font-mono text-xl group-hover:text-cyan-400 transition">#{m.id}</div>
                  <span className="text-xs tracking-widest text-neutral-500 uppercase px-2 py-1 bg-neutral-800 rounded-md">{m.type}</span>
                </div>
                <h3 className="font-bold text-xl mb-3 text-neutral-200">{m.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{m.desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-800 text-cyan-400 text-sm font-medium flex justify-between">
                <span>Inyectar Parámetros</span>
                <span className="transform group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
