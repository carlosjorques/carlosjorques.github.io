import { getCollection, type CollectionEntry } from 'astro:content';
import { tagGroupFor } from './tagGroups';
import { getWritingSeries, type WritingSeries } from './writingSeries';

/**
 * During local development every article is rendered as if it were published,
 * so the site can be reviewed with the full writing collection in place.
 * Production builds keep honouring the `draft` flag for the staged rollout.
 */
export const SHOW_DRAFT_WRITING = import.meta.env.DEV;

export const isVisibleWriting = ({ draft }: { draft: boolean }) => SHOW_DRAFT_WRITING || !draft;

const withBase = (href: string) => `${import.meta.env.BASE_URL}${href.replace(/^\//, '')}`;

export const toTopicSlug = (value: string) =>
	value
		.toLowerCase()
		.replaceAll('/', '-')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');

export interface WritingArticle {
	readonly slug: string;
	readonly href: string;
	/** Display title: the subtitle for series parts, the full title otherwise. */
	readonly title: string;
	readonly fullTitle: string;
	readonly description: string;
	/** Optional one-line version of the description for compact lists. */
	readonly teaser?: string;
	readonly keyFigure?: { readonly value: string; readonly label: string; readonly frame?: 'In short' | 'Why it matters' };
	readonly date: Date;
	readonly dateIso: string;
	readonly minutes: number;
	readonly isDraft: boolean;
	readonly series?: { readonly id: string; readonly part: number; readonly definition: WritingSeries };
	/** Project slug from the article, or inherited from its series. */
	readonly relatedProject?: string;
	/** Macro-topic names (TAG_GROUPS keys) used by the topic filter. */
	readonly topics: readonly string[];
}

export interface WritingSeriesGroup {
	readonly definition: WritingSeries;
	/** Page that presents the whole series, for sharing. */
	readonly href: string;
	readonly parts: readonly WritingArticle[];
	/** Draft parts of the series that are not published yet, in part order. Shown without a link. */
	readonly upcoming: readonly WritingArticle[];
	readonly started: Date;
	readonly startedIso: string;
	readonly totalMinutes: number;
}

export interface WritingYearGroup {
	readonly year: number;
	readonly articles: readonly WritingArticle[];
}

/** One entry of "Latest publications": a whole series (a group of articles) or a single article. */
export type WritingPublication =
	| { readonly kind: 'series'; readonly group: WritingSeriesGroup }
	| { readonly kind: 'article'; readonly article: WritingArticle };

/** "Latest publications" holds up to this many items (a series counts as one)... */
export const LATEST_MAX_ITEMS = 3;
/** ...published within this many months of the newest one. Counting back from the newest
 * publication, not from today, keeps the section filled between publications. */
export const LATEST_WINDOW_MONTHS = 3;

const minutesOf = (readingTime?: string) => Number(readingTime?.match(/(\d+)\s*min/)?.[1] ?? 0);

const toArticle = (entry: CollectionEntry<'writing'>): WritingArticle => {
	const slug = entry.id.replace(/\.md$/, '');
	const seriesRef = entry.data.series;
	const definition = seriesRef ? getWritingSeries(seriesRef.id) : undefined;
	if (seriesRef && !definition) {
		throw new Error(`Writing "${slug}" refers to unknown series "${seriesRef.id}". Add it to src/data/writingSeries.ts.`);
	}

	return {
		slug,
		href: withBase(`/writing/${slug}/`),
		title: seriesRef && entry.data.subtitle ? entry.data.subtitle : entry.data.title,
		fullTitle: entry.data.title,
		description: entry.data.description,
		teaser: entry.data.teaser,
		keyFigure: entry.data.keyFigure,
		date: entry.data.publishDate,
		dateIso: entry.data.publishDate.toISOString().slice(0, 10),
		minutes: minutesOf(entry.data.readingTime),
		isDraft: entry.data.draft,
		series: seriesRef && definition ? { ...seriesRef, definition } : undefined,
		relatedProject: entry.data.relatedProject ?? definition?.relatedProject,
		topics: [...new Set(entry.data.tags.map(tagGroupFor))],
	};
};

/**
 * Articles sorted newest first. By default this follows `isVisibleWriting`
 * (drafts shown in development only); pass `includeDrafts: false` to always hide them.
 */
export async function getWritingArticles({ includeDrafts = SHOW_DRAFT_WRITING } = {}) {
	const entries = await getCollection('writing', ({ data }) => includeDrafts || !data.draft);
	const projectSlugs = new Set((await getCollection('projects')).map((project) => project.id));
	const articles = entries
		.map(toArticle)
		.sort((a, b) => b.date.valueOf() - a.date.valueOf() || (a.series?.part ?? 0) - (b.series?.part ?? 0) || a.slug.localeCompare(b.slug));

	for (const article of articles) {
		if (article.relatedProject && !projectSlugs.has(article.relatedProject)) {
			throw new Error(`Writing "${article.slug}" refers to unknown project "${article.relatedProject}".`);
		}
	}

	return articles;
}

export const seriesHref = (id: string) => withBase(`/writing/series/${id}/`);

/**
 * Series parts that are still drafts and are not in `visible`. A series published part by part
 * lists them as "coming", with the month of their planned publishDate.
 */
export async function getUpcomingParts(visible: readonly WritingArticle[]) {
	const shown = new Set(visible.map((article) => article.slug));
	return (await getWritingArticles({ includeDrafts: true })).filter((article) => article.isDraft && article.series && !shown.has(article.slug));
}

const byPart = (a: WritingArticle, b: WritingArticle) => (a.series?.part ?? 0) - (b.series?.part ?? 0);

export const toSeriesGroup = (articles: readonly WritingArticle[], id: string, upcoming: readonly WritingArticle[] = []): WritingSeriesGroup => {
	const parts = articles.filter((article) => article.series?.id === id).sort(byPart);
	const first = parts.reduce((earliest, part) => (part.date < earliest.date ? part : earliest), parts[0]);
	return {
		definition: parts[0].series!.definition,
		href: seriesHref(id),
		parts,
		upcoming: upcoming.filter((article) => article.series?.id === id && !parts.some((part) => part.slug === article.slug)).sort(byPart),
		started: first.date,
		startedIso: first.dateIso,
		totalMinutes: parts.reduce((sum, part) => sum + part.minutes, 0),
	};
};

/** Every series that has at least one visible part, newest first. */
export const getSeriesGroups = (articles: readonly WritingArticle[], upcoming: readonly WritingArticle[] = []) =>
	[...new Set(articles.flatMap((article) => (article.series ? [article.series.id] : [])))].map((id) => toSeriesGroup(articles, id, upcoming));

/** "4 articles", or "2 of 4 articles" while later parts of the series are still unpublished. */
export const seriesCountLabel = ({ definition, parts, upcoming }: WritingSeriesGroup) => {
	const total = Math.max(parts.length + upcoming.length, definition.plannedParts ?? 0);
	return total > parts.length ? `${parts.length} of ${total} articles` : `${parts.length} articles`;
};

/** True when the parts of a series were published on different days, so each part shows its own date. */
export const partsHaveOwnDates = (parts: readonly WritingArticle[]) => new Set(parts.map((part) => part.dateIso)).size > 1;

/**
 * Splits the articles into "Latest publications" and the compact "Previous articles" list.
 * A publication is a whole series (dated by its newest part) or a single article. The newest
 * publication is always latest; up to LATEST_MAX_ITEMS publications join it if published within
 * LATEST_WINDOW_MONTHS of it. The rest is grouped by year as individual articles.
 */
export function groupWriting(articles: readonly WritingArticle[], upcoming: readonly WritingArticle[] = []) {
	type Item = { readonly date: Date; readonly articles: readonly WritingArticle[]; readonly seriesId?: string };
	const items: Item[] = [];
	const seen = new Set<string>();
	for (const article of articles) {
		const seriesId = article.series?.id;
		if (seriesId) {
			if (seen.has(seriesId)) continue;
			seen.add(seriesId);
			items.push({ date: article.date, seriesId, articles: articles.filter((a) => a.series?.id === seriesId) });
		} else {
			items.push({ date: article.date, articles: [article] });
		}
	}

	const cutoff = items[0] ? new Date(items[0].date) : undefined;
	cutoff?.setMonth(cutoff.getMonth() - LATEST_WINDOW_MONTHS);
	const latestItems = items.filter((item, index) => index === 0 || (index < LATEST_MAX_ITEMS && cutoff && item.date >= cutoff));

	const latest: WritingPublication[] = latestItems.map((item) => item.seriesId
		? { kind: 'series', group: toSeriesGroup(articles, item.seriesId, upcoming) }
		: { kind: 'article', article: item.articles[0] });

	const latestSlugs = new Set(latestItems.flatMap((item) => item.articles.map((article) => article.slug)));
	const previous = articles.filter((article) => !latestSlugs.has(article.slug));
	const years: WritingYearGroup[] = [...new Set(previous.map((article) => article.date.getFullYear()))].map((year) => ({
		year,
		articles: previous.filter((article) => article.date.getFullYear() === year),
	}));

	return { latest, years };
}

export const formatReadingHours = (minutes: number) => `${Math.round((minutes / 60) * 2) / 2} h`;
