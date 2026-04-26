import { useState, useRef } from "react";

// Assets
import videoFondo from "./assets/video1.mp4";
import videoFondo2 from "./assets/video2.mp4";
import imgRosa from "./assets/img0.png";
import cancion from "./assets/song1.mp3";
import fondoFinal from "./assets/bg.jpg";
import decoSuperior from "./assets/img1.png";
import decoInferior from "./assets/img2.png";

// TUS NUEVAS IMÁGENES (Asegúrate de que estén en la carpeta assets)
import imgDivisor from "./assets/img5.png";
import imgTexto from "./assets/img6.png";

function App() {
  const [estado, setEstado] = useState("VIDEO1");
  const [mostrarTexto, setMostrarTexto] = useState(false);

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

    // Las imágenes aparecen 1.5 segundos después con un fundido
    setTimeout(() => {
      setMostrarTexto(true);
    }, 1500);
  };

  // --- ESTILOS DE CAPAS ---
  const estiloTinteVideo1 = {
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
      {/* CONTENEDOR DEL "TELÉFONO" */}
      <div className="w-full h-full sm:max-w-[440px] sm:h-[95vh] bg-black sm:rounded-md relative overflow-hidden z-10 shadow-2xl">
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

        <div
          className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-500 ${estado === "VIDEO1" ? "opacity-100" : "opacity-0"}`}
          style={estiloTinteVideo1}
        ></div>

        {/* VIDEO 2 (LOOP INFINITO) */}
        <video
          ref={videoRef2}
          src={videoFondo2}
          playsInline
          loop
          className={`absolute inset-0 w-full h-full object-cover z-0 scale-105 transition-opacity duration-1000 ${estado === "VIDEO2" ? "opacity-100" : "opacity-0"}`}
        />

        {/* DECORACIONES GIGANTES */}
        <div
          className={`absolute inset-0 z-15 pointer-events-none transition-opacity duration-[1500ms] ${estado === "VIDEO2" ? "opacity-100" : "opacity-0"}`}
        >
          <img
            src={decoSuperior}
            className={`absolute top-0 right-0 w-[60vw] max-w-[230px] h-auto transition-transform duration-[2000ms] ${estado === "VIDEO2" ? "translate-y-0 scale-100" : "-translate-y-10 scale-90"}`}
            alt="Deco"
          />

          <img
            src={decoInferior}
            className={`absolute bottom-0 left-0 w-[75vw] max-w-[230px] h-auto transition-transform duration-[2000ms] ${estado === "VIDEO2" ? "translate-y-0 scale-100" : "translate-y-10 scale-90"}`}
            alt="Deco"
          />
        </div>

        {/* --- NUEVO BLOQUE: IMÁGENES DORADAS (TEXTO Y DIVISORES) --- */}
        <div
          className={`absolute inset-0 z-20 flex flex-col items-center justify-center transition-all duration-[2000ms] ease-out ${mostrarTexto ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-4"}`}
        >
          {/* Divisor Superior */}
          <img
            src={imgDivisor}
            alt="Adorno Superior"
            className="w-[80%] max-w-[250px] h-auto object-contain mb-4 drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]"
          />

          {/* Texto "Mis XV Años" en Imagen */}
          <img
            src={imgTexto}
            alt="Mis XV Años"
            className="w-[90%] max-w-[320px] h-auto object-contain"
            style={{
              mixBlendMode: "screen", // Quita el fondo negro de la imagen JPG
              filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.8))", // Añade sombra para resaltar
            }}
          />

          {/* Divisor Inferior (Girado para simetría) */}
          <img
            src={imgDivisor}
            alt="Adorno Inferior"
            className="w-[80%] max-w-[250px] h-auto object-contain mt-4 drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)] rotate-180"
          />
        </div>

        {/* CAPA DE LA ROSA */}
        <div
          className={`absolute inset-0 z-30 flex flex-col justify-end items-center pb-[10%] transition-opacity duration-[1000ms] ease-in-out ${estado === "ROSA" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          style={bgImagenEscena}
        >
          <div className="flex flex-col items-center mb-[12%] pb-[5%] z-30">
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
