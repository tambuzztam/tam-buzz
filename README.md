# Tam Buzz

Website for the Tam ecosystem — philosophical counseling and software — built with Astro.

## Development

The active site lives in `tam-buzz-astro/`. The root-level Hugo setup (package.json, netlify.toml, etc.) is legacy and no longer used.

```bash
cd tam-buzz-astro
npm install
npm run dev
```

### Formatting & Linting

```bash
cd tam-buzz-astro
npm run format          # auto-format with Prettier
npm run format:check    # check formatting without writing
npm run lint            # run all linters (code + markdown)
```

## Deployment

Automatically deploys to [tam.buzz](https://tam.buzz) via Netlify on push to main branch.

## Tech Stack

- **Framework**: [Astro](https://astro.build)
- **Styling**: Tailwind CSS
- **Hosting**: Netlify
- **Domain**: tam.buzz
