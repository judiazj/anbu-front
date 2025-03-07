'use client';

import { Header } from '../components/header/Header';
import { ProfileCard } from './components/ProfileCard';
import './perfil.css';

export default function Profile() {


  return (
    <div className="profile-container">
      {/* Barra superior */}
      <Header />

      <ProfileCard />
    </div>
  );
}
