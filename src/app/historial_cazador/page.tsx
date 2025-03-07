"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./historial_cazador.css";

interface Mission {
  id: number;
  mision: string;
  estado: string;
  fechaInicio: string;
  fechaLimite: string;
}

export default function MissionsPage() {
  const router = useRouter();

  // Estados vacíos al inicio
  const [missions, setMissions] = useState<Mission[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEstado, setSelectedEstado] = useState("Todo");

  // Efecto para cargar datos desde el backend (ejemplo con fetch)
  useEffect(() => {
    // Llamada para misiones
    const fetchMissions = async () => {
      try {
        const response = await fetch("/api/missions");
        const data = await response.json();
        setMissions(data); // Guardar en estado
      } catch (error) {
        console.error("Error al obtener misiones:", error);
      }
    };

    fetchMissions();
  }, []);

  // Filtrado de ejemplo
  const filteredMissions = missions.filter((mission) => {
    const matchSearch = mission.mision.toLowerCase().includes(searchTerm.toLowerCase());
    const matchEstado = selectedEstado === "Todo" || mission.estado === selectedEstado;
    return matchSearch && matchEstado;
  });

  // Handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEstadoChange = (estado: string) => {
    setSelectedEstado(estado);
  };

  const handleDetalle = (missionId: number) => {
    router.push(`/misiones/${missionId}`);
  };

  return (

    <><header>
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

      <div className="container">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2>Nombre usuario</h2>
          <nav>
            <button className="section_button">
              <img src="/icons/search.svg" />
              <span>Misiones</span>
            </button>
            <button className="menu_button">
              <img src="/icons/notification.svg" />
              <span>Notificaciones</span>
            </button>
            <button className="menu_button">
              <img src="/icons/user.svg" />
              <span>Perfil</span>
            </button>
          </nav>
        </aside>

        {/* Panel derecho */}
        <div className="rightContainer">
          <div className="filters">
            <button
              className={`filterButton ${selectedEstado === "Todo" ? "active" : ""}`}
              onClick={() => handleEstadoChange("Todo")}
            >
              Todo
            </button>
            <button
              className={`filterButton ${selectedEstado === "En progreso" ? "active" : ""}`}
              onClick={() => handleEstadoChange("En progreso")}
            >
              En progreso
            </button>
            <button
              className={`filterButton ${selectedEstado === "Completado" ? "active" : ""}`}
              onClick={() => handleEstadoChange("Completado")}
            >
              Completado
            </button>
            <button
              className={`filterButton ${selectedEstado === "Retraso" ? "active" : ""}`}
              onClick={() => handleEstadoChange("Retraso")}
            >
              Retraso
            </button>
            <button
              className={`filterButton ${selectedEstado === "Fracaso" ? "active" : ""}`}
              onClick={() => handleEstadoChange("Fracaso")}
            >
              Fracaso
            </button>
          </div>

          <div className="searchBar">
            <img src="/icons/search.svg" className="searchIcon" />
            <input
              type="text"
              placeholder="Buscar misiones..."
              value={searchTerm}
              onChange={handleSearchChange}
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
                    <button className="filterButton" onClick={() => handleDetalle(mission.id)}>
                      Detalles
                    </button>
                  </td>
                </tr>
              ))}
              {/* Ejemplo estático */}
              <tr>
                <td>Ejemplo de Misión</td>
                <td>En progreso</td>
                <td>2023-01-01</td>
                <td>2023-12-31</td>
                <td>
                  <button className="filterButton" onClick={() => handleDetalle(0)}>
                    Detalles
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div></>
  );
}
