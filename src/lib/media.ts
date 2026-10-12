import images from '../data/images.json';

/** Key of an image in src/data/images.json, e.g. "hero/sedco-plumber-el-cajon". */
export type ImageKey = keyof typeof images;

/*
 * `sizes` strings shared by an LCP image and its <link rel="preload">. They
 * must match exactly, or the browser preloads one width and renders another.
 */

/** Homepage hero photo: a small file on phones (it sits behind a 90% navy overlay there). */
export const HOME_HERO_SIZES = '(max-width: 768px) 480px, calc(100vw - 30px)';

/** Service hero photo: the right half of the split hero (banner between 769–959px). */
export const SERVICE_HERO_PHOTO_SIZES = '(max-width: 959px) calc(100vw - 70px), 50vw';

/** Service hero illustration, shown instead of the photo on phones. */
export const SERVICE_HERO_ART_SIZES = '280px';

/** Hub/info page hero photo (Services, Service Areas, Reviews, About, Contact). */
export const PAGE_HERO_SIZES = '(max-width: 768px) 480px, 70vw';
