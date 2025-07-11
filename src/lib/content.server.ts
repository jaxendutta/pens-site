// src/lib/content.server.ts - Server-side only content functions
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { ContentMeta, ContentType } from '@/types/content';

// Server-side content directory function
const contentDirectory = (type: ContentType) => {
    return path.join(process.cwd(), 'content', type);
};

export const getContentList = (type: ContentType): ContentMeta[] => {
    const dirPath = contentDirectory(type);
    if (!fs.existsSync(dirPath)) return [];

    const fileNames = fs.readdirSync(dirPath);

    return fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(fileName => {
            const slug = fileName.replace(/\.md$/, '');
            const fullPath = path.join(dirPath, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);

            // Get word count
            const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;

            return {
                slug,
                title: data.title || '',
                author: data.author || '',
                location: data.location || '',
                date: data.date || '',
                lastRevision: data.lastRevision || data.date,
                wordCount,
                featuredImage: data.featuredImage || '',
                excerpt: data.excerpt || '',
                password: data.password || '',
                content: '', // Not needed for list view
                chapters: data.chapters || [],
            } as ContentMeta;
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getContent = async (type: ContentType, slug: string): Promise<ContentMeta | null> => {
    try {
        const fullPath = path.join(contentDirectory(type), `${slug}.md`);

        if (!fs.existsSync(fullPath)) {
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content: markdownContent } = matter(fileContents);

        // Convert markdown to HTML
        const processedContent = await remark()
            .use(html)
            .process(markdownContent);
        const contentHtml = processedContent.toString();

        // Get word count
        const wordCount = markdownContent.split(/\s+/).filter(word => word.length > 0).length;

        return {
            slug,
            title: data.title || '',
            author: data.author || '',
            location: data.location || '',
            date: data.date || '',
            lastRevision: data.lastRevision || data.date,
            wordCount,
            featuredImage: data.featuredImage || '',
            excerpt: data.excerpt || '',
            password: data.password || '',
            content: contentHtml,
            chapters: data.chapters || [],
        } as ContentMeta;
    } catch (error) {
        console.error(`Error loading content: ${slug}`, error);
        return null;
    }
};