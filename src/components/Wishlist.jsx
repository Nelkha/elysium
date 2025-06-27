import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth"; // <-- Agrega esto

// Lista de armas (puedes ajustar según tus armas)
const ARMAS = [
  "Deluzhnoa’s Edge of Eternal Frost",
  "Deluzhnoa’s Permafrost Razors",
  "Deluzhnoa’s Arc of Frozen Death",
  "Deluzhnoa’s Ancient Petrified Staff",
  "Deluzhnoa's Serrated Shard",
  "Tevent’s Fangs of Fury",
  "Tevent’s Warblade of Despair",
  "Tevent’s Arc of Wailing Death",
  "Tevent’s Grasp of Withering",
  "Queen Bellandir’s Languishing Blade",
  "Queen Bellandir’s Toxic Spine Throwers",
  "Queen Bellandir’s Hivemind Staff",
  "Queen Bellandir’s Serrated Spike",
  "Cordy’s Warblade of Creeping Doom",
  "Cordy’s Stormspore Spike Slingers",
  "Cordy’s Grasp of Manipulation"
];

export default function Wishlist() {
  const { user, miembro, loading } = useAuth(); // <-- Agrega esto
  const [wishlist, setWishlist] = useState([]);
  const [armaFiltro, setArmaFiltro] = useState("");
  const [loadingWishes, setLoadingWishes] = useState(true);

  useEffect(() => {
    async function fetchWishlist() {
      const snap = await getDocs(collection(db, "wishlist"));
      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setWishlist(data);
      setLoadingWishes(false);
    }
    fetchWishlist();
  }, []);

  // Control de acceso solo para miembros
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-darkBg via-black to-cardBg">
        <span className="text-white text-2xl font-poppins">Cargando...</span>
      </div>
    );
  }

  if (!miembro) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-darkBg via-black to-cardBg">
        <div className="bg-cardBg/80 border border-yellow-500/40 rounded-3xl p-12 text-center shadow-lg">
          <h2 className="text-3xl font-bold text-yellow-400 font-poppins mb-4 animate-pulse">
            Acceso solo para miembros
          </h2>
          <p className="text-lg text-white font-poppins mb-4">
            Debes ser miembro para ver este contenido.
          </p>
        </div>
      </div>
    );
  }

  // Filtrar por arma si hay filtro
  const wishlistFiltrada = armaFiltro
    ? wishlist.filter(wish => wish.arma === armaFiltro)
    : wishlist;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-darkBg via-black to-cardBg pt-24"
    >
      <div className="bg-cardBg/80 border border-neon/40 rounded-3xl p-8 shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-neon font-poppins mb-6 text-center">
          Wishlist de Armas del Gremio
        </h2>
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <label className="text-white font-poppins">Filtrar por arma:</label>
          <select
            className="p-2 rounded bg-gray-800 text-white"
            value={armaFiltro}
            onChange={e => setArmaFiltro(e.target.value)}
          >
            <option value="">Todas</option>
            {ARMAS.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        {loadingWishes ? (
          <div className="text-white text-center">Cargando...</div>
        ) : wishlistFiltrada.length === 0 ? (
          <div className="text-gray-400 text-center">No hay wishes registrados{armaFiltro && " para esa arma"}.</div>
        ) : (
          <table className="w-full text-white font-poppins">
            <thead>
              <tr className="bg-gradient-to-r from-neon to-purple text-black">
                <th className="px-3 py-2 font-bold">Miembro</th>
                <th className="px-3 py-2 font-bold">Arma</th>
                <th className="px-3 py-2 font-bold">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {wishlistFiltrada.map(wish => (
                <tr key={wish.id} className="hover:bg-white/5 transition">
                  <td className="px-3 py-2">{wish.nombre}</td>
                  <td className="px-3 py-2">{wish.arma}</td>
                  <td className="px-3 py-2">
                    {wish.timestamp && wish.timestamp.toDate
                      ? wish.timestamp.toDate().toLocaleDateString("es-AR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
}