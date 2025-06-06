import { motion } from 'framer-motion';

export default function Miembros() {  const miembros = Array(12).fill(null).map((_, index) => ({
    id: index + 1,
    nombre: `Miembro ${index + 1}`,
    rol: ['Tank', 'DPS', 'Support', 'Healer'][Math.floor(Math.random() * 4)],
    nivel: Math.floor(Math.random() * 55) + 1
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-darkBg via-black to-cardBg pt-20 flex relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(0,255,255,0.3) 180deg, transparent 360deg),
            conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(139,92,246,0.3) 180deg, transparent 360deg)
          `,
        }}></div>
      </div>

      {/* Character Image on the left */}
      <div className="w-1/3 flex items-center justify-center p-8 relative">
        <motion.div 
          initial={{ x: -100, opacity: 0, scale: 0.8 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="relative group"
        >
          {/* Orbiting elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-neon rounded-full animate-float opacity-60 transform -translate-x-1/2 -translate-y-1/2" 
                 style={{ transform: 'translate(-50%, -50%) rotate(0deg) translateY(-200px) rotate(0deg)', animation: 'spin 10s linear infinite' }}></div>
            <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-purple rounded-full animate-float opacity-60 transform -translate-x-1/2 -translate-y-1/2"
                 style={{ transform: 'translate(-50%, -50%) rotate(120deg) translateY(-180px) rotate(-120deg)', animation: 'spin 8s linear infinite reverse' }}></div>
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-dorado rounded-full animate-float opacity-60 transform -translate-x-1/2 -translate-y-1/2"
                 style={{ transform: 'translate(-50%, -50%) rotate(240deg) translateY(-160px) rotate(-240deg)', animation: 'spin 12s linear infinite' }}></div>
          </div>
          
          {/* Character container */}
          <div className="relative w-80 h-96 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-pink-600 to-purple-600 p-1 rounded-3xl animate-glow">
              <div className="w-full h-full bg-gradient-to-br from-red-600 via-pink-600 to-purple-600 rounded-3xl flex items-center justify-center relative overflow-hidden">
                {/* Hexagon pattern overlay */}
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}></div>
                </div>
                
                <span className="relative z-10 text-white text-xl font-bold text-center">
                  Líder del<br />Gremio
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Members Grid on the right */}
      <div className="flex-1 p-8 relative z-10">
        <motion.h2 
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-white mb-8 font-poppins text-center"
        >
          <span className="bg-gradient-to-r from-neon to-purple bg-clip-text text-transparent">
            Miembros del Gremio
          </span>
        </motion.h2>
        
        <div className="grid grid-cols-4 gap-4 max-w-6xl mx-auto">
          {miembros.map((miembro, index) => (
            <motion.div
              key={miembro.id}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              className="group relative"
              style={{ perspective: '1000px' }}
            >
              <div className="relative transition-all duration-300 group-hover:scale-105 transform-gpu">
                {/* Glowing border for hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-neon via-purple to-pink p-0.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-glow">
                  <div className="w-full h-full bg-cardBg rounded-xl"></div>
                </div>
                
                <div className="relative bg-gradient-to-br from-cardBg to-gray-800 rounded-xl border border-white/10 group-hover:border-transparent transition-all duration-300 overflow-hidden">                  {/* Member Image */}
                  <div className="relative aspect-square bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center overflow-hidden">
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-neon/20 to-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <span className="relative z-10 text-gray-400 text-sm font-medium">Avatar</span>
                  </div>
                  
                  {/* Member Info */}
                  <div className="p-3 space-y-2">
                    {/* Name */}
                    <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg px-3 py-2 text-center group-hover:from-neon/20 group-hover:to-purple/20 transition-all duration-300">
                      <span className="text-white text-sm font-bold group-hover:text-neon transition-colors">{miembro.nombre}</span>
                    </div>
                      {/* Role and Level */}
                    <div className="flex justify-between gap-1">
                      <div className="bg-purple/80 rounded px-2 py-1 text-center flex-1">
                        <span className="text-white text-xs font-bold">{miembro.rol}</span>
                      </div>
                      <div className="bg-dorado/80 rounded px-2 py-1 text-center">
                        <span className="text-black text-xs font-bold">Lv{miembro.nivel}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
