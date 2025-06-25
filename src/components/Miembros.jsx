import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Miembros() {
  const [miembros, setMiembros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMiembros() {
      const snapshot = await getDocs(collection(db, "miembros"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMiembros(data);
      setLoading(false);
    }
    fetchMiembros();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-darkBg via-black to-cardBg">
        <span className="text-white text-2xl font-poppins">Cargando miembros...</span>
      </div>
    );
  }

  // El líder (vacío por ahora)
  // const lider = miembros.find(m => m.acceso === "admin") || miembros[0];
  // const resto = miembros.filter(m => m.id !== lider?.id);
  const resto = miembros;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-darkBg via-black to-cardBg pt-20 flex flex-col lg:flex-row relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(0,255,255,0.3) 180deg, transparent 360deg),
            conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(139,92,246,0.3) 180deg, transparent 360deg)
          `,
        }}></div>
      </div>

      {/* Bloque del líder vacío por ahora */}
      <div className="w-1/3 flex items-center justify-center p-8 relative hidden lg:flex">
        {/* Aquí puedes poner el líder más adelante */}
      </div>

      {/* Members Grid on the right */}
      <div className="flex-1 p-8 relative z-10 flex flex-col gap-8">
        <motion.h2 
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-white mb-8 font-poppins text-center"
        >
          <span className="bg-gradient-to-r from-neon to-purple bg-clip-text text-transparent">
            Miembros del Gremio
          </span>
        </motion.h2>

        {/* Grid de miembros */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {resto.map((miembro, index) => (
            <motion.div
              key={miembro.id}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              className="group relative"
              style={{ perspective: '1000px' }}
            >
              <div className="relative transition-all duration-300 group-hover:scale-105 transform-gpu">
                {/* Glowing border for hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-neon via-purple to-pink p-0.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-glow">
                  <div className="w-full h-full bg-cardBg rounded-xl"></div>
                </div>
                <div className="relative bg-gradient-to-br from-cardBg to-gray-800 rounded-xl border border-white/10 group-hover:border-transparent transition-all duration-300 overflow-hidden">
                  <div className="relative aspect-square bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-neon/20 to-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 text-gray-400 text-sm font-medium">Avatar</span>
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg px-3 py-2 text-center group-hover:from-neon/20 group-hover:to-purple/20 transition-all duration-300">
                      <span className="text-white text-sm font-bold group-hover:text-neon transition-colors">{miembro.nombre}</span>
                    </div>
                    <div className="flex justify-between gap-1">
                      <div className="bg-purple/80 rounded px-2 py-1 text-center flex-1">
                        <span className="text-white text-xs font-bold">{miembro.rol}</span>
                      </div>
                      <div className="bg-dorado/80 rounded px-2 py-1 text-center">
                        <span className="text-black text-xs font-bold">Lv{miembro.nivel}</span>
                      </div>
                    </div>
                    {/* Mostrar la clase */}
                    <div className="bg-gray-700 rounded px-2 py-1 text-center mt-1">
                      <span className="text-neon text-xs font-semibold">{miembro.clase}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
