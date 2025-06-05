import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-azulFrancia text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="font-bold text-xl font-poppins">Elysium</div>
      <div className="space-x-6 text-lg font-poppins">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'underline decoration-dorado' : 'hover:underline hover:decoration-dorado'
          }
        >
          Inicio
        </NavLink>
        <NavLink
          to="/clips"
          className={({ isActive }) =>
            isActive ? 'underline decoration-dorado' : 'hover:underline hover:decoration-dorado'
          }
        >
          Clips
        </NavLink>
        <NavLink
          to="/recruitment"
          className={({ isActive }) =>
            isActive ? 'underline decoration-dorado' : 'hover:underline hover:decoration-dorado'
          }
        >
          Reclutamiento
        </NavLink>
      </div>
    </nav>
  );
}