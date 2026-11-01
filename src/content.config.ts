import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const cases = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/cases' }),
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		role: z.string(),
		capabilities: z.array(z.string()),
		standards: z.array(z.string()),
		domain: z.string(),
		confidentialityNote: z.string(),
		featured: z.boolean(),
		order: z.number(),
	}),
});

const writing = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
	schema: z.object({
		title: z.string(),
		subtitle: z.string().optional(),
		description: z.string(),
		/** Short summary (100 characters at most) for compact lists such as "Previous articles" and the landing page. Without it, the full description is shown. */
		teaser: z.string().max(100).optional(),
		publishDate: z.date(),
		/** Date of the last substantive revision. Shown next to the publish date and sent as dateModified. */
		updatedDate: z.date().optional(),
		readingTime: z.string().optional(),
		heroImage: z
			.object({
				src: z.string(),
				alt: z.string(),
			})
			.optional(),
		/** Preview image for link sharing (Open Graph, 1200 x 630 px). Not shown on the page. */
		socialImage: z.object({ src: z.string(), alt: z.string() }).optional(),
		category: z.enum([
			'Embedded Controls Architecture',
			'Sensing & Signal Processing',
			'Control Algorithms & Diagnostics',
			'Embedded Control',
			'Safety-Critical Automotive Development',
			'Technical Leadership',
			'Physical Systems Engineering',
		]),
		tags: z.array(z.string()),
		/** Series membership; the series itself is defined in src/data/writingSeries.ts. */
		series: z.object({ id: z.string(), part: z.number().int().positive() }).optional(),
		/** Slug of a Work project (src/content/projects) that this article draws on. Series parts inherit it from the series. */
		relatedProject: z.string().optional(),
		/**
		 * One headline number shown with the article in the Writing index, for example { value: 'Up to 4%', label: 'less energy' }.
		 * On the article page it closes the lead as a hook. `frame` labels it: "In short" (default) when the number is the
		 * result of the article, "Why it matters" when it is the context that motivates it.
		 */
		keyFigure: z.object({ value: z.string(), label: z.string(), frame: z.enum(['In short', 'Why it matters']).optional() }).optional(),
		featured: z.boolean(),
		draft: z.boolean(),
	}),
});

const research = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
	schema: z.object({
		title: z.string(),
		type: z.string(),
		year: z.number().optional(),
		summary: z.string(),
		link: z.string().optional(),
		featured: z.boolean(),
	}),
});

const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
	schema: z.object({
		/** H1 of the detail page; also used by the homepage and writing posts. */
		title: z.string(),
		/** Title tag before " | Carlos Jorques" (about 60 characters in total). */
		seoTitle: z.string(),
		description: z.string(),
		/** Short domain label, used by the homepage selected-work list. */
		context: z.string(),
		eyebrow: z.string(),
		intro: z.string(),
		facts: z.array(z.object({ label: z.string(), value: z.string() })).min(1),
		updated: z.coerce.date(),
		metrics: z.array(z.object({ value: z.string(), label: z.string() })).min(1),
		metricsNote: z.string(),
		glance: z.array(z.object({ label: z.string(), text: z.string() })).min(1),
		/** Values for the page JSON-LD; every value must be visible on the page. */
		schema: z.object({
			keywords: z.string(),
			about: z.array(z.object({ name: z.string(), sameAs: z.string().url().optional() })),
			mentions: z.array(
				z.object({
					type: z.string(),
					name: z.string(),
					sameAs: z.string().url().optional(),
					url: z.string().url().optional(),
				}),
			),
		}),
	}),
});

export const collections = { cases, writing, research, projects };
