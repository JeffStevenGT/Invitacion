import { useState, useRef } from "react";

// Assets
import videoFondo from "./assets/video1.mp4";
import videoFondo2 from "./assets/video2.mp4";
import imgRosa from "./assets/img0.png";
import cancion from "./assets/song1.mp3";
import fondoFinal from "./assets/bg.jpg";
import decoSuperior from "./assets/img1.png";
import decoInferior from "./assets/img2.png";
import imgCorona from "./assets/img8.png";
import img3 from "./assets/img3.png";
import img4 from "./assets/img4.png";
import img9 from "./assets/img9.png";
import img10 from "./assets/img10.png";

const SeparadorFiligrana = ({ className }) => (
  <svg
    viewBox="0 0 400 30"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="gradOro" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="transparent" />
        <stop offset="20%" stopColor="#bf953f" />
        <stop offset="50%" stopColor="#fcf6ba" />
        <stop offset="80%" stopColor="#bf953f" />
        <stop offset="100%" stopColor="transparent" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path
      d="M10 15 H160 Q170 15 180 5 T200 15 T220 25 Q230 15 240 15 H390"
      stroke="url(#gradOro)"
      strokeWidth="1.5"
      strokeLinecap="round"
      filter="url(#glow)"
    />
    <path
      d="M140 15 Q160 25 180 15 M220 15 Q240 5 260 15"
      stroke="#fcf6ba"
      strokeWidth="0.8"
      opacity="0.6"
    />
    <rect
      x="194"
      y="9"
      width="12"
      height="12"
      transform="rotate(45 200 15)"
      fill="url(#gradOro)"
      stroke="#fff"
      strokeWidth="0.5"
    />
  </svg>
);

function App() {
  const [estado, setEstado] = useState("VIDEO1");
  const [faseTexto, setFaseTexto] = useState("OCULTO");

  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const audioRef = useRef(new Audio(cancion));

  // --- LÓGICA DE LOS BOTONES ---

  const numeroWhatsApp = "51902539586";
  const mensajeWhatsApp = encodeURIComponent(
    "¡Hola! Confirmo mi asistencia a los 15 años de Ericka Valentina. 🎉",
  );
  const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeWhatsApp}`;

  const linkMaps =
    "https://www.google.com/maps/search/?api=1&query=Salón+La+Mansión+Av+Principal+123+Trujillo";

  const generarLinkCalendario = () => {
    const titulo = encodeURIComponent("Mis 15 Años - Ericka Valentina");
    const detalles = encodeURIComponent(
      "¡Te espero para celebrar juntos mi día especial!",
    );
    const ubicacion = encodeURIComponent(
      "Salón La Mansión, Av. Principal 123, Trujillo",
    );
    const fechas = "20260525T010000Z/20260525T070000Z";
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${titulo}&dates=${fechas}&details=${detalles}&location=${ubicacion}`;
  };

  const terminarVideo1 = () => {
    if (estado === "VIDEO1") setEstado("ROSA");
  };

  const iniciarVideo2 = () => {
    audioRef.current.play().catch((e) => console.error("Error audio:", e));
    setEstado("VIDEO2");
    if (videoRef2.current) videoRef2.current.play();

    setTimeout(() => {
      setFaseTexto("TITULO");
      setTimeout(() => {
        setFaseTexto("NOMBRE");
        setTimeout(() => {
          setFaseTexto("INVITACION");
          setTimeout(() => {
            setFaseTexto("DATOS");
            setTimeout(() => {
              setFaseTexto("DETALLES");
            }, 8000);
          }, 8000);
        }, 8000);
      }, 9000);
    }, 1500);
  };

  return (
    <div className="h-[100dvh] w-full bg-black flex items-center justify-center font-sans antialiased relative overflow-hidden text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fleur+De+Leah&family=Imperial+Script&family=Montserrat:wght@300;400&display=swap');

        @keyframes flotarPolvo {
          0% { transform: translateY(10px) scale(0.5); opacity: 0; }
          50% { opacity: 0.9; box-shadow: 0 0 10px 3px rgba(251, 191, 36, 0.5); }
          100% { transform: translateY(-40px) scale(1.2); opacity: 0; }
        }

        @keyframes titilarEstrella {
          0%, 100% { opacity: 0; transform: scale(0.2) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); box-shadow: 0 0 12px 3px rgba(255, 255, 255, 0.9); }
        }

        @keyframes glowEsquina {
          0%, 100% { opacity: 0.2; transform: scale(1); filter: blur(10px); }
          50% { opacity: 0.5; transform: scale(1.1); filter: blur(15px); }
        }

        @keyframes latidoRosa {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(255, 0, 0, 0.7)); }
          50% { transform: scale(1.15); filter: drop-shadow(0 0 25px rgba(255, 0, 0, 1)); }
        }

        .chispa-dorada {
          position: absolute; background-color: #fffde7; border-radius: 50%;
          box-shadow: 0 0 6px 2px rgba(203, 155, 81, 0.8); animation: flotarPolvo linear infinite;
        }

        .estrella-plata {
          position: absolute; background-color: #fff;
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
          animation: titilarEstrella 4s infinite ease-in-out;
        }

        .luz-vertice {
          position: absolute; width: 220px; height: 220px;
          background: radial-gradient(circle, rgba(251, 246, 186, 0.25) 0%, transparent 75%);
          animation: glowEsquina 5s infinite ease-in-out; pointer-events: none;
        }

        .estilo-dorado-pro {
          color: #f1c40f;
          background: linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
          -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 15px rgba(251,191,36,0.3)); 
          display: inline-block; white-space: normal; overflow: visible !important;
          padding: 10px 20px; margin: -10px -20px;
        }

        .animacion-rosa { animation: latidoRosa 2s infinite ease-in-out; }
      `}</style>

      <div className="w-full h-full sm:max-w-[440px] sm:h-[95vh] bg-black sm:rounded-md relative overflow-hidden z-10 shadow-2xl">
        {/* VIDEOS */}
        <video
          ref={videoRef1}
          src={videoFondo}
          playsInline
          autoPlay
          muted
          onEnded={terminarVideo1}
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-500 ${estado === "VIDEO1" ? "opacity-100" : "opacity-0"}`}
        />

        <video
          ref={videoRef2}
          src={videoFondo2}
          playsInline
          loop
          className={`absolute inset-0 w-full h-full object-cover z-0 scale-105 transition-opacity duration-1000 ${estado === "VIDEO2" ? "opacity-100" : "opacity-0"}`}
        />

        {/* ELEMENTOS AMBIENTALES */}
        <div
          className={`absolute inset-0 z-15 pointer-events-none transition-opacity duration-1000 ${faseTexto === "INVITACION" || faseTexto === "DATOS" || faseTexto === "DETALLES" ? "opacity-0" : "opacity-100"}`}
        >
          <div className="luz-vertice top-[-50px] left-[-50px]" />
          <div className="luz-vertice bottom-[-50px] right-[-50px]" />
          <img
            src={decoSuperior}
            className={`absolute top-0 right-0 w-[65vw] max-w-[240px] h-auto overflow-visible transition-all duration-[2500ms] ${estado === "VIDEO2" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            alt="deco"
          />
          <img
            src={decoInferior}
            className={`absolute bottom-0 left-0 w-[75vw] max-w-[240px] h-auto overflow-visible transition-all duration-[2500ms] ${estado === "VIDEO2" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            alt="deco"
          />
          <div
            className={`absolute inset-0 transition-opacity duration-[1500ms] ${estado === "VIDEO2" ? "opacity-100" : "opacity-0"}`}
          >
            <div className="absolute top-0 left-0 w-[40%] h-[30%]">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={`tl-${i}`}
                  className="chispa-dorada"
                  style={{
                    left: `${(i * 17) % 100}%`,
                    top: `${(i * 13) % 100}%`,
                    width: "2px",
                    height: "2px",
                    animationDuration: `${(i % 3) + 3}s`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
            <div className="absolute bottom-0 right-0 w-[40%] h-[30%]">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={`br-${i}`}
                  className="chispa-dorada"
                  style={{
                    left: `${(i * 19) % 100}%`,
                    top: `${(i * 21) % 100}%`,
                    width: "2px",
                    height: "2px",
                    animationDuration: `${(i % 3) + 4}s`,
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* --- CAPA DE TEXTOS --- */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none text-center">
          <div className="relative w-full h-full flex items-center justify-center overflow-visible">
            <div
              className={`flex flex-col items-center justify-center transition-all duration-[2000ms] absolute inset-0 overflow-visible ${faseTexto === "TITULO" ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
            >
              <SeparadorFiligrana className="w-[85%] mb-2" />
              <h2
                className="text-[18vw] sm:text-[85px] leading-[0.7] estilo-dorado-pro"
                style={{ fontFamily: "'Imperial Script', cursive" }}
              >
                Mis 15 Años
              </h2>
              <SeparadorFiligrana className="w-[85%] mt-2 rotate-180" />
            </div>

            <div
              className={`flex flex-col items-center justify-center transition-all duration-[2000ms] absolute inset-0 mt-[-12vh] overflow-visible ${faseTexto === "NOMBRE" ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
            >
              <img
                src={imgCorona}
                className="w-[30vw] max-w-[100px] h-auto mb-[-25px] z-10 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]"
                alt="Corona"
              />
              <h1
                className="text-[25vw] sm:text-[95px] leading-[0.7] estilo-dorado-pro"
                style={{ fontFamily: "'Fleur De Leah', cursive" }}
              >
                Ericka Valentina
              </h1>
            </div>

            <div
              className={`flex flex-col items-center justify-center transition-all duration-[3000ms] absolute inset-0 overflow-visible px-[6rem] ${faseTexto === "INVITACION" ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-10 blur-md pointer-events-none"}`}
            >
              <img
                src={img3}
                className="absolute top-0 left-0 w-full h-auto z-10"
                alt="deco3"
              />
              <div className="flex flex-col items-center justify-center gap-0 z-20 overflow-visible w-full">
                <p
                  className="text-[9vw] sm:text-[34px] leading-[0.85] estilo-dorado-pro"
                  style={{ fontFamily: "'Fleur De Leah', cursive" }}
                >
                  Con mucha ilusión quiero invitarte
                </p>
                <p
                  className="text-[9vw] sm:text-[34px] leading-[0.85] estilo-dorado-pro"
                  style={{ fontFamily: "'Fleur De Leah', cursive" }}
                >
                  a compartir conmigo un día único.
                </p>
                <p
                  className="text-[9vw] sm:text-[34px] leading-[0.85] estilo-dorado-pro"
                  style={{ fontFamily: "'Fleur De Leah', cursive" }}
                >
                  Será una noche para celebrar,
                </p>
                <p
                  className="text-[9vw] sm:text-[34px] leading-[0.85] estilo-dorado-pro"
                  style={{ fontFamily: "'Fleur De Leah', cursive" }}
                >
                  recordar y disfrutar juntos.
                </p>
              </div>
              <img
                src={img4}
                className="absolute bottom-0 left-0 w-full h-auto z-10"
                alt="deco4"
              />
            </div>

            <div
              className={`flex flex-col items-center justify-center transition-all duration-[3000ms] absolute inset-0 overflow-visible px-14 ${faseTexto === "DATOS" ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-10 blur-md pointer-events-none"}`}
            >
              <img
                src={img3}
                className="absolute top-0 left-0 w-full h-auto z-10"
                alt="deco3"
              />
              <div className="z-20 flex flex-col items-center gap-17 w-full overflow-visible">
                <div className="flex flex-col items-center overflow-visible">
                  <div className="flex items-center gap-3 mb-4 opacity-60">
                    <div className="h-[1px] w-8 bg-amber-500"></div>
                    <span className="text-amber-200 uppercase tracking-[0.4em] text-[10px] font-sans">
                      Mis Padres
                    </span>
                    <div className="h-[1px] w-8 bg-amber-500"></div>
                  </div>
                  <div className="flex flex-col items-center overflow-visible">
                    <p
                      className="text-[8vw] sm:text-[42px] leading-[1] estilo-dorado-pro py-2"
                      style={{ fontFamily: "'Fleur De Leah', cursive" }}
                    >
                      Ricardo Antonio Valentina
                    </p>
                    <p
                      className="text-[8vw] sm:text-[42px] leading-[1] estilo-dorado-pro py-2"
                      style={{ fontFamily: "'Fleur De Leah', cursive" }}
                    >
                      María Elena Santos
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center overflow-visible">
                  <div className="flex items-center gap-3 mb-4 opacity-60">
                    <div className="h-[1px] w-8 bg-amber-500"></div>
                    <span className="text-amber-200 uppercase tracking-[0.4em] text-[10px] font-sans">
                      Mis Padrinos
                    </span>
                    <div className="h-[1px] w-8 bg-amber-500"></div>
                  </div>
                  <div className="flex flex-col items-center overflow-visible">
                    <p
                      className="text-[8vw] sm:text-[42px] leading-[1] estilo-dorado-pro py-2"
                      style={{ fontFamily: "'Fleur De Leah', cursive" }}
                    >
                      Carlos Eduardo Méndez
                    </p>
                    <p
                      className="text-[8vw] sm:text-[42px] leading-[1] estilo-dorado-pro py-2"
                      style={{ fontFamily: "'Fleur De Leah', cursive" }}
                    >
                      Lucía Fernanda Ramos
                    </p>
                  </div>
                </div>
              </div>
              <img
                src={img4}
                className="absolute bottom-0 left-0 w-full h-auto z-10"
                alt="deco4"
              />
            </div>

            {/* FASE 5: DETALLES Y BOTONES CON ICONOS */}
            <div
              className={`flex flex-col items-center justify-center transition-all duration-[3000ms] absolute inset-0 overflow-visible px-10 ${faseTexto === "DETALLES" ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-10 blur-md pointer-events-none"}`}
            >
              <img
                src={img3}
                className="absolute top-0 left-0 w-full h-auto z-10 pointer-events-none"
                alt="deco3"
              />
              <div className="z-20 flex flex-col items-center gap-6 w-full overflow-visible">
                <div className="flex flex-col items-center overflow-visible">
                  <div className="flex items-center gap-3 mb-1 opacity-60">
                    <div className="h-[1px] w-6 bg-amber-500"></div>
                    <span className="text-amber-200 uppercase tracking-[0.4em] text-[10px] font-sans">
                      Cuándo
                    </span>
                    <div className="h-[1px] w-6 bg-amber-500"></div>
                  </div>
                  <p
                    className="text-[7.5vw] sm:text-[34px] leading-[1] estilo-dorado-pro py-1"
                    style={{ fontFamily: "'Fleur De Leah', cursive" }}
                  >
                    Sábado, 24 de Mayo
                  </p>
                  <p
                    className="text-[7.5vw] sm:text-[34px] leading-[1] estilo-dorado-pro py-1"
                    style={{ fontFamily: "'Fleur De Leah', cursive" }}
                  >
                    a las 08:00 PM
                  </p>
                </div>
                <div className="flex flex-col items-center overflow-visible">
                  <div className="flex items-center gap-3 mb-1 opacity-60">
                    <div className="h-[1px] w-6 bg-amber-500"></div>
                    <span className="text-amber-200 uppercase tracking-[0.4em] text-[10px] font-sans">
                      Dónde
                    </span>
                    <div className="h-[1px] w-6 bg-amber-500"></div>
                  </div>
                  <p
                    className="text-[7.5vw] sm:text-[34px] leading-[1] estilo-dorado-pro py-1 text-center"
                    style={{ fontFamily: "'Fleur De Leah', cursive" }}
                  >
                    Salón "La Mansión"
                  </p>
                  <p className="text-amber-50/70 text-[10px] tracking-widest font-sans uppercase mt-1">
                    Av. Principal 123, Trujillo
                  </p>
                </div>
                <div className="flex flex-col items-center overflow-visible">
                  <div className="flex items-center gap-3 mb-1 opacity-60">
                    <div className="h-[1px] w-6 bg-amber-500"></div>
                    <span className="text-amber-200 uppercase tracking-[0.4em] text-[10px] font-sans">
                      Dress Code
                    </span>
                    <div className="h-[1px] w-6 bg-amber-500"></div>
                  </div>
                  <p
                    className="text-[7.5vw] sm:text-[34px] leading-[1] estilo-dorado-pro py-1"
                    style={{ fontFamily: "'Fleur De Leah', cursive" }}
                  >
                    Elegante
                  </p>
                </div>
                <div className="flex flex-col w-full px-6 gap-3 mt-2">
                  <a
                    href={generarLinkCalendario()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${faseTexto === "DETALLES" ? "pointer-events-auto" : "pointer-events-none"} w-full rounded-full border border-amber-500/40 bg-gradient-to-r from-amber-900/30 via-amber-600/20 to-amber-900/30 px-4 py-3 text-amber-200 tracking-[0.2em] text-[10px] uppercase font-sans transition-all active:scale-95 flex items-center justify-center gap-3 backdrop-blur-md`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    Añadir a la agenda
                  </a>
                  <a
                    href={linkWhatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${faseTexto === "DETALLES" ? "pointer-events-auto" : "pointer-events-none"} w-full rounded-full border border-amber-500/40 bg-gradient-to-r from-amber-900/30 via-amber-600/20 to-amber-900/30 px-4 py-3 text-amber-200 tracking-[0.2em] text-[10px] uppercase font-sans transition-all active:scale-95 flex items-center justify-center gap-3 backdrop-blur-md`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Confirmar Asistencia
                  </a>
                  <a
                    href={linkMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${faseTexto === "DETALLES" ? "pointer-events-auto" : "pointer-events-none"} w-full rounded-full border border-amber-500/40 bg-gradient-to-r from-amber-900/30 via-amber-600/20 to-amber-900/30 px-4 py-3 text-amber-200 tracking-[0.2em] text-[10px] uppercase font-sans transition-all active:scale-95 flex items-center justify-center gap-3 backdrop-blur-md`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                    Cómo llegar
                  </a>
                </div>
              </div>

              <img
                src={img9}
                className={`absolute bottom-0 left-0 w-[40vw] max-w-[160px] h-auto z-10 pointer-events-none transition-all duration-[4000ms] ease-out ${faseTexto === "DETALLES" ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`}
                alt="princesa"
              />
              <img
                src={img10}
                className={`absolute bottom-0 right-0 w-[40vw] max-w-[160px] h-auto z-10 pointer-events-none transition-all duration-[4000ms] ease-out ${faseTexto === "DETALLES" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"}`}
                alt="bestia"
              />
            </div>
          </div>
        </div>

        {/* BOTÓN ROSA */}
        <div
          className={`absolute inset-0 z-30 flex flex-col justify-end items-center pb-[10%] transition-opacity duration-[1000ms] ${estado === "ROSA" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.1) 100%), url(${fondoFinal})`,
            backgroundSize: "cover",
          }}
        >
          <div className="flex flex-col items-center mb-[12%] pb-[5%]">
            <p className="text-amber-200 text-xs tracking-[0.4em] uppercase mb-4 animate-pulse font-sans">
              Pulsa aquí
            </p>
            <button
              onClick={iniciarVideo2}
              className="animacion-rosa active:scale-90 transition-transform"
            >
              <img
                src={imgRosa}
                className="w-[18vw] max-w-[75px] brightness-125"
                alt="rosa"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
