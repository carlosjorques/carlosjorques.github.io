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
	/** One sentence on what the series answers, so a reader can decide whether to start. */
	readonly summary: string;
	/** Shorter summary for compact lists (landing page), 100 characters at most. */
	readonly teaser?: string;
	/** Slug of the Work project the series draws on (src/content/projects). */
	readonly relatedProject?: string;
	/**
	 * Total number of parts when the series is published part by part. While fewer parts are
	 * published, the series reads "2 of 4 articles". Leave it out once every part is out.
	 */
	readonly plannedParts?: number;
}

export const WRITING_SERIES: readonly WritingSeries[] = [
	{
		id: 'control-software-electric-trucks',
		title: 'The Value of Control Software in Electric Heavy-Duty Trucks',
		summary:
			'What the energy saving of thermal control software is worth in an electric truck, in battery size, in cost per tonne-kilometre, in the profit of the haulier and in the design of the vehicle.',
		teaser: 'What the energy saving of thermal control software is worth in an electric truck.',
		relatedProject: 'electric-truck-thermal-management',
	},
];

export const getWritingSeries = (id: string) => WRITING_SERIES.find((series) => series.id === id);
