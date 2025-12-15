import DocsNavbar from '@/components/Navbar';
import DocsSidebar from '@/components/Sidebar';
import { DocsSidebarProvider } from '@/contexts/DocsSidebarContext';
import PageTransition from '@/providers/Transition';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
    title: 'Documentation',
    description: 'RestAPI documentation pages and guides.',
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    return (
        <DocsSidebarProvider>
            <div className="bg-background relative min-h-screen">
                <DocsSidebar />
                <div className="flex min-h-screen flex-col md:pl-72">
                    <DocsNavbar />
                    <main className="flex-1 px-4 py-6 md:px-8">
                        <PageTransition>{children}</PageTransition>
                    </main>
                </div>
                <Toaster position="top-right" />
            </div>
        </DocsSidebarProvider>
    );
}
