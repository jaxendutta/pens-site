// src/hooks/useReadingTime.ts - Reading Time Calculator Hook
'use client';

import { useMemo } from 'react';

export function useReadingTime(wordCount: number, wordsPerMinute: number = 200) {
    return useMemo(() => {
        return Math.ceil(wordCount / wordsPerMinute);
    }, [wordCount, wordsPerMinute]);
}
