"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [authOk, setAuthOk] = useState(false);
  const [students, setStudents] = useState<any[]>([]);
  const [errorStatus, setErrorStatus] = useState("");

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "doctor") {
      setAuthOk(true);
      fetchStudents();
    } else {
      alert("Clave incorrecta. Pista: doctor");
    }
  };

  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      setStudents(data || []);
      setErrorStatus("");
    } catch (err: any) {
      console.error(err);
      setErrorStatus("Error de conexión a la tabla 'students'. Si no has creado la tabla en Supabase, los alumnos no se reflejarán. Puedes usar este panel cuando la configures.");
    }
  };

  if (!authOk) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 text-white">
        <h2 className="text-2xl font-bold mb-4 text-indigo-400">Panel del Dr. Mario</h2>
        <form onSubmit={handleAuth} className="space-y-4">
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-64 bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2"
            placeholder="Clave Maestra"
          />
          <button className="w-full bg-indigo-600 px-4 py-2 rounded-lg font-bold">Autenticar</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 p-10 text-white">
      <header className="flex justify-between items-center mb-10 border-b border-neutral-800 pb-6">
        <div>
           <h1 className="text-3xl font-bold text-indigo-400">Monitor en Tiempo Real</h1>
           <p className="text-neutral-500">Panel Maestro - Dr. Mario Antonio Ramirez Barajas</p>
        </div>
        <button onClick={fetchStudents} className="bg-neutral-800 px-4 py-2 rounded-lg flex gap-2 items-center hover:bg-neutral-700 transition">
           Actualizar Tabla
        </button>
      </header>

      {errorStatus && (
        <div className="bg-red-900/40 border border-red-500 text-red-300 p-4 rounded-xl mb-6 font-medium">
          ⚠️ {errorStatus}
        </div>
      )}

      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-950 border-b border-neutral-800 text-neutral-400 text-sm uppercase tracking-widest">
              <th className="p-4">Alumno</th>
              <th className="p-4">Grupo</th>
              <th className="p-4">Estatus / Avance</th>
              <th className="p-4">Llegada</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-neutral-500 italic">No hay alumnos registrados aún. Esperando ingresos...</td>
              </tr>
            ) : (
              students.map((stu: any) => (
                <tr key={stu.id || stu.full_name} className="border-b border-neutral-800/50 hover:bg-neutral-800/20 transition-colors">
                  <td className="p-4 font-medium text-indigo-100">{stu.full_name}</td>
                  <td className="p-4 text-neutral-300">{stu.group_section}</td>
                  <td className="p-4">
                    <span className="bg-indigo-900/40 text-indigo-300 px-3 py-1 rounded-full text-xs font-bold border border-indigo-500/30">
                      {stu.current_status || "Iniciando..."}
                    </span>
                  </td>
                  <td className="p-4 text-neutral-500 text-sm">
                    {stu.created_at ? new Date(stu.created_at).toLocaleTimeString() : 'Acaba de entrar'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
