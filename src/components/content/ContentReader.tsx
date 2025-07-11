// src/components/content/ContentReader.tsx - Modern Content Reading Experience
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
    CalendarIcon,
    MapPinIcon,
    ClockIcon,
    UserIcon,
    ArrowLeftIcon,
    ShareIcon,
    BookmarkIcon,
    AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import { ContentMeta, ContentType } from '@/types/content';
import { formatDate, extractHeadings } from '@/lib/utils';
import { TableOfContents } from './TableOfContents';
import { ReadingProgress } from './ReadingProgress';

interface ContentReaderProps {
    content: ContentMeta;
    type: ContentType;
}

export function ContentReader({ content, type }: ContentReaderProps) {
    const [headings, setHeadings] = useState<any[]>([]);
    const [fontSize, setFontSize] = useState(16);
    const [showSettings, setShowSettings] = useState(false);

    const readingTime = Math.ceil(content.wordCount / 200);

    useEffect(() => {
        const extractedHeadings = extractHeadings(content.content);
        setHeadings(extractedHeadings);

        // Auto-number headers
        setTimeout(() => {
            const headingElements = document.querySelectorAll('#content h2, #content h3');
            let chapterCounter = 0;
            let subChapterCounter = 0;

            headingElements.forEach((heading) => {
                if (heading.tagName === 'H2') {
                    chapterCounter++;
                    subChapterCounter = 0;
                    heading.innerHTML = `<span class="opacity-70 mr-2">${chapterCounter}.</span>${heading.innerHTML}`;
                    heading.id = `chapter-${chapterCounter}`;
                } else if (heading.tagName === 'H3') {
                    subChapterCounter++;
                    heading.innerHTML = `<span class="opacity-70 mr-2">${chapterCounter}.${subChapterCounter}.</span>${heading.innerHTML}`;
                    heading.id = `chapter-${chapterCounter}-${subChapterCounter}`;
                }
            });
        }, 100);
    }, [content.content]);

    return (
        <div className="min-h-screen pt-24">
            <ReadingProgress />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
                    {/* Main Content */}
                    <article className="max-w-4xl">
                        {/* Back Button */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mb-8"
                        >
                            <Link
                                href={`/${type}s`}
                                className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                            >
                                <ArrowLeftIcon className="w-4 h-4" />
                                Back to {type}s
                            </Link>
                        </motion.div>

                        {/* Header */}
                        <motion.header
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mb-12"
                        >
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-playfair mb-6 text-neutral-900 dark:text-neutral-100 leading-tight">
                                {content.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-neutral-600 dark:text-neutral-400 mb-6">
                                <div className="flex items-center gap-2">
                                    <UserIcon className="w-5 h-5" />
                                    <span className="font-medium">{content.author}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <CalendarIcon className="w-5 h-5" />
                                    <span>{formatDate(content.date)}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <MapPinIcon className="w-5 h-5" />
                                    <span>{content.location}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <ClockIcon className="w-5 h-5" />
                                    <span>{readingTime} min read</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-4">
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                                    <ShareIcon className="w-4 h-4" />
                                    Share
                                </button>

                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                                    <BookmarkIcon className="w-4 h-4" />
                                    Save
                                </button>

                                <button
                                    onClick={() => setShowSettings(!showSettings)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                                >
                                    <AdjustmentsHorizontalIcon className="w-4 h-4" />
                                    Settings
                                </button>
                            </div>

                            {/* Reading Settings */}
                            {showSettings && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-medium">Font Size:</span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                                                className="px-3 py-1 rounded bg-neutral-200 dark:bg-neutral-700 text-sm"
                                            >
                                                A-
                                            </button>
                                            <span className="text-sm px-2">{fontSize}px</span>
                                            <button
                                                onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                                                className="px-3 py-1 rounded bg-neutral-200 dark:bg-neutral-700 text-sm"
                                            >
                                                A+
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.header>

                        {/* Featured Image */}
                        {content.featuredImage && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="mb-12 rounded-2xl overflow-hidden shadow-2xl"
                            >
                                <Image
                                    src={content.featuredImage}
                                    alt={content.title}
                                    width={1200}
                                    height={600}
                                    className="w-full h-auto"
                                />
                            </motion.div>
                        )}

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            id="content"
                            className="prose prose-lg prose-neutral dark:prose-invert max-w-none"
                            style={{ fontSize: `${fontSize}px` }}
                            dangerouslySetInnerHTML={{ __html: content.content }}
                        />
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:sticky lg:top-24 lg:h-fit">
                        <div className="space-y-8">
                            {/* Table of Contents */}
                            {headings.length > 0 && (
                                <TableOfContents headings={headings} />
                            )}

                            {/* Content Details */}
                            <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-2xl border border-neutral-200/50 dark:border-neutral-700/50 p-6 shadow-lg">
                                <h3 className="font-semibold text-lg mb-4 text-neutral-900 dark:text-neutral-100">
                                    Details
                                </h3>

                                <dl className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <dt className="text-neutral-500 dark:text-neutral-400">Word Count</dt>
                                        <dd className="font-medium text-neutral-900 dark:text-neutral-100">
                                            {content.wordCount.toLocaleString()}
                                        </dd>
                                    </div>

                                    <div className="flex justify-between">
                                        <dt className="text-neutral-500 dark:text-neutral-400">Published</dt>
                                        <dd className="font-medium text-neutral-900 dark:text-neutral-100">
                                            {formatDate(content.date)}
                                        </dd>
                                    </div>

                                    {content.lastRevision !== content.date && (
                                        <div className="flex justify-between">
                                            <dt className="text-neutral-500 dark:text-neutral-400">Last Revised</dt>
                                            <dd className="font-medium text-neutral-900 dark:text-neutral-100">
                                                {formatDate(content.lastRevision)}
                                            </dd>
                                        </div>
                                    )}

                                    <div className="flex justify-between">
                                        <dt className="text-neutral-500 dark:text-neutral-400">Reading Time</dt>
                                        <dd className="font-medium text-neutral-900 dark:text-neutral-100">
                                            ~{readingTime} minutes
                                        </dd>
                                    </div>

                                    {content.chapters && content.chapters.length > 0 && (
                                        <div className="flex justify-between">
                                            <dt className="text-neutral-500 dark:text-neutral-400">Chapters</dt>
                                            <dd className="font-medium text-neutral-900 dark:text-neutral-100">
                                                {content.chapters.length}
                                            </dd>
                                        </div>
                                    )}
                                </dl>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
