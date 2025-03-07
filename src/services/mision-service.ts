import { ShinobiMisions } from '@/interfaces/mision';
import { axiosInstance } from '@/utils/axios/axiosInstance';

export const getMisionsByShinobi = async (alias: string): Promise<ShinobiMisions> => {
    const { data } = await axiosInstance.get<ShinobiMisions>(`/misiones/shinobis/${alias}`)
    return data;
}