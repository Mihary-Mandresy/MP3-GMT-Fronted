import React, { createContext, useContext, useState, type PropsWithChildren } from "react";

export type AuthProp = {
    token: string,
    user: {
        id: number,
        name: string,
        email: string,
    }
} | undefined;

type AuthPropWithState = {
    auth: AuthProp,
    setAuth: React.Dispatch<React.SetStateAction<undefined | AuthProp>>
}

const AuthCtx = createContext<AuthPropWithState | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
    const [auth, setAuth] = useState<AuthProp>(() => {
        const sessionAuth = sessionStorage.getItem("auth");
        if (sessionAuth) {
            return JSON.parse(sessionAuth);
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
