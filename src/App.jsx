import { useState, useRef } from "react";
// Importamos los assets
import videoFondo from "./assets/video1.mp4";
import imgRosa from "./assets/img0.png";
import cancion from "./assets/song1.mp3";
import fondoFinal from "./assets/bg.jpeg";

function App() {
  // Ahora empezamos directamente en el estado 'VIDEO'
  const [estado, setEstado] = useState("VIDEO");
  const [invitacionVisible, setInvitacionVisible] = useState(false);

  const videoRef = useRef(null);
  const audioRef = useRef(new Audio(cancion));

  const terminarVideo = () => {
    if (estado === "VIDEO") {
      setEstado("ROSA");
    }
  };

  const abrirCarta = () => {
    // El audio se activa aquí tras la interacción del usuario
    audioRef.current.play().catch((e) => console.error("Error audio:", e));

    setEstado("TRANSICION");
    setTimeout(() => {
      setEstado("CARTA");
      setTimeout(() => setInvitacionVisible(true), 50);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center font-sans antialiased relative overflow-hidden">
      {/* ==============================================================
          PANTALLA 2: LA INVITACIÓN (CARTA FINAL)
          ============================================================== */}
      {(estado === "TRANSICION" || estado === "CARTA") && (
        <div
          className={`w-full h-full min-h-screen sm:h-[95vh] sm:max-w-[440px] bg-[#FCF9EA] sm:rounded-3xl shadow-2xl absolute overflow-hidden flex flex-col items-center pt-12 pb-10 sm:border-8 border-amber-500/30 transition-opacity duration-[2000ms] ease-in-out z-0 ${
            invitacionVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="z-10 flex flex-col items-center w-full px-6 text-center mt-10 text-sky-950">
            <div className="relative flex items-center justify-center w-full py-2">
              <span
                className="absolute text-[150px] font-light text-amber-500 opacity-20 select-none tracking-tighter"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                XV
              </span>
              <h1
                className="text-8xl z-10 font-light drop-shadow-lg"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                Valeria
                <span className="text-amber-500 text-3xl align-super ml-1">
                  ✧
                </span>
              </h1>
            </div>
            <p className="text-[12px] tracking-[0.6em] text-amber-700 uppercase font-serif mt-2 border-b-2 border-amber-500/20 pb-2">
              Mis Quince Años
            </p>
          </div>

          <div className="w-[90%] flex flex-col items-center mt-12 mb-8 p-6 bg-white/40 rounded-xl z-10 border border-amber-500/10">
            <p className="text-[8px] tracking-[0.3em] text-amber-800 uppercase font-serif mb-5 pb-1 border-b border-amber-800/20">
              Mis Queridos Padres
            </p>
            <p className="text-red-950 font-serif italic text-base leading-tight">
              Rosa López
            </p>
            <p className="text-red-950/70 text-sm my-1">&</p>
            <p className="text-red-950 font-serif italic text-base leading-tight mb-8">
              Abel Cairampoma
            </p>
          </div>
        </div>
      )}

      {/* ==============================================================
          PANTALLA 1: VIDEO (AUTOPLAY) Y LUEGO ROSA
          ============================================================== */}
      {(estado === "VIDEO" || estado === "ROSA" || estado === "TRANSICION") && (
        <div
          className={`w-full h-full min-h-screen sm:h-[95vh] sm:max-w-[440px] bg-black sm:rounded-md shadow-2xl relative border-none transition-opacity duration-[1500ms] ease-in-out z-10 ${
            estado === "TRANSICION" ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* VIDEO DE FONDO - scale-110 y Muted para permitir Autoplay */}
          <video
            ref={videoRef}
            src={videoFondo}
            playsInline
            autoPlay
            muted
            onEnded={terminarVideo}
            className="absolute inset-0 w-full h-full object-cover z-0 scale-110"
          />

          {/* OVERLAY DE LA ROSA SOBRE BG.JPEG (Aparece al terminar el video) */}
          <div
            className={`absolute inset-0 z-10 flex flex-col justify-end items-center pb-[25%] transition-opacity duration-[2000ms] ease-in-out ${
              estado === "ROSA"
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            style={{
              backgroundImage: `linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.75)), url(${fondoFinal})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <button
              onClick={abrirCarta}
              className="flex flex-col items-center group bg-transparent mb-10 border-none outline-none"
            >
              <p className="text-amber-300 text-sm font-light tracking-[0.3em] uppercase mb-6 font-serif drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                Pulsa aquí
              </p>
              <img
                src={imgRosa}
                alt="Pulsa"
                className="w-28 h-28 object-contain animate-pulse drop-shadow-[0_0_30px_rgba(255,0,0,0.7)] z-20"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
