'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { INavigationItem } from '@/constants/navigation';

interface SidebarItemProps {
    item: INavigationItem;
    level?: number;
    onNavigate?: () => void;
}

export function SidebarItem({ item, level = 0, onNavigate }: SidebarItemProps) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const isChildActive = useMemo(() => {
        const check = (items?: INavigationItem[]): boolean =>
            !!items?.some(i => (i.href && i.href === pathname) || check(i.children));
        return check(item.children);
    }, [pathname, item.children]);

    const paddingLeft = 12 + level * 16;

    if (item.href && !item.children) {
        const active = item.href === pathname;

        return (
            <Link
                href={item.href}
                onClick={onNavigate}
                className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                    active ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-accent/50'
                }`}
                style={{ paddingLeft }}
            >
                {item.name}
            </Link>
        );
    }

    return (
        <div>
            <Button
                variant="ghost"
                onClick={() => setOpen(v => !v)}
                className={`flex w-full justify-between px-3 py-2 text-sm`}
                style={{ paddingLeft }}
            >
                <span>{item.name}</span>
                <motion.span
                    animate={{ rotate: open || isChildActive ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronRight className="h-4 w-4" />
                </motion.span>
            </Button>

            <AnimatePresence initial={false}>
                {(open || isChildActive) && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="space-y-1 overflow-hidden"
                    >
                        {item.children?.map(child => (
                            <SidebarItem
                                key={child.name}
                                item={child}
                                level={level + 1}
                                onNavigate={onNavigate}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
