import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import homeleftImg from '../assets/img/homeleft.png';

export default function Home() {
  const imageRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const adjustVideoHeight = () => {
      const isDesktop = window.innerWidth >= 768;
      if (imageRef.current && videoRef.current && isDesktop) {
        const imageHeight = imageRef.current.offsetHeight;
        if (imageHeight > 0) {
          videoRef.current.style.height = `${imageHeight}px`;
        }
      }
    };

    const img = imageRef.current;
    if (img && window.innerWidth >= 768) {
      if (img.complete) {
        setTimeout(adjustVideoHeight, 100);
      } else {
        img.onload = () => setTimeout(adjustVideoHeight, 100);
      }
    }

    window.addEventListener('resize', adjustVideoHeight);
    if (window.innerWidth >= 768) {
      setTimeout(adjustVideoHeight, 100);
    }

    return () => {
      window.removeEventListener('resize', adjustVideoHeight);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-darkBg via-black to-cardBg flex flex-col items-center relative overflow-hidden px-4 sm:px-6 md:px-8 pt-24"
    >
      {/* Background particles */}
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

      {/* Grid overlay */}
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

      {/* Texto principal */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-3xl text-center z-20 mb-12 sm:mb-16 relative px-2"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 font-poppins leading-tight">
          Bienvenidos a<br />
          <span className="bg-gradient-to-r from-neon via-dorado to-purple bg-clip-text text-transparent animate-glow inline-block px-4 py-2 rounded-2xl border border-neon/20 backdrop-blur-sm bg-black/10">
            Elysium
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed font-poppins mb-8 backdrop-blur-sm bg-white/5 p-4 rounded-2xl border border-white/10 inline-block max-w-xl mx-auto">
          Gremio competitivo, unido por la pasión del juego. Nuestro legado es honor, lealtad y gloria.
        </p>
      </motion.div>

      {/* Contenedor imagen + video */}
      <div className="flex flex-col md:flex-row w-full max-w-7xl gap-6 md:gap-10 z-20 px-4 sm:px-0 items-start">
        {/* Imagen a la izquierda (oculta en móvil) */}
        <div className="w-full md:w-80 rounded-2xl overflow-hidden relative hidden md:block flex-shrink-0">
          <img
            ref={imageRef}
            src={homeleftImg}
            alt="Personaje épico"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Video */}
        <div
          ref={videoRef}
          className="w-full flex-1 relative rounded-2xl overflow-hidden bg-gradient-to-br from-cardBg to-gray-800 cursor-pointer border border-white/10 aspect-[16/9] md:aspect-auto"
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

      {/* Botones */}
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
    </motion.div>
  );
}
