'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDocsSidebar } from '@/components/contexts/DocsSidebarContext';

export default function DocsSidebar() {
    const pathname = usePathname();
    const { isSidebarOpen, closeSidebar } = useDocsSidebar();

    // Define the navigation structure
    const navigation = [
        { name: 'Introduction', href: '/docs' },
        {
            name: 'Getting Started',
            children: [
                { name: 'Setup', href: '#' },
                { name: 'Configuration', href: '#' },
            ],
        },
    ];

    const isActive = (href: string) => pathname === href;

    return (
        <>
            {isSidebarOpen && (
                <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={closeSidebar} />
            )}

            <aside
                className={`bg-background fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-64 transform shadow-lg transition-transform duration-300 ease-in-out md:top-0 md:z-0 md:h-screen md:translate-x-0 md:shadow-none ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0`}
            >
                <div className="flex h-full flex-col border-r">
                    <div className="border-b p-4">
                        <h2 className="text-lg font-semibold">Documentation</h2>
                    </div>
                    <nav className="flex-1 overflow-y-auto p-4">
                        <ul className="space-y-2">
                            {navigation.map((item, index) => (
                                <li key={index}>
                                    {item.href ? (
                                        <Link
                                            href={item.href}
                                            className={`block rounded-md px-3 py-2 transition-colors ${
                                                isActive(item.href)
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'hover:bg-accent hover:text-accent-foreground'
                                            }`}
                                            onClick={closeSidebar}
                                        >
                                            {item.name}
                                        </Link>
                                    ) : (
                                        <div>
                                            <div className="px-3 py-2 text-sm font-medium">
                                                {item.name}
                                            </div>
                                            <ul className="mt-1 space-y-1 pl-4">
                                                {item.children?.map((child, childIndex) => (
                                                    <li key={childIndex}>
                                                        <Link
                                                            href={child.href}
                                                            className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                                                                isActive(child.href)
                                                                    ? 'bg-primary/10 text-primary font-medium'
                                                                    : 'hover:bg-accent/50 hover:text-accent-foreground'
                                                            }`}
                                                            onClick={closeSidebar}
                                                        >
                                                            {child.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    );
}
