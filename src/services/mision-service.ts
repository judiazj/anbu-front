import { MISIONES_ENDPOINT } from '@/data/constanst';
import { CreateMision, Mision, ShinobiMisions } from '@/interfaces/mision';
import { axiosInstance } from '@/utils/axios/axiosInstance';


export const getMisionsByShinobi = async (alias: string) => {
    const { data, status } = await axiosInstance.get<ShinobiMisions>(`${MISIONES_ENDPOINT.base}/shinobis/${alias}`)
    return { data, status };
}

export const createMision = async (mision: CreateMision) => {
    const { data, status } = await axiosInstance.post<Mision>(`${MISIONES_ENDPOINT.base}`, mision);
    return { data, status };
}

export const getMisions = async () => {
    const { data, status } = await axiosInstance.get<Mision[]>(`${MISIONES_ENDPOINT.base}`);
    return { data, status };
}

export const getMisionById = async (id: string) => {
    const { data, status } = await axiosInstance.get<Mision>(`${MISIONES_ENDPOINT.base}/${id}`);
    return { data, status };
}
