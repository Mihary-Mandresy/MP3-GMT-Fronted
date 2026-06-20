import { BsMusicNoteList, BsMusicPlayer } from "react-icons/bs";
import type { MenuItemProps } from "./components/layouts/menu/Menu";

export const allMenu: MenuItemProps[] = [
    { path: "/playlists", Icon: BsMusicNoteList, title: "Mes Playlists", titleHeader: "My all Playlists", alias: "playlist" },
    {
        Icon: BsMusicPlayer, title: "Mes Baba", children: [
            // { path: "/playlists", Icon: BsMusicNoteList, title: "Mes Playlists", titleHeader: "My all Playlists", alias: "baba.parent" },
            {
                Icon: BsMusicPlayer, title: "Mes Baba kely", children: [
                    { path: "/test", Icon: BsMusicNoteList, title: "Mes Tests", titleHeader: "My all Tests", alias: "baba.parent.bobo" },
                    // { path: "/baba", Icon: BsMusicPlayer, title: "Mes Musiques", titleHeader: "My all Baba", alias: "baba.parent.bibi" },
                ], alias: "baba.parent"
            },
        ],
        alias: "baba"
    },
    { path: "/musics", Icon: BsMusicPlayer, title: "Mes Musiques", titleHeader: "My all Musiques", alias: "music" },
]

function getValueByPath(path: string, menus: MenuItemProps[], key: Exclude<keyof MenuItemProps, "Icon" | "children">) {
    for (let menu of menus) {
        if (path === menu.path) {
            return menu[key];
        }
        if (menu.children) {
            let value : string | undefined =  getValueByPath(path, menu.children, key) as string | undefined;
            if (value) {
                return value;
            } else {
                continue;
            }
        }
    }
}

export function getTitleByPath(path: string, menus: MenuItemProps[]) {
    return getValueByPath(path, menus, "titleHeader");
}

export function getAliasByPath(path: string, menus: MenuItemProps[]) {
    return getValueByPath(path, menus, "alias");
}