import { createContext, useContext, useState, useCallback, useMemo, type PropsWithChildren } from "react";

interface CollapseContextType {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  setCollapsed: (value: boolean) => void;
}

const CollapseContext = createContext<CollapseContextType | null>(null);

export function CollapseProvider({ children }: PropsWithChildren) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const setCollapsed = useCallback((value: boolean) => {
    setIsCollapsed(value);
  }, []);

  const value = useMemo(() => ({
    isCollapsed,
    toggleCollapse,
    setCollapsed,
  }), [isCollapsed, toggleCollapse, setCollapsed]);

  return (
    <CollapseContext.Provider value={value}>
      {children}
    </CollapseContext.Provider>
  );
}

export function useCollapseContext(): CollapseContextType {
  const context = useContext(CollapseContext);

  if (!context) {
    throw new Error(
      "useCollapseContext must be used within a CollapseProvider"
    );
  }

  return context;
}