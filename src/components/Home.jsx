import React from 'react';
import { motion } from 'framer-motion';
import princ from '../assets/img/princ.png'; // Ajusta la ruta si es necesario

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
      className="pt-20 min-h-screen bg-white px-6 text-center"
    >
      <h2 className="text-4xl text-azulFrancia font-bold mb-4">Bienvenidos a Elysium</h2>
      <p className="text-lg text-gray-700 max-w-xl mx-auto">
        Gremio competitivo, unido por la pasión del juego. Nuestro legado es honor, lealtad y gloria.
      </p>
      <div className="flex justify-center mt-8">
        <div
          className="relative rounded-[2.5rem] border-4 border-azulFrancia p-4 bg-gradient-to-br from-yellow-400 via-azulFrancia to-yellow-500 shadow-2xl w-full max-w-4xl"
          style={{
            boxShadow: '0 0 40px 10px #FFD700, 0 0 0 8px #1e3a8a'
          }}
        >
          <img
            src={princ}
            alt="Elysium principal"
            className="rounded-[2rem] border-4 border-dorado w-full max-w-3xl mx-auto"
            style={{
              boxShadow: '0 0 32px 4px #1e3a8a, 0 0 0 8px #FFD700'
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}