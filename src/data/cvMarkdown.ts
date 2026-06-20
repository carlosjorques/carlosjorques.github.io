import cvMarkdown from '../content/profile/cv.md?raw';
import { parseCvContent } from '../lib/profileMarkdown';
import type {
        CaseStudy,
        CompactExperienceItem,
        CvAction,
        EducationItem,
        ExperienceItem,
        ExpertiseGroup,
        ImpactHighlight,
        LearningRecognition,
        ProofTile,
        ResearchMetric,
        ResearchOutcome,
        SectionNavItem,
        ToolGroup,
} from './cv';

const { hero, sections, findChild, findOptionalChild, firstPlainParagraph, plainParagraphs, listItems, keyValue } =
	parseCvContent(cvMarkdown);

const heroMeta = keyValue(hero.children[0]);

const sectionHref = (label: string) => `#${label.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-').replace(/[^a-z-]/g, '')}`;
const sectionNavHref = (label: string) => (label === 'Systems' ? '#representative-systems' : sectionHref(label));

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

const parseImpactHighlight = (node: (typeof sections)['impactHighlights']['children'][number]): ImpactHighlight => {
        const meta = keyValue(node);

        return {
                category: meta.category,
                title: node.title,
                body: firstPlainParagraph(node),
        };
};

const parseResearchMetric = (node: (typeof sections)['research']['children'][number]): ResearchMetric => {
	const text = plainParagraphs(node);

	return {
		value: node.title,
		label: text[0] ?? '',
		description: text[1],
	};
};

const parseResearchOutcome = (node: (typeof sections)['research']['children'][number]): ResearchOutcome => ({
        value: node.title,
        label: firstPlainParagraph(node),
});

const nonEmptyLines = (node: (typeof sections)['tools']['children'][number]) =>
        node.lines.map((line) => line.trim()).filter((line) => line.length > 0);

const parseToolGroup = (node: (typeof sections)['tools']['children'][number]): ToolGroup => {
        if (node.title === 'Languages') {
                return {
                        title: node.title,
                        languages: nonEmptyLines(node).map((line) => {
                                const [language, ...levelParts] = line.split(',');
                                return {
                                        language: language.trim(),
                                        level: levelParts.join(',').trim(),
                                };
                        }),
                };
        }

        const meta = keyValue(node);

        return {
                title: node.title,
                primaryTools: meta.primarytools,
                methods: meta.methods,
        };
};

const firstRawParagraph = (node: (typeof sections)['research']['children'][number]) => {
	const paragraph: string[] = [];

	for (const line of node.lines) {
		const trimmed = line.trim();

		if (!trimmed) {
			if (paragraph.length > 0) {
				break;
			}
			continue;
		}

		paragraph.push(trimmed);
	}

	return paragraph.join(' ');
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
		href: sectionNavHref(label),
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
        impactIntro: firstPlainParagraph(sections.impactHighlights),
        impactHighlights: sections.impactHighlights.children.map(parseImpactHighlight) satisfies ImpactHighlight[],
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
			href: meta.href,
		};
	}) satisfies CaseStudy[],
	research: {
		intro: firstPlainParagraph(sections.research),
		themes: childList(sections.research, 'Research focus'),
		outcomes: findChild(sections.research, 'Published outcomes').children.map(parseResearchOutcome) satisfies ResearchOutcome[],
		evidence: findChild(sections.research, 'Academic and patent record').children.map(parseResearchMetric) satisfies ResearchMetric[],
		relevance: firstRawParagraph(findChild(sections.research, 'Engineering relevance')),
		workHref: firstPlainParagraph(findChild(sections.research, 'Work page link')),
	},
	education: sections.education.children.map((item) => {
		const meta = keyValue(item);
		const links = findOptionalChild(item, 'Links');

		return {
			degree: item.title,
			year: meta.year,
			institution: meta.institution,
			focus: meta.focus,
			dissertation: meta.dissertation,
			description: meta.description,
			links: links ? listItems(links).map(parseLinkLine) : undefined,
		};
	}) satisfies EducationItem[],
	educationIntro: firstPlainParagraph(sections.education),
        toolsIntro: firstPlainParagraph(sections.tools),
        tools: sections.tools.children.filter((group) => group.title !== 'Continuous Learning and Recognition').map(parseToolGroup) satisfies ToolGroup[],
        learningRecognition: {
                recognition: childList(findChild(sections.tools, 'Continuous Learning and Recognition'), 'Recognition'),
                recentLearning: childList(findChild(sections.tools, 'Continuous Learning and Recognition'), 'Recent learning'),
        } satisfies LearningRecognition,
        finalContact: firstPlainParagraph(sections.finalContact),
} as const;
