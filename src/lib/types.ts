export interface Heading {
  level: number;
  text: string;
  id: string;
}

export interface PackageFrontmatter {
  title: string;
  slug: string;
  description: string;
  cardImage: string;
  coverImage: string;
}

export interface Package {
  id: string;
  slug: string;
  title: string;
  description: string;
  cardImage: string;
  coverImage: string;
  Content: any;
  raw: string;
  headings: Heading[];
}

export interface PackageLink {
  id: string;
  title: string;
  href: string;
}

export interface PackagePage extends Package {
  readonly link: PackageLink;
}

// ===== Component Props =====

export interface CardProps {
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface SidebarSection {
  name: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface LayoutProps {
  title?: string;
  headings?: Heading[];
}

export interface DocsSidebarProps {
  headings?: Heading[];
}

export interface SidebarConfig {
  sections: SidebarSection[];
  label: string;
}

// ===== Page Sections =====

export interface HeroSection {
  label: string;
  title: string;
  subtitle?: string;
}

export interface TextSection {
  id: string;
  title: string;
  content: string;
  marginTop?: string;
}

export interface ProjectGridSection {
  id: string;
  cards: CardProps[];
}

// ===== Home Page =====

export interface HomePageFrontmatter {
  heroLabel: string;
  heroTitle: string;
  heroSubtitle?: string;
}

export interface HomePage {
  id: string;
  frontmatter: HomePageFrontmatter;
  Content: any;
  raw: string;
  hasCards: boolean;
}

export interface NavbarLogo {
  src: string;
  alt: string;
  label: string;
}

export interface NavbarDropdown {
  label: string;
  items: NavItem[];
}
