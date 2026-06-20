import { CollapseProvider } from "../../contexts/CollapseContext";
import { HeaderProvider } from "../../contexts/HeaderContext";
import { Body } from "./Body";
import Header from "./Header";
import Menu from "./menu/Menu";

export function Layout() {
    return <HeaderProvider>
        <CollapseProvider>
            <Header />
            <div className="flex">
                <Menu />
                <Body />
            </div>
        </CollapseProvider>
    </HeaderProvider>
}