import Link from "next/link";
import "./registro.css"

const RegistroPage = () => {
    return(
    <div className = 'fondoreg'> 
        <div className="containerR">

                <div className="logoreg">
                    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor"></path>
                    </svg>
                    <h2>ANBU</h2>
                </div>

            <main>
                <section className="form-sectionreg">
                    <h2>Bienvenido a ANBU</h2>
                    <p>¡Únete a nosotros!</p>
                    <form>  
                    <label className="labelreg" htmlFor="alias">Alias</label>
                    <input id="alias" className="inputreg" type="text" placeholder="Ingresa tu alias"/>

                    <label className="labelreg" htmlFor="password">Contraseña</label>
                    <input id="password" className="inputreg" type="password" placeholder="Primera contraseña"/>

                    <label className="labelreg" htmlFor="secret">Palabra secreta</label>
                    <input id="secret" className="inputreg" type="text" placeholder="Jutsu de seguridad"/>

                    <div className="form-containerreg">
                        <h1 className="h1reg">Sube tu foto de perfil</h1>
                        <label htmlFor="profileImage" className="custom-file-label">Foto de perfil</label>
                        <input type="file" id="profileImage" className="input-file" accept="image/*" />
                    </div>
                    <Link href="/perfil">
                    <button type="submit" className="register-button">Registrar</button>
                    </Link>
                    </form>
                    </section>
                </main>
            </div>
    </div>   

    )
}

export default RegistroPage;