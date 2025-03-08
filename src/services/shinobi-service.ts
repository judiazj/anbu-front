import { SHINOBI_ENDPOINT } from '@/data/constanst';
import { Shinobi, UpdateShinobi } from '@/interfaces/shinobi'
import { axiosInstance } from '@/utils/axios/axiosInstance'


export const getShinobi = async (alias: string): Promise<Shinobi> => {
    const { data } = await axiosInstance.get<Shinobi>(`${SHINOBI_ENDPOINT.base}/${alias}`)
    return data;
}

export const getShinobis = async () => {
    const { data } = await axiosInstance.get<Shinobi[]>(SHINOBI_ENDPOINT.base)
    return data;
}

export const updateShinobi = async (id: string, { estado, img }: UpdateShinobi) => {
    const { data } = await axiosInstance.patch(`${SHINOBI_ENDPOINT.base}/${id}`, { estado, img })
    return data;
}