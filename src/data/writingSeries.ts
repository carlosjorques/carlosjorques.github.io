/**
 * Article series shown on the Writing page.
 *
 * To add a series: add an entry here, then set `series: { id, part }` in the
 * frontmatter of each part. The build fails if a part points to an unknown id.
 */
export interface WritingSeries {
	/** Matches `series.id` in the frontmatter of each part. */
	readonly id: string;
	readonly title: string;
	/** Shorter title for the browser tab and search results, so that it stays within 70 characters with the name. */
	readonly seoTitle?: string;
	/** One sentence on what the series answers, so a reader can decide whether to start. */
	readonly summary: string;
	/** Shorter summary for compact lists (landing page), 100 characters at most. */
	readonly teaser?: string;
	/**
	 * Completes "Part of a series …" under the lead of each part, so a reader who lands on one part
	 * sees what the whole series covers. About ten words, no numbers (the hook carries those), no
	 * full stop. Hidden on phones.
	 */
	readonly partContext?: string;
	/** Paragraphs shown under the summary on the series page: the context and the main results. */
	readonly overview?: readonly string[];
	/** The claim the series argues, shown after the overview on the series page. */
	readonly thesis?: string;
	/** Slug of the Work project the series draws on (src/content/projects). */
	readonly relatedProject?: string;
	/**
	 * Total number of parts when the series is published part by part. Draft parts already count
	 * as coming, so this is only needed for parts that do not exist yet. Leave it out once every
	 * part is out.
	 */
	readonly plannedParts?: number;
}

export const WRITING_SERIES: readonly WritingSeries[] = [
	{
		id: 'control-software-electric-trucks',
		title: 'The value of control software in electric heavy-duty trucks',
		seoTitle: 'The value of control software in electric trucks',
		summary:
			'What the energy saving of thermal control software is worth in an electric truck: in battery size, cost per tonne-kilometre, haulier profit and vehicle design.',
		teaser: 'What the energy saving of thermal control software is worth in an electric truck.',
		partContext: 'on what thermal control software is worth in an electric truck',
		overview: [
			'An electric long-haul truck carries a battery sized for the worst-case scenario, and in the reference truck of this series that battery is about 32% of the purchase price. Predictive thermal control saves 2⁠–⁠4% of the energy of the truck. Used for a smaller battery, more freight or shorter charging, that saving is worth 1.2–2.5 times the electricity alone, and a 3% gain reaches 21,600–30,500 € per truck over 8 years when the vehicle is designed around the software.',
		],
		thesis:
			'Thermal control software is usually valued only for the electricity it saves. How it is designed also decides how large the battery must be, how long it lasts and how fast it charges, and that gives it as much weight in the business case as the price of electricity itself.',
		relatedProject: 'electric-truck-thermal-management',
	},
];

export const getWritingSeries = (id: string) => WRITING_SERIES.find((series) => series.id === id);
