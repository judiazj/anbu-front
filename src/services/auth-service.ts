import { AUTH_ENDPOINT } from '@/data/constanst';
import { axiosInstance } from '@/utils/axios/axiosInstance';


export const login = async (alias: string, password: string) => {
  try {
    const { data, status } = await axiosInstance.post(AUTH_ENDPOINT.login, {
      alias,
      password
    });
    return { data, status };
  } catch (error) {
    return {
      message: 'Error al iniciar sesión'
    }
  }
}

export const registerShinobi = async (alias: string, password: string, img?: string) => {
  const { data, status } = await axiosInstance.post(AUTH_ENDPOINT.register, {
    alias,
    password,
    img
  });
  return { data, status };
}