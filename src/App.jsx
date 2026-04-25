import { useState, useRef } from "react";
// Importaciones con rutas relativas estándar para evitar errores de VS Code
import videoFondo from "./assets/video1.mp4";
import imgRosa from "./assets/img0.png";
import cancion from "./assets/song1.mp3";
import fondoFinal from "./assets/bg.jpg";

function App() {
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
    // Inicia la música al interactuar con la rosa
    audioRef.current
      .play()
      .catch((e) => console.error("Error al reproducir audio:", e));

    setEstado("TRANSICION");
    setTimeout(() => {
      setEstado("CARTA");
      setTimeout(() => setInvitacionVisible(true), 50);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center font-sans antialiased relative overflow-hidden">
      {/* PANTALLA DE LA INVITACIÓN FINAL */}
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
            <p className="text-[12px] tracking-[0.6em] text-amber-700 uppercase font-serif mt-2 border-b-2 border-amber-500/20 pb-2 relative z-10">
              Mis Quince Años
            </p>
          </div>

          <div className="w-[90%] flex flex-col items-center mt-12 mb-8 p-6 bg-white/40 rounded-xl z-10 border border-amber-500/10 backdrop-blur-sm">
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

      {/* PANTALLA DE VIDEO Y TRANSICIÓN DE LA ROSA */}
      {(estado === "VIDEO" || estado === "ROSA" || estado === "TRANSICION") && (
        <div
          className={`w-full h-full min-h-screen sm:h-[95vh] sm:max-w-[440px] bg-black sm:rounded-md shadow-2xl relative border-none transition-opacity duration-[1500ms] ease-in-out z-10 ${
            estado === "TRANSICION" ? "opacity-0" : "opacity-100"
          }`}
        >
          <video
            ref={videoRef}
            src={videoFondo}
            playsInline
            autoPlay
            muted
            onEnded={terminarVideo}
            className="absolute inset-0 w-full h-full object-cover z-0 scale-105"
          />

          {/* Overlay con la imagen bg.jpeg (Transparencia ajustada para el cober oscuro inferior) */}
          {/* Ajuste: pb-[10%] para bajar los elementos, gradiante ajustado para negro puro abajo (1) y transparente arriba (0) */}
          <div
            className={`absolute inset-0 z-10 flex flex-col justify-end items-center pb-[10%] transition-opacity duration-[2000ms] ease-in-out ${
              estado === "ROSA"
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            style={{
              backgroundImage: `linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0)), url(${fondoFinal})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <button
              onClick={abrirCarta}
              className="flex flex-col items-center group bg-transparent border-none outline-none focus:ring-0 active:scale-95 transition-transform z-20"
            >
              <p className="text-amber-200 text-sm font-light tracking-[0.3em] uppercase mb-6 font-serif drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
                Pulsa aquí
              </p>
              {/* Ajuste: w-20 h-20 para una rosa más pequeña */}
              <img
                src={imgRosa}
                alt="Rosa Encantada"
                className="w-20 h-20 object-contain animate-pulse drop-shadow-[0_0_30px_rgba(255,0,0,0.8)]"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
