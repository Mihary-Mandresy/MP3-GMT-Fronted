import { createContext, useContext, useState, useCallback, useMemo, type PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";
import { allMenu, getAliasByPath, getTitleByPath } from "../menu";
import { defaultPath } from "../config";

interface HeaderContextType {
    title: string;
    alias: string | undefined
    changeTitle: (value: string) => void;
    changeAlias: (value: string) => void;
}

const HeaderContext = createContext<HeaderContextType | null>(null);

export function HeaderProvider({ children }: PropsWithChildren) {
    const location = useLocation();

    const [title, setTitle] = useState<string>(() => {
        return getTitleByPath(location.pathname, allMenu) ?? getTitleByPath(defaultPath, allMenu)!;
    });

    const [alias, setAlias] = useState<string>(() => {        
        return  getAliasByPath(location.pathname, allMenu) ?? "";
    });
    
    const changeAlias = useCallback((value : string) => {        
        setAlias(value);
    }, []);

    const changeTitle = useCallback((value: string) => {
        setTitle(value);
    }, []);

    const value = useMemo(() => ({
        title,
        alias,
        changeTitle,
        changeAlias
    }), [title, changeTitle, alias]);

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