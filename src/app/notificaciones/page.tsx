"use client";

import { Card, CardContent } from "@/app/components/ui/cards";
import { Button } from "@/app/components/ui/button";
import { useState } from "react";
import "./notificaciones.css";

export default function Notifications() {
    const [id, setNotificationId] = useState("");
    const [title, setNotificationTitle] = useState("");
    const [description, setNotificationDescription] = useState("");

    return (
        <>
            {/* Header */}
            <header>
                <div className="logo">
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

            {/* Contenedor principal para centrar el contenido */}
            <div className="page-container">
                <div className="notification-container">
                    {/* Sidebar */}
                    <aside className="sidebar">
                        <h2>Nombre usuario</h2>
                        <nav>
                            <Button className="menu_button">
                                <img src="/icons/search.svg" />
                                <span>Misiones</span>
                            </Button>
                            <Button className="section_button">
                                <img src="/icons/notification_active.svg" />
                                <span>Notificaciones</span>
                            </Button>
                            <Button className="menu_button">
                                <img src="/icons/user.svg" />
                                <span>Perfil</span>
                            </Button>
                        </nav>
                    </aside>

                    {/* Contenido Principal */}
                    <main className="mission_list">
                        <h1 style={{ textAlign: "center", letterSpacing: "0.01em" }}>Notificaciones</h1>
                        <hr />

                        {/* Lista de misiones */}
                        <div className="missions">
                            <div className="mission_item">
                                <div className="mission_info">
                                    <h2>Misión 1</h2>
                                    <p>Hace 1 día</p>
                                </div>
                                <button className="action_button">Brindar apoyo</button>
                            </div>

                            <div className="mission_item">
                                <div className="mission_info">
                                    <h2>Misión 2</h2>
                                    <p>Hace 1 día</p>
                                </div>
                                <button className="action_button">Brindar apoyo</button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}