import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useEsAdmin } from '../hooks/useEsAdmin';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { loginSoloMiembros } from '../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showCodePopup, setShowCodePopup] = useState(false);
  const [codigo, setCodigo] = useState("");
  const [codigoValido, setCodigoValido] = useState(false);
  const [codigoError, setCodigoError] = useState("");
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const esAdmin = useEsAdmin(user);

  const closeMenu = () => setIsOpen(false);

  const handleLogin = async () => {
    setLoginError("");
    try {
      await loginSoloMiembros();
      // El usuario es miembro, puede continuar
    } catch (e) {
      setLoginError(e.message); // Muestra el mensaje de error en pantalla
    }
  };

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  const validarCodigo = async () => {
    setCodigoError("");
    setCodigoValido(false);
    // Llama a tu endpoint que valida el código en Firestore
    const res = await fetch("/api/validarCodigo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codigo }),
    });
    const data = await res.json();
    if (data.valido) {
      setCodigoValido(true);
    } else {
      setCodigoError("Código inválido o ya usado.");
    }
  };


  return (
    <>
      {/* Navbar superior */}
      <nav className="bg-black/80 backdrop-blur-lg border-b border-white/10 text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
        {/* Logo */}
        <div className="w-12 h-12 bg-gradient-to-br from-neon to-purple rounded-lg flex items-center justify-center animate-glow">
          <span className="text-black font-bold text-xl">E</span>
        </div>

        {/* Links en escritorio */}
        <div className="hidden lg:flex space-x-8 text-lg font-poppins">
          {['/', '/clips', '/miembros'].map((path, i) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 ${
                  isActive ? 'text-neon bg-white/10' : 'text-white hover:text-neon'
                }`
              }
              onClick={closeMenu}
            >
              {['Inicio', 'Clips', 'Miembros'][i]}
            </NavLink>
          ))}
          {/* Link reclutamiento igual a los demás pero amarillo */}
          <NavLink
            to="/recruitment"
            className={({ isActive }) =>
              `relative px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 font-bold ${
                isActive ? 'text-yellow-400 bg-white/10' : 'text-yellow-400 hover:text-yellow-300'
              }`
            }
            onClick={closeMenu}
          >
            RECLUTAMIENTO
          </NavLink>
          {!loading && user && esAdmin && (
            <NavLink
              to="/admin-solicitudes"
              className="relative px-4 py-2 rounded-lg bg-purple-600 text-white font-bold hover:bg-purple-700 transition-all"
              onClick={closeMenu}
            >
              Admin Solicitudes
            </NavLink>
          )}
        </div>

  

        {/* Botones login/signup en escritorio */}
        <div className="flex items-center gap-2">
          {!loading && !user && (
            <>
              <button
                onClick={() => {
                  setShowCodePopup(true);
                  setCodigo("");
                  setCodigoValido(false);
                  setCodigoError("");
                  closeMenu();
                }}
                className="bg-gradient-to-r from-verde to-neon text-black font-bold px-4 py-2 rounded transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-verde/50"
              >
                Sign Up
              </button>
              <button
                onClick={handleLogin}
                className="bg-neon px-4 py-2 rounded text-black font-bold transition-all duration-300 hover:scale-105 ml-2"
              >
                Log In
              </button>
            </>
          )}
          {!loading && user && (
            <button
              onClick={handleLogout}
              className="bg-gray-700 px-4 py-2 rounded text-white font-bold ml-4"
            >
              Cerrar sesión
            </button>
          )}
        </div>

        {/* Botón hamburguesa mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden z-50 text-white"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </nav>

      {/* Menú móvil desplegable */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/95 text-white flex flex-col items-center justify-center space-y-8 text-2xl font-bold z-40">
          {['/', '/clips', '/miembros'].map((path, i) => (
            <NavLink
              key={path}
              to={path}
              onClick={closeMenu}
              className="hover:text-neon transition-colors"
            >
              {['Inicio', 'Clips', 'Miembros'][i]}
            </NavLink>
          ))}
          {/* Link admin solo para admin */}
          {!loading && user && esAdmin && (
            <NavLink
              to="/admin-solicitudes"
              onClick={closeMenu}
              className="bg-purple-600 px-6 py-3 rounded-lg font-bold text-white hover:bg-purple-700 transition-all"
            >
              Admin Solicitudes
            </NavLink>
          )}
          <button
            onClick={() => {
              navigate('/recruitment');
              closeMenu();
            }}
            className="bg-gradient-to-r from-verde to-neon text-black px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-verde/50"
          >
            RECLUTAMIENTO
          </button>
          {/* Botones login/signup en móvil */}
          {!loading && !user && (
            <>
              <button
                onClick={() => {
                  navigate('/recruitment');
                  closeMenu();
                }}
                className="bg-gradient-to-r from-verde to-neon text-black px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-verde/50"
              >
                Sign Up
              </button>
              <button
                onClick={handleLogin}
                className="bg-neon px-6 py-3 rounded text-black font-bold ml-2"
              >
                Log In
              </button>
            </>
          )}
          {!loading && user && (
            <button
              onClick={handleLogout}
              className="bg-gray-700 px-6 py-3 rounded text-white font-bold"
            >
              Cerrar sesión
            </button>
          )}
        </div>
      )}
      {/* Mensaje de error de login animado y centrado */}
      <AnimatePresence>
        {loginError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="relative bg-red-500 text-white px-8 py-6 rounded-2xl shadow-2xl font-poppins text-center pointer-events-auto">
              <button
                onClick={() => setLoginError("")}
                className="absolute top-2 right-3 text-white text-xl font-bold hover:text-gray-200"
                aria-label="Cerrar"
              >
                ×
              </button>
              <div className="mb-2 font-bold text-lg">Acceso denegado</div>
              {loginError}
              <div className="text-white mt-2 text-sm">
                Debes registrarte y esperar aprobación antes de poder ingresar.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popup para código de invitación */}
      {showCodePopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-cardBg p-8 rounded-2xl shadow-xl text-white w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Código de invitación</h2>
            <input
              className="w-full mb-4 p-2 rounded text-black"
              placeholder="Ingresa tu código"
              value={codigo}
              onChange={e => setCodigo(e.target.value)}
              disabled={codigoValido}
            />
            {codigoError && <div className="text-red-400 mb-2">{codigoError}</div>}
            <div className="flex gap-4 justify-end">
              {!codigoValido && (
                <button
                  onClick={validarCodigo}
                  className="bg-neon px-4 py-2 rounded text-black font-bold"
                  disabled={!codigo}
                >
                  Validar
                </button>
              )}
              {codigoValido && (
                <button
                  onClick={async () => {
                    setShowCodePopup(false);
                    await handleLogin(); // Aquí llamas a tu login con Google
                  }}
                  className="bg-green-500 px-4 py-2 rounded text-white font-bold"
                >
                  Registrarse con Google
                </button>
              )}
              <button
                onClick={() => setShowCodePopup(false)}
                className="bg-gray-600 px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
