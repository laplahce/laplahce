import type { Package, PackageFrontmatter, Heading, PackageLink } from './types';

type PackageModule = {
  default: any;
  frontmatter?: Record<string, unknown>;
};

const markdownModules = import.meta.glob('../content/packages/*.md', { eager: true }) as Record<string, PackageModule>;
const rawModules = import.meta.glob('../content/packages/*.md', { eager: true, as: 'raw' }) as Record<string, string>;

function parseFrontmatter(raw: string): PackageFrontmatter {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
  if (!match) {
    throw new Error('Package frontmatter is required');
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

  // Validate required fields
  if (!fm.title) throw new Error('Package requires "title" field');
  if (!fm.slug) throw new Error('Package requires "slug" field');
  if (!fm.description) throw new Error('Package requires "description" field');
  if (!fm.cardImage) throw new Error('Package requires "cardImage" field');
  if (!fm.coverImage) throw new Error('Package requires "coverImage" field');

  return {
    title: fm.title,
    slug: fm.slug,
    description: fm.description,
    cardImage: fm.cardImage,
    coverImage: fm.coverImage,
  };
}

function extractHeadings(raw: string): Heading[] {
  const headingRegex = /^(##+)\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;
  while ((match = headingRegex.exec(raw)) !== null) {
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    headings.push({
      level: match[1].length,
      text,
      id,
    });
  }
  return headings;
}

function createPackage(id: string, mod: PackageModule, raw: string): Package {
  const frontmatter = {
    ...(mod.frontmatter ?? {}),
    ...parseFrontmatter(raw),
  } as PackageFrontmatter;

  return {
    id,
    slug: frontmatter.slug,
    title: frontmatter.title,
    description: frontmatter.description,
    cardImage: frontmatter.cardImage,
    coverImage: frontmatter.coverImage,
    Content: mod.default,
    raw,
    headings: extractHeadings(raw),
  };
}

const packages: Package[] = Object.entries(markdownModules)
  .map(([path, mod]) => {
    const id = path.split('/').pop()?.replace(/\.md$/, '') ?? '';
    const raw = rawModules[path] ?? '';
    return createPackage(id, mod, raw);
  })
  .sort((a, b) => a.title.localeCompare(b.title));

export const packagePages: Package[] = packages;

export function getPackage(id: string): Package | undefined {
  return packages.find(pkg => pkg.id === id);
}

export function getPackageLink(pkg: Package): PackageLink {
  return {
    id: pkg.id,
    title: pkg.title,
    href: `/docs/${pkg.id}`,
  };
}

export function getPackagePaths() {
  return packages.map(pkg => ({ params: { id: pkg.id } }));
}
