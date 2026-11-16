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
			'These four articles investigate how thermal control software in electric trucks affects battery size, energy use, haulier economics and vehicle design.',
		teaser: 'Explore how software can make electric trucks more efficient and what that is worth to the haulier.',
		partContext: 'on what thermal control software is worth in an electric truck',
		overview: [
			'An electric truck carries a battery sized for its hardest route, usually a cold day at full load near the end of the battery\'s life. In truck tests, predictive and optimisation-based thermal control used 2–4% less whole-vehicle energy than production feedback control. Valued at 3%, the middle of that range, the saving is worth 8,100 € per long-haul truck over eight years when the battery is kept, and up to 16,300 € when a smaller battery carries more payload. If the truck is designed around the same gain, and the assumed winter, ageing and design effects hold, the modelled value rises to 21,600–30,500 €.',
		],
		roadmap: {
			intro: 'Each part takes one step from the route to the vehicle design. A detailed discussion of the methodology and its limitations is also included in the appendices.',
			parts: [
				{ title: 'How thermal limits set the battery size of an electric truck', text: 'The cold route at the end of the battery\'s life sets its capacity, and the battery is about a third of the truck\'s price.' },
				{ title: 'How predictive thermal control saves energy in electric trucks', text: 'Which actuator does the thermal work and when, and how the 2–4% saving was measured on trucks.' },
				{ title: 'How a 3% efficiency gain changes the economics of an electric truck', text: 'What a 3% gain is worth to a haulier, and why a thin margin magnifies it.' },
				{ title: 'Control software performance as a vehicle design input', text: 'What the gain adds when it is known before the hardware is frozen, and the evidence this requires.' },
			],
		},
		thesis:
			'On a truck already built, the saving gives more range. In a new design, it can give a smaller battery, but only with prior knowledge of the route and conditions set in the specification.',
		relatedProject: 'electric-truck-thermal-management',
	},
];

export const getWritingSeries = (id: string) => WRITING_SERIES.find((series) => series.id === id);
