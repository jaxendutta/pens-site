// src/components/content/ContentCard.tsx - Modern Content Card
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarIcon, MapPinIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import { ContentMeta, ContentType } from '@/types/content';
import { formatDate } from '@/lib/utils';

interface ContentCardProps {
    item: ContentMeta;
    type: ContentType;
    index: number;
}

export function ContentCard({ item, type, index }: ContentCardProps) {
    const readingTime = Math.ceil(item.wordCount / 200);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
            }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group"
        >
            <Link href={`/${type}s/${item.slug}`} className="block">
                <article className="relative overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                    {/* Featured Image */}
                    {item.featuredImage && (
                        <div className="relative h-48 overflow-hidden">
                            <Image
                                src={item.featuredImage}
                                alt={item.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>
                    )}

                    <div className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <h3 className="text-xl font-bold font-playfair mb-2 text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                    {item.title}
                                </h3>

                                <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                                    <div className="flex items-center gap-1">
                                        <UserIcon className="w-4 h-4" />
                                        <span>{item.author}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <CalendarIcon className="w-4 h-4" />
                                        <span>{formatDate(item.date)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Excerpt */}
                        <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-3 leading-relaxed">
                            {item.excerpt}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
                            <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                                <div className="flex items-center gap-1">
                                    <MapPinIcon className="w-4 h-4" />
                                    <span>{item.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <ClockIcon className="w-4 h-4" />
                                    <span>{readingTime} min read</span>
                                </div>
                            </div>

                            <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                {item.wordCount.toLocaleString()} words
                            </div>
                        </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/5 group-hover:to-purple-600/5 transition-all duration-500 pointer-events-none" />
                </article>
            </Link>
        </motion.div>
    );
}
