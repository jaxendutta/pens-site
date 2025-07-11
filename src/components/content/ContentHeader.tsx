// src/components/content/ContentHeader.tsx - Modern Section Header
'use client';

import { motion } from 'framer-motion';
import { ContentType } from '@/types/content';

interface ContentHeaderProps {
    title: string;
    description: string;
    count: number;
    type: ContentType;
}

export function ContentHeader({ title, description, count, type }: ContentHeaderProps) {
    return (
        <div className="text-center mb-16">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    {count} {type}{count !== 1 ? 's' : ''} available
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair mb-6 text-neutral-900 dark:text-neutral-100">
                    {title}
                </h1>

                <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                    {description}
                </p>
            </motion.div>
        </div>
    );
}
