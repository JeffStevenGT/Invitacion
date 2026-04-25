import { useState, useRef } from "react";
// Importamos los assets, incluyendo el nuevo fondo
import videoFondo from "./assets/video1.mp4";
import imgRosa from "./assets/img0.png";
import cancion from "./assets/song1.mp3";
import fondoFinal from "./assets/bg.jpeg"; // <-- Importamos bg.jpeg

function App() {
  const [estado, setEstado] = useState("PREVIA");
  const videoRef = useRef(null);
  const audioRef = useRef(new Audio(cancion));

  const entrar = () => {
    setEstado("VIDEO");
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((e) => console.error("Error video:", e));
    }
  };

  const terminarVideo = () => {
    if (estado === "VIDEO") {
      setEstado("ROSA");
    }
  };

  const abrirCarta = () => {
    audioRef.current.play().catch((e) => console.error("Error audio:", e));
    setEstado("TRANSICION");
    setTimeout(() => {
      setEstado("CARTA");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center font-sans antialiased relative overflow-hidden">
      {/* ==============================================================
          PANTALLA 3: LA INVITACIÓN
          ============================================================== */}
      {(estado === "TRANSICION" || estado === "CARTA") && (
        <div
          className={`w-full h-full min-h-screen sm:h-[95vh] sm:max-w-[440px] sm:rounded-3xl shadow-2xl absolute overflow-hidden flex flex-col items-center pt-12 pb-10 sm:border-8 border-amber-500/30 transition-opacity duration-[2000ms] ease-in-out z-0 ${
            estado === "CARTA" ? "opacity-100" : "opacity-0"
          }`}
          // AJUSTE AQUÍ: Usamos bg.jpeg como fondo con estilos en línea
          style={{
            backgroundImage: `url(${fondoFinal})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Un overlay sutil sobre el fondo para asegurar legibilidad */}
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] z-0"></div>

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

          <div className="w-[90%] flex flex-col items-center mt-12 mb-8 p-6 bg-white/50 rounded-xl z-10 border border-amber-500/10 backdrop-blur-sm">
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

            <div className="w-full flex justify-between gap-2 text-center relative z-10">
              <div className="flex-1 flex flex-col items-center">
                <p className="text-[7px] tracking-[0.2em] text-amber-800 uppercase font-serif mb-3">
                  Padrinos
                </p>
                <p className="text-red-950 font-serif italic text-[11px] leading-snug">
                  Fernando Sánchez
                  <br />
                  Miriam Cohan
                </p>
              </div>
              <div className="w-[1px] min-h-full bg-amber-500/20 mx-1"></div>
              <div className="flex-1 flex flex-col items-center">
                <p className="text-[7px] tracking-[0.2em] text-amber-800 uppercase font-serif mb-3">
                  Copadrinos
                </p>
                <p className="text-red-950 font-serif italic text-[11px] leading-snug">
                  Dayana Gómez
                  <br />
                  Angel Cardenas
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==============================================================
          PANTALLAS 1 y 2: PREVIA, VIDEO Y ROSA
          ============================================================== */}
      {(estado === "PREVIA" ||
        estado === "VIDEO" ||
        estado === "ROSA" ||
        estado === "TRANSICION") && (
        <div
          className={`w-full h-full min-h-screen sm:h-[95vh] sm:max-w-[440px] bg-black sm:rounded-md shadow-2xl relative border-none transition-opacity duration-[1500ms] ease-in-out z-10 ${
            estado === "TRANSICION" ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* VIDEO DE FONDO */}
          <video
            ref={videoRef}
            src={videoFondo}
            playsInline
            onEnded={terminarVideo}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          {/* OVERLAY DE LA ROSA */}
          <div
            className={`absolute inset-0 z-10 bg-gradient-to-t from-black via-black/70 to-black flex flex-col justify-end items-center pb-[25%] transition-opacity duration-[2000ms] ease-in-out ${
              estado === "ROSA"
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <button
              onClick={abrirCarta}
              className="flex flex-col items-center group bg-transparent mb-10 border-none outline-none"
            >
              <p className="text-amber-300 text-sm font-light tracking-[0.3em] uppercase mb-6 font-serif drop-shadow-[0_2px_4px_rgba(255,255,255,0.4)]">
                Pulsa aquí
              </p>
              <img
                src={imgRosa}
                alt="Pulsa"
                className="w-28 h-28 object-contain animate-pulse drop-shadow-[0_0_20px_rgba(252,211,77,0.5)] z-20"
              />
            </button>
          </div>

          {/* PANTALLA 1 - INTERACCIÓN INICIAL */}
          <div
            onClick={entrar}
            className={`absolute inset-0 z-20 bg-[#050B14] flex items-center justify-center cursor-pointer transition-opacity duration-[1000ms] ease-in-out ${
              estado === "PREVIA"
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-[#050B14] to-[#02040A] z-0 pointer-events-none"></div>
            <div className="text-center flex flex-col items-center z-10 relative w-full px-4">
              <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
              <img
                src={imgRosa}
                alt="Rosa"
                className="w-32 h-32 object-contain relative z-10 mb-10 drop-shadow-[0_0_25px_rgba(59,130,246,0.5)] animate-[bounce_4s_infinite]"
              />
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-400 to-yellow-200 text-sm font-serif tracking-[0.4em] uppercase animate-pulse relative z-10">
                Descubre la magia
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
