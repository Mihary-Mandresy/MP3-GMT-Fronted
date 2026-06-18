import axios, { AxiosError } from "axios";
import { URL } from "../config";
import type { AuthProp } from "../../../AuthContext";

type LoginResponse = {
    status: number,
    message: string,
    auth: AuthProp | undefined
}

export async function login(email: string, password: string) : Promise<LoginResponse> {
    return axios.post(URL + "/login", {
        email, password
    })
        .then(rep => {
            const data = rep.data
            return {
                status: rep.status,
                message: data.message as string,
                auth: data.auth as AuthProp
            };
        })
        .catch((err: AxiosError) => {
            return {
                status: err.status || 500,
                message: (err.response?.data as {message: string}).message,
                auth: undefined
            }
        })
}