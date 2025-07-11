// src/app/pieces/[slug]/page.tsx - Modern Individual Piece
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getContent, getContentList } from '@/lib/content.server';
import { ContentReader } from '@/components/content/ContentReader';
import { PasswordGate } from '@/components/auth/PasswordGate';

interface PageProps {
    params: { slug: string };
}

export async function generateStaticParams() {
    const pieces = getContentList('piece');
    return pieces.map(piece => ({
        slug: piece.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const piece = await getContent('piece', params.slug);

    if (!piece) {
        return {
            title: 'Piece Not Found',
        };
    }

    return {
        title: piece.title,
        description: piece.excerpt,
        authors: [{ name: piece.author }],
        openGraph: {
            title: piece.title,
            description: piece.excerpt,
            type: 'article',
            authors: [piece.author],
            publishedTime: piece.date,
            modifiedTime: piece.lastRevision,
            images: piece.featuredImage ? [{ url: piece.featuredImage }] : [],
        },
    };
}

export default async function PiecePage({ params }: PageProps) {
    const piece = await getContent('piece', params.slug);

    if (!piece) {
        return notFound();
    }

    return (
        <PasswordGate
            correctPasswords={piece.password ? [piece.password] : []}
            contentType="piece"
            contentTitle={piece.title}
        >
            <ContentReader content={piece} type="piece" />
        </PasswordGate>
    );
}
