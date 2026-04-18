"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STATIONS = [
  { id: 1, title: "La Curva Perfecta", desc: "Introducción a la Distribución Normal", unlocked: true },
  { id: 2, title: "El Centro de Gravedad", desc: "Media vs Mediana", unlocked: true },
  { id: 3, title: "Estirando la Liga", desc: "Desviación Estándar (σ)", unlocked: true },
  { id: 4, title: "La Punta de la Montaña", desc: "Z-Scores y Anomalías", unlocked: true },
  { id: 5, title: "Sesgos Peligrosos", desc: "Qué pasa cuando nada es simétrico", unlocked: true },
  { id: 6, title: "El Examen de la Mentora", desc: "Prueba final Socrática", unlocked: true },
];

export default function CampusPage() {
  const [student, setStudent] = useState("Estudiante");

  useEffect(() => {
    const name = sessionStorage.getItem("student_name");
    if (name) setStudent(name);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 p-8 md:p-16 text-white font-sans relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full max-w-2xl h-96 bg-indigo-600/10 blur-[150px] pointer-events-none" />

      <header className="mb-16 border-b border-white/5 pb-8">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
          Campus de Entrenamiento
        </h1>
        <p className="text-xl text-neutral-400 mt-2 font-light">
          Identificación activa: <span className="text-indigo-400 font-medium">{student}</span>
        </p>
      </header>

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* FASE 1: Estaciones */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <span className="bg-indigo-600/20 text-indigo-400 px-3 py-1 rounded-md text-sm tracking-widest uppercase">Fase 1</span>
              Estaciones Teóricas
            </h2>
            <p className="text-neutral-500">Supera estas lecciones con la Mentora Sigma antes de entrar al laboratorio.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STATIONS.map((station) => (
              <Link key={station.id} href={`/campus/station/${station.id}`}>
                <div className={`p-6 rounded-2xl border transition-all duration-300 h-full flex flex-col justify-between 
                  ${station.unlocked 
                    ? "bg-neutral-900/50 border-neutral-800 hover:border-indigo-500/50 hover:bg-neutral-800/80 cursor-pointer" 
                    : "bg-neutral-900/20 border-neutral-800/50 opacity-50 cursor-not-allowed"}`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-indigo-400 font-mono text-sm">0{station.id}</span>
                      {station.unlocked ? (
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-neutral-200">{station.title}</h3>
                    <p className="text-neutral-400 mt-2 text-sm">{station.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-between items-center">
                    <span className="text-xs tracking-widest text-neutral-500 uppercase font-semibold">Tutoría Activa</span>
                    <span className="text-indigo-400 text-sm">Entrar →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FASE 2: Misiones Avanzadas */}
        <section>
          <div className="mb-8 mt-16">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <span className="bg-cyan-600/20 text-cyan-400 px-3 py-1 rounded-md text-sm tracking-widest uppercase">Fase 2</span>
              Misiones Avanzadas
            </h2>
            <p className="text-neutral-500">Misiones tácticas específicas aplicando los conceptos en el simulador D3.</p>
          </div>
          
          <div className="p-8 border border-neutral-800 bg-neutral-900/30 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-neutral-200">Panel de 15 Misiones de GAUSS LAB</h3>
              <p className="text-neutral-400 mt-2 text-sm max-w-xl">Entra a la sala de comandos para revisar y ejecutar problemas situacionales sobre curtosis y sesgos poblacionales.</p>
            </div>
            <Link href="/missions" className="bg-cyan-900 hover:bg-cyan-800 text-cyan-100 px-8 py-4 rounded-xl font-bold whitespace-nowrap transition">
              Ver Misiones
            </Link>
          </div>
        </section>
        
        {/* FREE PLAY */}
        <section className="pb-24">
          <Link href="/simulator">
            <div className="w-full bg-gradient-to-r from-neutral-900 to-indigo-950/20 border border-indigo-500/20 p-8 rounded-3xl hover:border-indigo-500/50 transition cursor-pointer text-center">
              <p className="text-indigo-400 font-mono text-sm tracking-widest mb-2">MODO EXPERTO</p>
              <h2 className="text-3xl font-bold mb-2">Laboratorio Abierto (Simulador)</h2>
              <p className="text-neutral-500">Acceso directo a la Campana Interactiva Libre</p>
            </div>
          </Link>
        </section>

      </div>
    </div>
  );
}
