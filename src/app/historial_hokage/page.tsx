"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./historial_hokage.module.css";

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

  // Datos de ejemplo
  const [missions] = useState<Mission[]>([
    {
      id: 1,
      mision: "Rescate en la aldea oculta",
      cazadorAnbu: "Kakashi Hatake",
      estado: "En progreso",
      fechaInicio: "2025-03-01",
      fechaLimite: "2025-03-10",
    },
    {
      id: 2,
      mision: "Espionaje en territorio enemigo",
      cazadorAnbu: "Itachi Uchiha",
      estado: "Completado",
      fechaInicio: "2025-02-15",
      fechaLimite: "2025-02-20",
    },
    {
      id: 3,
      mision: "Protección de alto nivel",
      cazadorAnbu: "Shisui Uchiha",
      estado: "Retraso",
      fechaInicio: "2025-03-05",
      fechaLimite: "2025-03-12",
    },
  ]);

  const [cazadores] = useState<Cazador[]>([
    { id: 1, nombre: "Kakashi Hatake" },
    { id: 2, nombre: "Itachi Uchiha" },
    { id: 3, nombre: "Shisui Uchiha" },
    { id: 4, nombre: "Guy Might" },
    { id: 5, nombre: "Asuma Sarutobi" },
    { id: 6, nombre: "Danzo Shimura" },
    { id: 7, nombre: "Yamato" },
    { id: 8, nombre: "Sai" },
    // Agrega más para probar el scroll
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEstado, setSelectedEstado] = useState("Todo");

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

  const handleCreateMission = () => {
    router.push("/crear-mision");
  };

  const handleDetalle = (missionId: number) => {
    router.push(`/misiones/${missionId}`);
  };

  return (
    <div className={styles.container}>
      {/* Panel izquierdo */}
      <div className={styles.leftContainer}>
        {/* Encabezado: Título y botón */}
        <div className={styles.header}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>Misiones</h1>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.createButton} onClick={handleCreateMission}>
              Crear Misión
            </button>
          </div>
        </div>

        {/* Sección de cazadores ANBU */}
        <div className={styles.cazadoresSection}>
          <h3 className={styles.cazadoresTitle}>Cazadores ANBU disponibles</h3>
          <div className={styles.cazadoresList}>
            {cazadores.map((cazador) => (
              <div key={cazador.id} className={styles.cazadorItem}>
                {cazador.nombre}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panel derecho */}
      <div className={styles.rightContainer}>
        <div className={styles.filters}>
          <button
            className={`${styles.filterButton} ${selectedEstado === "Todo" ? styles.active : ""}`}
            onClick={() => handleEstadoChange("Todo")}
          >
            Todo
          </button>
          <button
            className={`${styles.filterButton} ${
              selectedEstado === "En progreso" ? styles.active : ""
            }`}
            onClick={() => handleEstadoChange("En progreso")}
          >
            En progreso
          </button>
          <button
            className={`${styles.filterButton} ${
              selectedEstado === "Completado" ? styles.active : ""
            }`}
            onClick={() => handleEstadoChange("Completado")}
          >
            Completado
          </button>
          <button
            className={`${styles.filterButton} ${
              selectedEstado === "Retraso" ? styles.active : ""
            }`}
            onClick={() => handleEstadoChange("Retraso")}
          >
            Retraso
          </button>
          <button
            className={`${styles.filterButton} ${
              selectedEstado === "Fracaso" ? styles.active : ""
            }`}
            onClick={() => handleEstadoChange("Fracaso")}
          >
            Fracaso
          </button>
        </div>

        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Buscar misiones"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <table className={styles.table}>
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
                  <button className={styles.detailButton} onClick={() => handleDetalle(mission.id)}>
                    Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
