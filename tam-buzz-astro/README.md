# Tam Buzz - Astro Site

A modern philosophical counseling website built with Astro and Tailwind CSS, featuring progressive disclosure design with "The Heights" and "The Depths" content sections.

## Architecture

* **Landing Page**: Single-page scroll design with conversion-focused sections
* **The Heights**: Aspirational philosophical content (meaning, purpose, vision)
* **The Depths**: Foundational content (assumptions, beliefs, root examination)
* **Obsidian Integration**: Content sourced from your Obsidian vault

## Development Setup

```bash
npm install
npm run dev
```

## Obsidian Integration

### Content Structure

Your Obsidian vault should have this structure:

```text
~/obsidian/death-of-socrates/
├── source/                    # Your working notes & research
└── distribution/
    └── tam-buzz/
        ├── heights/           # Aspirational philosophical content
        └── depths/            # Foundational examination content
```

### Setting up Content Collections

To connect your Obsidian content, you can either:

1.  Create symlinks (for development):

```bash
# Remove placeholder content
rm -rf src/content/heights/* src/content/depths/*

# Create symlinks to your Obsidian content
ln -s ~/obsidian/death-of-socrates/distribution/tam-buzz/heights/* src/content/heights/
ln -s ~/obsidian/death-of-socrates/distribution/tam-buzz/depths/* src/content/depths/
```

1.  Copy content during build (for production):

```bash
# Update package.json build script
"build": "rsync -av ~/obsidian/death-of-socrates/distribution/tam-buzz/ ./src/content/ --delete && astro build"
```

### Content Format

Obsidian markdown files should include frontmatter:

```markdown
---
title: "Your Article Title"
description: "Brief description for meta tags"
date: 2024-01-15
tags: ["philosophy", "meaning", "purpose"]
draft: false
---

# Your Content Here

Regular markdown content with Obsidian features like [[wikilinks]] and anchors.
```

### Publishing Workflow

1.  **Write** in your Obsidian source folder
1.  **Curate** finished pieces to `distribution/tam-buzz/heights/` or `distribution/tam-buzz/depths/`
1.  **Build** the site (Astro picks up changes automatically)
1.  **Deploy** via Netlify

## Site Structure

* `/` - Landing page with conversion flow
* `/heights` - Overview of aspirational content
* `/heights/[slug]` - Individual heights articles
* `/depths` - Overview of foundational content
* `/depths/[slug]` - Individual depths articles

## Design System

* **Dark theme** with gray-900 background
* **Blue accent** (#60a5fa) for Heights content
* **Amber accent** (#f59e0b) for Depths content
* **Responsive design** mobile-first with Tailwind breakpoints
* **Typography** optimized for philosophical content reading

## Mountain Metaphor

The site uses the metaphor of Tam as a mountain:

* **The Heights**: Gaining perspective, seeing the bigger picture
* **The Depths**: Examining foundations, exploring what lies beneath
* **Progressive disclosure**: Users choose their path of exploration

## Deployment

### Netlify Setup

1.  Connect your GitHub repo to Netlify
1.  Build settings are configured in `netlify.toml`
1.  Deploy automatically on push to main branch

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Installs dependencies                       |
| `npm run dev`     | Starts local dev server at `localhost:4321` |
| `npm run build`   | Build production site to `./dist/`          |
| `npm run preview` | Preview build locally before deploying      |
