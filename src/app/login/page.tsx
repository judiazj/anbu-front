import Link from "next/link";
import "./login.css"

const LoginPage = () => {
    return(
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
            <section className="imagen">
                <img src="/ImagenLogin.jpg" alt="Fondo" />
                
                <section className="hero">
                    <h1>Devuelta a la raíz</h1>
                    <h2>Accede a tu cuenta ANBU</h2>
                </section>
                
                <form>
                    <label>
                        <input type="text" placeholder="Alias"/>
                    </label>
                    <label>
                        <input type="password" placeholder="Contraseña"/>
                    </label>
                    <Link href = "./perfil">
                    <button type="submit" className="login-button">Iniciar sesión</button>
                    </Link>
                </form>
            </section>
        </main>

    </div>
)
}

export default LoginPage;