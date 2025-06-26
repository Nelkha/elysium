import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";

// Lista de armas de arco (puedes agregar/quitar)
const ARMAS_ARCHBOSS = [
  // 🔹 Deluzhnoa
  "Deluzhnoa’s Edge of Eternal Frost",
  "Deluzhnoa’s Permafrost Razors",
  "Deluzhnoa’s Arc of Frozen Death",
  "Deluzhnoa’s Ancient Petrified Staff",

  // 🔹 Tevent
  "Tevent’s Fangs of Fury",
  "Tevent’s Warblade of Despair",
  "Tevent’s Arc of Wailing Death",
  "Tevent’s Grasp of Withering",

  // 🔹 Queen Bellandir
  "Queen Bellandir’s Languishing Blade",       // Espada :contentReference[oaicite:1]{index=1}
  "Queen Bellandir’s Toxic Spine Throwers",    // Dagas †
  "Queen Bellandir’s Hivemind Staff",          // Bastón :contentReference[oaicite:2]{index=2}
  "Queen Bellandir’s Serrated Spike",           // Lanza :contentReference[oaicite:3]{index=3}

  // 🔹 Giant Cordy
  "Cordy’s Warblade of Creeping Doom",         // Gran espada :contentReference[oaicite:4]{index=4}
  "Cordy’s Stormspore Spike Slingers",         // Ballesta/Crossbow :contentReference[oaicite:5]{index=5}
  "Cordy’s Grasp of Manipulation"              // Varita (Wand) del T2 de Cordy :contentReference[oaicite:6]{index=6}
];

export default function ModificarWish() {
  const { user, loading } = useAuth();
  const [wish, setWish] = useState(null);
  const [arma, setArma] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const [puedeModificar, setPuedeModificar] = useState(false);

  // Cargar wish actual
  useEffect(() => {
    if (!user) return;
    async function fetchWish() {
      setError("");
      const q = query(
        collection(db, "wishlist"),
        where("email", "==", user.email)
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        const data = snap.docs[0].data();
        setWish({ ...data, id: snap.docs[0].id });
        setArma(data.arma);
        // Verifica si pasaron 2 semanas
        if (data.timestamp?.toDate) {
          const ultima = data.timestamp.toDate();
          const ahora = new Date();
          const diff = (ahora - ultima) / (1000 * 60 * 60 * 24 * 14); // semanas
          setPuedeModificar(diff >= 1);
        } else {
          setPuedeModificar(true);
        }
      } else {
        setWish(null);
        setPuedeModificar(true);
      }
    }
    fetchWish();
  }, [user]);

  const handleGuardar = async () => {
    if (!arma) {
      setError("Selecciona un arma.");
      return;
    }
    setGuardando(true);
    setError("");
    try {
      const nombreMiembro = await obtenerNombreMiembro(user.email);
      await setDoc(
        doc(db, "wishlist", user.email),
        {
          email: user.email,
          nombre: nombreMiembro,
          arma,
          timestamp: serverTimestamp()
        }
      );
      setWish({ email: user.email, nombre: nombreMiembro, arma, timestamp: new Date() });
      setPuedeModificar(false);
    } catch (e) {
      setError("Error al guardar el wish.");
    }
    setGuardando(false);
  };

  const obtenerNombreMiembro = async (email) => {
    const q = query(collection(db, "miembros"), where("email", "==", email));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs[0].data().nombre || "";
    }
    return "";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-darkBg via-black to-cardBg">
        <span className="text-white text-2xl font-poppins">Cargando...</span>
      </div>
    );
  }

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
          Modificar Wishlist de Arco
        </h2>
        {wish && wish.arma ? (
          <div className="mb-4 text-white text-center">
            <span className="font-bold">Tu arma actual en wish:</span>
            <span className="ml-2 text-neon">{wish.arma}</span>
          </div>
        ) : (
          <div className="mb-4 text-gray-400 text-center">
            No tienes item arch seleccionado.
          </div>
        )}
        <div className="mb-4">
          <label className="block text-white mb-2">Selecciona tu arma de arco:</label>
          <select
            className="w-full p-2 rounded bg-gray-800 text-white"
            value={arma}
            onChange={e => setArma(e.target.value)}
            disabled={!puedeModificar || guardando}
          >
            <option value="">Selecciona un arma...</option>
            {ARMAS_ARCHBOSS.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        {error && <div className="text-red-400 mb-2">{error}</div>}
        <button
          onClick={handleGuardar}
          disabled={!puedeModificar || guardando || !arma}
          className={`w-full py-2 rounded font-bold transition-all ${
            puedeModificar && arma
              ? "bg-neon text-black hover:scale-105"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          {guardando ? "Guardando..." : "Guardar"}
        </button>
        {!puedeModificar && (
          <div className="text-yellow-400 mt-4 text-center text-sm">
            Solo puedes modificar tu wish cada 2 semanas.
          </div>
        )}
      </div>
    </motion.div>
  );
}