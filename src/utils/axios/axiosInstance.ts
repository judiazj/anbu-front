import axios from 'axios';


const token = localStorage.getItem('access_token') || '';


export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
})