import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";

export default function SubirVideo() {
  const { user } = useAuth();
  const [titulo, setTitulo] = useState("");
  const [url, setUrl] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");
    if (!titulo || !url) {
      setError("Completa todos los campos.");
      return;
    }
    if (!/^https:\/\/(www\.)?youtube\.com\/watch\?v=/.test(url)) {
      setError("La URL debe ser de YouTube.");
      return;
    }
    setGuardando(true);
    try {
      await addDoc(collection(db, "videos"), {
        nombre: user?.displayName || user?.email || "",
        titulo,
        url,
        timestamp: serverTimestamp(),
      });
      setExito("¡Video subido correctamente!");
      setTitulo("");
      setUrl("");
    } catch (e) {
      setError("Error al subir el video.");
    }
    setGuardando(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-darkBg via-black to-cardBg">
        <span className="text-white text-2xl font-poppins">Debes iniciar sesión</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-darkBg via-black to-cardBg pt-24"
    >
      <div className="bg-cardBg/80 border border-neon/40 rounded-3xl p-8 shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-neon font-poppins mb-4 text-center">
          Subir Video
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-2">Título del video:</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-800 text-white"
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
              disabled={guardando}
              maxLength={80}
            />
          </div>
          <div>
            <label className="block text-white mb-2">URL de YouTube:</label>
            <input
              type="url"
              className="w-full p-2 rounded bg-gray-800 text-white"
              value={url}
              onChange={e => setUrl(e.target.value)}
              disabled={guardando}
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>
          {error && <div className="text-red-400">{error}</div>}
          {exito && <div className="text-green-400">{exito}</div>}
          <button
            type="submit"
            disabled={guardando}
            className={`w-full py-2 rounded font-bold transition-all ${
              guardando
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-neon text-black hover:scale-105"
            }`}
          >
            {guardando ? "Subiendo..." : "Subir Video"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}