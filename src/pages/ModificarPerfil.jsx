import { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";

const CLASES = [
  { nombre: "Scorpion", armas: "Ballesta-Daga" },
  { nombre: "Outrider", armas: "Ballesta-Espada y Escudo" },
  { nombre: "Raider", armas: "Ballesta-Gran Espada" },
  { nombre: "Scout", armas: "Ballesta-Arco" },
  { nombre: "Battleweaver", armas: "Ballesta-Bastón" },
  { nombre: "Fury", armas: "Ballesta-Varita" },
  { nombre: "Cavalier", armas: "Ballesta-Lanza" },
  { nombre: "Ravager", armas: "Gran Espada-Daga" },
  { nombre: "Crusader", armas: "Gran Espada-Espada y Escudo" },
  { nombre: "Ranger", armas: "Gran Espada-Arco" },
  { nombre: "Sentinel", armas: "Gran Espada-Bastón" },
  { nombre: "Paladin", armas: "Gran Espada-Varita" },
  { nombre: "Gladiator", armas: "Gran Espada-Lanza" },
  { nombre: "Berserker", armas: "Espada y Escudo-Daga" },
  { nombre: "Warden", armas: "Espada y Escudo-Arco" },
  { nombre: "Disciple", armas: "Espada y Escudo-Bastón" },
  { nombre: "Templar", armas: "Espada y Escudo-Varita" },
  { nombre: "Steelheart", armas: "Espada y Escudo-Lanza" },
  { nombre: "Infiltrator", armas: "Arco-Daga" },
  { nombre: "Liberator", armas: "Arco-Bastón" },
  { nombre: "Seeker", armas: "Arco-Varita" },
  { nombre: "Impaler", armas: "Arco-Lanza" },
  { nombre: "Spellblade", armas: "Bastón-Daga" },
  { nombre: "Invocator", armas: "Bastón-Varita" },
  { nombre: "Eradicator", armas: "Bastón-Lanza" },
  { nombre: "Darkblighter", armas: "Varita-Daga" },
  { nombre: "Voidlance", armas: "Varita-Lanza" },
  { nombre: "Shadowdancer", armas: "Lanza-Daga" }
];
const ROLES = ["Tank", "DPS", "Healer", "Guardian"];

export default function ModificarPerfil() {
  const { user } = useAuth();
  const [perfil, setPerfil] = useState(null);
  const [perfilId, setPerfilId] = useState(null); // ID real del documento
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(""); // campo que se está editando
  const [valor, setValor] = useState(""); // valor temporal para edición
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [subiendoFoto, setSubiendoFoto] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(true);
      const q = query(collection(db, "miembros"), where("email", "==", user.email));
      getDocs(q).then(snapshot => {
        if (!snapshot.empty) {
          const docSnap = snapshot.docs[0];
          setPerfil(docSnap.data());
          setPerfilId(docSnap.id);
        } else {
          setPerfil(null);
          setPerfilId(null);
        }
        setLoading(false);
      });
    } else {
      setPerfil(null);
      setPerfilId(null);
      setLoading(false);
    }
  }, [user, exito]);

  const handleEditar = (campo) => {
    setEditando(campo);
    setError("");
    setExito("");
    setValor(perfil[campo] ?? "");
  };

  const handleCancelar = () => {
    setEditando("");
    setValor("");
    setError("");
  };

  const handleGuardar = async (campo) => {
    setError("");
    setExito("");
    let nuevoValor = valor;
    // Validaciones por campo
    if (campo === "nombre" && !nuevoValor.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }
    if (campo === "nivel" && (isNaN(nuevoValor) || nuevoValor < 1 || nuevoValor > 55)) {
      setError("Nivel entre 1 y 55");
      return;
    }
    if ((campo === "maestria1" || campo === "maestria2") && (isNaN(nuevoValor) || nuevoValor < 1 || nuevoValor > 200)) {
      setError("Maestría entre 1 y 200");
      return;
    }
    if (campo === "gs" && (isNaN(nuevoValor) || nuevoValor < 0)) {
      setError("GS inválido");
      return;
    }
    if (campo === "clase" && !nuevoValor) {
      setError("Selecciona una clase.");
      return;
    }
    if (campo === "rol" && !nuevoValor) {
      setError("Selecciona un rol.");
      return;
    }
    setGuardando(true);
    try {
      await updateDoc(doc(db, "miembros", perfilId), {
        [campo]: campo === "nivel" || campo === "maestria1" || campo === "maestria2" || campo === "gs"
          ? Number(nuevoValor)
          : nuevoValor.trim()
      });
      setExito("Campo actualizado.");
      setEditando("");
      setPerfil((prev) => ({ ...prev, [campo]: campo === "nivel" || campo === "maestria1" || campo === "maestria2" || campo === "gs" ? Number(nuevoValor) : nuevoValor.trim() }));
    } catch (e) {
      setError("Error al guardar.");
    }
    setGuardando(false);
  };

  const IMGUR_CLIENT_ID = import.meta.env.VITE_IMGUR_CLIENT_ID;

  const handleFotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setError("");
    setExito("");
    setSubiendoFoto(true);
    try {
      // Usa FormData para enviar la imagen
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("https://api.imgur.com/3/image", {
        method: "POST",
        headers: {
          Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.data.link) {
        await updateDoc(doc(db, "miembros", perfilId), { fotoPerfil: data.data.link });
        setPerfil((prev) => ({ ...prev, fotoPerfil: data.data.link }));
        setExito("Foto actualizada.");
      } else {
        setError("Error al subir la foto a Imgur.");
      }
    } catch (e) {
      setError("Error al subir la foto.");
    }
    setSubiendoFoto(false);
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

  if (!perfil) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-darkBg via-black to-cardBg">
        <span className="text-white text-2xl font-poppins">Cargando perfil...</span>
      </div>
    );
  }

  // Render de cada campo editable
  const renderCampo = (label, campo, tipo = "text", opciones = null) => (
    <div className="mb-4">
      <label className="block text-white mb-2">{label}:</label>
      {editando === campo ? (
        <div className="flex gap-2">
          {opciones ? (
            <select
              className="p-2 rounded bg-gray-800 text-white flex-1"
              value={valor}
              onChange={e => setValor(e.target.value)}
              disabled={guardando}
            >
              <option value="">Selecciona...</option>
              {opciones.map(opt =>
                <option key={opt.nombre || opt} value={opt.nombre || opt}>
                  {opt.nombre || opt}
                </option>
              )}
            </select>
          ) : (
            <input
              type={tipo}
              className="p-2 rounded bg-gray-800 text-white flex-1"
              value={valor}
              onChange={e => setValor(e.target.value)}
              disabled={guardando}
              min={tipo === "number" ? 1 : undefined}
              max={tipo === "number" && campo === "nivel" ? 55 : tipo === "number" ? 200 : undefined}
            />
          )}
          <button
            type="button"
            className="bg-neon text-black px-3 py-1 rounded font-bold"
            onClick={() => handleGuardar(campo)}
            disabled={guardando}
          >
            {guardando ? "Guardando..." : "Guardar"}
          </button>
          <button
            type="button"
            className="bg-gray-700 text-white px-3 py-1 rounded font-bold"
            onClick={handleCancelar}
            disabled={guardando}
          >
            Cancelar
          </button>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <span className="flex-1 bg-gray-800 text-white rounded p-2 border border-white/10 min-h-[40px]">
            {perfil[campo] ?? <span className="text-gray-400">Sin datos</span>}
          </span>
          <button
            type="button"
            className="bg-neon text-black px-3 py-1 rounded font-bold"
            onClick={() => handleEditar(campo)}
          >
            Editar
          </button>
        </div>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-darkBg via-black to-cardBg pt-24"
    >
      <div className="bg-cardBg/80 border border-neon/40 rounded-3xl p-8 shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-neon font-poppins mb-4 text-center">
          Modificar Perfil
        </h2>
        {error && <div className="text-red-400 mb-2">{error}</div>}
        {exito && <div className="text-green-400 mb-2">{exito}</div>}
        {renderCampo("Nombre", "nombre")}
        {renderCampo("Build", "build")}
        {renderCampo("Clase", "clase", "text", CLASES)}
        {renderCampo("Rol", "rol", "text", ROLES)}
        {renderCampo("Nivel", "nivel", "number")}
        {renderCampo("Maestría 1", "maestria1", "number")}
        {renderCampo("Maestría 2", "maestria2", "number")}
        {renderCampo("GS", "gs", "number")}
        <div className="mb-4">
          <label className="block text-white mb-2">Foto de Perfil:</label>
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <img
                src={perfil.fotoPerfil || "/avatar-placeholder.png"}
                alt="Foto de perfil"
                className="w-28 h-28 rounded-full object-cover border-4 border-neon bg-gray-900"
              />
              {subiendoFoto && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full text-neon">
                  Subiendo...
                </span>
              )}
            </div>
            <label className="mt-2 cursor-pointer bg-neon text-black px-3 py-1 rounded font-bold hover:scale-105 transition">
              Cambiar foto
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFotoChange}
                disabled={subiendoFoto}
              />
            </label>
          </div>
        </div>
      </div>
    </motion.div>
  );
}