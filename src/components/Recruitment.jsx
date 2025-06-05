import { motion } from 'framer-motion';

export default function Recruitment() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
    >
      <section id="reclutamiento" className="bg-white py-16 px-6">
        <h2 className="text-3xl text-azulFrancia font-bold text-center mb-8">Unite a Elysium</h2>
        <form className="max-w-xl mx-auto grid gap-4">
          <input className="p-3 border rounded" type="text" placeholder="Tu nickname" required />
          <input className="p-3 border rounded" type="text" placeholder="Clase / Rol" required />
          <textarea className="p-3 border rounded" rows="4" placeholder="¿Por qué querés unirte?" required></textarea>
          <button className="bg-dorado text-white font-bold py-2 px-4 rounded hover:opacity-90" type="submit">Enviar solicitud</button>
        </form>
      </section>
    </motion.div>
  );
}
