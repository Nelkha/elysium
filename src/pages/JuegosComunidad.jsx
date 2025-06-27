import { useAuth } from "../hooks/useAuth";
import { useEsAdmin } from "../hooks/useEsAdmin";
import { useNavigate } from "react-router-dom";

export default function JuegosComunidad() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { esAdmin, verificando } = useEsAdmin(user);

  // Puedes tener tu lógica de miembro aparte si lo necesitas

  if (loading || verificando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-darkBg via-black to-cardBg">
        <span className="text-white text-2xl font-poppins">Cargando...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-darkBg via-black to-cardBg">
        <div className="bg-cardBg/80 border border-red-500/40 rounded-3xl p-12 text-center shadow-lg">
          <h2 className="text-3xl font-bold text-red-500 font-poppins mb-4 animate-pulse">
            ¿Qué haces aquí intruso?
          </h2>
          <p className="text-lg text-white font-poppins mb-4">
            Este territorio no te pertenece,
            <br />
            <span className="text-red-400 font-bold">
              aléjate lo más rápido posible o morirás.
            </span>
          </p>
        </div>
      </div>
    );
  }

  // Si no es admin ni miembro (agrega tu lógica de miembro aquí)
  // if (!esMiembro && !esAdmin) { ... }

  // Si es admin o miembro
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-darkBg via-black to-cardBg">
      <button
        onClick={() => navigate("/juegos/historia-sin-fin")}
        className="bg-neon text-black font-bold text-2xl px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition-all animate-pulse"
      >
        Historia sin Fin
      </button>
    </div>
  );
}