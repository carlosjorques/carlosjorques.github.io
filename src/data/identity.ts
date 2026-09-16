export const IDENTITY = {
	name: 'Carlos Jorques',
	// Canonical visible title across all rendered pages.
	primaryTitle: 'Embedded Controls Technical Lead',
	// SEO-only descriptor; never render as a visible second title.
	supportingDescriptor: 'Senior Control Systems Engineer',
	// Homepage hero and footer signature only.
	brandStatement: 'Control intelligence for complex physical systems',
	brandLine: 'Making complex machines sense, decide, and act reliably.',
	// Structured professional evidence data.
	experienceSummary: 'Electrified vehicles, autonomous machinery, and heavy-duty systems.',
	// Homepage hero lead only.
	roleScope: "I'm Carlos Jorques, an Embedded Controls Technical Lead. I design control algorithms and the real-time software that runs them. I lead the teams that take them into production.",
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
