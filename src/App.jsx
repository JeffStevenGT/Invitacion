import { useState, useRef } from "react";
// Importamos los assets
import videoFondo from "./assets/video1.mp4";
import imgRosa from "./assets/img0.png";
import cancion from "./assets/song1.mp3";
import fondoFinal from "./assets/bg.jpeg"; // <-- La imagen de Bella y Bestia

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
          PANTALLA 3: LA INVITACIÓN (DISEÑO CARTA)
          ============================================================== */}
      {(estado === "TRANSICION" || estado === "CARTA") && (
        <div
          className={`w-full h-full min-h-screen sm:h-[95vh] sm:max-w-[440px] bg-[#FCF9EA] sm:rounded-3xl shadow-2xl absolute overflow-hidden flex flex-col items-center pt-12 pb-10 sm:border-8 border-amber-500/30 transition-opacity duration-[2000ms] ease-in-out z-0 ${
            estado === "CARTA" ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Contenido de la carta */}
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
          {/* ... Aquí puedes seguir pegando el resto de padres/padrinos ... */}
        </div>
      )}

      {/* ==============================================================
          PANTALLAS 1 y 2: PREVIA, VIDEO Y ROSA (INTERFAZ DE ENTRADA)
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
            className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${estado === "ROSA" ? "opacity-0" : "opacity-90"}`}
          />

          {/* OVERLAY DE LA ROSA: USANDO DOWNLOAD.JPEG COMO FONDO */}
          <div
            className={`absolute inset-0 z-10 flex flex-col justify-end items-center pb-[25%] transition-opacity duration-[2000ms] ease-in-out ${
              estado === "ROSA"
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            style={{
              backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.6)), url(${fondoFinal})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <button
              onClick={abrirCarta}
              className="flex flex-col items-center group bg-transparent mb-10 border-none outline-none"
            >
              <p className="text-amber-300 text-sm font-light tracking-[0.3em] uppercase mb-6 font-serif drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Pulsa aquí
              </p>
              <img
                src={imgRosa}
                alt="Pulsa"
                className="w-28 h-28 object-contain animate-pulse drop-shadow-[0_0_25px_rgba(255,0,0,0.6)] z-20"
              />
            </button>
          </div>

          {/* PANTALLA 1 - INTERACCIÓN INICIAL (Rosa flotante en azul) */}
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
