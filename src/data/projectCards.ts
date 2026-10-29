import type { ImageMetadata } from 'astro';
import autonomousHaulerImage from '../assets/projects/autonomous-hauler-propulsion.webp';
import ebikeMotorControlImage from '../assets/projects/ebike-motor-control.webp';
import electricTruckImage from '../assets/projects/electric-truck-thermal-bms.webp';
import heavyDutyEngineImage from '../assets/projects/heavy-duty-engine-diagnostics.webp';

export interface ProjectOutcome {
	readonly value: string;
	readonly label: string;
}

export interface ProjectCard {
	readonly slug: string;
	readonly title: string;
	readonly company: string;
	readonly context: string;
	/** My role on the project, shown in the card eyebrow. */
	readonly role: string;
	/** Card text on the Work index: the problem and what the reader finds on the page. */
	readonly hook: string;
	/** One plain-language line for non-specialists, shown on the homepage tiles. */
	readonly plain: string;
	readonly outcomes: readonly ProjectOutcome[];
	readonly image: ImageMetadata;
	readonly imageAlt: string;
}

// Newest first: the order matches the next-project links on the detail pages.
export const projectCards = [
	{
		slug: 'electric-truck-thermal-management',
		title: 'Thermal management control for Scania’s electric trucks',
		company: 'Scania',
		context: 'Electric trucks',
		role: 'Predictive control lead',
		plain: 'Keeps the battery at the right temperature with less energy, using the route ahead.',
		hook:
			'The battery is about a third of the price of an electric truck, and part of every charge goes into heating and cooling it. The predictive controller I lead uses the route ahead to decide when to heat or cool, and with which pumps, fans and heaters. In truck tests, it saved enough energy for a smaller battery with the same range.',
		outcomes: [
			{ value: '2–4%', label: 'less vehicle energy' },
			{ value: 'up to 4.6×', label: 'battery saving over energy saving' },
			{ value: 'up to 21,500\u00a0€', label: 'saved per truck in 8 years' },
		],
		image: electricTruckImage,
		imageAlt: 'Electric truck connected to a charger in snowy test conditions',
	},
	{
		slug: 'autonomous-hauler-propulsion-control',
		title: 'Speed control for Volvo’s autonomous TA15 electric hauler',
		company: 'Volvo CE',
		context: 'Autonomous haulers',
		role: 'Technical lead',
		plain: 'Makes a driverless hauler hold its planned speed on mud, gravel and slopes.',
		hook:
			'The value of a driverless hauler is the material it moves per hour, so it has to hold the speed its autonomy system plans. On the TA15, the two electric axles worked against each other and made the hauler tremble. I redesigned its speed and torque control, and it now holds the requested speed on mud, gravel and slopes.',
		outcomes: [
			{ value: '< 1 km/h', label: 'speed error' },
			{ value: 'No', label: 'oscillation between the axles' },
			{ value: '≈ 3%', label: 'more loads per hour per km/h' },
		],
		image: autonomousHaulerImage,
		imageAlt: 'Autonomous electric haulers operating in a quarry',
	},
	{
		slug: 'mahle-aspice-motor-thermal-model',
		title: 'Software processes and a motor temperature model for MAHLE’s advanced engineering',
		company: 'MAHLE',
		context: 'Electric drives',
		role: 'Technical lead and Scrum Master',
		plain: 'Estimates the hottest point inside an e-bike motor that has no sensor there.',
		hook:
			'Vehicle makers assess how their suppliers develop software, and a motor without a sensor in its windings keeps a wide safety margin. As Scrum Master, I helped MAHLE’s advanced engineering team take its first steps towards A-SPICE level 2. I also led the e-bike software and co-developed a real-time model of the hottest point in the motor.',
		outcomes: [
			{ value: 'A-SPICE', label: 'first steps to level 2 adopted' },
			{ value: '< 2%', label: 'motor temperature error' },
		],
		image: ebikeMotorControlImage,
		imageAlt: 'E-bike motor and crank area after off-road use',
	},
	{
		slug: 'heavy-duty-engine-diagnostics-control-research',
		title: 'Combustion control that corrects a diesel engine within each cycle',
		company: 'Scania and Lund University',
		context: 'Diesel engines',
		role: 'Industrial PhD researcher',
		plain: 'Measures each combustion as it happens and corrects the fuel injection before the cycle ends.',
		hook:
			'Renewable fuels cut the CO₂ of trucks without new infrastructure. However, they ignite differently from diesel, so engines keep safety margins that cost fuel in every cycle. In my PhD, I developed software on an FPGA that measures each combustion and corrects the fuel injection before the cycle ends.',
		outcomes: [
			{ value: '50%', label: 'less variation between cycles' },
			{ value: 'up to +1.8%', label: 'indicated efficiency' },
			{ value: '96%', label: 'misfires detected in time' },
		],
		image: heavyDutyEngineImage,
		imageAlt: 'Six-cylinder Scania D13 engine in a test cell, with pressure sensors and measurement cables',
	},
] as const satisfies readonly ProjectCard[];

const cardSlugs = projectCards.map((card) => card.slug);
const duplicateCardSlugs = cardSlugs.filter((slug, index) => cardSlugs.indexOf(slug) !== index);

if (duplicateCardSlugs.length > 0) {
	throw new Error(`Duplicate project card slugs: ${[...new Set(duplicateCardSlugs)].join(', ')}`);
}

export function validateProjectCardSlugs(detailSlugs: readonly string[]) {
	const detailSlugSet = new Set(detailSlugs);
	const duplicateDetailSlugs = detailSlugs.filter((slug, index) => detailSlugs.indexOf(slug) !== index);
	const cardsWithoutDetails = cardSlugs.filter((slug) => !detailSlugSet.has(slug));
	const cardsBySlug = new Set(cardSlugs);
	const detailsWithoutCards = [...new Set(detailSlugs)].filter((slug) => !cardsBySlug.has(slug));

	if (duplicateDetailSlugs.length > 0 || cardsWithoutDetails.length > 0 || detailsWithoutCards.length > 0) {
		const errors = [
			duplicateDetailSlugs.length > 0 ? `duplicate detail slugs: ${[...new Set(duplicateDetailSlugs)].join(', ')}` : '',
			cardsWithoutDetails.length > 0 ? `cards without details: ${cardsWithoutDetails.join(', ')}` : '',
			detailsWithoutCards.length > 0 ? `details without cards: ${detailsWithoutCards.join(', ')}` : '',
		].filter(Boolean);
		throw new Error(`Project card/detail integrity check failed (${errors.join('; ')})`);
	}
}

export function getProjectCard(slug: string) {
	const card = projectCards.find((projectCard) => projectCard.slug === slug);
	if (!card) {
		throw new Error(`No project card found for detail slug "${slug}".`);
	}
	return card;
}
