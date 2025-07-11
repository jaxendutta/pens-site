// src/components/content/TableOfContents.tsx - Modern TOC
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ListBulletIcon } from '@heroicons/react/24/outline';

interface TableOfContentsProps {
    headings: Array<{
        level: number;
        text: string;
        id: string;
    }>;
}

export function TableOfContents({ headings }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-80px 0px -80% 0px' }
        );

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-2xl border border-neutral-200/50 dark:border-neutral-700/50 p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
                <ListBulletIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
                    Table of Contents
                </h3>
            </div>

            <nav>
                <ul className="space-y-2">
                    {headings.map((heading) => {
                        const isActive = activeId === heading.id;
                        const paddingClass = heading.level === 2 ? 'pl-0' : 'pl-4';

                        return (
                            <li key={heading.id}>
                                <a
                                    href={`#${heading.id}`}
                                    className={`block py-2 px-3 rounded-lg text-sm transition-all duration-200 ${paddingClass} ${isActive
                                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                                            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                                        }`}
                                >
                                    {heading.text}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}