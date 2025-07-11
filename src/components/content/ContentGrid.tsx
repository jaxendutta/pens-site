// src/components/content/ContentGrid.tsx - Modern Content Grid
'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContentMeta, ContentType } from '@/types/content';
import { ContentCard } from './ContentCard';
import { ContentFilters } from './ContentFilters';

interface ContentGridProps {
    items: ContentMeta[];
    type: ContentType;
}

export function ContentGrid({ items, type }: ContentGridProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'date' | 'wordCount' | 'title'>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const filteredAndSortedItems = useMemo(() => {
        let filtered = items.filter(item =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.author.toLowerCase().includes(searchTerm.toLowerCase())
        );

        filtered.sort((a, b) => {
            let comparison = 0;

            switch (sortBy) {
                case 'date':
                    comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
                    break;
                case 'wordCount':
                    comparison = a.wordCount - b.wordCount;
                    break;
                case 'title':
                    comparison = a.title.localeCompare(b.title);
                    break;
            }

            return sortOrder === 'asc' ? comparison : -comparison;
        });

        return filtered;
    }, [items, searchTerm, sortBy, sortOrder]);

    return (
        <div className="space-y-8">
            <ContentFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                sortBy={sortBy}
                onSortByChange={setSortBy}
                sortOrder={sortOrder}
                onSortOrderChange={setSortOrder}
                resultCount={filteredAndSortedItems.length}
                totalCount={items.length}
            />

            <AnimatePresence mode="wait">
                {filteredAndSortedItems.length === 0 ? (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center py-16"
                    >
                        <div className="text-6xl mb-4">📚</div>
                        <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                            No {type}s found
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400">
                            Try adjusting your search or filters
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="grid"
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredAndSortedItems.map((item, index) => (
                            <ContentCard
                                key={item.slug}
                                item={item}
                                type={type}
                                index={index}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

ContentGrid.Skeleton = function ContentGridSkeleton() {
    return (
        <div className="space-y-8">
            <div className="h-16 bg-neutral-200 dark:bg-neutral-800 rounded-xl animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-80 bg-neutral-200 dark:bg-neutral-800 rounded-2xl animate-pulse" />
                ))}
            </div>
        </div>
    );
};