import images from '../data/images.json';

/** Key of an image in src/data/images.json, e.g. "hero/sedco-plumber-el-cajon". */
export type ImageKey = keyof typeof images;

/*
 * `sizes` strings shared by an LCP image and its <link rel="preload">. They
 * must match exactly, or the browser preloads one width and renders another.
 */

/**
 * Hero photos sit behind a ~90% navy overlay on phones, where they are barely
 * visible. Phones get this 1×1 transparent GIF through a <picture> source
 * instead of a 20–100 KB photo, which keeps the hero text as their LCP.
 */
export const BLANK_PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

/** Only desktop/tablet download (and preload) the hub and home hero photos. */
export const HERO_PHOTO_MEDIA = '(min-width: 769px)';

/** Homepage hero photo (desktop/tablet). */
export const HOME_HERO_SIZES = 'calc(100vw - 30px)';

/** Service hero photo: the right half of the split hero (banner between 769–959px). */
export const SERVICE_HERO_PHOTO_SIZES = '(max-width: 959px) calc(100vw - 70px), 50vw';

/** Service hero illustration, shown instead of the photo on phones. */
export const SERVICE_HERO_ART_SIZES = '280px';

/** Hub/info page hero photo (Services, Service Areas, Reviews, About, Contact). */
export const PAGE_HERO_SIZES = '70vw';
