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
	readonly deliveryContext?: string;
	readonly context: string;
	/** My role on the project, shown in the card eyebrow. */
	readonly role: string;
	/** Meta description and lead on the detail page. */
	readonly description: string;
	/** Card text on the Work index: the problem and what the reader finds on the page. */
	readonly hook: string;
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
		deliveryContext: 'Client assignment through ALTEN',
		context: 'Electric trucks',
		role: 'Predictive control lead',
		description:
			'Predictive control uses the route ahead to decide when to heat or cool the batteries, and a control allocator picks the pumps, fans and heaters that do it with the least electricity.',
		hook: 'Hauliers choose trucks by cost per tonne-kilometre, and the battery is about a third of the price of an electric truck. However, part of every charge is spent on keeping the batteries and the cabin at the right temperature. The predictive controller I lead uses the route ahead to decide when to heat or cool, and which pumps, fans and heaters to use. In truck tests, the saving was large enough to allow for a smaller battery with the same range.',
		outcomes: [
			{ value: '2–4%', label: 'less vehicle energy' },
			{ value: 'up to 4.6×', label: 'battery saving over energy saving' },
			{ value: 'up to 21500\u00a0€', label: 'saved per truck in 8 years' },
		],
		image: electricTruckImage,
		imageAlt: 'Electric truck connected to a charger in snowy test conditions',
	},
	{
		slug: 'autonomous-hauler-propulsion-control',
		title: 'Speed control for Volvo’s autonomous TA15 electric hauler',
		company: 'Volvo CE',
		deliveryContext: 'Client assignment through ALTEN',
		context: 'Autonomous haulers',
		role: 'Technical lead',
		description:
			'The two electric axles of the hauler worked against each other and made it tremble. I redesigned the speed and torque control so that the hauler holds the speed its autonomy system requests.',
		hook: 'The value of a driverless hauler is the material it moves per hour, so it has to hold the speed that its autonomy system plans. On the TA15, the two electric axles worked against each other and made the hauler tremble. I redesigned its speed and torque control, and every change was tested on the machine and in autonomous runs. The hauler now holds the requested speed and can therefore be planned closer to its limits on mud, gravel and slopes.',
		outcomes: [
			{ value: '< 1 km/h', label: 'speed error' },
			{ value: 'No', label: 'oscillation between the axles' },
			{ value: '≈ 3%', label: 'more loads per hour per km/h' },
		],
		image: autonomousHaulerImage,
		imageAlt: 'Autonomous electric haulers operating in a quarry',
	},
	{
		slug: 'ebike-motor-control-power-electronics',
		title: 'Software processes and a motor temperature model for MAHLE',
		company: 'MAHLE',
		context: 'E-bike drives',
		role: 'Technical lead and Scrum Master',
		description:
			'I helped an advanced engineering team prepare its software development for A-SPICE, and co-developed a real-time model that estimates the hottest temperature inside an electric motor, where no sensor measures.',
		hook: 'Vehicle makers expect A-SPICE from their software suppliers, and an e-bike motor without a sensor in its windings has to keep a wide temperature margin. As Scrum Master, I helped set the first steps towards A-SPICE level 2, and as technical lead of the e-bike software, I co-developed a real-time model of the hottest point in the motor.',
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
		description:
			'Software on an FPGA measures combustion inside a running Scania engine and corrects the fuel injection before the cycle ends, so that renewable fuels burn efficiently within the limits of the engine.',
		hook: 'Renewable fuels cut the CO₂ of trucks without new infrastructure. However, they ignite differently from diesel, so engines keep wide safety margins that cost fuel in every cycle. In my PhD, I developed software on an FPGA that measures each combustion and corrects the fuel injection before the cycle ends. On a Scania engine running diesel and two renewable fuels, it halved the variation between cycles and raised the efficiency.',
		outcomes: [
			{ value: '50%', label: 'less variation between cycles' },
			{ value: '+1.8 points', label: 'engine efficiency' },
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
