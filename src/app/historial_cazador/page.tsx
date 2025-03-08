"use client";


import { Header } from "../components/header/Header";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./historial_cazador.css";
import Link from "next/link";

interface Mission {
  id: number;
  mision: string;
  estado: string;
  fechaInicio: string;
  fechaLimite: string;
}

export default function MissionsPage() {
  const router = useRouter();

  const [missions, setMissions] = useState<Mission[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEstado, setSelectedEstado] = useState("Todo");

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await fetch("/api/missions");
        const data = await response.json();
        setMissions(data);
      } catch (error) {
        console.error("Error al obtener misiones:", error);
      }
    };

    fetchMissions();
  }, []);

  const filteredMissions = missions.filter((mission) => {
    const matchSearch = mission.mision.toLowerCase().includes(searchTerm.toLowerCase());
    const matchEstado = selectedEstado === "Todo" || mission.estado === selectedEstado;
    return matchSearch && matchEstado;
  });

  return (
    <>
      <Header />
      <div className="container">
        <aside className="sidebar">
          <h2>Nombre usuario</h2>
          <nav>
            <button className="menu_button">
              <img src="/icons/notification.svg" />
              <span>Notificaciones</span>
            </button>
          <Link href="/perfil" className="menu_button">
            <img src="/icons/user.svg" />
            <span>Perfil</span>
          </Link>
        </nav>
      </aside>

      <div className="rightContainer">
        <div className="filters">
          {["Todo", "En progreso", "Completado", "Retraso", "Fracaso"].map((estado, index) => (
            <button
              key={index}
              className={`filterButton ${index + 1} ${selectedEstado === estado ? "active" : ""}`}
              onClick={() => setSelectedEstado(estado)}
            >
              {estado}
            </button>
          ))}
        </div>

        <div className="searchBar">
          <img src="/icons/search.svg" className="searchIcon" />
          <input
            type="text"
            placeholder="Buscar misiones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="searchInput"
          />
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Misión</th>
              <th>Estado</th>
              <th>Fecha de Inicio</th>
              <th>Fecha Límite</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredMissions.map((mission) => (
              <tr key={mission.id}>
                <td>{mission.mision}</td>
                <td>{mission.estado}</td>
                <td>{mission.fechaInicio}</td>
                <td>{mission.fechaLimite}</td>
                <td>
                  <button className="filterButton" onClick={() => router.push(`/misiones/${mission.id}`)}>
                    Detalles
                  </button>
                </td>
              </tr>
            ))}

            <tr>
              <td>Ejemplo de Misión</td>
              <td>En progreso</td>
              <td>2023-01-01</td>
              <td>2023-12-31</td>
              <td>
                <button className="filterButton" onClick={() => router.push(`/misiones/0`)}>
                  Detalles
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div >
    </>
  );
}
