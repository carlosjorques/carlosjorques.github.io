# Carlos Jorques Portfolio

Astro static site for Carlos Jorques, positioned as an Embedded Control Systems Architect.

## Local Development

Install dependencies and start the local development server:

```sh
npm install
npm run dev
```

The dev server runs at `http://localhost:4321`.

## Build

Build the production site:

```sh
npm run build
```

Astro writes the static output to `dist/`.

## GitHub Pages Deployment

Deployment is configured through `.github/workflows/static.yml` using the official Astro GitHub Action and GitHub Pages.

Current deployment assumptions:

- Repository: `carlosjorques/carlosjorques.github.io`
- Pages URL: `https://carlosjorques.github.io/`
- Source branch: `master`
- Output directory: `dist/`
- Node.js: 22

In the GitHub repository settings, set Pages source to **GitHub Actions**. Each push to `master` will build and deploy the site.

## Contact form

The Contact page sends form submissions through [Web3Forms](https://web3forms.com/), so this static GitHub Pages site does not need a mail server or reveal the receiving email address. The Web3Forms access key is a public browser identifier and is configured in `src/pages/contact.astro`.

## Project Guidance

This repository also contains project-local instructions and skills for evolving the site:

- Root project instructions for Codex in `AGENTS.md`
- A concise project summary in `PROJECT_BRIEF.md`
- Agent playbooks for role-specific work
- Custom skills under `.agents/skills/`

Use these materials when refining content, architecture, deployment, accessibility, SEO, and recruiter-facing positioning.
