"use client";
import React, { useState , useEffect} from "react";
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
  
  // Estados vacíos al inicio
  const [missions, setMissions] = useState<Mission[]>([]);
  const [cazadores, setCazadores] = useState<Cazador[]>([]);
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

    // Llamada para cazadores
    const fetchCazadores = async () => {
      try {
        const response = await fetch("/api/cazadores");
        const data = await response.json();
        setCazadores(data); // Guardar en estado
      } catch (error) {
        console.error("Error al obtener cazadores:", error);
      }
    };

    fetchMissions();
    fetchCazadores();
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

  const handleCreateMission = () => {
    router.push("/crear_mision");
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
