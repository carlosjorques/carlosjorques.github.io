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
		publishDate: z.date(),
		readingTime: z.string().optional(),
		heroImage: z
			.object({
				src: z.string(),
				alt: z.string(),
			})
			.optional(),
		category: z.enum([
			'Embedded Control Architecture',
			'Sensing & Signal Processing',
			'Control Algorithms & Diagnostics',
			'Embedded Control',
			'Safety-Critical Automotive Development',
			'Technical Leadership',
			'Physical Systems Engineering',
		]),
		tags: z.array(z.string()),
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

export const collections = { cases, writing, research };
