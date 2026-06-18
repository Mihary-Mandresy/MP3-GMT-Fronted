import { BsMusicNoteList, BsMusicPlayer } from "react-icons/bs";
import type { MenuItemProps } from "./components/layouts/menu/Menu";

export const allMenu: MenuItemProps[] = [
    { path: "/playlists", Icon: BsMusicNoteList, title: "Mes Playlists", titleHeader: "My all Playlists" },
    { path: "/musics", Icon: BsMusicPlayer, title: "Mes Musiques", titleHeader: "My all Musiques" },
]

export function getTitleByPath(path: string, menus: MenuItemProps[]) {
    for (let menu of menus) {
        if (menu.children) {
            return getTitleByPath(path, menu.children)
        }
        if (path === menu.path) {
            return menu.titleHeader;
        }
    }
}