export const IDENTITY = {
	name: 'Carlos Jorques',
	primaryTitle: 'Embedded Controls Technical Lead',
	supportingDescriptor: 'Senior Control Systems Engineer',
	umbrella: 'complex physical systems',
	brandStatement: 'Control intelligence for complex physical systems.',
	brandLine: 'Making complex machines sense, decide, and act reliably.',
	professionalSummary:
		'I lead control system design and implementation in embedded systems, helping machines sense, decide, and act reliably under real world constraints.',
	historicalTitles: ['Embedded Controls Technical Lead', 'Control Systems Architect'],
	years: '12+',
} as const;

export const LINKEDIN_URL = 'https://www.linkedin.com/in/carlosjorques/';
export const EMAIL_ADDRESS = 'carlosjorques@gmail.com';
export const CONTACT_DESTINATIONS = {
	linkedin: LINKEDIN_URL,
	email: `mailto:${EMAIL_ADDRESS}`,
	cv: '/cv/Carlos_Jorques_CV.pdf',
	contact: '/contact',
} as const;
