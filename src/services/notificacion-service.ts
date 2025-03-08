import { NOTIFICACIONES_ENDPOINT } from '@/data/constanst';
import { Notificacion } from '@/interfaces/notificacion';
import { axiosInstance } from '@/utils/axios/axiosInstance';

export const createNotification = async (notification: Notificacion) => {
    const { data, status } = await axiosInstance.post<Notificacion>(NOTIFICACIONES_ENDPOINT.base, notification);
    return { data, status };
}

export const getNotifications = async () => {
    const { data, status } = await axiosInstance.get<Notificacion[]>(NOTIFICACIONES_ENDPOINT.base);
    return { data, status };
}

export const getNotificationById = async (id: string) => {
    const { data, status } = await axiosInstance.get<Notificacion>(`${NOTIFICACIONES_ENDPOINT.base}/${id}`);
    return { data, status };
}