"use client";

import { Card, CardContent } from "@/app/components/ui/cards";
import "./crear_mision.css";
import { useState, useEffect } from "react";
import { createMision } from "@/services/mision-service";
import { getShinobis, updateShinobi } from "@/services/shinobi-service";
import { CreateMision } from "@/interfaces/mision";
import { Shinobi } from "@/interfaces/shinobi";
import { RangoMision } from "@/interfaces/mision";
import { decodeToken } from "@/utils/decode-token";


export default function CreateMission() {
    const [missionTitle, setMissionTitle] = useState("");
    const [missionDescription, setMissionDescription] = useState("");
    const [missionDeadline, setMissionDeadline] = useState("");
    const [missionRank, setMissionRank] = useState<RangoMision>("D");
    const [selectedShinobi, setSelectedShinobi] = useState<string | null>(null);
    const [availableShinobis, setAvailableShinobis] = useState<Shinobi[]>([]);

    const {id, rango} = decodeToken();
        if (rango!=='hokage'){
            window.location.href='/perfil'
        }

    useEffect(() => {
        const fetchShinobis = async () => {
            try {
                const shinobis = await getShinobis();
                const disponibles = shinobis.filter(shinobi => shinobi.estado === "disponible");
                setAvailableShinobis(disponibles);
            } catch (error) {
                console.error("Error al obtener shinobis:", error);
            }
        };

        fetchShinobis();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedShinobi) {
            alert("Selecciona un shinobi para la misión.");
            return;
        }

        try {
            // Crear misión
            const nuevaMision: CreateMision = {
                titulo: missionTitle,
                descripcion: missionDescription,
                rango: missionRank, // Se incluye el rango seleccionado
                id_hokage: id,
            };

            const { data: missionData } = await createMision(nuevaMision);

            // Actualizar estado del shinobi a "ocupado"
            await updateShinobi(selectedShinobi, { estado: "ocupado" });

            alert("Misión creada y shinobi asignado con éxito.");
            setMissionTitle("");
            setMissionDescription("");
            setMissionDeadline("");
            setMissionRank("D" as RangoMision); 
            setSelectedShinobi(null);
        } catch (error) {
            console.error("Error al crear misión o asignar shinobi:", error);
            alert("Hubo un problema al crear la misión.");
        }
    };

    return (
        <div className="mission-container">
            <header className="header_creacion">
                <div className="logo_creacion">
                    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor"></path>
                    </svg>
                    <h2 className="h2_creacion">ANBU</h2>
                </div>
            </header>

            <Card className="mission-card">
                <CardContent>
                    <h2>Crear Misión</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Título de la misión:
                            <input
                                type="text"
                                value={missionTitle}
                                onChange={(e) => setMissionTitle(e.target.value)}
                                placeholder="Ejemplo: Protege a Hokage"
                                required
                            />
                        </label>
                        <label>
                            Descripción de la misión:
                            <textarea
                                value={missionDescription}
                                onChange={(e) => setMissionDescription(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Tiempo de finalización misión:
                            <input
                                type="date"
                                value={missionDeadline}
                                onChange={(e) => setMissionDeadline(e.target.value)}
                            />
                        </label>
                        <label>
                            Rango de la misión:
                            <select value={missionRank} onChange={(e) => setMissionRank(e.target.value as RangoMision)}>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>     
                                <option value="S">S</option>
                            </select>
                        </label>

                        <h3>Asignar Shinobi</h3>
                        <table className="shinobi-table">
                            <thead>
                                <tr>
                                    <th>Cazador</th>
                                    <th>Fecha de ingreso</th>
                                    <th>Asignar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {availableShinobis.length > 0 ? (
                                    availableShinobis.map((shinobi) => (
                                        <tr key={shinobi._id}>
                                            <td>{shinobi.alias}</td>
                                            <td>{new Date(shinobi.fecha_ingreso).toLocaleDateString()}</td>
                                            <td>
                                                <input
                                                    type="radio"
                                                    name="shinobi"
                                                    value={shinobi._id}
                                                    onChange={(e) => setSelectedShinobi(e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3}>No hay shinobis disponibles.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <div className="buttons_creacion">
                            <button type="button">Cancelar</button>
                            <button type="submit" className="button_creacion">Crear misión</button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
