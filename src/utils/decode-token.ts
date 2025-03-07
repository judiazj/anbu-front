'use client';

import { Token } from "@/interfaces/token";

export const decodeToken = () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
        return {
            alias: '',
            password: '',
            rango: '',
            id: '',
            iat: 0,
            exp: 0,
        }
    }

    const tokenParse: Token = JSON.parse(atob(token.split('.')[1]));
    return tokenParse;
}