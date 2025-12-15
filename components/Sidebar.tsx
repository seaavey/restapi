'use client';

import { INavigationItem } from '@/types/navigation';
import { SidebarItem } from '@/components/common/item/Sidebar';
import { SidebarSkeleton } from '@/components/common/skeleton/Sidebar';
import { useDocsSidebar } from '@/contexts/DocsSidebarContext';
import { useCache } from '@/hooks/useCache';
import { useCallback } from 'react';

export default function DocsSidebar() {
    const { isSidebarOpen, closeSidebar } = useDocsSidebar();

    const fetchSidebar = useCallback(async () => {
        const res = await fetch('/v1/sidebar', { cache: 'no-store' });
        return res.json();
    }, []);

    const { data: navigation, loading } = useCache<INavigationItem[]>(
        'docs-sidebar',
        fetchSidebar,
        1000 * 60 * 10, // 10 menit
    );

    return (
        <>
            {isSidebarOpen && (
                <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={closeSidebar} />
            )}

            <aside
                className={`bg-background fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-64 transform border-r shadow-lg transition-transform duration-300 ease-in-out md:top-0 md:z-0 md:h-screen md:translate-x-0 md:shadow-none ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex h-full flex-col">
                    <div className="border-b p-4">
                        <h2 className="text-lg font-semibold">Documentation</h2>
                    </div>

                    <nav className="flex-1 overflow-y-auto p-4">
                        {loading || !navigation ? (
                            <SidebarSkeleton />
                        ) : (
                            <ul className="space-y-1">
                                {navigation.map(item => (
                                    <SidebarItem
                                        key={item.name}
                                        item={item}
                                        onNavigate={closeSidebar}
                                    />
                                ))}
                            </ul>
                        )}
                    </nav>
                </div>
            </aside>
        </>
    );
}
