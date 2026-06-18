import type React from "react"
import type { MenuItemProps } from "./Menu"
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";
import { BsChevronRight } from "react-icons/bs";

export const MenuItem: React.FC<MenuItemProps> = ({ path, title, icon, children }) => {
    const [open, setOpen] = useState<boolean>(false);
    const hasChild = useRef<boolean>(Boolean(children));

    return <motion.div className="pl-8 bg-green-400">
        <div className="flex items-center py-2 relative" onClick={() => {
            setOpen(!open);
        }}>
            {icon && icon}
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
                {children?.map(menu => <MenuItem {...menu} />)}
            </motion.div>}
        </AnimatePresence>}
    </motion.div>
}