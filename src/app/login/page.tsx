import { Header } from '../components/header/Header';
import './login.css'
import { LoginForm } from './components/Form';

const LoginPage = () => {
	return (
		<div className="container">
			<Header />
			<main>
				<section className="imagen">
					<img src="/ImagenLogin.jpg" alt="Fondo" />

					<section className="hero">
						<h1>Devuelta a la raíz</h1>
						<h2>Accede a tu cuenta ANBU</h2>
					</section>

					<LoginForm />


				</section>
			</main>

		</div>
	)
}

export default LoginPage;