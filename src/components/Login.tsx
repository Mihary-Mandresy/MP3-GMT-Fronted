import { useEffect, useRef, useState } from "react"
import { login } from "../services/AuthService"
import { Input } from "./Input";

export default function Login() {
    const email = useRef("");
    const password = useRef("");

    const [error, setError] = useState<string>("");

    useEffect(() => {
        const tm = setTimeout(() => {
            setError("");
        }, 2000);
        return () => {
            clearTimeout(tm);
        }
    }, [error])

    return <>
        <form action="">
            <Input
                refValue={email}
                label="Email"
                defaultValue="ranjatosonmihary@gmil.com"
            />
            <Input
                refValue={password}
                type="password"
                label="Mot de Passe"
                defaultValue="mihary"
            />

            {error && <div className="error">
                <p>{error}</p>
            </div>}

            <button className="btn btn-primary" onClick={async e => {
                e.preventDefault();
                const rep = await login(email.current, password.current)
                if (rep.status == 401) {
                    setError(rep.message);
                } else {
                    
                }
            }}>Se Connecter</button>
        </form>
    </>
}