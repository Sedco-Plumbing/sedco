#!/usr/bin/env node
/**
 * SEO SNAPSHOT
 *
 * Records the SEO-relevant state of every built page: title, meta description,
 * H1, canonical, robots and the JSON-LD @types it carries. Run after
 * `npm run build`.
 *
 *   node scripts/seo-snapshot.mjs                 print the snapshot as JSON
 *   node scripts/seo-snapshot.mjs --diff <file>   compare the build against a saved snapshot
 *
 * scripts/seo-baseline.json is the snapshot of the site as it stood before the
 * 2026 redesign (git tag `pre-redesign`). verify-build.mjs fails if any URL in
 * it stops being built, so the redesign cannot silently drop an indexed page.
 * Use --diff to review every title, description and H1 that changed.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist/client';

const walk = (dir) =>
  readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });

const decode = (s) =>
  s
    ?.replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim() ?? null;

/** Collect every @type in a parsed JSON-LD value, including nested @graph entries. */
const types = (node, out = new Set()) => {
  if (Array.isArray(node)) node.forEach((n) => types(n, out));
  else if (node && typeof node === 'object') {
    const t = node['@type'];
    if (t) [].concat(t).forEach((x) => out.add(x));
    Object.values(node).forEach((v) => types(v, out));
  }
  return out;
};

export const snapshot = () => {
  const pages = {};
  const files = walk(DIST).filter((f) => f.endsWith('index.html'));
  for (const file of files) {
    const url = '/' + relative(DIST, file).replace(/\\/g, '/').replace(/index\.html$/, '');
    const html = readFileSync(file, 'utf8');
    const schema = new Set();
    for (const [, json] of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
      try {
        types(JSON.parse(json), schema);
      } catch {
        schema.add('!invalid');
      }
    }
    pages[url] = {
      title: decode(html.match(/<title>(.*?)<\/title>/s)?.[1]),
      description: decode(html.match(/<meta name="description" content="(.*?)"/s)?.[1]),
      h1: decode(html.match(/<h1[^>]*>(.*?)<\/h1>/s)?.[1]),
      canonical: html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? null,
      robots: html.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? null,
      schema: [...schema].sort(),
    };
  }
  return Object.fromEntries(Object.entries(pages).sort(([a], [b]) => a.localeCompare(b)));
};

const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  const current = snapshot();
  const diffIndex = process.argv.indexOf('--diff');
  if (diffIndex === -1) {
    console.log(JSON.stringify(current, null, 2));
  } else {
    const before = JSON.parse(readFileSync(process.argv[diffIndex + 1], 'utf8'));
    const urls = [...new Set([...Object.keys(before), ...Object.keys(current)])].sort();
    let changes = 0;
    for (const url of urls) {
      const a = before[url];
      const b = current[url];
      if (!b) {
        console.log(`REMOVED  ${url}`);
        changes++;
        continue;
      }
      if (!a) {
        console.log(`ADDED    ${url}`);
        changes++;
        continue;
      }
      for (const key of ['title', 'description', 'h1', 'canonical', 'robots', 'schema']) {
        const x = JSON.stringify(a[key]);
        const y = JSON.stringify(b[key]);
        if (x !== y) {
          console.log(`CHANGED  ${url}  ${key}\n           was: ${x}\n           now: ${y}`);
          changes++;
        }
      }
    }
    console.log(changes ? `\n${changes} change(s).` : 'No SEO changes.');
  }
}
