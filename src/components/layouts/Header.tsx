import { useNavigate } from "react-router-dom";
import { logout } from "../../services/AuthService";
import { useAuthContext } from "../../contexts/AuthContext";

export default function Header() {

    const navigate = useNavigate();
    const { auth  } = useAuthContext()!;

    const handleLogout = async () => {
        const rep = await logout();
        if (rep.status == 200) {
            navigate("/login")
        }
    }   
    return <div className="flex w-full fixed top-0 h-14 bg-red-500 z-10">
        <div className="h-full w-70 flex bg-blue-100 items-center justify-center">
            <h1 className="">MP3-GMT</h1>
        </div>
        <div className="h-full flex items-center justify-center" style={{
            width: "calc(100% - 560px)"
        }}>
            <h1 className="text-3xl">Ceci est une titre</h1>
        </div>
        <div className="h-full w-70 bg-blue-100 flex items-center justify-evenly">
            {auth?.user.name}
            <button onClick={handleLogout}>Se Deconnecter</button>
        </div>
    </div>
} 