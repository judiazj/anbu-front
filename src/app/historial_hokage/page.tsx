"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./historial_hokage.css"; // Importa el CSS (renombrado con sufijo _hk)

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

  // Estados vacíos al inicio
  const [missions, setMissions] = useState<Mission[]>([]);
  const [cazadores, setCazadores] = useState<Cazador[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEstado, setSelectedEstado] = useState("Todo");

  // Efecto para cargar datos desde el backend (ejemplo con fetch)
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

  // Filtrado de misiones según texto y estado
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

  const handleCreateMission = () => {
    router.push("/crear_mision");
  };

  const handleProfile = () => {
    router.push("/perfil");
  };

  const handleDetalle = (missionId: number) => {
    router.push(`/misiones/${missionId}`);
  };

  return (
    <>
      {/* Agregamos la clase al <header> para usar .header_hk en CSS */}
      <header className="header_hk">
        <div className="logo_hk">
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

      <div className="container_hk">
        {/* Panel izquierdo */}
        <div className="leftContainer_hk">
          {/* Contenedor de título y botón */}
          <div className="headerContainer_hk">
            <div className="titleContainer_hk">
              <h1 className="title_hk">Misiones</h1>
            </div>
            <div className="buttonContainer_hk">
              <button className="createButton_hk" onClick={handleCreateMission}>
                Crear Misión
              </button>
            </div>
          </div>

          <aside className="sidebar_hk">
            <nav>
              <button className="menu_button_hk">
                <img src="/icons/notification.svg" />
                <span>Notificaciones</span>
              </button>
              <button className="menu_button_hk" onClick={handleProfile}>
                <img src="/icons/user.svg" />
                <span>Perfil</span>
              </button>
            </nav>
          </aside>

          {/* Sección de cazadores ANBU */}
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
              className={`filterButton_hk ${
                selectedEstado === "Todo" ? "active_hk" : ""
              }`}
              onClick={() => handleEstadoChange("Todo")}
            >
              Todo
            </button>
            <button
              className={`filterButton_hk ${
                selectedEstado === "En progreso" ? "active_hk" : ""
              }`}
              onClick={() => handleEstadoChange("En progreso")}
            >
              En progreso
            </button>
            <button
              className={`filterButton_hk ${
                selectedEstado === "Completado" ? "active_hk" : ""
              }`}
              onClick={() => handleEstadoChange("Completado")}
            >
              Completado
            </button>
            <button
              className={`filterButton_hk ${
                selectedEstado === "Retraso" ? "active_hk" : ""
              }`}
              onClick={() => handleEstadoChange("Retraso")}
            >
              Retraso
            </button>
            <button
              className={`filterButton_hk ${
                selectedEstado === "Fracaso" ? "active_hk" : ""
              }`}
              onClick={() => handleEstadoChange("Fracaso")}
            >
              Fracaso
            </button>
          </div>

          <div className="searchBar_hk">
            <img src="/icons/search.svg" className="searchIcon_hk" />
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
                      onClick={() => handleDetalle(mission.id)}
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
    </>
  );
}
