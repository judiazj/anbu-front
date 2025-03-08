"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./historial_hokage.css";
import Link from "next/link";
import { getMisions } from "@/services/mision-service";

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

const HistorialHokage = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [cazadores, setCazadores] = useState<Cazador[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEstado, setSelectedEstado] = useState("Todo");

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const { data } = await getMisions();
        const missionsFormatted: Mission[] = data.map((m: any) => ({
          id: m.id ?? 0,
          titulo: m.mision ?? "",
          id_cazador: m.cazadorAnbu ?? "",
          fecha_inicio: new Date(m.fechaInicio),
          fecha_fin: new Date(m.fechaLimite),
          estado: m.estado ?? "Desconocido",
        }));
        setMissions(missionsFormatted);
      } catch (error) {
        console.error("Error al obtener misiones:", error);
      }
    };

    fetchMissions();
  }, []);

  const filteredMissions = missions.filter((mission) => {
    return (
      mission.titulo.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedEstado === "Todo" || mission.estado === selectedEstado)
    );
  });

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
            {["Todo", "En progreso", "Completado", "Retraso", "Fracaso"].map((estado) => (
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
            <tbody>
              {filteredMissions.map((mission) => (
                <tr key={mission.id}>
                  <td className="tdhk">{mission.titulo}</td>
                  <td className="tdhk">{mission.id_cazador}</td>
                  <td className="tdhk">{mission.estado}</td>
                  <td className="tdhk">{mission.fecha_inicio.toDateString()}</td>
                  <td className="tdhk">{mission.fecha_fin.toDateString()}</td>
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
