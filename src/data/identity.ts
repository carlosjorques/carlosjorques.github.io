export const IDENTITY = {
	name: 'Carlos Jorques',
	// Canonical visible title across all rendered pages.
	primaryTitle: 'Embedded Controls Technical Lead',
	// SEO-only descriptor; never render as a visible second title.
	supportingDescriptor: 'Senior Control Systems Engineer',
	// Homepage hero and footer signature only.
	brandStatement: 'Control intelligence for complex physical systems',
	brandLine: 'Making complex machines sense, decide, and act reliably.',
	// Homepage hero lead only.
	roleScope: "I’m Carlos Jorques, an Embedded Controls Technical Lead. I help teams turn complex physical-system needs into reliable embedded control software. I set technical direction from system behaviour and architecture through implementation, validation, and production delivery.",
	// About page introduction only.
	purpose: "I push to develop technology that solves real problems without creating new ones.",
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
