import { motion } from 'framer-motion';

export default function Clips() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
    >
      <section id="clips" className="bg-gray-100 py-16 px-6">
        <h2 className="text-3xl text-azulFrancia font-bold text-center mb-10">Clips del Gremio</h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Outplayed.tv */}
          <div className="p-2">
            <div className="bg-azulFrancia rounded-[2.5rem] border-[5px] border-azulFrancia p-2"
              style={{
                clipPath: 'polygon(10% 0%, 90% 0%, 100% 20%, 100% 80%, 90% 100%, 10% 100%, 0% 80%, 0% 20%)'
              }}>
              <div className="bg-dorado rounded-[2rem] border-[5px] border-dorado overflow-hidden"
                style={{
                  clipPath: 'polygon(12% 2%, 88% 2%, 98% 20%, 98% 80%, 88% 98%, 12% 98%, 2% 80%, 2% 20%)'
                }}>
                <iframe
                  className="w-full aspect-video min-h-[320px] bg-black"
                  src="https://outplayed.tv/embed/aaa4aO"
                  title="Clip Outplayed"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
          {/* Twitch */}
          <div className="p-2">
            <div className="bg-azulFrancia rounded-[2.5rem] border-[5px] border-azulFrancia p-2"
              style={{
                clipPath: 'polygon(10% 0%, 90% 0%, 100% 20%, 100% 80%, 90% 100%, 10% 100%, 0% 80%, 0% 20%)'
              }}>
              <div className="bg-dorado rounded-[2rem] border-[5px] border-dorado overflow-hidden"
                style={{
                  clipPath: 'polygon(12% 2%, 88% 2%, 98% 20%, 98% 80%, 88% 98%, 12% 98%, 2% 80%, 2% 20%)'
                }}>
                <iframe
                  className="w-full aspect-video min-h-[320px] bg-black"
                  src="https://clips.twitch.tv/embed?clip=LaconicShinyGiraffeDancingBaby-90yXdnCOGVUgAXNh&parent=localhost&parent=vercel.app"
                  title="Clip Twitch"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
          {/* Próximamente */}
          <div className="p-2">
            <div className="bg-azulFrancia rounded-[2.5rem] border-[5px] border-azulFrancia p-2 flex items-center justify-center min-h-[320px]"
              style={{
                clipPath: 'polygon(10% 0%, 90% 0%, 100% 20%, 100% 80%, 90% 100%, 10% 100%, 0% 80%, 0% 20%)'
              }}>
              <div className="bg-dorado rounded-[2rem] border-[5px] border-dorado w-full h-full flex items-center justify-center"
                style={{
                  clipPath: 'polygon(12% 2%, 88% 2%, 98% 20%, 98% 80%, 88% 98%, 12% 98%, 2% 80%, 2% 20%)'
                }}>
                <span className="text-gray-200 text-xl font-bold">Próximamente más clips...</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
