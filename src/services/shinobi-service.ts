import { SHINOBI_ENDPOINT } from '@/data/constanst';
import { Shinobi } from '@/interfaces/shinobi'
import { axiosInstance } from '@/utils/axios/axiosInstance'


export const getShinobi = async (id: string): Promise<Shinobi> => {
    const { data } = await axiosInstance.get<Shinobi>(`${SHINOBI_ENDPOINT.base}/${id}`)
    return data;
}