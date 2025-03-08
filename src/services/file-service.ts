import { FILE_ENDPOINT } from "@/data/constanst";
import { axiosInstance } from "@/utils/axios/axiosInstance";


export const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const { data, status } = await axiosInstance.post<{ url: string }>(`${FILE_ENDPOINT.base}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return { data, status };
}