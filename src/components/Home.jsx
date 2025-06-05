import React from 'react';
import { motion } from 'framer-motion';

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
    </motion.div>
  );
}