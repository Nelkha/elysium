import { motion } from 'framer-motion';

export default function Clips() {
  const clipPlaceholders = Array(6).fill(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-darkBg via-black to-cardBg pt-20 flex relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(0,255,255,0.2) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(139,92,246,0.2) 0%, transparent 50%)
          `,
        }}></div>
      </div>

      {/* Clips Grid on the left */}
      <div className="flex-1 p-8 relative z-10">
        <motion.h2 
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-white mb-8 font-poppins text-center"
        >
          <span className="bg-gradient-to-r from-neon to-purple bg-clip-text text-transparent">
            Clips Épicos
          </span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {clipPlaceholders.map((_, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="group relative"
            >
              {/* Glowing border */}
              <div className="absolute inset-0 bg-gradient-to-r from-neon via-purple to-pink p-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-glow">
                <div className="w-full h-full bg-cardBg rounded-2xl"></div>
              </div>
              
              {/* Video container */}
              <div className="relative bg-gradient-to-br from-cardBg to-gray-800 rounded-2xl aspect-video flex items-center justify-center cursor-pointer overflow-hidden border border-white/10 group-hover:border-transparent transition-all duration-300">
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-neon/20 to-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Play button with modern design */}
                <div className="relative z-10 w-20 h-20 bg-gradient-to-r from-dorado to-neon rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-2xl">
                  <div className="w-0 h-0 border-l-[24px] border-l-black border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent ml-1"></div>
                </div>
                
                {/* Ripple effect */}
                <div className="absolute w-20 h-20 rounded-full border-2 border-dorado/50 animate-ping opacity-0 group-hover:opacity-100"></div>
              </div>
              
              {/* Video info */}
              <div className="mt-4 px-2">
                <h3 className="text-white font-semibold text-lg group-hover:text-neon transition-colors">Clip Épico #{index + 1}</h3>
                <p className="text-gray-400 text-sm">Jugada increíble del gremio</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Character Image on the right with enhanced styling */}
      <div className="w-1/3 flex items-center justify-center p-8 relative hidden lg:flex">
        <motion.div 
          initial={{ x: 100, opacity: 0, rotate: -10 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="relative group"
        >
          {/* Floating elements */}
          <div className="absolute -top-8 -left-8 w-4 h-4 bg-neon rounded-full animate-float opacity-60"></div>
          <div className="absolute -top-4 -right-4 w-6 h-6 bg-purple rounded-full animate-float opacity-60" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-8 -right-8 w-3 h-3 bg-dorado rounded-full animate-float opacity-60" style={{ animationDelay: '4s' }}></div>
          
          {/* Character container with glow */}
          <div className="relative w-80 h-96 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 p-1 rounded-3xl animate-glow">
              <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center relative overflow-hidden">
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-30">
                  <div className="w-full h-full" style={{
                    backgroundImage: `
                      linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
                      linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
                      linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.1) 75%),
                      linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.1) 75%)
                    `,
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                  }}></div>
                </div>
                
                <span className="relative z-10 text-white text-xl font-bold text-center">
                  Personaje<br />Guerrero
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
