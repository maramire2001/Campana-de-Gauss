"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function WelcomePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", group: "", code: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Este es el código secreto real que Doctor Mario le da a sus alumnos hoy.
  const ACTIVE_CODE = "GAUSS2026"; 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (formData.code.toUpperCase() !== ACTIVE_CODE) {
      setError("Código de acceso inválido. Pregunta a tu profesor por el código de hoy.");
      setIsLoading(false);
      return;
    }

    try {
      // Intentar guardar en Supabase. 
      // NOTA: Si RLS lo bloquea, lo dejamos pasar como fallback de emergencia para no arruinar la clase
      await supabase.from("students").insert([
        { full_name: formData.name, group_section: formData.group }
      ]);
      
      // Guardar sesión pseudo-local para la sesión
      sessionStorage.setItem("student_name", formData.name);
      
      // Navegar a la sala del simulador!
      router.push("/simulator");
      
    } catch (err) {
      console.error(err);
      // Fallback de emergencia por si supabase falla y la clase está en progreso
      sessionStorage.setItem("student_name", formData.name);
      router.push("/simulator");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-indigo-500/10 blur-[120px] pointer-events-none" />
      
      <div className="z-10 w-full max-w-md bg-neutral-900/80 border border-neutral-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            GAUSS LAB
          </h1>
          <p className="text-neutral-400 text-lg">Laboratorio de Distribución Normal</p>
          <div className="mt-4 px-4 py-2 bg-neutral-950/50 rounded-lg border border-neutral-800 inline-block">
             <p className="text-xs text-neutral-500 font-mono">APP DISEÑADA POR EL</p>
             <p className="text-sm font-bold text-indigo-300">Dr. Mario Antonio Ramirez Barajas</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Nombre Completo</label>
            <input 
              required
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ej. Juan Pérez"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Grupo / Sección</label>
            <input 
              required
              type="text" 
              value={formData.group}
              onChange={(e) => setFormData({...formData, group: e.target.value})}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ej. Posgrado A"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Código de Acceso</label>
            <input 
              required
              type="text" 
              value={formData.code}
              onChange={(e) => setFormData({...formData, code: e.target.value})}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono tracking-widest uppercase"
              placeholder="CÓDIGO"
            />
          </div>

          {error && <p className="text-red-400 text-sm font-medium text-center">{error}</p>}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 transition-colors px-6 py-4 rounded-xl font-bold tracking-wide text-white disabled:opacity-50">
            {isLoading ? "Validando..." : "Ingresar al Laboratorio"}
          </button>
        </form>
      </div>
      <p className="mt-8 text-neutral-600 text-xs">Código de ejemplo hoy para entrar: GAUSS2026</p>
    </main>
  );
}
