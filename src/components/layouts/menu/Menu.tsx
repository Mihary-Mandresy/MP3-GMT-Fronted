import { BsAlarm, BsMusicNoteBeamed } from "react-icons/bs";
import { MenuItem } from "./MenuItem";
import { useCollapseContext } from "../../../contexts/CollapseContext";
import type { IconType } from "react-icons";
import { BiAbacus, BiSolidBabyCarriage } from "react-icons/bi";

export type MenuItemProps = {
    Icon?: IconType
    path: string,
    title: string,
    titleHeader?: string,
    children?: MenuItemProps[],
}

export default function Menu() {

    const { isCollapsed } = useCollapseContext();

    const allMenu: MenuItemProps[] = [
        {
            path: "", Icon: BiAbacus, title: "Mes Playlists", children: [
                {
                    path: "", title: "Mes Playlists", children: [
                        { path: "", title: "Mes Playlists" },
                        { path: "", title: "Mes Playlists" }
                    ]
                },
                { path: "", title: "Mes Playlists" },
            ]
        },
        {
            path: "", Icon: BiSolidBabyCarriage, title: "Mes Playlists", children: [
                {
                    path: "", title: "Mes Playlists", children: [
                        { path: "", title: "Mes Playlists" },
                        { path: "", title: "Mes Playlists" }
                    ]
                },
                { path: "", title: "Mes Playlists" },
            ]
        },
        {
            path: "", Icon: BsAlarm, title: "Mes Playlists", children: [
                {
                    path: "", title: "Mes Playlists", children: [
                        { path: "", title: "Mes Playlists" },
                        { path: "", title: "Mes Playlists" }
                    ]
                },
                { path: "", title: "Mes Playlists" },
            ]
        }
    ]

    return <div id="menu" className={`left-0 top-0 bg-orange-300 h-screen pt-16 ${isCollapsed ? "menu-collapse" : ""}`} style={{
        width: isCollapsed ? "80px" : "280px",
        transition: ".3s width"
    }}>
        {/* <div className="mb-3">
            <div id="menu-header" className={`h-20 w-20 rounded-full mx-auto bg-red-300 border-4 border-red-700`}>
                <h1 className="text-3xl flex items-center justify-center h-20">
                    <BsMusicNoteBeamed />
                </h1>
            </div>
        </div> */}
        {allMenu.map(menu => <MenuItem {...menu} collapse={isCollapsed} />)}
    </div>
}