import { Outlet } from "react-router-dom";

export function Body() {
    return <div className="h-screen pt-14 bg-blue-200 p-10" style={{
        zIndex: 100,
        width: "calc(100% - 280px",
        marginLeft: "280px"
    }}>
        <Outlet />
    </div>
}