import { Outlet } from "react-router-dom";
import { useCollapseContext } from "../../contexts/CollapseContext";

export function Body() {

    const { isCollapsed } = useCollapseContext();

    return <div
        className="h-screen pt-14 bg-blue-200" style={{
            width: isCollapsed ? "calc(100% - 80px)" : "calc(100% - 280px)",
            transition: ".3s width",
        }}
    >
        <Outlet />
    </div>
}