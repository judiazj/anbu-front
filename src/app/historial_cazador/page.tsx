"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./historial_cazador.css";
import Link from "next/link";

interface Mission {
  id: number;
  alias: string;
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

  // Filtrado
  const filteredMissions = missions.filter((mission) => {
    const matchSearch = mission.mision
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchEstado =
      selectedEstado === "Todo" || mission.estado === selectedEstado;
    return matchSearch && matchEstado;
  });

  // Handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEstadoChange = (estado: string) => {
    setSelectedEstado(estado);
  };


  return (
    <div className="container_cazador">
      {/* Header ARRIBA dentro del contenedor */}
      <header className="header_cazador">
        <div className="logo_cazador">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor"></path>
          </svg>
          <h2 className="h2cazador">
            ANBU</h2>
        </div>
      </header>

      {/* Contenido principal (lado izquierdo + lado derecho) */}
      <div className="mainContent_cazador">
        {/* Panel izquierdo */}
        <div className="leftContainer_cazador">
          <div className="headerContainer_cazador">
            <div className="titleContainer_cazador">
              <h1 className="title_cazador">Misiones</h1>
            </div>
          </div>

          <aside className="sidebar_cazador">

            <nav>
              <Link href="/notificaciones">
                <button className="menu_button_cazador">
                  <img src="/icons/notification.svg" alt="Notificaciones" />
                  <span>Notificaciones</span>
                </button>
              </Link>
              <Link href="/perfil">
                <button className="menu_button_cazador">
                  <img src="/icons/user.svg" alt="Perfil" />
                  <span>Perfil</span>
                </button>
              </Link>
            </nav>
          </aside>
        </div>

        {/* Panel derecho */}
        <div className="rightContainer_cazador">
          <div className="filters_cazador">
            <button
              className={`filterButton_cazador ${selectedEstado === "Todo" ? "active_cazador" : ""
                }`}
              onClick={() => handleEstadoChange("Todo")}
            >
              Todo
            </button>
            <button
              className={`filterButton_cazador ${selectedEstado === "En progreso" ? "active_cazador" : ""
                }`}
              onClick={() => handleEstadoChange("En progreso")}
            >
              En progreso
            </button>
            <button
              className={`filterButton_cazador ${selectedEstado === "Completado" ? "active_cazador" : ""
                }`}
              onClick={() => handleEstadoChange("Completado")}
            >
              Completado
            </button>
            <button
              className={`filterButton_cazador ${selectedEstado === "Retraso" ? "active_cazador" : ""
                }`}
              onClick={() => handleEstadoChange("Retraso")}
            >
              Retraso
            </button>
            <button
              className={`filterButton_cazador ${selectedEstado === "Fracaso" ? "active_cazador" : ""
                }`}
              onClick={() => handleEstadoChange("Fracaso")}
            >
              Fracaso
            </button>
          </div>

          <div className="searchBar_cazador">
            <img
              src="/icons/search.svg"
              className="searchIcon_cazador"
              alt="Buscar"
            />
            <input
              type="text"
              placeholder="Buscar misiones..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="searchInput_cazador"
            />
          </div>

          <table className="table_cazador">
            <thead>
              <tr>
                <th className="tcazador">Misión</th>
                <th className="tcazador">Estado</th>
                <th className="tcazador">Fecha de Inicio</th>
                <th className="tcazador">Fecha Límite</th>
                <th className="tcazador">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredMissions.map((mission) => (
                <tr key={mission.id}>
                  <td className="tdcazador">{mission.mision}</td>
                  <td className="tdcazador">{mission.estado}</td>
                  <td className="tdcazador">{mission.fechaInicio}</td>
                  <td className="tdcazador">{mission.fechaLimite}</td>
                  <td>
                    <button
                      className="detailButton_cazador"
                    >
                      Detalles
                    </button>
                  </td>
                </tr>
              ))}
              {/* Ejemplo estático */}
              <tr className="tr_cazador">
                <td className="tdcazador">Ejemplo de Misión</td>
                <td className="tdcazador">En progreso</td>
                <td className="tdcazador">2023-01-01</td>
                <td className="tdcazador">2023-12-31</td>
                <td className="tdcazador">
                  <button
                    className="detailButton_cazador"
                  >
                    Detalles
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
