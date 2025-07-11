// src/app/pieces/page.tsx - Fixed pieces page
import { Metadata } from 'next';
import { getContentList } from '@/lib/content.server'; // Fixed import
import { ContentGrid } from '@/components/content/ContentGrid';
import { ContentHeader } from '@/components/content/ContentHeader';
import { PasswordGate } from '@/components/auth/PasswordGate';

export const metadata: Metadata = {
  title: 'Literary Pieces',
  description: 'Explore a collection of narrative journeys through diverse landscapes of human experience.',
};

export default function PiecesPage() {
  const pieces = getContentList('piece');
  const passwords = process.env.PIECES_PASSWORD?.split(',') || [];

  return (
    <PasswordGate correctPasswords={passwords} contentType="pieces">
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ContentHeader
            title="Literary Pieces"
            description="Narrative journeys through diverse landscapes of human experience"
            count={pieces.length}
            type="piece"
          />
          
          <ContentGrid items={pieces} type="piece" />
        </div>
      </div>
    </PasswordGate>
  );
}