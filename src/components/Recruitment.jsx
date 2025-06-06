import { motion } from 'framer-motion';

export default function Recruitment() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-darkBg via-black to-cardBg pt-20 flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-neon to-purple rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${4 + Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      {/* Geometric shapes */}
      <div className="absolute top-20 left-20 w-32 h-32 border-2 border-neon/30 rotate-45 animate-float"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-purple/20 to-pink/20 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
      
      <div className="relative max-w-4xl w-full px-8 z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-6xl font-bold font-poppins mb-4">
            <span className="bg-gradient-to-r from-neon via-dorado to-purple bg-clip-text text-transparent">
              Unite a Elysium
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            ¿Tienes lo necesario para formar parte de la élite? Demuestra tu valía y únete a nosotros.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative"
        >
          {/* Glowing background */}
          <div className="absolute inset-0 bg-gradient-to-r from-neon/10 via-purple/10 to-pink/10 rounded-3xl blur-xl"></div>
          
          <form className="relative bg-cardBg/80 backdrop-blur-lg border border-white/20 p-8 rounded-3xl space-y-6">
            {/* Form fields with modern styling */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="group relative">
                <input 
                  className="w-full p-4 bg-black/50 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-neon focus:outline-none transition-all duration-300 group-hover:border-gray-500" 
                  type="text" 
                  placeholder="Tu nickname" 
                  required 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-neon/20 to-purple/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              
              <div className="group relative">
                <select className="w-full p-4 bg-black/50 border-2 border-gray-600 rounded-xl text-white focus:border-neon focus:outline-none transition-all duration-300 group-hover:border-gray-500">
                  <option value="">Selecciona tu clase</option>
                  <option value="warrior">Guerrero</option>
                  <option value="mage">Mago</option>
                  <option value="archer">Arquero</option>
                  <option value="assassin">Asesino</option>
                  <option value="support">Soporte</option>
                </select>
                <div className="absolute inset-0 bg-gradient-to-r from-neon/20 to-purple/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="group relative">
                <input 
                  className="w-full p-4 bg-black/50 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-neon focus:outline-none transition-all duration-300 group-hover:border-gray-500" 
                  type="number" 
                  placeholder="Nivel del personaje" 
                  required 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-neon/20 to-purple/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              
              <div className="group relative">
                <input 
                  className="w-full p-4 bg-black/50 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-neon focus:outline-none transition-all duration-300 group-hover:border-gray-500" 
                  type="text" 
                  placeholder="Experiencia previa" 
                  required 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-neon/20 to-purple/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
            
            <div className="group relative">
              <textarea 
                className="w-full p-4 bg-black/50 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-neon focus:outline-none transition-all duration-300 resize-none group-hover:border-gray-500" 
                rows="4" 
                placeholder="¿Por qué quieres unirte a Elysium? Cuéntanos sobre ti y tus objetivos en el juego..." 
                required
              ></textarea>
              <div className="absolute inset-0 bg-gradient-to-r from-neon/20 to-purple/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            {/* Submit button with enhanced effects */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative w-full bg-gradient-to-r from-verde via-neon to-dorado text-black font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-neon/50 overflow-hidden"
              type="submit"
            >
              <span className="relative z-10 font-poppins">ENVIAR SOLICITUD</span>
              
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-dorado via-neon to-verde opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Ripple effect */}
              <div className="absolute inset-0 bg-white opacity-0 group-active:opacity-20 transition-opacity duration-150"></div>
            </motion.button>

            {/* Additional info */}
            <div className="text-center pt-4 border-t border-white/10">
              <p className="text-gray-400 text-sm">
                📧 Recibirás una respuesta en 24-48 horas
              </p>
              <p className="text-gray-400 text-sm mt-2">
                🎮 Los nuevos miembros participan en eventos especiales de bienvenida
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
