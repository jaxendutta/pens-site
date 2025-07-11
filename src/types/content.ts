export const ContentTypes = ['piece', 'poem'] as const;
export type ContentType = (typeof ContentTypes)[number];

export interface ContentMeta {
  slug: string;
  title: string;
  author: string;
  location: string;
  date: string;
  lastRevision: string;
  wordCount: number;
  featuredImage?: string;
  excerpt: string;
  password: string;
  content: string;
  chapters?: string[];
}
