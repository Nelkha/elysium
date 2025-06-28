import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc, addDoc, serverTimestamp, runTransaction } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import { useEsAdmin } from "../hooks/useEsAdmin";
import { sendEmail } from "../utils/sendEmail"; // Debes crear esta función según tu proveedor de emails

const estados = ["todas", "pendiente", "aprobada", "rechazada"];

export default function AdminSolicitudes() {
  const { user, loading } = useAuth();
  const { esAdmin, verificando } = useEsAdmin(user);
  const [solicitudes, setSolicitudes] = useState([]);
  const [error, setError] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todas");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [showMotivo, setShowMotivo] = useState(false);
  const [motivoRechazo, setMotivoRechazo] = useState("");
  const [motivoOtro, setMotivoOtro] = useState("");
  const [solicitudRechazo, setSolicitudRechazo] = useState(null);
  const [procesandoId, setProcesandoId] = useState(null);

  useEffect(() => {
    if (!loading && !verificando && user && esAdmin) {
      getDocs(collection(db, "solicitudes"))
        .then((snapshot) => {
          setSolicitudes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        })
        .catch(() => setError("Error al cargar solicitudes"));
    }
  }, [user, loading, esAdmin, verificando]);

  const handleEstado = async (id, nuevoEstado) => {
    try {
      await updateDoc(doc(db, "solicitudes", id), { estado: nuevoEstado });
      setSolicitudes(solicitudes =>
        solicitudes.map(s =>
          s.id === id ? { ...s, estado: nuevoEstado } : s
        )
      );
    } catch {
      alert("Error al actualizar estado");
    }
  };

  async function handleAprobar(solicitud) {
    setProcesandoId(solicitud.id);
    let codigo = ""; // Declarar fuera
    try {
      await runTransaction(db, async (transaction) => {
        const solicitudRef = doc(db, "solicitudes", solicitud.id);
        const solicitudSnap = await transaction.get(solicitudRef);

        if (!solicitudSnap.exists() || solicitudSnap.data().estado !== "pendiente") {
          throw new Error("La solicitud ya fue procesada por otro administrador.");
        }

        codigo = generarCodigoUnico(solicitud); // Asignar dentro

        const codigosRef = collection(db, "codigos_registro");
        transaction.set(doc(codigosRef), {
          email: solicitud.email,
          codigo,
          usado: false,
          creado: serverTimestamp()
        });

        transaction.update(solicitudRef, {
          estado: "aprobada",
          codigoRegistro: codigo,
          codigoUsado: false
        });
      });

      // Ahora sí, aquí tienes acceso al valor correcto de "codigo"
      await sendEmail({
        to: solicitud.email,
        subject: "¡Solicitud aprobada!",
        text: `¡Felicitaciones! Tu solicitud fue aprobada. Usa este código único para registrarte: ${codigo}`
      });

      // Recarga las solicitudes desde Firestore
      const snapshot = await getDocs(collection(db, "solicitudes"));
      setSolicitudes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      setError(err.message || "Error al aprobar la solicitud");
    } finally {
      setProcesandoId(null);
    }
  }

  function handleRechazarPopup(solicitud) {
    setSolicitudRechazo(solicitud);
    setShowMotivo(true);
    setMotivoRechazo("");
    setMotivoOtro("");
  }

  async function handleRechazoFinal() {
    setProcesandoId(solicitudRechazo.id);
    try {
      let motivo = motivoRechazo === "otro" ? motivoOtro : motivoRechazo;
      await runTransaction(db, async (transaction) => {
        const solicitudRef = doc(db, "solicitudes", solicitudRechazo.id);
        const solicitudSnap = await transaction.get(solicitudRef);

        // Verifica que siga pendiente
        if (!solicitudSnap.exists() || solicitudSnap.data().estado !== "pendiente") {
          throw new Error("La solicitud ya fue procesada por otro administrador.");
        }

        transaction.update(solicitudRef, { estado: "rechazada" });
      });

      await sendEmail({
        to: solicitudRechazo.email,
        subject: "Solicitud rechazada",
        text: `Lamentablemente tu solicitud fue rechazada. Motivo: ${motivo}`
      });
      setShowMotivo(false);
      setSolicitudRechazo(null);

      // Recarga las solicitudes desde Firestore
      const snapshot = await getDocs(collection(db, "solicitudes"));
      setSolicitudes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      setError(err.message || "Error al rechazar la solicitud");
    } finally {
      setProcesandoId(null);
    }
  }

  // Filtro por estado y fechas
  const solicitudesFiltradas = solicitudes.filter(s => {
    let ok = true;
    if (filtroEstado !== "todas") ok = s.estado === filtroEstado;
    if (ok && fechaDesde) {
      const fecha = s.fechasolicitud?.seconds
        ? new Date(s.fechasolicitud.seconds * 1000)
        : new Date(s.fechasolicitud);
      ok = fecha >= new Date(fechaDesde);
    }
    if (ok && fechaHasta) {
      const fecha = s.fechasolicitud?.seconds
        ? new Date(s.fechasolicitud.seconds * 1000)
        : new Date(s.fechasolicitud);
      ok = fecha <= new Date(fechaHasta);
    }
    return ok;
  });

  function generarCodigoUnico(solicitud) {
    const base = `${solicitud.nombre}|${solicitud.email}|${solicitud.nivel}|${solicitud.clase}|${Date.now()}|${Math.random()}`;
    // Hash simple usando btoa y un poco de ofuscación
    return btoa(unescape(encodeURIComponent(base)))
      .replace(/=/g, '')
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('')
      .substring(0, 16); // 16 caracteres
  }

  if (loading || verificando) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-darkBg via-black to-cardBg">
      <span className="text-white text-2xl font-poppins">Cargando...</span>
    </div>
  );
  if (!user) {
    const idioma = navigator.language || navigator.userLanguage;
    const userAgent = navigator.userAgent;
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-darkBg via-black to-cardBg">
        <div className="bg-cardBg/80 border border-red-500/40 rounded-3xl p-12 text-center shadow-lg">
          <h2 className="text-3xl font-bold text-red-500 font-poppins mb-4 animate-pulse">
            ¿Qué haces aquí intruso?
          </h2>
          <p className="text-lg text-white font-poppins mb-4">
            Este territorio no te pertenece,<br />
            <span className="text-red-400 font-bold">aléjate lo más rápido posible o morirás.</span>
          </p>
          <div className="mt-6 text-sm text-gray-400 font-mono">
            <div>🌐 Idioma detectado: <span className="text-neon">{idioma}</span></div>
            <div className="truncate max-w-xs mx-auto">🖥️ Navegador: <span className="text-neon">{userAgent}</span></div>
          </div>
        </div>
      </div>
    );
  }
  if (!esAdmin) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-darkBg via-black to-cardBg">
      <div className="bg-cardBg/80 border border-yellow-500/40 rounded-3xl p-12 text-center shadow-lg">
        <h2 className="text-3xl font-bold text-yellow-400 font-poppins mb-4">
          Acceso solo para administradores.
        </h2>
        <p className="text-lg text-white font-poppins">
          No tienes permisos para ver esta sección.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-darkBg via-black to-cardBg pt-24 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white mb-8 font-poppins">Solicitudes</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Filtros alineados con la tabla */}
      <div className="flex flex-wrap gap-4 mb-6 w-full max-w-full justify-start items-end">
        <select
          value={filtroEstado}
          onChange={e => setFiltroEstado(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          {estados.map(e => (
            <option key={e} value={e}>{e.charAt(0).toUpperCase() + e.slice(1)}</option>
          ))}
        </select>
        <input
          type="date"
          value={fechaDesde}
          onChange={e => setFechaDesde(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        />
        <input
          type="date"
          value={fechaHasta}
          onChange={e => setFechaHasta(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        />
      </div>

      <div className="w-full max-w-full overflow-x-auto">
        <table className="min-w-[1100px] w-full text-left text-white font-poppins">
          <thead>
            <tr className="bg-gradient-to-r from-neon to-purple text-black">
              <th className="px-3 py-2 font-bold">Nombre</th>
              <th className="px-3 py-2 font-bold">Clase</th>
              <th className="px-3 py-2 font-bold">Rol</th>
              <th className="px-3 py-2 font-bold">Nivel</th>
              <th className="px-3 py-2 font-bold">GS</th> {/* Nueva columna */}
              <th className="px-3 py-2 font-bold">Estado</th>
              <th className="px-3 py-2 font-bold">Fecha</th>
              <th className="px-3 py-2 font-bold">Mensaje</th>
              <th className="px-3 py-2 font-bold">Proveedor</th>
              <th className="px-3 py-2 font-bold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {solicitudesFiltradas.length === 0 && (
              <tr>
                <td colSpan={10} className="text-center py-8 text-gray-400">No hay solicitudes.</td>
              </tr>
            )}
            {solicitudesFiltradas.map(s => (
              <tr key={s.id} className="hover:bg-white/5 transition">
                <td className="px-3 py-2">{s.nombre}</td>
                <td className="px-3 py-2">{s.clase}</td>
                <td className="px-3 py-2">{s.rol}</td>
                <td className="px-3 py-2">{s.nivel}</td>
                <td className="px-3 py-2">{s.gs}</td> {/* Muestra GS */}
                <td className="px-3 py-2 text-center">
                  {s.estado === "aprobada" && <span title="Aprobada" className="text-green-400 text-xl">✔️</span>}
                  {s.estado === "pendiente" && <span title="Pendiente" className="text-yellow-400 text-xl">⏳</span>}
                  {s.estado === "rechazada" && <span title="Rechazada" className="text-red-400 text-xl">❌</span>}
                </td>
                <td className="px-3 py-2">
                  {s.fechasolicitud
                    ? (typeof s.fechasolicitud === "string"
                        ? s.fechasolicitud
                        : new Date(s.fechasolicitud.seconds * 1000).toLocaleString("es-AR"))
                    : ""}
                </td>
                <td className="px-3 py-2">{s.mensaje}</td>
                <td className="px-3 py-2">
                  {s.email?.split("@")[1]?.split(".")[0] || ""}
                </td>
                <td className="px-3 py-2">
                  {s.estado === "pendiente" && (
                    <div className="flex gap-2">
                      <button
                        title="Aprobar"
                        onClick={() => handleAprobar(s)}
                        className="text-green-400 hover:text-green-600 text-xl"
                        disabled={procesandoId === s.id}
                      >
                        {procesandoId === s.id ? (
                          <span className="animate-spin inline-block w-5 h-5 border-2 border-green-400 border-t-transparent rounded-full"></span>
                        ) : "✔️"}
                      </button>
                      <button
                        title="Rechazar"
                        onClick={() => handleRechazarPopup(s)}
                        className="text-red-400 hover:text-red-600 text-xl"
                        disabled={procesandoId === s.id}
                      >
                        {procesandoId === s.id ? (
                          <span className="animate-spin inline-block w-5 h-5 border-2 border-red-400 border-t-transparent rounded-full"></span>
                        ) : "❌"}
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup para motivo de rechazo */}
      {showMotivo && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-cardBg p-8 rounded-2xl shadow-xl text-white w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Motivo de rechazo</h2>
            <select
              className="w-full mb-4 p-2 rounded text-black"
              value={motivoRechazo}
              onChange={e => setMotivoRechazo(e.target.value)}
            >
              <option value="">Selecciona un motivo</option>
              <option value="bajo gs">Bajo GS</option>
              <option value="no estamos reclutando tu clase">No estamos reclutando tu clase</option>
              <option value="otro">Otro</option>
            </select>
            {motivoRechazo === "otro" && (
              <textarea
                className="w-full mb-4 p-2 rounded text-black"
                placeholder="Escribe el motivo..."
                value={motivoOtro}
                onChange={e => setMotivoOtro(e.target.value)}
              />
            )}
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setShowMotivo(false)}
                className="bg-gray-600 px-4 py-2 rounded"
              >Cancelar</button>
              <button
                onClick={handleRechazoFinal}
                className="bg-red-500 px-4 py-2 rounded"
                disabled={!motivoRechazo || (motivoRechazo === "otro" && !motivoOtro.trim())}
              >Enviar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}