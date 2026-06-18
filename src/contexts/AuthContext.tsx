import React, { createContext, useContext, useState, type PropsWithChildren } from "react";

export type User = {
    id: number,
    name: string,
    email: string,
}

export type AuthProp = {
    token: string,
    user: User
} | undefined;

type AuthPropWithState = {
    auth: AuthProp,
    setAuth: React.Dispatch<React.SetStateAction<undefined | AuthProp>>
}

const AuthCtx = createContext<AuthPropWithState | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
    const [auth, setAuth] = useState<AuthProp>(() => {
        const localStorageUser = localStorage.getItem("user");
        const localStorageToken = localStorage.getItem("token");
        if (localStorageUser && localStorageToken) {
            return {
                user: JSON.parse(localStorageUser),
                token: localStorageToken
            };
        }
        return undefined
    });

    return <AuthCtx.Provider value={{
        auth, setAuth
    }}>
        {children}
    </AuthCtx.Provider>
}
export function useAuthContext() {
    return useContext(AuthCtx);
}
