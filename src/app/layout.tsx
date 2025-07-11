// src/app/layout.tsx - Modern Root Layout

import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import Header from '@/components/layout/Header';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap'
});

const jetbrains = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    template: '%s | Literary Collection',
    default: 'Literary Collection - Explore Stories & Poems'
  },
  description: 'A curated collection of literary works exploring the depths of human experience through prose and verse.',
  keywords: ['literature', 'poetry', 'stories', 'writing', 'creative'],
  authors: [{ name: 'Jaxen Dutta' }],
  creator: 'Jaxen Dutta',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Literary Collection',
    description: 'A curated collection of literary works exploring the depths of human experience through prose and verse.',
    siteName: 'Literary Collection',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Literary Collection',
    description: 'A curated collection of literary works exploring the depths of human experience through prose and verse.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="relative min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800 transition-colors duration-500">
            <Header />
            <main className="relative z-10">
              {children}
            </main>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
