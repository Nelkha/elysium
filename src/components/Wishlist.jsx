import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWishlist() {
      const snap = await getDocs(collection(db, "wishlist"));
      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setWishlist(data);
      setLoading(false);
    }
    fetchWishlist();
  }, []);

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
        {loading ? (
          <div className="text-white text-center">Cargando...</div>
        ) : wishlist.length === 0 ? (
          <div className="text-gray-400 text-center">No hay wishes registrados.</div>
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
              {wishlist.map(wish => (
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