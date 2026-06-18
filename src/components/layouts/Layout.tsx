import { useNavigate } from "react-router-dom";
import { logout } from "../../services/AuthService"

export function Layout() {
    const navigate = useNavigate();
    return <>
        Bonjour
        <button onClick={async () => {
            const rep = await logout();
            if (rep.status == 200) {
                navigate("/login")
            }
        }}>Logout</button>
    </>
}