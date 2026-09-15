import { SITE, SITE_L10N, absoluteUrl } from '@/lib/site';
import { GUIDES_BY_LOCALE } from '@/content/guides';

/*
 * llms.txt (see https://llmstxt.org/) — a short, link-only Markdown index for
 * LLMs and other automated readers, pointing at the canonical (English)
 * version of each page. German, French and Spanish translations exist at the
 * `/de`, `/fr` and `/es` prefixes of every link below; they are not listed
 * separately here since llms.txt has no established convention for locale
 * variants, and each page's own hreflang alternates already cross-link them.
 *
 * Not a Next.js metadata-file convention like robots.ts/sitemap.ts, so this
 * is a plain static Route Handler instead.
 */
export const dynamic = 'force-static';

function line(path: string, label: string, note?: string): string {
  const url = absoluteUrl(path);
  return note ? `- [${label}](${url}): ${note}` : `- [${label}](${url})`;
}

export function GET(): Response {
  const guides = GUIDES_BY_LOCALE.en;

  const body = `# ${SITE.name}

> ${SITE_L10N.en.description}

Every puzzle is generated and verified for a single solution in the browser — nothing is uploaded, and nothing is stored server-side. Also available in German, French and Spanish at the \`/de\`, \`/fr\` and \`/es\` path prefixes.

## Generate

${line('/', 'Puzzle generator', 'pick a difficulty, puzzles per page, page size and answer key, then download a PDF')}
${line('/printable-sudoku', 'Printable sudoku by difficulty')}
${line('/printable-sudoku/easy', 'Easy printable sudoku')}
${line('/printable-sudoku/medium', 'Medium printable sudoku')}
${line('/printable-sudoku/hard', 'Hard printable sudoku')}
${line('/printable-sudoku/expert', 'Expert printable sudoku')}
${line('/printable-sudoku-with-answers', 'Printable sudoku with answers')}
${line('/printable-sudoku-4-per-page', 'Four puzzles per page')}
${line('/sudoku-answers', 'Look up a solution by its printed puzzle code')}

## Guides

${guides.map((g) => line(`/guides/${g.slug}`, g.h1, g.summary)).join('\n')}

## About

${line('/about', 'About', 'how the puzzles are generated and verified')}
${line('/privacy', 'Privacy')}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
