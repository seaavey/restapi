'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useDocsSidebar } from '@/contexts/DocsSidebarContext';

export default function DocsNavbar() {
    const { toggleSidebar } = useDocsSidebar();
    return (
        <header className="border-border/40 bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
            <div className="flex h-16 items-center justify-between space-x-4 px-6">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-semibold">
                        Seaavey <span className="text-primary">APIs</span>
                    </span>
                </Link>

                <div className="md:hidden">
                    <Button variant="outline" size="sm" onClick={toggleSidebar}>
                        <Menu className="h-4 w-4" />
                    </Button>
                </div>
                <div className="hidden md:block">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
