import type { APIContext } from 'astro';
import { IDENTITY } from '../data/identity';
import { getWritingArticles } from '../data/writing';

const escapeXml = (value: string) =>
	value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export async function GET(context: APIContext) {
	const site = context.site ?? new URL(context.url.origin);
	const absolute = (href: string) => new URL(href, site).toString();
	const articles = await getWritingArticles({ includeDrafts: false });
	const feedUrl = absolute(`${import.meta.env.BASE_URL}rss.xml`);
	const lastBuild = articles[0]?.date ?? new Date();

	const items = articles
		.map((article) => {
			const url = absolute(article.href);
			const title = article.series ? `${article.title} (${article.fullTitle})` : article.fullTitle;
			return `		<item>
			<title>${escapeXml(title)}</title>
			<link>${escapeXml(url)}</link>
			<guid isPermaLink="true">${escapeXml(url)}</guid>
			<description>${escapeXml(article.description)}</description>
			<pubDate>${article.date.toUTCString()}</pubDate>${article.topics.map((topic) => `\n			<category>${escapeXml(topic)}</category>`).join('')}
		</item>`;
		})
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${escapeXml(`Writing by ${IDENTITY.name}`)}</title>
		<link>${escapeXml(absolute(`${import.meta.env.BASE_URL}writing/`))}</link>
		<atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
		<description>Notes on control software for complex dynamic systems: how it is designed, tested and taken to production, and what it is worth to the business behind it.</description>
		<language>en</language>
		<lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>
${items}
	</channel>
</rss>
`;

	return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
