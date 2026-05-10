# Content Management Guide

## Adding New Packages

### File Location
Create a new `.md` file in `src/content/packages/`

### Required Frontmatter Fields

Every package **must** have these fields defined:

```yaml
---
title: Package Display Name
slug: url-friendly-identifier
description: Brief description shown on the project card
cardImage: /path/to/card-image.jpg
coverImage: /path/to/cover-image.jpg
---
```

### Field Descriptions

- **title**: The package name displayed everywhere (e.g., "CTFX", "Water Shader")
- **slug**: URL-friendly identifier, used in links and page paths (e.g., "ctfx", "water-shader")
- **description**: Short 1-2 line description shown on the card (e.g., "Flow mapping experiments.")
- **cardImage**: Path to image file for the project card on homepage (`/public/` is the root, e.g., `/ctfx.jpg`)
- **coverImage**: Path to image file for the docs page header (e.g., `/ctfx-cover.jpg`)

### Example Package File

`src/content/packages/my-project.md`:
```markdown
---
title: My Project
slug: my-project
description: A brief description of what this project is about.
cardImage: /my-project.jpg
coverImage: /my-project-cover.jpg
---

# My Project

Main content starts here.

## Features

- Feature one
- Feature two
- Feature three
```

### Automatic Features

Once you create a package file:
- ✅ Appears on the homepage as a card
- ✅ Automatically linked in the navigation menu
- ✅ Docs page created at `/docs/{slug}`
- ✅ Sidebar with automatic heading navigation

---

## Editing the Home Page

### File Location
Edit `src/content/pages/home.md`

### Structure

The home page uses a combination of frontmatter metadata and markdown content. The `<!-- cards -->` directive tells the system where to inject the project cards.

### Frontmatter Fields

```yaml
---
heroLabel: Creative Engineering
heroTitle: Experimental graphics, tools, and technical systems.
heroSubtitle: (optional) Additional subtitle
---
```

### Available Fields

- **heroLabel**: Subtitle/label above the main title (e.g., "Creative Engineering")
- **heroTitle**: Main hero section headline
- **heroSubtitle**: Optional small text under the title

### Markdown Content

Everything after the frontmatter is rendered as markdown. Use `<!-- cards -->` as a marker to insert the project grid at that location.

### Example Home Page

```markdown
---
heroLabel: My Studio
heroTitle: Amazing work happens here.
heroSubtitle:
---

## Featured Work

<!-- cards -->

## About

We are a creative studio focused on experimental work and pushing creative boundaries.

## Get in Touch

Reach out at [hello@example.com](mailto:hello@example.com) to collaborate!
```

### Markdown Support

The home page markdown supports:
- **Headings**: `# H1`, `## H2`, `### H3`
- **Bold**: `**text**`
- **Italic**: `*text*`
- **Links**: `[text](url)`
- **Paragraphs**: Separated by blank lines

### Special Directive

- **`<!-- cards -->`**: Marks where the project cards section will be inserted. This creates a grid of all packages with their images and descriptions.

---

## Content Best Practices

1. **Always provide all required package fields** - The system will throw an error if any required field is missing
2. **Use consistent image naming** - Keep card and cover image naming related (e.g., `my-project.jpg`, `my-project-cover.jpg`)
3. **Keep descriptions short** - Card descriptions should be 1-2 sentences
4. **Use proper slug format** - Lowercase with hyphens (e.g., `my-amazing-project` not `My_Amazing_Project`)
5. **Store images in `/public`** - Images should be placed in the `public/` directory and referenced with `/filename.jpg`
6. **Use the cards directive** - Place `<!-- cards -->` exactly where you want the project cards to appear on the home page
7. **Organize home page sections** - Use markdown headings to create clear sections with the cards directive as the centerpiece

---

## Content Validation

The Astro Content Collections configuration enforces all required fields. If you forget a field, you'll get a clear error message indicating which field is missing.

Current schema validation ensures:
- ✅ All required package fields are strings
- ✅ Hero fields are required for the home page
- ✅ Proper error messages during build time
