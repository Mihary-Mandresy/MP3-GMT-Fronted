import { Body } from "./Body";
import Header from "./Header";
import Menu from "./menu/Menu";

export function Layout() {
    return <>
        <Header />
        <Menu />
        <Body />
    </>
}