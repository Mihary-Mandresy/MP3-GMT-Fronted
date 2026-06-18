import type React from "react"
import type { MenuItemProps } from "./Menu"
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";
import { BsChevronRight, BsMenuApp } from "react-icons/bs";

export const MenuItem: React.FC<MenuItemProps & {
    collapse: boolean
}> = ({ path, title, Icon, children, collapse }) => {
    return collapse ?
        <MenuItemCollapse
            path={path}
            title={title}
            Icon={Icon}
            children={children}
        /> :
        <MenuItemFull
            path={path}
            title={title}
            Icon={Icon}
            children={children}
        />;

}

const MenuItemFull: React.FC<MenuItemProps> = ({ path, title, Icon, children }) => {
    const [open, setOpen] = useState<boolean>(false);
    const hasChild = useRef<boolean>(Boolean(children));

    return <motion.div className="pl-6 bg-green-400">
        <div className="flex items-center py-2 relative" onClick={() => {
            setOpen(!open);
        }}>
            <span className="mr-4" style={{
                fontSize: "17px"
            }}>
                {Icon ? <Icon /> : <BsMenuApp />}
            </span>
            <NavLink to={path}>{title}</NavLink>
            {hasChild.current && <motion.span
                className="absolute right-6"
                animate={{
                    rotate: open ? 90 : 0,
                }}>
                <BsChevronRight />
            </motion.span>}
        </div>
        {hasChild.current && <AnimatePresence>
            {open && <motion.div className="overflow-hidden" initial={{
                height: "0px"
            }} animate={{
                height: "auto"
            }}
                exit={{
                    height: 0
                }}
            >
                {children?.map(menu => <MenuItem {...menu} collapse={false} />)}
            </motion.div>}
        </AnimatePresence>}
    </motion.div>
}

function MenuItemCollapse({ path, Icon, children }: MenuItemProps) {
    const hasChild = useRef<boolean>(Boolean(children));
    return <motion.div className="p-4 mi-collapse relative">
        <NavLink className="flex items-center justify-center" to={path}>
            <span style={{
                fontSize: "30px"
            }}>
                {Icon ? <Icon /> : <BsMenuApp />}
            </span>
        </NavLink>

        {hasChild && <div className="items">
            {children?.map(menu => <MenuItem
                path={menu.path}
                title={menu.title}
                Icon={menu.Icon}
                children={menu.children}
                collapse={false}
            />)}
        </div>}

    </motion.div>
}