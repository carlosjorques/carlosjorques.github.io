import type { ImageMetadata } from 'astro';
import autonomousHaulerImage from '../assets/projects/autonomous-hauler-propulsion.webp';
import ebikeMotorControlImage from '../assets/projects/ebike-motor-control.webp';
import electricTruckImage from '../assets/projects/electric-truck-thermal-bms.webp';
import heavyDutyEngineImage from '../assets/projects/heavy-duty-engine-diagnostics.webp';

export interface ProjectCard {
	readonly slug: string;
	readonly title: string;
	readonly company: string;
	readonly deliveryContext?: string;
	readonly context: string;
	readonly description: string;
	readonly ownership: string;
	readonly evidence: readonly [readonly [string, string], readonly [string, string]];
	readonly image: ImageMetadata;
	readonly imageAlt: string;
}

export const projectCards = [
	{
		slug: 'electric-truck-thermal-management',
		title: 'Battery and thermal control for electric trucks',
		company: 'Scania',
		context: 'Electrified trucks',
		description: 'I define control behaviour and software architecture for battery, charging, power electronics, and auxiliary thermal functions with competing heat and energy demands.',
		ownership: 'I own the control architecture and system models',
		evidence: [
			['Validation path', 'MIL / SIL / HIL to vehicle'],
			['Evidence', 'Model gaps found in hardware and vehicle tests'],
		],
		image: electricTruckImage,
		imageAlt: 'Electric truck connected to a charger in snowy test conditions',
	},
	{
		slug: 'autonomous-hauler-propulsion-control',
		title: 'Propulsion control for an autonomous electric hauler',
		company: 'Volvo Construction Equipment',
		deliveryContext: 'Client assignment: Volvo Construction Equipment · Delivered through ALTEN',
		context: 'Autonomous heavy duty machinery',
		description: 'I replaced individually regulated axles with layered speed and torque control that coordinates both motors through changing terrain, load, and grip.',
		ownership: 'I designed, implemented, and tested the propulsion control',
		evidence: [
			['Reference measurement', 'About 5% speed error on the R&D circuit'],
			['Validation', 'Manual and autonomous vehicle testing'],
		],
		image: autonomousHaulerImage,
		imageAlt: 'Autonomous electric haulers operating in a quarry',
	},
	{
		slug: 'ebike-motor-control-power-electronics',
		title: 'Motor control and software setup for an E bike',
		company: 'MAHLE Electronics',
		context: 'E bike motor control',
		description: 'I worked on thermal modelling and motor torque software while helping establish the modular platform, testing practices, and software planning for early E bike development.',
		ownership: 'I contributed as developer and Scrum Master',
		evidence: [
			['Development stage', 'Early research and platform pre development'],
			['Engineering practice', 'Automotive SPICE, testing, and software planning'],
		],
		image: ebikeMotorControlImage,
		imageAlt: 'E bike motor and crank area after off road use',
	},
	{
		slug: 'heavy-duty-engine-diagnostics-control-research',
		title: 'Real time combustion control on a heavy duty engine',
		company: 'Lund University / Scania',
		context: 'Heavy duty engine control research',
		description: 'I designed closed loop combustion control, virtual sensing, and diagnostic methods, then implemented and validated them on a running heavy duty engine test bench.',
		ownership: 'I led the control design, implementation, and test bench validation',
		evidence: [
			['Experimental result', 'Up to 1.8 percentage points more indicated efficiency at low load'],
			['Implementation', 'LabVIEW FPGA and running engine validation'],
		],
		image: heavyDutyEngineImage,
		imageAlt: 'Heavy duty engine test bench with sensors and measurement cables',
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
