import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext"
import { Layout } from "./Layout";

export default function LayoutRedirect() {
    const { auth } = useAuthContext()!;
    return auth ?
        <Layout /> :
        <Navigate to={"/login"}/>
}