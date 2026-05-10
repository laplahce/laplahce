import type { HomePage, HomePageFrontmatter } from './types';

type PageModule = {
  default: any;
  frontmatter?: Record<string, unknown>;
};

const pageModules = import.meta.glob('../content/pages/*.md', { eager: true }) as Record<string, PageModule>;
const rawModules = import.meta.glob('../content/pages/*.md', { eager: true, as: 'raw' }) as Record<string, string>;

function parseFrontmatter(raw: string): HomePageFrontmatter {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
  if (!match) {
    throw new Error('Page frontmatter is required');
  }

  const fm = Object.fromEntries(
    match[1]
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(Boolean)
      .map(line => {
        const [key, ...rest] = line.split(':');
        return [key.trim(), rest.join(':').trim()];
      }),
  ) as Record<string, string>;

  return {
    heroLabel: fm.heroLabel ?? '',
    heroTitle: fm.heroTitle ?? '',
    heroSubtitle: fm.heroSubtitle,
  };
}

function extractMarkdownBody(raw: string): string {
  const match = /^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/.exec(raw);
  return match ? match[1].trim() : '';
}

function hasCardsDirective(raw: string): boolean {
  return /<!--\s*cards\s*-->/i.test(raw);
}

function createPage(id: string, mod: PageModule, raw: string): HomePage {
  const frontmatter = {
    ...(mod.frontmatter ?? {}),
    ...parseFrontmatter(raw),
  } as HomePageFrontmatter;

  const markdownBody = extractMarkdownBody(raw);
  const hasCards = hasCardsDirective(markdownBody);

  return {
    id,
    frontmatter,
    Content: mod.default,
    raw: markdownBody,
    hasCards,
  };
}

let homePage: HomePage | null = null;

for (const [path, mod] of Object.entries(pageModules)) {
  if (path.includes('home.md')) {
    const raw = rawModules[path] ?? '';
    homePage = createPage('home', mod, raw);
    break;
  }
}

export function getHomePage(): HomePage {
  if (!homePage) {
    throw new Error('Home page not found');
  }
  return homePage;
}

export function splitHomePageByCards(raw: string): { before: string; after: string } {
  const parts = raw.split(/<!--\s*cards\s*-->/i);
  return {
    before: parts[0]?.trim() || '',
    after: parts[1]?.trim() || '',
  };
}
