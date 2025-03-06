import Link from 'next/link';
import './globals.css'
import { Header } from './components/header/Header';

const IndexPage = () => {
	return (
		<div className="container">
			<Header />
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
						<Link href="./login">
							<button className="login">Inicia Sesión</button>
						</Link>
					</div>
				</section>
				<section className="join">
					<p><span className="font-bold">Únete a ANBU</span></p>
					<p>Se parte de la raíz Konoha, protege el futuro de la aldea desde las sombras y ten el valor de sacrificarte por la voluntad de fuego. </p>
					<Link href="./register">
						<button className="register">Regístrate ahora</button>
					</Link>
				</section>
			</main>
		</div>
	)
}

export default IndexPage;