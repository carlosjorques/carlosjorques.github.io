export const IDENTITY = {
	name: 'Carlos Jorques',
	// Canonical visible title across all rendered pages.
	primaryTitle: 'Control Systems Technical Lead',
	secondaryDescriptors: ['Control Systems Architect', 'Senior Control Systems Engineer'],
	// Homepage hero and footer signature only.
	brandStatement: 'Embedded control for complex dynamic systems',
	brandLine: 'Embedded control for complex dynamic systems.',
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
