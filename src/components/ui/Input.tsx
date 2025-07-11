// src/components/ui/Input.tsx - Modern Input Component
'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, error, ...props }, ref) => {
        return (
            <div className="space-y-2">
                {label && (
                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {label}
                    </label>
                )}
                <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type={type}
                    className={`
            w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-600 
            bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 
            placeholder-neutral-500 dark:placeholder-neutral-400 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent 
            transition-all duration-200
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500"
                    >
                        {error}
                    </motion.p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export { Input };