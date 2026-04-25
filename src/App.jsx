import { useState, useRef } from "react";
// Importaciones estándar
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
    if (estado === "VIDEO") setEstado("ROSA");
  };

  const abrirCarta = () => {
    audioRef.current.play().catch((e) => console.error("Error audio:", e));
    setEstado("TRANSICION");
    setTimeout(() => {
      setEstado("CARTA");
      setTimeout(() => setInvitacionVisible(true), 50);
    }, 1500);
  };

  // --- DISEÑO: Fondo de Bella y Bestia con cobertura total ---
  const bgImagenEscena = {
    backgroundImage: `linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.1) 100%), url(${fondoFinal})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  // --- DISEÑO: Resplandor Mágico de la Rosa ---
  // Combinamos varios drop-shadows para crear un efecto de "bloom" (brillo nebuloso)
  const estiloRosaMagica = {
    filter:
      "drop-shadow(0 0 10px rgba(255, 0, 0, 0.9)) drop-shadow(0 0 30px rgba(255, 50, 50, 0.6)) drop-shadow(0 0 60px rgba(255, 100, 100, 0.3))",
  };

  return (
    <div className="h-[100dvh] w-full bg-black flex items-center justify-center font-sans antialiased relative overflow-hidden z-10">
      {/* --- SECCIÓN: CARTA FINAL --- */}
      {(estado === "TRANSICION" || estado === "CARTA") && (
        <div
          className={`w-full h-full sm:max-w-[440px] sm:h-[95vh] bg-[#FCF9EA] sm:rounded-3xl shadow-2xl absolute overflow-hidden flex flex-col items-center transition-opacity duration-[2000ms] ease-in-out z-0 ${
            invitacionVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="z-10 flex flex-col items-center w-full px-[5%] text-center mt-[15%] text-sky-950">
            <div className="relative flex items-center justify-center w-full py-2">
              <span
                className="absolute text-[35vw] sm:text-[150px] font-light text-amber-500 opacity-20 select-none tracking-tighter"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                XV
              </span>
              <h1
                className="text-[20vw] sm:text-[90px] z-10 font-light drop-shadow-lg"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                Valeria
                <span className="text-amber-500 text-[6vw] sm:text-3xl align-super ml-1">
                  ✧
                </span>
              </h1>
            </div>
            <p className="text-[3vw] sm:text-[12px] tracking-[0.6em] text-amber-700 uppercase font-serif mt-2 border-b-2 border-amber-500/20 pb-2 relative z-10">
              Mis Quince Años
            </p>
          </div>

          <div className="w-[85%] flex flex-col items-center mt-[10%] p-[5%] bg-white/40 rounded-xl z-10 border border-amber-500/10 backdrop-blur-sm relative z-10">
            <p className="text-[2.5vw] sm:text-[8px] tracking-[0.3em] text-amber-800 uppercase font-serif mb-4 relative z-10">
              Mis Queridos Padres
            </p>
            <p className="text-red-950 font-serif italic text-[4.5vw] sm:text-base relative z-10">
              Rosa López
            </p>
            <p className="text-red-950/70 text-[3vw] sm:text-sm my-1 relative z-10">
              &
            </p>
            <p className="text-red-950 font-serif italic text-[4.5vw] sm:text-base relative z-10">
              Abel Cairampoma
            </p>
          </div>
        </div>
      )}

      {/* --- SECCIÓN: VIDEO Y ROSA RESPLANDECIENTE --- */}
      {(estado === "VIDEO" || estado === "ROSA" || estado === "TRANSICION") && (
        <div
          className={`w-full h-full sm:max-w-[440px] sm:h-[95vh] bg-black sm:rounded-md relative border-none transition-opacity duration-[1500ms] z-10 ${
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

          {/* Overlay de la Rosa con BG.JPEG */}
          <div
            className={`absolute inset-0 z-10 min-w-full min-h-full flex flex-col justify-end items-center transition-opacity duration-[2000ms] ease-in-out ${
              estado === "ROSA"
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            style={bgImagenEscena}
          >
            {/* Contenedor del botón más abajo (pb-[10%]) */}
            <div className="flex flex-col items-center mb-[12%] pb-[5%] z-20">
              <p className="text-amber-200 text-[3.5vw] sm:text-sm font-light tracking-[0.4em] uppercase mb-[1vh] font-serif drop-shadow-[0_2px_15px_rgba(0,0,0,1)] relative z-10">
                Pulsa aquí
              </p>

              <button
                onClick={abrirCarta}
                className="bg-transparent border-none outline-none focus:ring-0 active:scale-90 transition-transform relative z-10"
              >
                {/* Rosa con Triple Resplandor y animación de brillo extra */}
                <img
                  src={imgRosa}
                  alt="Rosa"
                  style={estiloRosaMagica}
                  className="w-[15vw] max-w-[70px] h-auto object-contain animate-pulse brightness-200"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
