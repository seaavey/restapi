import DocsNavbar from '@/components/sections/Docs/Navbar';
import DocsSidebar from '@/components/sections/Docs/Sidebar';
import { DocsSidebarProvider } from '@/components/contexts/DocsSidebarContext';
import PageTransition from '@/components/providers/Transition';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Documentation',
    description: 'RestAPI documentation pages and guides.',
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    return (
        <DocsSidebarProvider>
            <div className="flex min-h-screen">
                <DocsSidebar />
                <div className="flex flex-1 flex-col">
                    <DocsNavbar />
                    <main className="p-6 md:pl-72">
                        <PageTransition>{children}</PageTransition>
                    </main>
                </div>
            </div>
        </DocsSidebarProvider>
    );
}
