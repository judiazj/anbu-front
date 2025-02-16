"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/app/components/ui/cards";
import { Button } from "@/app/components/ui/button";
import "./perfil.css";

export default function Profile() {
  const [profileData, setProfileData] = useState({
    name: "NaN",
    lastSeen: "NaN",
    missions: "NaN",
    failedMissions: "NaN",
    joinDate: "NaN",
  });

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const response = await fetch("/api/profile");
        if (!response.ok) throw new Error("Error fetching profile data");
        const data = await response.json();
        setProfileData(data || profileData);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }

    fetchProfileData();
  }, []);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const generatePassword = () => {
    if (!isButtonDisabled){
    const randomPassword = Math.random().toString(36).slice(-10);
    setPassword(randomPassword);
    setIsButtonDisabled(true);
    }
  };

  return (
    <div className="profile-container">
      {/* Barra superior */}
      <header>
        <div className="logo">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
              fill="currentColor"
            ></path>
          </svg>
          <h2>ANBU</h2>
        </div>
      </header>

      <Card className="profile-card">
        <CardContent>
          <div className="profile-header">
            <img src="/default-profile.png" alt="Foto de perfil" className="profile-picture" />
            <div>
              <h2>{profileData.name}</h2>
              <p>Última vez: {profileData.lastSeen}</p>
            </div>
          </div>
          <div className="profile-info">
            <p>
              <strong>Fecha de ingreso:</strong> {profileData.joinDate}
            </p>
            <div className="stats-row">
              <div className="stat">
                <strong>{profileData.missions}</strong>
                <p>Misiones</p>
              </div>
              <div className="stat">
                <strong>{profileData.failedMissions}</strong>
                <p>Misiones fracasadas</p>
              </div>
            </div>
          </div>
          <div className="password-section">
            <p>
              <strong>Nueva contraseña:</strong>
            </p>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                readOnly
                placeholder="Genera una contraseña"
              />
              <Button onClick={generatePassword} className="generate-btn">
                Generar contraseña
              </Button>
              <Button onClick={() => setShowPassword(!showPassword)} className="toggle-btn">
                {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
