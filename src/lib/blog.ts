/**
 * Shared helpers for the blog index and posts.
 */
import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** Published posts, newest first. */
export const getPublishedPosts = async (): Promise<Post[]> =>
  (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  );

/** Words in the post body (Markdoc source, markup stripped). */
export const wordCount = (post: Post): number =>
  (post.body ?? '')
    .replace(/\{%[^%]*%\}/g, ' ')
    .replace(/[#>*_`|[\]()-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;

/** Reading time at ~220 words a minute, at least 1. */
export const readingMinutes = (post: Post): number => Math.max(1, Math.round(wordCount(post) / 220));

const DATE = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

/** "July 30, 2026" — dates are stored as calendar days, so format in UTC. */
export const formatDate = (date: Date): string => DATE.format(date);

/** "2026-07-30" for <time datetime>. */
export const isoDate = (date: Date): string => date.toISOString().slice(0, 10);
