import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
	const base = site ?? new URL('https://carlosjorques.github.io');
	const staticRoutes = ['', 'about/', 'work/', 'writing/', 'research/', 'contact/', 'cv/', 'privacy/'];
	const writing = (await getCollection('writing')).filter((entry) => !entry.data.draft).map((entry) => `writing/${entry.id.replace(/\.md$/, '')}/`);
	const work = (await getCollection('cases')).map((entry) => `work/${entry.id.replace(/\.md$/, '')}/`);
	const urls = [...staticRoutes, ...writing, ...work].map((path) => new URL(path, base).href);
	const body = urls.map((url) => `\t<url><loc>${url}</loc></url>`).join('\n');
	return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`, {
		headers: { 'Content-Type': 'application/xml' },
	});
};
