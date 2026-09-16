# Project Brief: Carlos Jorques Personal Website

## Objective

Create a static personal professional website using Astro. The website should position Carlos Jorques as an **Embedded Controls Technical Lead** focused on **Control Intelligence for Physical Systems**.

The site is not a generic developer portfolio. It is a senior technical leadership profile for embedded control systems, automotive software/control work, physical systems, and production engineering.

## Primary outcome

A recruiter, engineering manager, or technical peer should understand within one short scan:

- who Carlos is
- what technical domain he operates in
- what he leads and architects
- why he is credible
- how to contact him

## Core positioning

**Embedded Controls Technical Lead**

**Control Intelligence for Physical Systems**

Carlos leads the design of production-ready embedded control systems for vehicles and smart machines, connecting sensing, signal processing, embedded software, control algorithms, diagnostics, actuation, safety, and delivery.

## First version scope

Pages:

- Home
- Cases
- Writing
- About
- Contact
- Research

Main navigation:

- Home
- Cases
- Writing
- About
- Contact

Secondary/footer:

- Research
- Publications
- CV
- LinkedIn
- GitHub

## Content model

### Cases

Public-safe experience cases replacing traditional portfolio projects.

Each case should include:

- Title
- Context
- Technical challenge
- My role
- System scope
- Standards / environment
- Outcome
- What this demonstrates
- Confidentiality note

### Writing

Technical articles supporting the professional identity.

Categories:

- Embedded Control Architecture
- Sensing & Signal Processing
- Control Algorithms & Diagnostics
- Safety-Critical Automotive Development
- Technical Leadership
- Physical Systems Engineering

### Research

Research is supporting credibility, not the primary identity.

The Research page should mention:

- PhD thesis
- selected publications
- research themes
- links such as Google Scholar or ORCID

## Design direction

Minimal Nordic technical style:

- off-white background
- graphite text
- muted blue/green/steel accent
- strong typography
- generous whitespace
- subtle borders
- restrained interactions
- no flashy animation
- no generic developer-portfolio cliches

## Technical direction

- Astro
- static generation
- TypeScript where useful
- Markdown or MDX for content
- Astro Content Collections
- plain CSS with design tokens unless the selected template already uses another approach
- minimal JavaScript

## Codex operating model

The project includes role-based agent playbooks in `agent-playbooks/` and reusable project-local skills in `.agents/skills/`.

Use agent playbooks for role-specific reviews or implementation modes:

- Strategy and conversion: `project-strategist`, `recruiter-agent`
- Content: `content-strategist`, `case-study-agent`, `technical-writing-editor`
- Implementation: `astro-architect`, `frontend-implementation-agent`
- Design and quality: `brand-visual-design-agent`, `accessibility-quality-agent`, `seo-metadata-agent`
- Deployment: `deployment-agent`

Use project-local skills for repeatable workflows:

- Site setup and Astro structure: `astro-template-adapter`, `astro-architecture-skill`, `astro-content-collections`
- Content and positioning: `portfolio-content-strategy`, `personal-brand-positioning`, `profile-positioning-skill`
- Evidence and confidentiality: `cv-evidence-extractor`, `professional-background-intake`, `confidential-work-sanitizer`
- Cases and writing: `experience-case-authoring`, `experience-case-builder`, `technical-writing-starter`, `technical-authority-content-planner`
- Recruiter conversion and gaps: `recruiter-scan-audit`, `recruiter-visitor-simulator`, `website-content-gap-audit`, `audience-and-conversion-skill`, `role-fit-analyzer`
- Design, SEO, accessibility, deployment: `nordic-design-system`, `seo-accessibility-performance`, `astro-static-deployment`

Recommended workflow for future iterations:

1. Use `project-strategist` or `portfolio-content-strategy` to define the change.
2. Use `astro-architect` and `frontend-implementation-agent` for implementation.
3. Use `confidential-work-sanitizer` for any experience, CV, employer, OEM, supplier, or product-related material.
4. Use `recruiter-scan-audit` and `seo-accessibility-performance` before handoff.

## Future improvements

After the first version:

- replace placeholder cases with real public-safe experience cases
- add CV download
- add real LinkedIn, email, GitHub, ORCID, and Google Scholar links
- write the first three authority-building articles
- connect a custom domain
- deploy through Cloudflare Pages or GitHub Pages
- run recruiter-style audits after each major revision
