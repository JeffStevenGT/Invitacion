import { useState, useRef } from "react";

import videoFondo from "./assets/video1.mp4";
import videoFondo2 from "./assets/video2.mp4";
import imgRosa from "./assets/img0.png";
import cancion from "./assets/song1.mp3";
import fondoFinal from "./assets/bg.jpg";

function App() {
  const [estado, setEstado] = useState("VIDEO1");
  const [invitacionVisible, setInvitacionVisible] = useState(false);

  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const audioRef = useRef(new Audio(cancion));

  const terminarVideo1 = () => {
    if (estado === "VIDEO1") setEstado("ROSA");
  };

  const iniciarVideo2 = () => {
    audioRef.current.play().catch((e) => console.error("Error audio:", e));
    setEstado("VIDEO2");
    if (videoRef2.current) {
      videoRef2.current.play();
    }
  };

  const terminarVideo2 = () => {
    setEstado("TRANSICION");
    setTimeout(() => {
      setEstado("CARTA");
      setTimeout(() => setInvitacionVisible(true), 50);
    }, 1500);
  };

  // --- ESTILOS DE CAPAS ---

  const estiloTinteVideo = {
    background: `radial-gradient(circle, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%)`,
  };

  const bgImagenEscena = {
    backgroundImage: `linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.2) 100%), url(${fondoFinal})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const estiloRosaMagica = {
    filter:
      "drop-shadow(0 0 15px rgba(255, 0, 0, 0.9)) drop-shadow(0 0 40px rgba(255, 50, 50, 0.5))",
  };

  return (
    <div className="h-[100dvh] w-full bg-black flex items-center justify-center font-sans antialiased relative overflow-hidden">
      {/* --- CARTA FINAL --- */}
      {(estado === "TRANSICION" || estado === "CARTA") && (
        <div
          className={`w-full h-full sm:max-w-[440px] sm:h-[95vh] bg-[#FCF9EA] sm:rounded-3xl shadow-2xl absolute overflow-hidden flex flex-col items-center transition-opacity duration-[2000ms] ease-in-out z-50 ${
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
            <p className="text-[2.5vw] sm:text-[8px] tracking-[0.3em] text-amber-800 uppercase font-serif mb-4">
              Mis Queridos Padres
            </p>
            <p className="text-red-950 font-serif italic text-[4.5vw] sm:text-base">
              Rosa López
            </p>
            <p className="text-red-950/70 text-[3vw] sm:text-sm my-1">&</p>
            <p className="text-red-950 font-serif italic text-[4.5vw] sm:text-base">
              Abel Cairampoma
            </p>
          </div>
        </div>
      )}

      {/* --- CONTENEDOR PRINCIPAL (VIDEOS Y ROSA) --- */}
      <div
        className={`w-full h-full sm:max-w-[440px] sm:h-[95vh] bg-black sm:rounded-md relative overflow-hidden z-10 ${estado === "TRANSICION" ? "opacity-0" : "opacity-100"}`}
      >
        {/* VIDEO 1 */}
        <video
          ref={videoRef1}
          src={videoFondo}
          playsInline
          autoPlay
          muted
          onEnded={terminarVideo1}
          className={`absolute inset-0 w-full h-full object-cover z-0 scale-105 transition-opacity duration-500 ${estado === "VIDEO1" ? "opacity-100" : "opacity-0"}`}
        />

        {/* VIDEO 2: Sin el tinte */}
        <video
          ref={videoRef2}
          src={videoFondo2}
          playsInline
          onEnded={terminarVideo2}
          className={`absolute inset-0 w-full h-full object-cover z-0 scale-105 transition-opacity duration-500 ${estado === "VIDEO2" ? "opacity-100" : "opacity-0"}`}
        />

        {/* CAPA DE TINTE: Solo visible durante el VIDEO 1 */}
        <div
          className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-500 ${estado === "VIDEO1" ? "opacity-100" : "opacity-0"}`}
          style={estiloTinteVideo}
        ></div>

        {/* CAPA DE LA ROSA (BG.JPG) */}
        <div
          className={`absolute inset-0 z-20 flex flex-col justify-end items-center pb-[5%] transition-opacity duration-[1000ms] ease-in-out ${estado === "ROSA" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          style={bgImagenEscena}
        >
          <div className="flex flex-col items-center pt-[32%] mb-[12%] pb-[5%] z-30">
            <p className="text-amber-200 text-[3.5vw] sm:text-sm font-light tracking-[0.4em] uppercase mb-[1vh] font-serif drop-shadow-[0_2px_15px_rgba(0,0,0,1)] relative z-10 animate-pulse">
              Pulsa aquí
            </p>
            <button
              onClick={iniciarVideo2}
              className="bg-transparent border-none outline-none focus:ring-0 active:scale-90 transition-transform relative z-10"
            >
              <img
                src={imgRosa}
                alt="Rosa"
                style={estiloRosaMagica}
                className="w-[18vw] max-w-[75px] h-auto object-contain animate-pulse brightness-200"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
