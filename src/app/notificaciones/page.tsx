"use client";

import Link from 'next/link';
import { Header } from '../components/header/Header';
import { Button } from "@/app/components/ui/button";
import { useState } from "react";
import "./notificaciones.css";

export default function Notifications() {
    const [id, setNotificationId] = useState("");
    const [title, setNotificationTitle] = useState("");
    const [description, setNotificationDescription] = useState("");

    return (
        <div className="notificaciones-container_noti">
            {/* Header */}
            <header className='header_noti'>
                <div className="logo_noti">
                    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor"></path>
                    </svg>
                    <h2 className='h2_noti'>ANBU</h2>
                </div>
            </header>

            {/* Contenedor principal para centrar el contenido */}
            <div className="page-container_noti">
                <div className="notification-container_noti">
                    {/* Sidebar */}
                    <aside className="sidebar_noti">
                        <h2>Nombre usuario</h2>
                        <nav>
                            <button className="menu_button_noti">
                                <img src="/icons/search.svg" />
                                <span>Misiones</span>
                            </button>
                            <button className="menu_button_noti">
                                <img src="/icons/user.svg" />
                                <span>Perfil</span>
                            </button>
                        </nav>
                    </aside>

                    {/* Contenido Principal */}
                    <main className="mission_list_noti">
                        <h1 style={{ textAlign: "center", letterSpacing: "0.01em" }}>Notificaciones</h1>
                        <hr />

                        {/* Lista de misiones */}
                        <div className="missions_noti">
                            <div className="mission_item_noti">
                                <div className="mission_info_noti">
                                    <h2>Misión 1</h2>
                                    <p>Hace 1 día</p>
                                </div>
                                <button className="action_button_noti">Brindar apoyo</button>
                            </div>

                            <div className="mission_item_noti">
                                <div className="mission_info_noti">
                                    <h2>Misión 2</h2>
                                    <p>Hace 1 día</p>
                                </div>
                                <button className="action_button_noti">Brindar apoyo</button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
