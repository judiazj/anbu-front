"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./historial_hokage.css";
import { Header } from "../components/header/Header";
import Link from "next/link";

interface Mission {
  id: number;
  mision: string;
  cazadorAnbu: string;
  estado: string;
  fechaInicio: string;
  fechaLimite: string;
}

interface Cazador {
  id: number;
  nombre: string;
}

export default function MissionsPage() {
  const router = useRouter();

  const [missions, setMissions] = useState<Mission[]>([]);
  const [cazadores, setCazadores] = useState<Cazador[]>([]);
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

    const fetchCazadores = async () => {
      try {
        const response = await fetch("/api/cazadores");
        const data = await response.json();
        setCazadores(data);
      } catch (error) {
        console.error("Error al obtener cazadores:", error);
      }
    };

    fetchMissions();
    fetchCazadores();
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
    <div className="container_hk">
      {/* Header ARRIBA dentro del contenedor */}
      <Header />

      {/* Contenido principal (lado izquierdo + lado derecho) */}
      <div className="mainContent_hk">
        {/* Panel izquierdo */}
        <div className="leftContainer_hk">
          <div className="headerContainer_hk">
            <div className="titleContainer_hk">
              <h1 className="title_hk">Misiones</h1>
            </div>
            <div className="buttonContainer_hk">
              <Link href="/crear_mision">
                <button className="createButton_hk">Crear Misión</button>
              </Link>
            </div>
          </div>

          <aside className="sidebar_hk">
            <nav>
              <Link href="/notificaciones">
                <button className="menu_button_hk">
                  <img src="/icons/notification.svg" alt="Notificaciones" />
                  <span>Notificaciones</span>
                </button>
              </Link>
              <Link href="/perfil">
                <button className="menu_button_hk">
                  <img src="/icons/user.svg" alt="Perfil" />
                  <span>Perfil</span>
                </button>
              </Link>
            </nav>
          </aside>

          <div className="cazadoresSection_hk">
            <h3 className="cazadoresTitle_hk">Cazadores ANBU disponibles</h3>
            <div className="cazadoresList_hk">
              {cazadores.map((cazador) => (
                <div key={cazador.id} className="cazadorItem_hk">
                  {cazador.nombre}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel derecho */}
        <div className="rightContainer_hk">
          <div className="filters_hk">
            <button
              className={`filterButton_hk ${selectedEstado === "Todo" ? "active_hk" : ""
                }`}
              onClick={() => handleEstadoChange("Todo")}
            >
              Todo
            </button>
            <button
              className={`filterButton_hk ${selectedEstado === "En progreso" ? "active_hk" : ""
                }`}
              onClick={() => handleEstadoChange("En progreso")}
            >
              En progreso
            </button>
            <button
              className={`filterButton_hk ${selectedEstado === "Completado" ? "active_hk" : ""
                }`}
              onClick={() => handleEstadoChange("Completado")}
            >
              Completado
            </button>
            <button
              className={`filterButton_hk ${selectedEstado === "Retraso" ? "active_hk" : ""
                }`}
              onClick={() => handleEstadoChange("Retraso")}
            >
              Retraso
            </button>
            <button
              className={`filterButton_hk ${selectedEstado === "Fracaso" ? "active_hk" : ""
                }`}
              onClick={() => handleEstadoChange("Fracaso")}
            >
              Fracaso
            </button>
          </div>

          <div className="searchBar_hk">
            <img
              src="/icons/search.svg"
              className="searchIcon_hk"
              alt="Buscar"
            />
            <input
              type="text"
              placeholder="Buscar misiones..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="searchInput_hk"
            />
          </div>

          <table className="table_hk">
            <thead>
              <tr>
                <th>Misión</th>
                <th>Cazador ANBU</th>
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
                  <td>{mission.cazadorAnbu}</td>
                  <td>{mission.estado}</td>
                  <td>{mission.fechaInicio}</td>
                  <td>{mission.fechaLimite}</td>
                  <td>
                    <button
                      className="detailButton_hk"
                    >
                      Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
