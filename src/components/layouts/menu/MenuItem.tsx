import type React from "react"
import type { MenuItemProps } from "./Menu"
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";
import { BsChevronRight, BsMenuApp } from "react-icons/bs";
import { useHeaderContext } from "../../../contexts/HeaderContext";

const itemVariants: Variants = {
    visible: {
        transition: {
            duration: .3
        },
        opacity: 1,
        x: 0
    },
    hidden: {
        opacity: 0,
        x: "-100%"
    }
}

export const MenuItem: React.FC<MenuItemProps & {
    collapse: boolean
}> = ({ path, title, Icon, titleHeader ,children, collapse }) => {
    return collapse ?
        <MenuItemCollapse
            path={path}
            title={title}
            Icon={Icon}
            titleHeader={titleHeader}
            children={children}
        /> :
        <MenuItemFull
            path={path}
            title={title}
            Icon={Icon}
            children={children}
            titleHeader={titleHeader}
        />;

}

const MenuItemFull: React.FC<MenuItemProps> = ({ path, title, titleHeader, Icon, children }) => {
    const [open, setOpen] = useState<boolean>(false);
    const hasChild = useRef<boolean>(Boolean(children));

    const {changeTitle} = useHeaderContext();

    return <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        exit={"hidden"}
        className="pl-6 bg-green-400">
        <div className="flex items-center py-2 relative" onClick={() => {
            setOpen(!open);
        }}>
            <span className="mr-4" style={{
                fontSize: "17px"
            }}>
                {Icon ? <Icon /> : <BsMenuApp />}
            </span>

            {hasChild.current ? title : <NavLink
                to={path}
                onClick={() => {
                    if (titleHeader) {
                        changeTitle(titleHeader)
                    }
                }}
            >{title}</NavLink>}

            {hasChild.current && <motion.span
                className="absolute right-6"
                animate={{
                    rotate: open ? 90 : 0,
                }}>
                <BsChevronRight />
            </motion.span>}
        </div>
        {hasChild.current && <AnimatePresence>
            {open && <motion.div className="verflow-hidden" initial={{
                height: "0px"
            }} animate={{
                height: "auto"
            }}
                exit={{
                    height: 0
                }}
            >
                {children?.map((menu, index) => <MenuItem key={menu.path + "_" + index} {...menu} collapse={false} />)}
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
            {children?.map((menu, index) => <MenuItem
                key={menu.path + "__" + index}
                path={menu.path}
                title={menu.title}
                Icon={menu.Icon}
                children={menu.children}
                collapse={false}
            />)}
        </div>}

    </motion.div>
}