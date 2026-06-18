import {  BsMusicNoteBeamed, BsMusicNoteList, BsMusicPlayer } from "react-icons/bs";
import { MenuItem } from "./MenuItem";
import { useCollapseContext } from "../../../contexts/CollapseContext";
import type { IconType } from "react-icons";
import { motion } from "framer-motion";

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
        { path: "/playlists", Icon: BsMusicNoteList, title: "Mes Playlists", titleHeader: "My all Playlists" },
        { path: "/musics", Icon: BsMusicPlayer, title: "Mes Musiques" , titleHeader: "My all Musiques"},
    ]

    return <motion.div
        id="menu"
        className={`left-0 top-0 bg-orange-300 h-screen pt-16 ${isCollapsed ? "menu-collapse" : ""}`} style={{
            width: isCollapsed ? "80px" : "280px",
            transition: ".3s width"
        }}>
        <div className="py-4">
            <div id="menu-header" className={`h-20 w-20 rounded-full mx-auto bg-red-300 border-4 border-red-700`}>
                <h1 className="text-3xl flex items-center justify-center h-20">
                    <BsMusicNoteBeamed />
                </h1>
            </div>
        </div>
        {allMenu.map((menu, index) => <MenuItem key={menu.path + "_" + index} {...menu} collapse={isCollapsed} />)}
    </motion.div>
}