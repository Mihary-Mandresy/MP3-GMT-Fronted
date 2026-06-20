import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/AuthService";
import { useAuthContext } from "../../contexts/AuthContext";
import { Menu } from "lucide-react"
import { useCollapseContext } from "../../contexts/CollapseContext";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { motion } from "framer-motion";
import { useHeaderContext } from "../../contexts/HeaderContext";

export default function Header() {

    const navigate = useNavigate();
    const { auth } = useAuthContext()!;

    const handleLogout = async () => {
        const rep = await logout();
        if (rep.status == 200) {
            navigate("/login")
        }
    }

    const { title } = useHeaderContext();

    const { toggleCollapse, isCollapsed } = useCollapseContext();

    return <div className="flex w-full fixed top-0 h-16 bg-red-500 z-10">
        <div className="h-full w-70 flex bg-blue-100 items-center justify-center" style={{
            width: isCollapsed ? "80px" : "280px",
            transition: ".3s width"
        }}>
            <Link to="/">
                {isCollapsed ?
                    <BsMusicNoteBeamed size={30} /> :
                    <motion.span
                        transition={{
                            delay: .125
                        }}
                        initial={{
                            x: "-100%",
                            opacity: 0
                        }}
                        animate={isCollapsed ? {} : {
                            x: 0,
                            opacity: 1
                        }}
                        className="font-bold" style={{
                            fontSize: "22px"
                        }}>
                        MP3-GMT
                    </motion.span>}
            </Link>

        </div>
        <div className="h-full flex items-center justify-center relative" style={{
            width: isCollapsed ? "calc(100% - 360px)" : "calc(100% - 560px)",
            transition: ".3s width"
        }}>
            <button id="collapse" className="absolute left-2 text-md cursor-pointer" onClick={() => {
                toggleCollapse();
            }}>
                <Menu size={23} />
            </button>
            <h1 className="text-3xl">{title}</h1>
        </div>
        <div className="h-full w-70 bg-blue-100 flex items-center justify-evenly">
            {auth?.user.name}
            <button onClick={handleLogout}>Se Deconnecter</button>
        </div>
    </div>
} 