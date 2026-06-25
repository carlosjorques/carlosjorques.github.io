# AGENTS.md

## Project purpose

This is the personal professional website of Carlos Jorques.

The site positions Carlos as an **Embedded Control Systems Architect** and **Technical Leader** focused on **Control Intelligence for Complex Physical Systems**.

Primary goal: recruiters, engineering managers, and technical peers should quickly understand Carlos's expertise, evidence of work, and contact paths.

Secondary goal: build long-term authority through technical writing on embedded control systems, physical systems, diagnostics, safety-related development, control architecture, production delivery, and technical leadership.

The website should function as:

- a recruiter-readable professional profile
- a technical portfolio
- a writing platform
- an online CV / evidence hub
- a contact gateway

## Target audiences

1. Recruiters and talent partners
2. Engineering managers and technical hiring managers
3. Technical peers in embedded systems, controls, diagnostics, automotive, mechatronics, electrification, and intelligent machines
4. Potential collaborators

## Positioning

Primary title:

**Embedded Control Systems Architect**

Secondary descriptors:

- Technical Leader
- Embedded Control Systems Architect
- Control Systems Engineer
- Real-Time Embedded Software / Controls Specialist

Brand phrase:

**Control Intelligence for Physical Systems**

Core message:

Carlos leads the design of embedded control software for physical machines, connecting control strategy, real-time embedded software, diagnostics, validation, safety-related constraints, system integration, and production delivery.

The site should communicate that Carlos works where advanced control algorithms meet physical hardware, uncertainty, diagnostics, validation, and production constraints.

## Professional themes

Use these themes consistently across the site:

- embedded control systems for physical machines
- control intelligence for complex physical systems
- real-time control and embedded software
- diagnostics and fault handling
- validation, MIL/SIL/HIL, and field evidence
- system integration
- safety-related development
- electrified vehicles, heavy-duty transportation, autonomous machines, and industrial systems
- production-ready engineering
- technical leadership across cross-functional teams
- research foundation translated into production-oriented decisions

## Tone

Clear, direct, senior, technically credible, and human.

Use:
- precise engineering language
- concise sections
- specific capability claims
- evidence-backed statements
- recruiter-readable phrasing
- calm confidence
- personal but restrained voice
- technical specificity where it improves trust

Avoid:
- hype
- generic portfolio language
- exaggerated claims
- academic-first positioning
- junior developer portfolio framing
- vague phrases such as “passionate problem solver”
- SaaS-style marketing language
- overuse of buzzwords
- overexplaining every technical distinction on top-level pages

## Content hierarchy

Primary navigation:
- Home
- Writing
- About
- Work
- Contact

Preferred nav order:
- Writing
- About
- Work
- Contact

Secondary pages / routes may include:
- CV
- Research context
- Publications
- Patents
- Individual writing posts
- Individual work detail pages if needed



Use Work, not Cases, as the main evidence section. Reason:
- Work can include projects, applied domains, publications, patents, research, and engineering contributions.
- Cases implies formal case studies with client/problem/result detail, which may not always fit public-facing engineering evidence.
- Individual deep dives may be called case notes or engineering cases later, but the main - route and nav label should remain Work.
- Public project and company information
- Project and company references are allowed when they are already approved by Carlos or publicly appropriate.
- Research supports credibility but must not dominate the site.

Approved examples may include:
- Scania trucks
- Volvo CE autonomous haulers
- Mahle electrified powertrains
- Tier 1 / client delivery environments
- heavy-duty transportation
- electrified powertrains
- high-voltage thermal management
- autonomous mobility systems
- diagnostics and fault handling
- safety-related development
- ISO 26262
- A-SPICE
- AUTOSAR-oriented development
- MIL/SIL/HIL
- CI/CD
- supplier interfaces
- vehicle-level validation

The site no longer needs to treat all project information as anonymized by default. Publicly approved project/product/company names may be used explicitly.

However, still avoid confidential details unless Carlos explicitly provides and approves them.

Do not reveal:
- unreleased products
- internal platform names
- internal architecture diagrams
- calibration data
- proprietary diagnostic mechanisms
- safety analysis details
- exact confidential timelines
- internal business-sensitive context
- customer-sensitive implementation details
- non-public supplier/customer relationships
- code, model internals, or implementation specifics that are not public

Use this distinction:
- Company/product/domain names: allowed when approved.
- Internal engineering details: not allowed unless explicitly approved.

## Technology

Use Astro.
Use TypeScript where useful.
Use Markdown or MDX for content.

Use Astro Content Collections for writing, work, research, CV data, or other structured content where appropriate.
Prefer static generation.
Avoid unnecessary JavaScript.
Avoid React, Vue, Svelte, or other UI frameworks unless there is a clear reason.
Prefer plain CSS with design tokens unless the existing template already uses another styling approach.

## Recommended site structure

Pages:
- `/`
- `about/`
- `/work/`
- `/writing/`
- `/writing/[slug]/`
- `/contact/`
- `/cv/` if implemented as an online CV
- `/research/` only if there is enough content to justify a separate page

Optional future pages:
- `/work/[slug]/`
- `/publications/`
- `/patents/`

Collections:
- `writing`
- `work`
- `research` if needed
- `cv` or structured CV data if useful

Components:
- Header
- Footer
- Hero
- ProofStrip
- SelectedWorkStrip
- WorkList
- WritingCard
- WorkCard
- ContactCTA
- SectionHeading
- TextLink
- CVSection
- ProjectEvidence
- TechnicalAreaList

Avoid over-componentizing simple page-specific sections.

## Homepage structure

Preferred homepage structure:

1. Hero
2. Proof strip integrated into or directly attached to the hero
3. Selected Work strip
4. Writing strip
5. One contextual “More about” CTA if needed
6. ooter / contact paths

Do not use a separate generic “Where to go next” navigation strip if the links are already integrated into contextual sections.

The homepage should feel like:

- clear positioning
- immediate credibility
- evidence path
- writing path
- contact path

It should not feel like a CV dump or a SaaS marketing page.

## Homepage hero direction

The homepage hero should remain concise and visually distinctive.

Current direction:
- dark hero surface
- centered identity
- brand / vision statement
- calmer substatement
- compact proof strip
- estrained CTAs

Preferred hero concept:

Carlos Jorques

Control intelligence for complex physical systems.

I lead the design of embedded control software that helps machines sense, decide, act, and operate reliably under real-world constraints.

Possible alternate statement:

Embedded controls for intelligent physical systems.

The hero should avoid becoming too narrow to automotive. It should support vehicles, heavy-duty machines, autonomous systems, energy systems, robotic systems, and other physical systems.

Hero CTAs should be concise. Prefer contextual links such as:

- Contact
- Work
- About
- CV / LinkedIn only if URLs are final and working

Do not launch with placeholder LinkedIn or CV URLs.

## Hero proof strip

The proof strip should live in or directly after the hero, not beside Writing.

Use compact proof points such as:

10+ years
Embedded controls in production environments

OEM / Tier 1
Automotive, heavy-duty, and client delivery context

Safety-related
ISO 26262, A-SPICE, AUTOSAR-oriented development

PhD-trained
Control systems, diagnostics, modeling, and evidence

The proof strip should be compact, quiet, and visually secondary to the hero statement.

## Selected Work strip

The Selected Work strip appears after the hero/proof area and before Writing.

Purpose:
- give proof quickly
- show how the hero statement translates into real work/products
- route users to /work
- avoid overwhelming visitors with large cards

Preferred style:
- compact three-row list
- no large cards
- no long descriptions unless needed
- each row has index, title, and CTA

Example rows:

01 Embedded controls for electrified and heavy-duty systems
02 Autonomous and intelligent machines
03 Research, patents, and publications

Each row should link to /work.
Avoid making this strip compete visually with the hero.

## Writing strip
Writing should appear after Selected Work.

Purpose:
- show technical thinking
- build long-term authority
- support credibility
- give technical peers and hiring managers a way to evaluate reasoning

Suggested intro:
Notes on control systems, electrification, diagnostics, and the boundary between physics and software — where technical change has to become reliable behavior in real machines.

If writing posts are placeholders, do not present them as real articles.

Options:
- publish real articles
- reduce placeholder prominence
- label planned writing honestly
- avoid “Latest writing” unless posts are live and dated

## About page direction

The About page explains the professional narrative and through-line.

Current recommended order:
- Hero / introduction with portrait
- Professional Foundation
- The challenge behind the work
- Professional approach
- Technical areas
- Applied domains
- Explore more of my work
- Contact CTA

The About page should balance:
- recruiter readability
- personal motivation
- professional proof
- technical specificity
- warmth
- restraint

The About page should not become a full CV.

## About page hero

The About hero should be more human and explanatory than the homepage hero.

It should communicate:
- Carlos designs embedded control systems for physical machines
- he leads technical teams designing real-time control and embedded software
- the work matters because physical systems shape how people move, build, transport, and use energy
- better control software can reduce energy use, improve fault response, reduce downtime, and make advanced technology more dependable
- he works with international teams from Spain
- details continue below

Avoid overloading the About hero with every technical distinction.

### The challenge behind the work

Keep a clear heading for scanability and accessibility.

Recommended heading:

"The challenge behind the work"

Use the question as a quote underneath:

"How can machines sense, decide, and act under uncertainty in ways that make everyday systems safer, more efficient, and more useful?"

The section should connect:
- early interest in robotics
- machines reading and reacting to their environment
- control theory as the framework
- electrical engineering and doctoral research as foundation
- production as the true test
- current work with vehicles and intelligent machines

### Professional approach

Use Professional approach as the section title instead of “How I approach execution” if the section is prose-based.

The section may include the quote:

"An elegant algorithm is only the beginning."

Core idea:

Advanced algorithms only matter when they respect hardware constraints, safety-related requirements, validation evidence, and production delivery realities.

Good sentence:

I value reliability over complexity: advanced algorithms only matter when they respect hardware constraints, safety-related requirements, validation evidence, and the realities of production delivery.

The cards in this section are optional. If the prose already covers the concept clearly, remove the cards to avoid page card overload.

### Technical areas

Technical areas should be compact and specific.

Prefer six cards unless a seventh is clearly needed.

Recommended technical areas:
- Controls Architecture
- Real-Time Embedded Software
- Diagnostics & Fault Isolation
- Validation, MIL/SIL/HIL, and Field Evidence
- System Integration
- Technical Leadership

Possible content themes:
- estimation
- observers
- operating-envelope boundaries
- generated-code boundaries
- C/C++ integration points
- timing loops
- virtual sensing
- signal-health monitoring
- traceability
- field-oriented validation
- safety-related constraints
- release readiness

Keep detailed tool stacks for the CV or Work page.

Do not overload About with:
- long tool lists
- all standards
- all patents/publications
- quantified delivery claims without context

## Applied domains

Applied domains can explicitly reference approved project/product contexts.

Examples:
- Heavy-Duty Transportation
- Safety-Related Diagnostics and Fault Handling
- Autonomous Mobility Systems
- Industry Standards and Production Deployment

A project image, such as a Volvo CE autonomous hauler, can be used if image rights are appropriate.

Use image captions to explain the engineering relevance, not to decorate.

Example caption direction:

A real-world machine is where control intent, embedded software, diagnostics, validation, and field behavior have to become one dependable system.

## Work page direction

The Work page is the evidence hub.

It may include:
- selected projects
- applied domains
- product contexts
- publications
- patents
- research context
- engineering contributions
- public professional timeline
- links to CV or contact

Use Work, not Cases, in navigation.

Individual work entries may be public-safe summaries. They can name approved companies and products, but should not expose confidential internal details.

## CV page direction

An online CV page is recommended.

It may include more detail than About:
- full roles
- company names
- dates if approved
- technical stack
- standards
- publications
- patents
- education
- selected achievements
- downloadable PDF CV
- LinkedIn/contact links

The CV page can be more structured and information-dense than About.

About should remain narrative and concise.

## Design direction

Minimal Nordic technical style with a distinctive personal accent.

Use:
- warm white / white page background
- graphite or near-black text
- dark hero on homepage
- generous whitespace
- strong readable typography
- subtle borders
- restrained hover states
- compact proof strips
- quiet editorial grids
- minimal card usage

Accent color:

Carlos’s personal bright accent:
#bfff03

Use as a bright signal accent primarily on dark backgrounds.

Design-token guidance:
--color-accent-bright: #bfff03;

Use bright accent for:
- dark hero kicker
- hero statement gradient
- hero link underline
- proof values in dark hero
- small signal marks
- focus states on dark surfaces

On light backgrounds, use a darker accessible accent, for example:
--color-accent: #5f7f00;

Do not use bright lime for long text on white backgrounds.

Avoid:
- flashy animations
- heavy gradients
- large neon surfaces
- stock illustrations
- excessive icons
- skill bars
- glassmorphism
- SaaS-style marketing clutter
- generic frontend-developer portfolio clichés

## Hero visual direction

The homepage hero may use a quiet dark background.

Recommended dark hero palette:
--hero-bg: var(--color-dark-surface);
--hero-bg-soft: var(--color-dark-surface-soft);
--hero-text: var(--color-on-dark);
--hero-muted: var(--color-on-dark-muted);
--hero-muted-soft: var(--color-on-dark-muted-soft);
--hero-border: var(--color-on-dark-border);
--hero-accent: var(--color-accent-bright);

The brand/vision statement may use a subtle green gradient.

Only apply the gradient to the short hero vision text.

Do not apply gradients to body text, proof labels, links, or section text.

No glow, no animation, no flashy effects.

Color-token requirements

Prefer design tokens over hardcoded colors.

Avoid scattered hardcoded values such as:

#ffffff
#1a1a1a
#171717
#444444
#d9d6ce
#ece9e2
old blue accents such as #2f8cff

Use variables such as:

--color-page
--color-text
--color-muted
--color-border
--color-border-soft
--color-accent
--color-accent-bright
--color-dark-surface
--color-dark-surface-soft
--color-on-dark
--color-on-dark-muted
--color-on-dark-muted-soft
--color-on-dark-border
--color-on-dark-border-soft

## SEO focus

Target concepts:
- Embedded Controls Architect
- Embedded Control Systems Architect
- Control intelligence for complex physical systems
- embedded control systems
- real-time control
- automotive embedded software
- control systems architecture
- diagnostics
- fault handling
- sensing and actuation
- system integration
- validation
- MIL/SIL/HIL
- ISO 26262
- A-SPICE
- AUTOSAR-oriented development
- electrified powertrains
- autonomous machines
- technical leadership

SEO should support the site naturally. Do not keyword-stuff.

## Quality requirements

Before completing implementation tasks:
- run npm run build
- run formatting or linting if configured
- check responsive layout
- check semantic HTML
- check heading hierarchy
- check contact links
- check LinkedIn links
- check CV links
- check metadata and page titles
- ensure approved public information is accurate
- ensure no confidential internal information is exposed
- check color contrast, especially bright accent on light backgrounds
- check one H1 per page
- check descriptive link text
- check image alt text

If a command fails, fix the issue or clearly explain what remains unresolved.

## Project-local agent playbooks

This repository includes task-specific playbooks under agent-playbooks/. Use them as operating modes when the user asks for that role or when the task clearly matches the playbook.

### Strategy and review:

- project-strategist: positioning, information architecture, launch scope, recruiter conversion.
- recruiter-agent: 7-second, 30-second, and 2-minute recruiter/hiring-manager review.
- accessibility-quality-agent: semantic HTML, heading hierarchy, accessibility, responsiveness, quality checks.
- seo-metadata-agent: titles, descriptions, Open Graph metadata, headings, slugs, search concepts.

### Content:

- content-strategist: homepage, About, expertise summaries, article planning, recruiter-readable copy.
- work-evidence-agent: Work page evidence structure, project summaries, publications, patents, and applied domains.
- technical-writing-editor: technical article outlines and edits for authority-building writing.
- cv-content-agent: online CV structure, role summaries, evidence extraction, CV-to-site alignment.

### Implementation:

- astro-architect: routes, layouts, content collections, schemas, build structure.
- frontend-implementation-agent: Astro components, pages, responsive CSS, layout polish.
- brand-visual-design-agent: Nordic visual system, hierarchy, spacing, typography, color.
- deployment-agent: Cloudflare Pages/GitHub Pages deployment setup and documentation.

## Project-local skills

This repository includes reusable Codex skills under .agents/skills/. Prefer these local skills for this project before using generic guidance, because they encode the site's positioning, public-information rules, Astro conventions, and launch priorities.

### Astro and implementation:

- astro-template-adapter
- astro-architecture-skill
- astro-content-collections
- frontend-implementation-skill
- template-content-migration
- astro-static-deployment

## Positioning, audience, and conversion:

- personal-brand-positioning
- profile-positioning-skill
- portfolio-content-strategy
- audience-and-conversion-skill
- recruiter-scan-audit
- recruiter-visitor-simulator
- role-fit-analyzer
- website-content-gap-audit
- linkedin-cv-website-alignment

## Evidence and content transformation:

- professional-background-intake
- cv-evidence-extractor
- portfolio-content-transformer
- public-work-sanitizer
- work-evidence-builder
- work-entry-authoring
- research-to-industry-skill

## Writing and authority:

- technical-writing-starter
- technical-authority-content-planner

## Design and quality:

- nordic-design-system
- site-identity-guidelines
- seo-accessibility-performance

When multiple local skills apply, use the smallest set that covers the task.

Examples:
- Homepage refinement: portfolio-content-strategy, audience-and-conversion-skill, nordic-design-system
- About page review: recruiter-scan-audit, content-strategist, website-content-gap-audit
- Work page evidence: cv-evidence-extractor, portfolio-content-transformer, work-entry-authoring
- Online CV: cv-evidence-extractor, linkedin-cv-website-alignment, cv-content-agent
- Visual polish: brand-visual-design-agent, nordic-design-system, seo-accessibility-performance
- Deployment: astro-static-deployment, seo-accessibility-performance
