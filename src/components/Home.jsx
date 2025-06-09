import React from 'react';
import { motion } from 'framer-motion';
import homeleftImg from '../assets/img/homeleft.png';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-darkBg via-black to-cardBg flex flex-col items-center relative overflow-hidden px-4 sm:px-6 md:px-8 pt-24"
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
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      {/* Texto centrado arriba */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-3xl text-center z-20 mb-12 sm:mb-16 relative px-2"
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 font-poppins leading-tight">
          Bienvenidos a<br />
          <span className="bg-gradient-to-r from-neon via-dorado to-purple bg-clip-text text-transparent animate-glow">
            Elysium
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed font-poppins mb-8 backdrop-blur-sm bg-white/5 p-4 rounded-2xl border border-white/10 inline-block max-w-xl mx-auto">
          Gremio competitivo, unido por la pasión del juego. Nuestro legado es honor, lealtad y gloria.
        </p>
      </motion.div>

      {/* Contenedores personaje y video */}
      <div className="flex flex-col md:flex-row w-full max-w-7xl gap-6 md:gap-10 z-20 px-4 sm:px-0">
        {/* Personaje épico: oculto en pantallas pequeñas */}
        <div className="w-full md:w-80 rounded-2xl overflow-hidden relative hidden md:block flex-shrink-0">
          <img
            src={homeleftImg}
            alt="Personaje épico"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Video responsive con ratio 16:9 */}
        <div
          className="flex-1 relative rounded-2xl overflow-hidden bg-gradient-to-br from-cardBg to-gray-800 cursor-pointer border border-white/10"
          style={{ paddingTop: '56.25%' }} // 16:9 aspect ratio
        >
          <iframe
            src="https://www.youtube.com/embed/I_qczEg0W20"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            className="absolute top-0 left-0 w-full h-full rounded-2xl"
          ></iframe>
        </div>
      </div>

      {/* Botones debajo */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="flex flex-col sm:flex-row gap-4 justify-center mt-12 z-20 px-4 sm:px-0"
      >
        <button className="group relative bg-gradient-to-r from-neon to-purple px-8 py-4 rounded-xl font-bold text-black transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-neon/50 overflow-hidden">
          <span className="relative z-10">Únete Ahora</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple to-neon opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        <button className="group relative border-2 border-neon px-8 py-4 rounded-xl font-bold text-neon transition-all duration-300 hover:bg-neon hover:text-black hover:shadow-2xl hover:shadow-neon/50">
          Ver Más
        </button>
      </motion.div>

      {/* Floating geometric shapes */}
      <div className="absolute top-1/4 right-1/4 w-20 h-20 border-2 border-purple/30 rotate-45 animate-float hidden md:block"></div>
      <div
        className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-gradient-to-r from-neon/20 to-purple/20 rounded-full animate-float hidden md:block"
        style={{ animationDelay: '3s' }}
      ></div>
    </motion.div>
  );
}
