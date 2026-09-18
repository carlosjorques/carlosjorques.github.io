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
	roleScope: "I'm Carlos Jorques, an Embedded Controls Technical Lead. I help engineering teams turn difficult physical-system problems into clear control strategies and reliable embedded software. I combine an understanding of system behaviour with the realities of the software lifecycle, setting technical direction across architecture, interfaces, implementation, and validation so teams can deliver effective and efficient solutions for production code.",
	// About page introduction only.
	purpose: "Ultimately, I want to develop technology that solves real problems without creating new ones.",
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
