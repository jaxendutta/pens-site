// src/components/content/ContentFilters.tsx - Modern Search & Filters
'use client';

import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

interface ContentFiltersProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    sortBy: 'date' | 'wordCount' | 'title';
    onSortByChange: (sortBy: 'date' | 'wordCount' | 'title') => void;
    sortOrder: 'asc' | 'desc';
    onSortOrderChange: (order: 'asc' | 'desc') => void;
    resultCount: number;
    totalCount: number;
}

export function ContentFilters({
    searchTerm,
    onSearchChange,
    sortBy,
    onSortByChange,
    sortOrder,
    onSortOrderChange,
    resultCount,
    totalCount,
}: ContentFiltersProps) {
    const sortOptions = [
        { value: 'date', label: 'Date' },
        { value: 'title', label: 'Title' },
        { value: 'wordCount', label: 'Length' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-2xl border border-neutral-200/50 dark:border-neutral-700/50 p-6 shadow-lg"
        >
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                {/* Search */}
                <div className="flex-1 w-full lg:max-w-md">
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Search pieces, authors, locations..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                    </div>
                </div>

                {/* Sort Controls */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <AdjustmentsHorizontalIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Sort by:</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <select
                            value={sortBy}
                            onChange={(e) => onSortByChange(e.target.value as 'date' | 'wordCount' | 'title')}
                            className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        >
                            {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
                            className="p-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                        >
                            {sortOrder === 'asc' ? (
                                <ArrowUpIcon className="w-4 h-4" />
                            ) : (
                                <ArrowDownIcon className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Results Count */}
                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    {searchTerm ? (
                        <>Showing {resultCount} of {totalCount} results</>
                    ) : (
                        <>{totalCount} total items</>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
