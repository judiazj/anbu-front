"use client";
import React, { useState, useEffect } from "react";
import "./historial_hokage.css";
import Link from "next/link";
import { getMisions } from "@/services/mision-service";
import { decodeToken } from "@/utils/decode-token";
import { updateMissionState } from "@/services/mision-service"; // Importa el servicio para actualizar el estado de la misión

interface Mission {
  id: number;
  titulo: string;
  id_cazador: string;
  estado: string;
  fecha_inicio: Date;
  fecha_fin: Date;
}

interface Cazador {
  id: number;
  nombre: string;
}

const {id, rango} = decodeToken();
        if (rango!=='hokage'){
            // window.location.href='/perfil'
        }

const HistorialHokage = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [cazadores, setCazadores] = useState<Cazador[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEstado, setSelectedEstado] = useState("Todo");
  const [updatedMission, setUpdatedMission] = useState<Mission | null>(null); // Estado para la misión actualizada

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const { data } = await getMisions();
        
        const missionsFormatted: Mission[] = data.map((m: any) => ({
          id: m._id ?? "",  
          titulo: m.titulo ?? "Sin título",  
          id_cazador: m.id_cazador ?? "Desconocido",  
          fecha_inicio: m.fecha_inicio ? new Date(m.fecha_inicio) : new Date(),
          fecha_fin: m.fecha_fin ? new Date(m.fecha_fin) : new Date(),
          estado: m.estado ?? "Desconocido",
        }));
        
        setMissions(missionsFormatted);
      } catch (error) {
        console.error("Error al obtener misiones:", error);
      }
    };

    fetchMissions();
  }, []); // Eliminar 'missions' de las dependencias

  useEffect(() => {
    if (updatedMission) {
      const updateMission = async () => {
        try {
          await updateMissionState(updatedMission.id.toString(), updatedMission.estado);
        } catch (error) {
          console.error("Error al actualizar el estado de la misión:", error);
        }
      };

      updateMission();
    }
  }, [updatedMission]); // Ejecutar cuando updatedMission cambie

  const filteredMissions = missions.filter((mission) => {
    return (
      mission.titulo.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedEstado === "Todo" || mission.estado === selectedEstado)
    );
  });

  const formatoFecha = (fecha: Date) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
  };

  const handleStateChange = (id: number, newState: string) => {
    setMissions(prevMissions => prevMissions.map(mission => mission.id === id ? { ...mission, estado: newState } : mission));
    const missionToUpdate = missions.find(mission => mission.id === id);
    if (missionToUpdate) {
      setUpdatedMission({ ...missionToUpdate, estado: newState });
    }
  };

  return (
    <div className="container_hk">
      <header className="header_hk">
        <div className="logo_hk">
          <h2 className="h2hk">ANBU</h2>
        </div>
      </header>

      <div className="mainContent_hk">
        <div className="leftContainer_hk">
          <div className="headerContainer_hk">
            <h1 className="title_hk">Misiones</h1>
            <Link href="/crear_mision">
              <button className="createButton_hk">Crear Misión</button>
            </Link>
          </div>

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

        <div className="rightContainer_hk">
          <div className="filters_hk">
            {["Todo", "en proceso", "completada", "Retraso", "Fracaso"].map((estado) => (
              <button
                key={estado}
                className={`filterButton_hk ${selectedEstado === estado ? "active_hk" : ""}`}
                onClick={() => setSelectedEstado(estado)}
              >
                {estado}
              </button>
            ))}
          </div>

          <div className="searchBar_hk">
            <input
              type="text"
              placeholder="Buscar misiones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="searchInput_hk"
            />
          </div>

          <table className="table_hk">
            <thead>
              <tr>
                <th className="thk">Misión</th>
                <th className="thk">Cazador ANBU</th>
                <th className="thk">Estado</th>
                <th className="thk">Fecha de Inicio</th>
                <th className="thk">Fecha Límite</th>
              </tr>
            </thead>
            <tbody className="tbhk">
          {filteredMissions.map((mission) => (
            <tr key={mission.id}>
              <td className="tdhk">{mission.titulo}</td>
              <td className="tdhk">{mission.id_cazador}</td>
              <td className="tdhk">
                <select
                  className="select_hk"
                  value={mission.estado}
                  onChange={(e) => handleStateChange(mission.id, e.target.value)}>
                  <option value="en proceso">En proceso</option>
                  <option value="completada">Completada</option>
                  <option value="Retraso">Retraso</option>
                  <option value="Fracaso">Fracaso</option>
                </select>
                </td>
                <td>{formatoFecha(mission.fecha_inicio)}</td>
                <td className="tdhk">{formatoFecha(mission.fecha_fin)}</td>
              </tr>
            ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default HistorialHokage;