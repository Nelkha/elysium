import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setIsOpen(false);

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
        </div>

        {/* Botón de reclutamiento escritorio */}
        <button
          onClick={() => {
            navigate('/recruitment');
            closeMenu();
          }}
          className="hidden lg:block relative bg-gradient-to-r from-verde to-neon text-black px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-verde/50 group overflow-hidden"
        >
          <span className="relative z-10">RECLUTAMIENTO</span>
          <div className="absolute inset-0 bg-gradient-to-r from-neon to-verde opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

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

          <button
            onClick={() => {
              navigate('/recruitment');
              closeMenu();
            }}
            className="bg-gradient-to-r from-verde to-neon text-black px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-verde/50"
          >
            RECLUTAMIENTO
          </button>
        </div>
      )}
    </>
  );
}
