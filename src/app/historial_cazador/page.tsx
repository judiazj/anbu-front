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
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

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

  const handleDetailsClick = (mission: Mission) => {
    setSelectedMission(mission);
  };

  const closeModal = () => {
    setSelectedMission(null);
  };

  return (
    <div className="container_cazador">
      {/* Header */}
      <header className="header_cazador">
        <div className="logo_cazador">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor"></path>
          </svg>
          <h2 className="h2cazador">ANBU</h2>
        </div>
      </header>

      {/* Contenido principal */}
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
            {["Todo", "En progreso", "Completado", "Retraso", "Fracaso"].map((estado) => (
              <button
                key={estado}
                className={`filterButton_cazador ${selectedEstado === estado ? "active_cazador" : ""}`}
                onClick={() => handleEstadoChange(estado)}
              >
                {estado}
              </button>
            ))}
          </div>

          <div className="searchBar_cazador">
            <img src="/icons/search.svg" className="searchIcon_cazador" alt="Buscar" />
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
            <tbody className= "tablahc">
              {filteredMissions.map((mission) => (
                <tr key={mission.id}>
                  <td className="tdcazador">{mission.mision}</td>
                  <td className="tdcazador">{mission.estado}</td>
                  <td className="tdcazador">{mission.fechaInicio}</td>
                  <td className="tdcazador">{mission.fechaLimite}</td>
                  <td>
                    <button className="detailButton_cazador" onClick={() => handleDetailsClick(mission)}>
                      Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para mostrar detalles de la misión */}
      {selectedMission && (
        <div className="modal_cazador">
          <div className="modal_content_cazador">
            <h2>{selectedMission.mision}</h2>
            <p><strong>Alias:</strong> {selectedMission.alias}</p>
            <p><strong>Estado:</strong> {selectedMission.estado}</p>
            <p><strong>Fecha de Inicio:</strong> {selectedMission.fechaInicio}</p>
            <p><strong>Fecha Límite:</strong> {selectedMission.fechaLimite}</p>
            <button className="closeButton_cazador" onClick={closeModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
