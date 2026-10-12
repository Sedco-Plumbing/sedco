#!/usr/bin/env node
/**
 * KEYWORD COVERAGE — for each page in the SEO keyword map
 * (src/data/keyword-map.json), lists the target phrases that do not appear in
 * the page's main content. Run after `npm run build`.
 *
 * Matching ignores case, punctuation, plural "s" and connector words ("in",
 * "for", "the"…), so "drain cleaning El Cajon" matches "Drain Cleaning in El
 * Cajon". A missing secondary phrase is a copy opportunity, not an error.
 */
import { readFileSync } from 'node:fs';

const map = JSON.parse(readFileSync('src/data/keyword-map.json', 'utf8'));
const STOP = new Set(['in', 'for', 'the', 'a', 'an', 'and', 'of', 'your', 'to', 'ca', 'our', 'we', 'on', 'at', 'near', 'from', 'with', 'by', 'throughout', 'across', 'around', 'serving', 's']);
const norm = (s) =>
  s
    .toLowerCase()
    .replace(/&amp;/g, ' ')
    .replace(/&#39;|’/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .split(' ')
    .filter((w) => w && !STOP.has(w))
    .map((w) => w.replace(/(ie)?s$/, ''))
    .join(' ');

let total = 0;
let found = 0;
for (const page of map.pages) {
  const html = readFileSync(`dist/client${page.url}index.html`, 'utf8');
  const main = html.split(/<main[^>]*>/)[1]?.split('</main>')[0] ?? html;
  const text = ` ${norm(main.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' '))} `;
  const keywords = [page.primary && { ...page.primary, primary: true }, ...page.secondary].filter(Boolean);
  const missing = keywords.filter((k) => !text.includes(` ${norm(k.keyword)} `));
  total += keywords.length;
  found += keywords.length - missing.length;
  if (missing.length) {
    console.log(`${page.url}\n  ${missing.map((k) => (k.primary ? `PRIMARY: ${k.keyword}` : k.keyword)).join('\n  ')}`);
  }
}
console.log(`\n${found}/${total} keyword-map phrases appear on their pages.`);
