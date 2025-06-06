import React from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-darkBg via-black to-cardBg flex items-center relative overflow-hidden"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${3 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      {/* Character Image on the left with modern styling */}
      <div className="absolute left-8 top-0 h-full w-1/2 flex items-center justify-center z-10">
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="relative w-80 h-96 rounded-2xl overflow-hidden group"
        >
          {/* Glowing border effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-neon via-purple to-pink p-1 rounded-2xl animate-glow">
            <div className="w-full h-full bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl font-bold">Personaje Épico</span>
            </div>
          </div>
          
          {/* Floating elements around character */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-neon rounded-full animate-float opacity-60"></div>
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple rounded-full animate-float opacity-60" style={{ animationDelay: '2s' }}></div>
        </motion.div>
      </div>

      {/* Text Content on the right with enhanced styling */}
      <div className="relative z-20 ml-auto mr-16 max-w-2xl text-right">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="relative"
        >
          {/* Glowing background for text */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon/10 to-purple/10 rounded-3xl blur-xl"></div>
          
          <h1 className="relative text-7xl font-bold text-white mb-6 font-poppins leading-tight">
            Bienvenidos a<br />
            <span className="bg-gradient-to-r from-neon via-dorado to-purple bg-clip-text text-transparent animate-glow">
              Elysium
            </span>
          </h1>
          
          <motion.p 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="relative text-xl text-gray-300 leading-relaxed font-poppins mb-8 backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10"
          >
            Gremio competitivo, unido por la pasión del juego. Nuestro legado es honor, lealtad y gloria.
          </motion.p>

          {/* Call to action buttons */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex gap-4 justify-end"
          >
            <button className="group relative bg-gradient-to-r from-neon to-purple px-8 py-4 rounded-xl font-bold text-black transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-neon/50 overflow-hidden">
              <span className="relative z-10">Únete Ahora</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple to-neon opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button className="group relative border-2 border-neon px-8 py-4 rounded-xl font-bold text-neon transition-all duration-300 hover:bg-neon hover:text-black hover:shadow-2xl hover:shadow-neon/50">
              Ver Más
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute top-1/4 right-1/4 w-20 h-20 border-2 border-purple/30 rotate-45 animate-float"></div>
      <div className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-gradient-to-r from-neon/20 to-purple/20 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
    </motion.div>
  );
}