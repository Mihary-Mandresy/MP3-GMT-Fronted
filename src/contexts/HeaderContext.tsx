import { createContext, useContext, useState, useCallback, useMemo, type PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";
import { allMenu, getTitleByPath } from "../menu";
import { defaultPath } from "../config";

interface HeaderContextType {
    title: string;
    changeTitle: (value: string) => void;
}

const HeaderContext = createContext<HeaderContextType | null>(null);

export function HeaderProvider({ children }: PropsWithChildren) {
    const location = useLocation();

    console.log(location.pathname);

    const [title, setTitle] = useState<string>(() => {
        return getTitleByPath(location.pathname, allMenu) ?? getTitleByPath(defaultPath, allMenu)!;
    });


    const changeTitle = useCallback((value: string) => {
        setTitle(value);
    }, []);

    const value = useMemo(() => ({
        title,
        changeTitle,
    }), [title, changeTitle]);

    return (
        <HeaderContext.Provider value={value}>
            {children}
        </HeaderContext.Provider>
    );
}

export function useHeaderContext(): HeaderContextType {
    const context = useContext(HeaderContext);
    if (!context) {
        throw new Error(
            "useHeaderContext must be used within a HeaderProvider"
        );
    }
    return context;
}