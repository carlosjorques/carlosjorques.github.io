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
			'Four articles connect electric-truck thermal control to battery size, energy use, haulier economics and vehicle design, with detailed evidence in appendices.',
		teaser: 'Four short articles on what thermal control is worth in an electric truck.',
		partContext: 'on what thermal control software is worth in an electric truck',
		overview: [
			'An electric truck carries a battery sized for a difficult route, but its mass and cost travel on every route. In truck tests, predictive and optimisation-based thermal control reduced whole-vehicle energy use by 2–4% against production feedback control. When I apply that tested range to the reference long-haul truck, the base model returns 5,500–21,500 € over eight years, depending on whether the battery is kept or reduced for payload. Further assumed winter, ageing and design effects raise the modelled value of a 3% average gain to 21,600–30,500 € when the vehicle is specified around it. Those further effects are not truck-test results.',
		],
		roadmap: {
			intro: 'Each part follows one decision in that chain. Its appendix keeps the calculations and evidence limits available without interrupting the main argument.',
			parts: [
				{ title: 'How thermal limits set the battery size of an electric truck', text: 'How cold-weather demand sets the battery size, payload and cost, and when control can change it.' },
				{ title: 'How predictive thermal control saves energy in electric trucks', text: 'How actuator allocation and route preview save energy, and how the truck result was measured.' },
				{ title: 'How a 3% efficiency gain changes the economics of an electric truck', text: 'How the same gain reaches electricity cost, battery cost, payload and operating profit.' },
				{ title: 'Control software performance as a vehicle design input', text: 'Which further benefits depend on early evidence rather than the measured average saving.' },
			],
		},
		thesis:
			'The same saving can become more range on a built truck or a smaller battery in a new design. The latter requires evidence on the route and conditions that set its specification.',
		relatedProject: 'electric-truck-thermal-management',
	},
];

export const getWritingSeries = (id: string) => WRITING_SERIES.find((series) => series.id === id);
