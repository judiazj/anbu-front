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
            <header className="header_creacion">
                <div className="logo_creacion">
                    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor"></path>
                    </svg>
                    <h2 className="h2_creacion">
                        ANBU</h2>
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
                                    <th className="th_creacion">Cazador</th>
                                    <th className="th_creacion">Fecha de ingreso</th>
                                    <th className="th_creacion">Asignar</th>
                                </tr>
                            </thead>
                        </table>

                        <div className="buttons_creacion">
                            <Button>Cancelar</Button>
                            <button type="submit" className="button_creacion">Crear misión</button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}