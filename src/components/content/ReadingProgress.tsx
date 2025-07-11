// src/components/content/ReadingProgress.tsx - Reading Progress Bar
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function ReadingProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            setProgress(scrollPercent);
        };

        window.addEventListener('scroll', updateProgress);
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-neutral-200 dark:bg-neutral-800 z-50"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
        >
            <motion.div
                className="h-full bg-gradient-to-r from-blue-600 to-purple-600 origin-left"
                style={{ scaleX: progress / 100 }}
                transition={{ duration: 0.1 }}
            />
        </motion.div>
    );
}