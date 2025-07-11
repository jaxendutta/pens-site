// src/app/page.tsx - Fixed homepage with server-side content loading
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRightIcon, BookOpenIcon, PencilIcon } from '@heroicons/react/24/outline';
import { HeroSection } from '@/components/sections/HeroSection';
import { getContentList } from '@/lib/content.server'; // Fixed import

function NavigationCard({
  href,
  title,
  description,
  icon: Icon,
  gradient,
  count
}: {
  href: string;
  title: string;
  description: string;
  icon: any;
  gradient: string;
  count?: number;
}) {
  return (
    <div className="group">
      <Link href={href}>
        <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50 p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <ArrowUpRightIcon className="w-5 h-5 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
            </div>

            <h3 className="text-2xl font-bold font-playfair mb-3 text-neutral-900 dark:text-neutral-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-neutral-900 group-hover:to-neutral-600 dark:group-hover:from-neutral-100 dark:group-hover:to-neutral-400 transition-all duration-300">
              {title}
            </h3>

            <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
              {description}
            </p>

            {count !== undefined && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-sm text-neutral-600 dark:text-neutral-400">
                {count} {count === 1 ? 'item' : 'items'}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function HomePage() {
  // Get content counts at build time (server-side)
  const pieces = getContentList('piece');
  const poems = getContentList('poem');

  return (
    <div className="min-h-screen">
      <HeroSection />

      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-50/50 to-transparent dark:via-neutral-900/50" />

        <div className="relative container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4 text-neutral-900 dark:text-neutral-100">
              Choose Your Journey
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Each collection offers a unique pathway through the landscape of literature
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <NavigationCard
              href="/pieces"
              title="Literary Pieces"
              description="Explore narrative journeys through diverse landscapes of human experience and emotion."
              icon={BookOpenIcon}
              gradient="from-blue-600 to-indigo-700"
              count={pieces.length}
            />
            <NavigationCard
              href="/poems"
              title="Poetry Collection"
              description="Discover verses that capture moments, feelings, and reflections in crystalline form."
              icon={PencilIcon}
              gradient="from-purple-600 to-pink-700"
              count={poems.length}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
