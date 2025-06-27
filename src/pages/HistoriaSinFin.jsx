import { useEffect, useState, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import { useEsAdmin } from "../hooks/useEsAdmin";
import {
  doc,
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc,
  increment,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const HISTORIA_ID = "principal";

export default function HistoriaSinFin() {
  // TODOS LOS HOOKS VAN AQUÍ
  const { user, esMiembro, miembro, loading } = useAuth();
  const { esAdmin, verificando } = useEsAdmin(user);
  const [participando, setParticipando] = useState(false);
  const [numeroParticipante, setNumeroParticipante] = useState(null);
  const [turnoActual, setTurnoActual] = useState(null);
  const [turnoEsMio, setTurnoEsMio] = useState(false);
  const [historias, setHistorias] = useState([]);
  const [texto, setTexto] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [aviso, setAviso] = useState("");
  const [confirmarSalir, setConfirmarSalir] = useState(false);
  const [participantes, setParticipantes] = useState([]);
  const historiasRef = collection(db, "historias", HISTORIA_ID, "turnos");
  const participantesRef = collection(db, "historias", HISTORIA_ID, "participantes");
  const historiaDocRef = doc(db, "historias", HISTORIA_ID);
  const slideRef = useRef(null);

  // Tus useEffect aquí (sin returns antes)
  useEffect(() => {
    if (!user) return;
    const unsub = onSnapshot(participantesRef, snap => {
      const parts = snap.docs.map(d => ({ ...d.data(), id: d.id }));
      setParticipantes(parts);
      const yo = parts.find(p => p.email === user.email);
      setParticipando(!!yo);
      setNumeroParticipante(yo?.numeroParticipante || null);
    });
    return () => unsub();
  }, [user]);

  useEffect(() => {
    const unsub = onSnapshot(historiaDocRef, docSnap => {
      const data = docSnap.data();
      setTurnoActual(data?.turnoActual || null);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const q = query(historiasRef, orderBy("timestamp", "asc"));
    const unsub = onSnapshot(q, snap => {
      setHistorias(snap.docs.map(d => d.data()));
      setTimeout(() => {
        if (slideRef.current) {
          slideRef.current.scrollTop = slideRef.current.scrollHeight;
        }
      }, 100);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    setTurnoEsMio(numeroParticipante && turnoActual === numeroParticipante);
  }, [numeroParticipante, turnoActual]);

  useEffect(() => {
    // Solo si hay participantes y turno asignado
    if (
      participantes.length > 1 &&
      turnoActual &&
      historiaDocRef
    ) {
      // Busca el participante al que le toca
      const participanteTurno = participantes.find(p => p.numeroParticipante === turnoActual);
      // Busca el timestamp del último turno
      getDoc(historiaDocRef).then((docSnap) => {
        const data = docSnap.data();
        if (!data?.timestampUltimoTurno) return;
        const ultimoTurno = data.timestampUltimoTurno.toDate
          ? data.timestampUltimoTurno.toDate()
          : new Date(data.timestampUltimoTurno.seconds * 1000);
        const ahora = new Date();
        const diffHoras = (ahora - ultimoTurno) / (1000 * 60 * 60);
        if (diffHoras >= 6) {
          // Pasaron más de 6 horas, reasignar turno a otro participante al azar
          const otros = participantes.filter(
            (p) => p.numeroParticipante !== turnoActual
          );
          if (otros.length > 0) {
            const siguiente = otros[Math.floor(Math.random() * otros.length)];
            updateDoc(historiaDocRef, {
              turnoActual: siguiente.numeroParticipante,
              timestampUltimoTurno: serverTimestamp(),
            });
          }
        }
      });
    }
    // Solo se ejecuta cuando cambia el turno o los participantes
  }, [turnoActual, participantes]);

  // --- RETURNS CONDICIONALES DESPUÉS DE LOS HOOKS ---
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
            Este territorio no te pertenece,<br />
            <span className="text-red-400 font-bold">aléjate lo más rápido posible o morirás.</span>
          </p>
        </div>
      </div>
    );
  }

  if (!esMiembro && !esAdmin) {
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

  // Inscribirse
  const inscribirse = async () => {
    setAviso("");
    try {
      // Buscar el menor número libre
      const snap = await getDocs(participantesRef);
      const usados = snap.docs.map(d => d.data().numeroParticipante);
      let n = 1;
      while (usados.includes(n)) n++;

      // Asegúrate de que el documento principal existe
      const docSnap = await getDoc(historiaDocRef);
      if (!docSnap.exists()) {
        await setDoc(historiaDocRef, {
          participantesTotales: 0,
          turnoActual: null,
          timestampUltimoTurno: serverTimestamp(),
        });
      }

      await setDoc(doc(participantesRef, user.email), {
        email: user.email,
        nombre: miembro?.nombre ?? user.displayName ?? user.email,
        numeroParticipante: n,
        timestampInscripcion: serverTimestamp(),
      });
      await updateDoc(historiaDocRef, { participantesTotales: increment(1) });

      // Obtén tu número real de participante desde la base de datos
      const yoDoc = await getDoc(doc(participantesRef, user.email));
      const miNumero = yoDoc.data().numeroParticipante;

      // Si eres el único participante o el turno no está asignado, te toca empezar
      const docSnap2 = await getDoc(historiaDocRef);
      const data = docSnap2.data();
      const snap2 = await getDocs(participantesRef);
      const soloUno = snap2.size === 1;
      if (soloUno || !data.turnoActual) {
        await updateDoc(historiaDocRef, {
          turnoActual: miNumero,
          timestampUltimoTurno: serverTimestamp(),
        });
      }
    } catch (e) {
      setAviso("Error al participar: " + e.message);
    }
  };

  // Dejar de participar
  const dejarParticipar = async () => {
    setAviso("");
    setConfirmarSalir(false);
    try {
      // Si era su turno, reasignar turno
      if (turnoActual === numeroParticipante) {
        // Buscar otros participantes
        const snap = await getDocs(participantesRef);
        const otros = snap.docs
          .map(d => d.data())
          .filter(p => p.numeroParticipante !== numeroParticipante);
        if (otros.length > 0) {
          // Elegir uno al azar
          const nuevo = otros[Math.floor(Math.random() * otros.length)];
          await updateDoc(historiaDocRef, {
            turnoActual: nuevo.numeroParticipante,
            timestampUltimoTurno: serverTimestamp(),
          });
        } else {
          // No quedan participantes
          await updateDoc(historiaDocRef, {
            turnoActual: null,
            timestampUltimoTurno: serverTimestamp(),
          });
        }
      }
      await deleteDoc(doc(participantesRef, user.email));
      await updateDoc(historiaDocRef, { participantesTotales: increment(-1) });
    } catch (e) {
      setAviso("Error al dejar de participar: " + e.message);
    }
  };

  // Enviar historia
  const enviarHistoria = async () => {
    if (!texto.trim()) return;
    if (texto.length > 300) {
      setAviso("Máximo 300 caracteres.");
      return;
    }
    setEnviando(true);
    setAviso("");
    try {
      // Guardar turno
      await setDoc(
        doc(historiasRef),
        {
          texto: texto.trim(),
          email: user.email,
          nombre: miembro?.nombre ?? user.displayName ?? user.email,
          timestamp: serverTimestamp(),
        }
      );
      setTexto("");
      // Elegir siguiente participante al azar (que no sea el mismo)
      const snap = await getDocs(participantesRef);
      const otros = snap.docs
        .map(d => d.data())
        .filter(p => p.numeroParticipante !== numeroParticipante);
      if (otros.length > 0) {
        const siguiente = otros[Math.floor(Math.random() * otros.length)];
        await updateDoc(historiaDocRef, {
          turnoActual: siguiente.numeroParticipante,
          timestampUltimoTurno: serverTimestamp(),
        });
      } else {
        // Solo queda uno, nadie tiene el turno hasta que se sume otro
        await updateDoc(historiaDocRef, {
          turnoActual: null,
          timestampUltimoTurno: serverTimestamp(),
        });
      }
    } catch (e) {
      setAviso("Error al enviar: " + e.message);
    }
    setEnviando(false);
  };

  // Slide de historia
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-darkBg via-black to-cardBg px-2 py-8">
      <h1 className="text-4xl font-bold text-neon mb-4 animate-pulse mt-20">Historia sin Fin</h1>
      <div className="bg-cardBg/80 rounded-2xl shadow-lg p-6 max-w-xl w-full mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Reglas del juego</h2>
        <ul className="text-white text-base mb-4 list-disc pl-6 text-left">
          <li>Juego por turnos: cada participante debe continuar la historia.</li>
          <li>Máximo <span className="text-neon font-bold">300 caracteres</span> por turno.</li>
          <li>Cuando envías tu parte, el turno pasa a otro participante elegido al azar.</li>
          <li>La historia se muestra en un slide de abajo hacia arriba.</li>
          <li>Debes anotarte para participar y ver la historia.</li>
          <li>Puedes dejar de participar en cualquier momento (con confirmación).</li>
          <li>El participante 1 comienza la historia.</li>
          <li>Si quien debe continuar no responde en 6 horas, se elige a otro al azar.</li>
          <li>Cuando sea tu turno, verás un aviso aquí.</li>
        </ul>
        <div className="flex flex-col items-center gap-4">
          {!participando ? (
            <button
              onClick={inscribirse}
              className="bg-neon text-black font-bold px-6 py-2 rounded-lg shadow hover:scale-105 transition-all animate-pulse"
            >
              Participar
            </button>
          ) : (
            <>
              <button
                onClick={() => setConfirmarSalir(true)}
                className="bg-red-500 text-white font-bold px-6 py-2 rounded-lg shadow hover:bg-red-700 transition-all"
              >
                Dejar de participar
              </button>
              {confirmarSalir && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                  <div className="bg-cardBg p-8 rounded-2xl shadow-xl text-white w-full max-w-xs text-center">
                    <p className="mb-4">¿Seguro que quieres dejar de participar?</p>
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={dejarParticipar}
                        className="bg-red-500 px-4 py-2 rounded"
                      >Sí, salir</button>
                      <button
                        onClick={() => setConfirmarSalir(false)}
                        className="bg-gray-600 px-4 py-2 rounded"
                      >Cancelar</button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {aviso && <div className="text-yellow-400 font-bold">{aviso}</div>}
        </div>
      </div>

      {/* Slide de historia */}
      {participando && (
        <div className="flex flex-col items-center w-full max-w-xl">
          <div
            ref={slideRef}
            className="bg-black/40 rounded-xl p-4 w-full h-80 overflow-y-auto flex flex-col-reverse mb-4 border border-neon/30"
            style={{ direction: "rtl" }}
          >
            <div style={{ direction: "ltr" }}>
              {historias.length === 0 && (
                <div className="text-gray-400 text-center mt-8">Aún no hay historia, ¡sé el primero en escribir!</div>
              )}
              {historias.map((h, i) => (
                <div
                  key={i}
                  className="mb-4 p-3 rounded-lg bg-gradient-to-r from-neon/10 to-purple/10 shadow text-white flex flex-col"
                >
                  <span className="text-base">{h.texto}</span>
                  <span className="text-xs text-neon font-bold mt-2 text-right">— {h.nombre}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Turno */}
          {turnoEsMio ? (
            <div className="w-full flex flex-col items-center">
              <div className="text-neon font-bold mb-2 animate-pulse">¡Es tu turno! Continúa la historia:</div>
              <textarea
                value={texto}
                onChange={e => setTexto(e.target.value)}
                maxLength={300}
                rows={3}
                className="w-full rounded-lg p-3 bg-gray-900 text-white border border-neon/40 mb-2 resize-none"
                placeholder="Escribe tu parte de la historia (máx 300 caracteres)..."
                disabled={enviando}
              />
              <button
                onClick={enviarHistoria}
                disabled={enviando || !texto.trim()}
                className="bg-neon text-black font-bold px-6 py-2 rounded-lg shadow hover:scale-105 transition-all"
              >
                {enviando ? "Enviando..." : "Enviar"}
              </button>
            </div>
          ) : (
            <div className="text-white text-center mt-2">
              {turnoActual === null
                ? "Esperando a que alguien comience la historia..."
                : turnoActual === numeroParticipante
                  ? ""
                  : `Es el turno de ${participanteTurno ? participanteTurno.nombre : "alguien"}`}
            </div>
          )}
        </div>
      )}
    </div>
  );
}