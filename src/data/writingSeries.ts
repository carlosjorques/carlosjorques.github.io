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
	readonly socialImage?: { readonly src: string; readonly alt: string };
	/**
	 * Completes "Part of a series …" under the lead of each part, so a reader who lands on one part
	 * sees what the whole series covers. About ten words, no numbers (the hook carries those), no
	 * full stop. Hidden on phones.
	 */
	readonly partContext?: string;
	/** Paragraphs shown under the summary on the series page: the context and the main results. */
	readonly overview?: readonly string[];
	/** Intro and one line per part for a series overview. */
	readonly roadmap?: {
		readonly intro: string;
		readonly parts: readonly { readonly title: string; readonly text: string }[];
	};
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
		socialImage: {
			src: '/images/blog/control-software-electric-trucks/series-social.png',
			alt: 'The value of control software in electric heavy-duty trucks: a four-part series. Truck tests showed 2–4% less whole-vehicle energy than production feedback control.',
		},
		summary:
			'A cold route can set an electric truck\'s battery size. Predictive thermal control saved energy in truck tests, but downsizing needs evidence on that route.',
		teaser: 'Energy savings lower a truck\'s electricity bill. Battery downsizing needs cold-route evidence.',
		partContext: 'on what thermal control software is worth in an electric truck',
		overview: [
			'An electric truck must complete its coldest required route with an aged battery and a full load. In truck tests across −30 to 40 °C, predictive and optimisation-based thermal control reduced whole-vehicle energy use by 2–4% against production feedback control. For the 640 kWh reference long-haul truck, the model values that range at 5,500–21,500 € over eight years, depending on whether a smaller battery is specified and its mass is used to carry freight.',
			'At the middle value of 3%, the same model gives 8,100 € with the battery kept or 16,300 € for a new design carrying weight-limited freight. With further unverified assumptions about winter performance, ageing, charging and thermal hardware, the modelled value rises to 21,600–30,500 € per truck.',
		],
		thesis:
			'Battery capacity is fixed before final vehicle tests. Control performance can enter that decision only when its effect on the cold, loaded route is supported early enough to change the specification.',
		relatedProject: 'electric-truck-thermal-management',
	},
];

export const getWritingSeries = (id: string) => WRITING_SERIES.find((series) => series.id === id);
