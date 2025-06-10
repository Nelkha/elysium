import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-darkBg via-black to-cardBg border-t-2 border-neon/30 py-8 relative z-30">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold bg-gradient-to-r from-neon via-dorado to-purple bg-clip-text text-transparent font-poppins animate-glow">
            Elysium
          </span>
          <span className="text-gray-400 text-sm font-poppins">
            © {new Date().getFullYear()} Desarrollado por los CRACKS de Kenny y Nelkha. Los demas la pueden pedir.
          </span>
        </div>
        <div className="flex gap-4">
          <a
            href="https://twitch.tv/fakallen"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon hover:text-dorado transition-colors font-bold"
          >
            Twitch
          </a>
          <a
            href="https://outplayed.tv/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple hover:text-dorado transition-colors font-bold"
          >
            Outplayed
          </a>
          <a
            href="mailto:contacto@elysium.com"
            className="text-dorado hover:text-neon transition-colors font-bold"
          >
            Contacto
          </a>
        </div>
      </div>
      {/* Glow effect */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2/3 h-2 blur-2xl bg-gradient-to-r from-neon via-dorado to-purple opacity-40 pointer-events-none"></div>
    </footer>
  );
}