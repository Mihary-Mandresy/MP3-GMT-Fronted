import axios from "axios"

export const HOST = 'localhost'
export const PORT = 8000

export const URL = `http://${HOST}:${PORT}/api`


const api = axios.create({
    baseURL: URL,
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

export {
    api
};