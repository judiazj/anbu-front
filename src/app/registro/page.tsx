'use client';

import { useState } from "react";
import "./registro.css"
import { registerShinobi, uploadFile } from "@/services";

const RegistroPage = () => {
	const [alias, setAlias] = useState("");
	const [password, setPassword] = useState("");
	const [secret, setSecret] = useState("");
	const [profileImage, setProfileImage] = useState<File | null>(null);

	const secretWord = 'shadow';

	const handleRegister = async () => {

		try {
			let imageUrl = "";
			if (profileImage) {
				const { data } = await uploadFile(profileImage);
				imageUrl = data.url;
			}

			if (secret !== secretWord) {
				alert('Palabra secreta incorrecta');
				return;
			}

			const { status } = await registerShinobi(alias, password, imageUrl);
			if (status === 201) {
				window.location.href = '/login';
			}
		} catch (error) {
			console.error(error);
		}

		return (
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
						<label className="labelreg" htmlFor="alias">Alias</label>
						<input
							id="alias"
							className="inputreg"
							type="text"
							placeholder="Ingresa tu alias"
							value={alias}
							onChange={(e) => setAlias(e.target.value)}
						/>

						<label className="labelreg" htmlFor="password">Contraseña</label>
						<input
							id="password"
							className="inputreg"
							type="password"
							placeholder="Primera contraseña"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						<label className="labelreg" htmlFor="secret">Palabra secreta</label>
						<input
							id="secret"
							className="inputreg"
							type="text"
							placeholder="Jutsu de seguridad"
							value={secret}
							onChange={(e) => setSecret(e.target.value)}
						/>

						<div className="form-containerreg">
							<h1 className="h1reg">Sube tu foto de perfil</h1>
							<label htmlFor="profileImage" className="custom-file-label">Foto de perfil</label>
							<input
								type="file"
								id="profileImage"
								className="input-file"
								accept="image/*"
								required
								onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
							/>
						</div>
						<button onClick={handleRegister} className="register-button">Registrar</button>

					</section>
				</main>
			</div>


		)
	}
}

export default RegistroPage;