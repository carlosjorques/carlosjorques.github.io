export const IDENTITY = {
	name: 'Carlos Jorques',
	// Canonical visible title across all rendered pages.
	primaryTitle: 'Control Systems Technical Lead',
	secondaryDescriptors: ['Control Systems Architect', 'Senior Control Systems Engineer'],
	// Homepage hero and footer signature only.
	brandStatement: 'Control intelligence for complex physical systems',
	brandLine: 'Embedded control systems for complex physical machines.',
	// Homepage hero lead only.
	roleScope: 'I lead the architecture, implementation, and validation of real-time control software for complex physical systems, including electrified vehicles and autonomous machines.',
	// Home, contact, CV, and footer location metadata.
	location: 'Valencia, Spain',
	years: '12+',
} as const;

export const LINKEDIN_URL = 'https://www.linkedin.com/in/carlosjorques/';
export const CONTACT_DESTINATIONS = {
	linkedin: LINKEDIN_URL,
	cv: '/cv/Carlos_Jorques_CV.pdf',
	contact: '/contact',
} as const;
