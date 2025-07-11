// src/components/layout/Footer.tsx - Modern Footer
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HeartIcon } from '@heroicons/react/24/solid';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="inline-block">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="text-2xl font-bold font-playfair text-neutral-900 dark:text-neutral-100"
                            >
                                Literary<span className="text-blue-600 dark:text-blue-400">.</span>
                            </motion.div>
                        </Link>
                        <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-xs">
                            A curated collection of literary works exploring the depths of human experience.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                            Explore
                        </h3>
                        <ul className="space-y-2">
                            {[
                                { name: 'Home', href: '/' },
                                { name: 'Literary Pieces', href: '/pieces' },
                                { name: 'Poetry Collection', href: '/poems' },
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Info */}
                    <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                            Information
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <span className="text-neutral-600 dark:text-neutral-400">
                                    Built with modern web technologies
                                </span>
                            </li>
                            <li>
                                <span className="text-neutral-600 dark:text-neutral-400">
                                    Optimized for reading experience
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                            © {currentYear} Literary Collection. All rights reserved.
                        </p>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400 text-sm"
                        >
                            Made with <HeartIcon className="w-4 h-4 text-red-500" /> and modern design
                        </motion.div>
                    </div>
                </div>
            </div>
        </footer>
    );
}