import type React from "react"
import type { MenuItemProps } from "./Menu"
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { NavLink } from "react-router-dom";
import {  useState } from "react";
import { BsChevronRight, BsMenuApp } from "react-icons/bs";
import { useHeaderContext } from "../../../contexts/HeaderContext";

const itemVariants: Variants = {
    visible: {
        opacity: 1,
        x: 0,
    },
    hidden: {
        opacity: 0,
        x: "-100%",
    }
}

export const MenuItem: React.FC<MenuItemProps & {
    collapse: boolean
}> = ({ path, title, Icon, titleHeader, children, collapse, alias }) => {
    return collapse ?
        <MenuItemCollapse
            path={path}
            title={title}
            Icon={Icon}
            titleHeader={titleHeader}
            children={children}
            alias={alias}
        /> :
        <MenuItemFull
            path={path}
            title={title}
            Icon={Icon}
            children={children}
            titleHeader={titleHeader}
            alias={alias}
        />;
}

const MenuItemFull: React.FC<MenuItemProps> = ({ path, title, titleHeader, Icon, children, alias }) => {
    const { changeTitle, alias : aliasCtx } = useHeaderContext();
    const [open, setOpen] = useState<boolean>(() => {        
        return aliasCtx?.startsWith(alias) ?? false;
    });
    const hasChild = !!children?.length;


    return hasChild ?
        <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="bg-green-400"
        >
            <div className="flex items-center relative cursor-pointer" onClick={() => {
                setOpen(!open);
            }}>
                <span className="navlink">
                    <span className="mr-6 i" style={{
                        fontSize: "17px"
                    }}>
                        {Icon ? <Icon /> : <BsMenuApp />}
                    </span>
                    {title}
                    <motion.span
                        className="absolute right-6"
                        animate={{
                            rotate: open ? 90 : 0,
                        }}>
                        <BsChevronRight />
                    </motion.span>
                </span>
            </div>
            <AnimatePresence>
                {open && <motion.div className="overflow-hidden pl-6" initial={{
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
            </AnimatePresence>
        </motion.div> :
        <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
        >
            <NavLink
                to={path ?? ""}
                className="block navlink"
                onClick={() => {
                    if (titleHeader) {
                        changeTitle(titleHeader)
                    }
                }}
            >
                <span className="mr-6 i" style={{
                    fontSize: "17px"
                }}>
                    {Icon ? <Icon /> : <BsMenuApp />}
                </span>
                {title}
            </NavLink>
        </motion.div>
}

function MenuItemCollapse({ path, Icon, children, alias }: MenuItemProps) {
    const hasChild = !!children?.length;
    return <motion.div className="mi-collapse relative">
        <NavLink className="flex p-4 items-center justify-center" to={path ?? ""}>
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
                alias={alias}
            />)}
        </div>}

    </motion.div>
}