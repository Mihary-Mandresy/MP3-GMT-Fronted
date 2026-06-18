import { BsMusicNoteBeamed } from "react-icons/bs";
import { MenuItem } from "./MenuItem";
import type { ReactElement } from "react";

export type MenuItemProps = {
    icon?: ReactElement
    path: string,
    title: string,
    titleHeader?: string,
    children?: MenuItemProps[],
}

export default function Menu() {

    const allMenu: MenuItemProps[] = [
        {
            path: "", title: "Mes Playlists", children: [
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

    return <div className="fixed left-0 top-0 w-70 bg-orange-300 h-screen pt-16">
        <div className="mb-3">
            <div className="h-20 w-20 rounded-full mx-auto bg-red-300 border-4 border-red-700">
                <h1 className="text-3xl flex items-center justify-center h-20">
                    <BsMusicNoteBeamed />
                </h1>
            </div>
        </div>
        {allMenu.map(menu => <MenuItem {...menu} />)}
    </div>
}