import { CollapseProvider } from "../../contexts/CollapseContext";
import { Body } from "./Body";
import Header from "./Header";
import Menu from "./menu/Menu";

export function Layout() {
    return <CollapseProvider>
        <Header />
        <div className="flex">
            <Menu />
            <Body />
        </div>
    </CollapseProvider>
}