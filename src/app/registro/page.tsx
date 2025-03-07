import Link from "next/link";
import "./registro.css"

const RegistroPage = () => {
    return(
    <div className="containerR">

            <div className="logoreg">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor"></path>
                </svg>
                <h2>ANBU</h2>
            </div>

        <main>
            <section className="form-section">
                <h2>Bienvenido a ANBU</h2>
                <p>¡Únete a nosotros!</p>
                <form>  
                <label className="labelreg">Alias
                    <input className="inputreg" type="text" placeholder="Ingresa tu alias"/>
                </label>
                <label className="labelreg">Contraseña
                    <input className="inputreg" type="password" placeholder="Primera contraseña"/>
                </label>
                <label className="labelreg">Palabra secreta
                    <input className="inputreg" type="text" placeholder="Jutsu de seguridad"/>
                </label>

                <div className="form-container">
                    <h1>Sube tu foto de perfil</h1>
                    <label htmlFor="profileImage" className="custom-file-label">Foto de perfil</label>
                    <input type="file" id="profileImage" className="input-file" accept="image/*" />
                </div>

                <button type="submit" className="register-button">Registrar</button>
                </form>
            </section>
        </main>
    </div>
    

    )
}

export default RegistroPage;