'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './globals.css';

const IndexPage = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const router = useRouter();
  const [animacionActiva, setAnimacionActiva] = useState(false);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  const reproducirVideoYNavegar = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setAnimacionActiva(true);
    setTimeout(() => {
      setMostrarMensaje(true);
    }, 3800);

    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.onended = () => {
          router.push('/registro');
        };
      }
    }, 500);
  };

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    audio.volume = 0.8;

    const playAudio = () => {
      if (audio.paused && !animacionActiva) {
        audio.play()
          .then(() => console.log("🎵 Audio de introducción reproducido."))
          .catch(err => console.warn("🔇 Autoplay bloqueado, esperando interacción...", err));
      }
    };

    playAudio();

    document.addEventListener("click", playAudio, { once: true });

    return () => {
      document.removeEventListener("click", playAudio);
    };
  }, [animacionActiva]); 

  return (
    <div className="container">
      <header>
        <div className="logo">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor"></path>
          </svg>
          <h2>ANBU</h2>
        </div>
      </header>
      <main>
        <section className="fondo">
          <div>
            <img src="/ImagenIndex.jpg" alt="Imagen de ANBU" />
          </div>
        </section>
        <section className="hero-page">
          <h1>Bienvenido a ANBU</h1>
          <h2>ANBU es un equipo de operaciones encubiertas de élite. Somos las sombras que protegen la luz. Somos el silencio que impone la paz.</h2>
          <div className="buttons">
            <Link href="/login">
              <button className="login">Inicia Sesión</button>
            </Link>
          </div>
        </section>
        <section className="join">
          <p><span className="font-bold">Únete a ANBU</span></p>
          <p>Se parte de la raíz Konoha, protege el futuro de la aldea desde las sombras y ten el valor de sacrificarte por la voluntad de fuego.</p>
          <button className="register" onClick={reproducirVideoYNavegar}>Regístrate ahora</button>
        </section>
      </main>

      {/*Audio de introducción */}
      <audio id="introAudio" ref={audioRef}>
        <source src="somos_las_sombras.mp3" type="audio/mp3"/>
      </audio>

      {animacionActiva && (
        <div className="fondo-oscuroBR">
          <video ref={videoRef} autoPlay className="video-fondoBR">
            <source src="/VideoBotonRegistro.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      {mostrarMensaje && (
        <div className="mensaje-emergenteBR">
          <p>⚠ Acceso Concedido: Ingresando a ANBU ⚠</p>
        </div>
      )}
    </div>
  );
};

export default IndexPage;
