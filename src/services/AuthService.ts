import axios, { AxiosError } from "axios";
import { api, URL } from "../config";
import type { AuthProp, User } from "../contexts/AuthContext";

type LoginResponse = {
    status: number,
    message: string,
    auth: AuthProp | undefined
}

type apiLoginResponse = {
    message: string,
    token?: string,
    user?: User
}

type LogoutResponse = Pick<LoginResponse, "status" | "message">;

export async function login(email: string, password: string): Promise<LoginResponse> {
    return axios.post(URL + "/login", {
        email, password
    })
        .then(rep => {
            const data: apiLoginResponse = rep.data
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
            }
            if (data.token) {
                localStorage.setItem("token", data.token);
            }

            return {
                status: rep.status,
                message: data.message as string,
                auth: {
                    token: data.token,
                    user: data.user
                } as AuthProp
            };
        })
        .catch((err: AxiosError) => {
            return {
                status: err.status || 500,
                message: (err.response?.data as { message: string }).message,
                auth: undefined
            }
        })
}
