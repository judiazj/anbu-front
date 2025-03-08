'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';


interface Props {
    currentPassword: string;
}

export const PasswordInput = ({ currentPassword }: Props) => {

    const [password, setPassword] = useState(currentPassword);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setPassword(currentPassword);
    }, [currentPassword]);

    return (
        <div className="password-section">
            <p>
                <strong>Nueva contraseña:</strong>
            </p>
            <div className="password-container">
                <input className='password-input'
                    type={showPassword ? "text" : "password"}
                    value={password}
                    readOnly
                />
                <button  onClick={() => setShowPassword(!showPassword)} className="toggle-btn">
                    {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                </button>
            </div>
        </div>
    );
}