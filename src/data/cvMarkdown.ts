import cvMarkdown from '../content/profile/cv.md?raw';
import { parseCvContent } from '../lib/profileMarkdown';
import type {
	CaseStudy,
	CompactExperienceItem,
	CourseGroup,
	CvAction,
	EducationItem,
	ExperienceItem,
	ExpertiseGroup,
	ProofTile,
	SectionNavItem,
	ToolGroup,
} from './cv';

const { hero, sections, findChild, findOptionalChild, firstPlainParagraph, plainParagraphs, listItems, keyValue } =
	parseCvContent(cvMarkdown);

const heroMeta = keyValue(hero.children[0]);

const sectionHref = (label: string) => `#${label.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-').replace(/[^a-z-]/g, '')}`;

const actionConfig = [
	{ href: '/cv/Carlos_Jorques_CV.pdf', primary: true, download: true, analytics: 'cv_pdf_download' },
	{ href: '/contact', analytics: 'cv_contact_click' },
	{ href: 'https://www.linkedin.com/in/carlosjorques/', external: true, analytics: 'cv_linkedin_click' },
	{ href: '/work', analytics: 'cv_selected_work_click' },
];

const childList = (node: Parameters<typeof findChild>[0], title: string) => listItems(findChild(node, title));

const detailGroupTitles = ['Technical details', 'Validation scope', 'Additional responsibilities'] as const;

const parseExperience = (node: (typeof sections)['experience']['children'][number]): ExperienceItem => {
	const meta = keyValue(node);

	return {
		title: node.title,
		organization: meta.organization,
		location: meta.location,
		dates: meta.dates,
		summary: meta.summary,
		highlights: childList(node, 'Highlights'),
		detailGroups: detailGroupTitles
			.map((title) => {
				const detailNode = findOptionalChild(node, title);
				return detailNode ? { title, items: listItems(detailNode) } : null;
			})
			.filter((group): group is NonNullable<typeof group> => Boolean(group)),
		tags: childList(node, 'Tags'),
	};
};

const parseEarlierExperience = (node: (typeof sections)['earlierExperience']['children'][number]): CompactExperienceItem => {
	const meta = keyValue(node);

	return {
		title: node.title,
		organization: meta.organization,
		dates: meta.dates,
		summary: meta.summary,
		bullets: childList(node, 'Bullets'),
	};
};

const parseLinkLine = (line: string) => {
	const [label, ...hrefParts] = line.split(': ');
	return { label, href: hrefParts.join(': ') };
};

export const cvProfile = {
	links: {
		pdf: '/cv/Carlos_Jorques_CV.pdf',
		contact: '/contact',
		work: '/work',
		linkedin: 'https://www.linkedin.com/in/carlosjorques/',
	},
	hero: {
		eyebrow: 'Online CV',
		title: hero.children[0].title,
		subtitle: heroMeta.subtitle,
		summary: heroMeta.summary,
		secondarySummary: heroMeta.secondarysummary,
		tertiarySummary: heroMeta.tertiarysummary,
	},
	actions: sections.actions.children.map((action, index) => ({
		label: action.title,
		...actionConfig[index],
	})) satisfies CvAction[],
	sectionNav: listItems(sections.sectionNav).map((label) => ({
		label,
		href: sectionHref(label),
	})) satisfies SectionNavItem[],
	proofTiles: sections.proofTiles.children.map((tile) => ({
		value: tile.title,
		label: firstPlainParagraph(tile),
	})) satisfies ProofTile[],
	relevantFor: listItems(sections.relevantFor),
	executiveSummary: sections.executiveSummary ? plainParagraphs(sections.executiveSummary) : [],
	expertise: sections.expertise.children.map((group) => ({
		eyebrow: firstPlainParagraph(findChild(group, 'Eyebrow')),
		title: group.title,
		summary: firstPlainParagraph(findChild(group, 'Compact summary')),
		compactSummary: firstPlainParagraph(findChild(group, 'Compact summary')),
		detailSummary: firstPlainParagraph(findChild(group, 'Detail summary')),
		items: childList(group, 'Items'),
		chips: findOptionalChild(group, 'Chips') ? childList(group, 'Chips') : undefined,
		evidence: findOptionalChild(group, 'Evidence') ? childList(group, 'Evidence') : undefined,
		representativeWork: childList(group, 'Representative work'),
		methods: childList(group, 'Methods and evidence'),
	})) satisfies ExpertiseGroup[],
	impactHighlights: listItems(sections.impactHighlights),
	experience: sections.experience.children.map(parseExperience) satisfies ExperienceItem[],
	earlierExperience: sections.earlierExperience.children.map(parseEarlierExperience) satisfies CompactExperienceItem[],
	caseStudies: sections.caseStudies.children.map((item) => {
		const meta = keyValue(item);
		return {
			eyebrow: meta.eyebrow,
			title: item.title,
			statement: firstPlainParagraph(item),
			role: meta.role,
			focus: meta.focus,
			proof: meta.proof,
		};
	}) satisfies CaseStudy[],
	research: {
		intro: firstPlainParagraph(sections.research),
		themes: childList(sections.research, 'Research themes'),
		outcomes: childList(sections.research, 'Published research outcomes'),
		evidence: findChild(sections.research, 'Research evidence').children.map((item) => ({
			value: item.title,
			label: firstPlainParagraph(item),
		})),
		patents: childList(sections.research, 'Patent records'),
		selectedPublications: childList(sections.research, 'Selected publication records'),
		additionalPublications: childList(sections.research, 'Additional publication records'),
	},
	education: sections.education.children.map((item) => {
		const meta = keyValue(item);
		const links = findOptionalChild(item, 'Links');

		return {
			degree: item.title,
			year: meta.year,
			focus: meta.focus,
			dissertation: meta.dissertation,
			description: meta.description,
			links: links ? listItems(links).map(parseLinkLine) : undefined,
		};
	}) satisfies EducationItem[],
	tools: sections.tools.children.map((group) => ({
		title: group.title,
		items: listItems(group),
	})) satisfies ToolGroup[],
	extendedTools: sections.extendedTools.children.map((group) => ({
		title: group.title,
		items: listItems(group),
	})) satisfies ToolGroup[],
	languages: sections.languages.children.map((item) => ({
		language: item.title,
		level: firstPlainParagraph(item),
	})),
	coursesAndRecognition: {
		featured: childList(sections.coursesAndRecognition, 'Featured'),
		additional: childList(sections.coursesAndRecognition, 'Additional'),
	} satisfies CourseGroup,
	finalContact: firstPlainParagraph(sections.finalContact),
} as const;
