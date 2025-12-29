'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type DocsSidebarContextType = {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    closeSidebar: () => void;
};

const DocsSidebarContext = createContext<DocsSidebarContextType | undefined>(undefined);

export function DocsSidebarProvider({ children }: { children: ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <DocsSidebarContext.Provider value={{ isSidebarOpen, toggleSidebar, closeSidebar }}>
            {children}
        </DocsSidebarContext.Provider>
    );
}

export function useDocsSidebar() {
    const context = useContext(DocsSidebarContext);
    if (context === undefined) {
        throw new Error('useDocsSidebar must be used within a DocsSidebarProvider');
    }
    return context;
}