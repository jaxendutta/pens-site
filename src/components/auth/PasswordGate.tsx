// src/components/auth/PasswordGate.tsx - Modern Password Protection
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/24/outline';

interface PasswordGateProps {
    correctPasswords: string[];
    children: React.ReactNode;
    contentType?: string;
    contentTitle?: string;
}

export function PasswordGate({
    correctPasswords,
    children,
    contentType = 'content',
    contentTitle
}: PasswordGateProps) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Skip password if no passwords are required
    useEffect(() => {
        if (correctPasswords.length === 0) {
            setIsUnlocked(true);
            return;
        }

        const storageKey = `access-${contentType}${contentTitle ? `-${contentTitle}` : ''}`;
        const storedAccess = localStorage.getItem(storageKey);
        if (storedAccess === 'true') {
            setIsUnlocked(true);
        }
    }, [correctPasswords, contentType, contentTitle]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate loading for UX
        await new Promise(resolve => setTimeout(resolve, 500));

        if (correctPasswords.includes(password)) {
            const storageKey = `access-${contentType}${contentTitle ? `-${contentTitle}` : ''}`;
            localStorage.setItem(storageKey, 'true');
            setIsUnlocked(true);
        } else {
            setError('Incorrect password');
            setPassword('');
        }

        setIsLoading(false);
    };

    if (isUnlocked) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-700/50 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10" />

                    <div className="relative p-8">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 mb-4">
                                <LockClosedIcon className="w-8 h-8 text-white" />
                            </div>

                            <h2 className="text-2xl font-bold font-playfair mb-2 text-neutral-900 dark:text-neutral-100">
                                Protected {contentType.charAt(0).toUpperCase() + contentType.slice(1)}
                            </h2>

                            {contentTitle && (
                                <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-2">
                                    "{contentTitle}"
                                </p>
                            )}

                            <p className="text-neutral-500 dark:text-neutral-400">
                                Enter the password to access this content
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 pr-12 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Enter password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeSlashIcon className="w-5 h-5" />
                                        ) : (
                                            <EyeIcon className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>

                                <AnimatePresence>
                                    {error && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="mt-2 text-sm text-red-500"
                                        >
                                            {error}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isLoading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Verifying...
                                    </div>
                                ) : (
                                    'Unlock Content'
                                )}
                            </motion.button>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}