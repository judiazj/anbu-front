'use client';

import { decodeToken } from '@/utils/decode-token';
import { Header } from '../components/header/Header';
import { ProfileCard } from './components/ProfileCard';
import './perfil.css';
import Link from 'next/link';

export default function Profile() {

  const {rango} = decodeToken()

  return (
    <div className="profile-container">
      {/* Barra superior */}
      <header className="header_perfil">
        <div className="logo_perfil">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor"></path>
          </svg>
          <h2 className='h2_perfil'>ANBU</h2>
        </div>
      </header>
      {rango === 'hokage' ? 
      <>
      <Link href='/historial_hokage'> Historial de misiones</Link> 
      </>:
      <Link href='historial_cazador'>Historial de misiones</Link>}

      <ProfileCard />
    </div>
  );
}
