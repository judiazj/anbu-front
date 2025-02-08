const IndexPage = () => {
  return (
    <div className="container">
        <header>
            <div className="logo">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor"></path>
                </svg>
                <h2>ANBU</h2>
            </div>
        </header>
        <main>
            <section className="fondo">
                <div>
                    <img src="ImagenIndex.jpg" 
                </div>
            <section className="hero">
                <h1>Bienvenido a ANBU</h1>
                <h2>ANBU es un equipo de operaciones encubiertas de élite. Somos las sombras que protegen la luz. Somos el silencio que impone la paz.</h2>
                <div className="buttons">
                    <button className="login">Inicia Sesión</button>
                </div>
            </section>
            <section className="join">
                <p><span className="font-bold">Únete a ANBU</span></p>
                <p>Se parte de la raíz Konoha, protege el futuro de la aldea desde las sombras y ten el valor de sacrificarte por la voluntad de fuego. </p>
                <button className="register">Regístrate ahora</button>
        </main>
    </div>
  )
}
