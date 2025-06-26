import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Miembros() {
  const [miembros, setMiembros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagina, setPagina] = useState(1);
  const [overlayIndex, setOverlayIndex] = useState(null);

  // Busca al líder directamente desde los miembros
  const lider = miembros.find(m => m.nombre?.toLowerCase() === "nex");

  // Filtra al líder de la lista si llegara a estar en la base
  const resto = miembros.filter(m => m.nombre?.toLowerCase() !== "nex");

  const porPagina = 12;
  const totalPaginas = Math.ceil(resto.length / porPagina);

  const miembrosPagina = resto.slice((pagina - 1) * porPagina, pagina * porPagina);

  const handleAnterior = () => setPagina(p => Math.max(1, p - 1));
  const handleSiguiente = () => setPagina(p => Math.min(totalPaginas, p + 1));

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

      {/* Bloque del líder */}
      {lider && (
        <div
          className="w-1/3 flex items-center justify-center p-8 relative hidden lg:flex cursor-pointer"
          onClick={() => setOverlayIndex("lider")}
        >
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="group relative w-full max-w-xs"
            style={{ perspective: '1000px' }}
          >
            <div className="relative transition-all duration-300 group-hover:scale-105 transform-gpu">
              <div className="absolute inset-0 bg-gradient-to-r from-neon via-purple to-pink p-1 rounded-2xl opacity-100 animate-glow">
                <div className="w-full h-full bg-cardBg rounded-2xl"></div>
              </div>
              <div className="relative bg-gradient-to-br from-cardBg to-gray-800 rounded-2xl border-2 border-yellow-400 shadow-xl overflow-hidden">
                <div className="relative aspect-square bg-gradient-to-br from-yellow-400/30 to-purple/20 flex items-center justify-center overflow-hidden">
                  {lider.fotoPerfil ? (
                    <img
                      src={lider.fotoPerfil}
                      alt={lider.nombre}
                      className="w-2/3 h-2/3 object-contain rounded-full border-4 border-yellow-400 bg-gray-900"
                    />
                  ) : (
                    <span className="relative z-10 text-yellow-400 text-2xl font-bold font-poppins">👑</span>
                  )}
                </div>
                <div className="p-5 space-y-3">
                  <div className="bg-gradient-to-r from-yellow-400 to-purple-400 rounded-lg px-3 py-2 text-center">
                    <span className="text-black text-lg font-bold">{lider.nombre}</span>
                  </div>
                  <div className="flex justify-between gap-1">
                    <div className="bg-purple/80 rounded px-2 py-1 text-center flex-1">
                      <span className="text-white text-xs font-bold">{lider.rol}</span>
                    </div>
                    <div className="bg-dorado/80 rounded px-2 py-1 text-center">
                      <span className="text-black text-xs font-bold">Lv{lider.nivel}</span>
                    </div>
                    <div className="bg-neon/80 rounded px-2 py-1 text-center ml-1">
                      <span className="text-black text-xs font-bold">GS {lider.gs}</span>
                    </div>
                  </div>
                  <div className="bg-gray-700 rounded px-2 py-1 text-center mt-1">
                    <span className="text-neon text-xs font-semibold">{lider.clase}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

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
          {miembrosPagina.map((miembro, index) => (
            <motion.div
              key={miembro.id}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              className="group relative"
              style={{ perspective: '1000px' }}
            >
              <div
                className="relative transition-all duration-300 group-hover:scale-105 transform-gpu cursor-pointer"
                onClick={() => setOverlayIndex(index)}
              >
                {/* Glowing border for hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-neon via-purple to-pink p-0.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-glow pointer-events-none">
                  <div className="w-full h-full bg-cardBg rounded-xl"></div>
                </div>
                <div className="relative bg-gradient-to-br from-cardBg to-gray-800 rounded-xl border border-white/10 group-hover:border-transparent transition-all duration-300 overflow-hidden">
                  <div className="relative aspect-square bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-neon/20 to-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {miembro.fotoPerfil ? (
                      <img
                        src={miembro.fotoPerfil}
                        alt={miembro.nombre}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <span className="text-neon font-bold text-xs text-center px-2 animate-pulse"
                          style={{
                            textShadow: "0 0 8px #00fff7, 0 0 16px #a855f7, 0 0 32px #00fff7"
                          }}
                        >
                          SOY MANCO<br />PORQUE NO TENGO FOTO
                        </span>
                      </div>
                    )}
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
                      <div className="bg-neon/80 rounded px-2 py-1 text-center ml-1">
                        <span className="text-black text-xs font-bold">GS {miembro.gs}</span>
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

        {/* Paginación */}
        {totalPaginas > 1 && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={handleAnterior}
              disabled={pagina === 1}
              className="px-4 py-2 rounded bg-gray-700 text-white font-bold disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="text-white font-bold">
              Página {pagina} de {totalPaginas}
            </span>
            <button
              onClick={handleSiguiente}
              disabled={pagina === totalPaginas}
              className="px-4 py-2 rounded bg-gray-700 text-white font-bold disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>

      {/* Overlay global para detalles */}
      {overlayIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setOverlayIndex(null)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 40 }}
            transition={{ duration: 0.2 }}
            className="bg-gradient-to-br from-cardBg to-gray-800 rounded-2xl border-2 border-neon p-8 max-w-md w-full mx-4 shadow-2xl flex flex-col items-start text-lg text-left"
            onClick={e => e.stopPropagation()}
          >
            {overlayIndex === "lider"
              ? (
                <>
                  <div className="text-neon font-bold text-3xl mb-4 flex items-center gap-2">
                    <span>👑</span> {lider?.nombre}
                  </div>
                  <div className="flex gap-2 mb-3">
                    <span title="Clase" className="text-xl">🧙‍♂️</span>
                    <span className="text-white text-lg">{lider?.clase}</span>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <span title="Rol" className="text-xl">🛡️</span>
                    <span className="text-white text-lg">{lider?.rol}</span>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <span title="Nivel" className="text-xl">⭐</span>
                    <span className="text-white text-lg">{lider?.nivel}</span>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <span title="GS" className="text-xl">⚔️</span>
                    <span className="text-white text-lg">{lider?.gs}</span>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <span title="Maestría 1" className="text-xl">🪄</span>
                    <span className="text-white text-lg">{lider?.maestria1}</span>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <span title="Maestría 2" className="text-xl">🏹</span>
                    <span className="text-white text-lg">{lider?.maestria2}</span>
                  </div>
                  <div className="text-neon text-base mt-4 italic">
                    <span className="font-bold">Frase favorita: </span>
                    {lider?.frasefavorita || "Sin frase favorita"}
                  </div>
                  <div className="text-neon text-base mt-2 italic">
                    <span className="font-bold">Mensaje personal: </span>
                    {lider?.mensajepersonal || "Sin mensaje personal"}
                  </div>
                </>
              )
              : (
                <>
                  <div className="text-neon font-bold text-3xl mb-4 flex items-center gap-2">
                    <span>👤</span> {miembrosPagina[overlayIndex]?.nombre}
                  </div>
                  <div className="flex gap-2 mb-3">
                    <span title="Clase" className="text-xl">🧙‍♂️</span>
                    <span className="text-white text-lg">{miembrosPagina[overlayIndex]?.clase}</span>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <span title="Rol" className="text-xl">🛡️</span>
                    <span className="text-white text-lg">{miembrosPagina[overlayIndex]?.rol}</span>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <span title="Nivel" className="text-xl">⭐</span>
                    <span className="text-white text-lg">{miembrosPagina[overlayIndex]?.nivel}</span>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <span title="GS" className="text-xl">⚔️</span>
                    <span className="text-white text-lg">{miembrosPagina[overlayIndex]?.gs}</span>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <span title="Maestría 1" className="text-xl">🪄</span>
                    <span className="text-white text-lg">{miembrosPagina[overlayIndex]?.maestria1}</span>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <span title="Maestría 2" className="text-xl">🏹</span>
                    <span className="text-white text-lg">{miembrosPagina[overlayIndex]?.maestria2}</span>
                  </div>
                  <div className="text-neon text-base mt-4 italic">
                    <span className="font-bold">Frase favorita: </span>
                    {miembrosPagina[overlayIndex]?.frasefavorita || "Sin frase favorita"}
                  </div>
                  <div className="text-neon text-base mt-2 italic">
                    <span className="font-bold">Mensaje personal: </span>
                    {miembrosPagina[overlayIndex]?.mensajepersonal || "Sin mensaje personal"}
                  </div>
                </>
              )
            }
            <button
              className="mt-6 px-4 py-2 bg-neon text-black rounded font-bold text-lg"
              onClick={() => setOverlayIndex(null)}
            >
              Cerrar
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
