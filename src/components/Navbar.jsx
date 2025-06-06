import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-black/80 backdrop-blur-lg border-b border-white/10 text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      {/* Logo with glow effect */}
      <div className="w-12 h-12 bg-gradient-to-br from-neon to-purple rounded-lg flex items-center justify-center animate-glow">
        <span className="text-black font-bold text-xl">E</span>
      </div>
      
      {/* Navigation Links with modern styling */}
      <div className="flex space-x-8 text-lg font-poppins">        <NavLink
          to="/"
          className={({ isActive }) =>
            `relative px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 ${
              isActive 
                ? 'text-neon bg-white/10' 
                : 'text-white hover:text-neon'
            }`
          }
        >
          Inicio
          <div className="absolute inset-0 bg-gradient-to-r from-neon/20 to-purple/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </NavLink>        <NavLink
          to="/clips"
          className={({ isActive }) =>
            `relative px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 ${
              isActive 
                ? 'text-neon bg-white/10' 
                : 'text-white hover:text-neon'
            }`
          }
        >
          Clips
          <div className="absolute inset-0 bg-gradient-to-r from-neon/20 to-purple/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </NavLink>        <NavLink
          to="/miembros"
          className={({ isActive }) =>
            `relative px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 ${
              isActive 
                ? 'text-neon bg-white/10' 
                : 'text-white hover:text-neon'
            }`
          }
        >
          Miembros
          <div className="absolute inset-0 bg-gradient-to-r from-neon/20 to-purple/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </NavLink>
      </div>

      {/* Modern Recruitment Button */}
      <button 
        onClick={() => navigate('/recruitment')}
        className="relative bg-gradient-to-r from-verde to-neon text-black px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-verde/50 group overflow-hidden"
      >
        <span className="relative z-10">RECLUTAMIENTO</span>
        <div className="absolute inset-0 bg-gradient-to-r from-neon to-verde opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>
    </nav>
  );
}