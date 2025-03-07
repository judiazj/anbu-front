'use client';

import { Card, CardContent } from '@/app/components/ui/cards';
import { PasswordInput } from './PasswordInput';
import { useProfile } from '@/hooks/useProfile';

export const ProfileCard = () => {

    const { shinobiInfo, misionsShinobi } = useProfile();

    const { misionesCompletas, misionesFallidas } = misionsShinobi;

    const handleLogout = () => {
        document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        localStorage.removeItem('access_token');
        window.location.href = '/login';
    }

    return (

        <Card className="profile-card">
            <CardContent>
                <div className="profile-header">
                    <img src={shinobiInfo.img} alt="Foto de perfil" className="profile-picture" />
                    <div>
                        <h2 className="alias">{shinobiInfo.alias}</h2>
                        <p>Última vez: {new Date().toDateString()}</p>
                    </div>
                </div>
                <div className="profile-info">
                    <p>
                        <strong>Fecha de ingreso:</strong> {new Date(shinobiInfo.fecha_ingreso).toDateString()}
                    </p>
                    <div className="stats-row">
                        <div className="stat">
                            <strong>{misionesCompletas.length}</strong>
                            <p>Misiones</p>
                        </div>
                        <div className="stat">
                            <strong>{misionesFallidas.length}</strong>
                            <p>Misiones fracasadas</p>
                        </div>
                    </div>
                </div>

                <PasswordInput currentPassword={shinobiInfo.password} />
                <button className="logout" onClick={handleLogout}>
                    Cerrar Sesión
                </button>
            </CardContent>
        </Card>
    );
}