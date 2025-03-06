'use client';

import { useState } from 'react';
import { login } from '@/services/auth-service';
import { redirect } from 'next/navigation';

export const LoginForm = () => {
  const [alias, setAlias] = useState('');
  const [password, setPassword] = useState('');
  const [intentos, setIntentos] = useState(0);

  const handleAliasChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlias(event.target.value);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const handleLogin = async () => {
    const { data, status } = await login(alias, password);

    setIntentos(intentos + 1);

    if (intentos === 4) {
      return alert(`Eres un intruso y ahora seras buscado por anbu ${alias}`);
    }

    if (status !== 201) {
      return alert(`Error al iniciar sesión ${alias}`);
    }


    document.cookie = `access_token=${data.access_token}; path=/; Secure; SameSite=Strict`;
    localStorage.setItem('access_token', data.access_token);

    redirect('../../perfil');
  }

  return (
    <form >
      <label>
        <input type="text" placeholder="Alias" onChange={handleAliasChange} />
      </label>
      <label>
        <input type="password" placeholder="Contraseña" onChange={handlePasswordChange} />
      </label>
      <button type="button" className="login-button" onClick={handleLogin}>Iniciar sesión</button>
    </form>
  )
}