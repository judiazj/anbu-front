"use client";

import { Card, CardContent } from "@/app/components/ui/cards";
import { Button } from "@/app/components/ui/button";
import "./crear_mision.css";
import { useState } from "react";
import { Header } from "../components/header/Header";

export default function CreateMission() {
    const [missionTitle, setMissionTitle] = useState("");
    const [missionDescription, setMissionDescription] = useState("");
    const [missionDeadline, setMissionDeadline] = useState("");

    interface MissionForm {
        missionTitle: string;
        missionDescription: string;
        missionDeadline: string;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Lógica para manejar la creación de la misión
    };

    return (
        <div className="mission-container">
            <Header />
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
                            />
                        </label>
                        <label>
                            Descripción de la misión:
                            <textarea
                                value={missionDescription}
                                onChange={(e) => setMissionDescription(e.target.value)}
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

                        <h3>Asignar Shinobi</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Cazador</th>
                                    <th>Fecha de ingreso</th>
                                    <th>Asignar</th>
                                </tr>
                            </thead>
                        </table>

                        <div className="buttons">
                            <Button>Cancelar</Button>
                            <button type="submit" className="button">Crear misión</button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}