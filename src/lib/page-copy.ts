/**
 * Parser for the markdown-lite copy in src/data/page-copy.ts (the SEO sheet's
 * "Thin Content" sections). Supports "## " headings, paragraphs, "- " bullets,
 * "1. " numbered steps and **bold**. A section whose heading ends in "FAQ" is
 * returned as FAQ items so a page can add them to its existing FAQ list.
 */
import { site } from '@config/site';
import { phoneHref } from '@lib/tokens';
import type { Faq } from '@lib/types';

export type CopyBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] };

export interface CopySection {
  heading: string;
  blocks: CopyBlock[];
}

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Escaped HTML with **bold** and the phone number as a tap-to-call link. */
export const inlineHtml = (text: string): string =>
  escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replaceAll(escapeHtml(site.business.phone), `<a href="${phoneHref()}">${escapeHtml(site.business.phone)}</a>`);

const parseBlocks = (body: string): CopyBlock[] =>
  body
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk): CopyBlock => {
      const lines = chunk.split('\n').map((line) => line.trim());
      if (lines.every((line) => line.startsWith('- '))) return { type: 'ul', items: lines.map((l) => l.slice(2)) };
      if (lines.every((line) => /^\d+\.\s/.test(line))) {
        return { type: 'ol', items: lines.map((l) => l.replace(/^\d+\.\s+/, '')) };
      }
      return { type: 'p', text: lines.join(' ') };
    });

const parseFaqs = (body: string): Faq[] =>
  body
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const [first, ...rest] = chunk.split('\n').map((line) => line.trim());
      return { question: first.replace(/^\*\*|\*\*$/g, ''), answer: [rest.join(' ')] };
    });

export function parsePageCopy(markdown: string): { sections: CopySection[]; faqs: Faq[] } {
  const sections: CopySection[] = [];
  let faqs: Faq[] = [];
  for (const part of markdown.split(/^## /m).filter((p) => p.trim())) {
    const [headingLine, ...bodyLines] = part.split('\n');
    const heading = headingLine.trim();
    const body = bodyLines.join('\n');
    if (/FAQ$/.test(heading)) faqs = faqs.concat(parseFaqs(body));
    else sections.push({ heading, blocks: parseBlocks(body) });
  }
  return { sections, faqs };
}

/** Find a section by heading (for pages that place one section elsewhere). */
export const takeSection = (sections: CopySection[], heading: string) => {
  const index = sections.findIndex((s) => s.heading === heading);
  return index === -1 ? { section: undefined, rest: sections } : { section: sections[index], rest: sections.filter((_, i) => i !== index) };
};
