export type TextPart = {
	text: string;
	strong?: boolean;
};

type MarkdownNode = {
	level: number;
	title: string;
	lines: string[];
	children: MarkdownNode[];
};

const frontmatterPattern = /^---[\s\S]*?---\s*/;
const keyValueLinePattern = /^([A-Za-z][A-Za-z ]+):\s*(.+)$/;

const stripFrontmatter = (raw: string) => raw.replace(frontmatterPattern, '').trim();

const parseTree = (raw: string) => {
	const root: MarkdownNode = { level: 0, title: 'root', lines: [], children: [] };
	const stack: MarkdownNode[] = [root];

	for (const line of stripFrontmatter(raw).split(/\r?\n/)) {
		const heading = /^(#{1,6})\s+(.+?)\s*$/.exec(line);

		if (heading) {
			const node: MarkdownNode = {
				level: heading[1].length,
				title: heading[2].trim(),
				lines: [],
				children: [],
			};

			while (stack.at(-1) && stack.at(-1)!.level >= node.level) {
				stack.pop();
			}

			stack.at(-1)!.children.push(node);
			stack.push(node);
			continue;
		}

		stack.at(-1)!.lines.push(line);
	}

	return root;
};

const findChild = (node: MarkdownNode, title: string) => {
	const child = node.children.find((item) => item.title === title);

	if (!child) {
		throw new Error(`Missing markdown section: ${title}`);
	}

	return child;
};

const findOptionalChild = (node: MarkdownNode, title: string) =>
	node.children.find((item) => item.title === title);

const getParagraphStrings = (lines: string[]) => {
	const paragraphs: string[] = [];
	let buffer: string[] = [];

	for (const line of lines) {
		const trimmed = line.trim();

		if (!trimmed) {
			if (buffer.length > 0) {
				paragraphs.push(buffer.join(' '));
				buffer = [];
			}
			continue;
		}

		if (/^[-*+]\s+/.test(trimmed) || trimmed.startsWith('>') || keyValueLinePattern.test(trimmed)) {
			continue;
		}

		buffer.push(trimmed);
	}

	if (buffer.length > 0) {
		paragraphs.push(buffer.join(' '));
	}

	return paragraphs;
};

export const parseInlineStrong = (text: string): TextPart[] => {
	const parts: TextPart[] = [];
	const pattern = /\*\*(.+?)\*\*/g;
	let lastIndex = 0;
	let match: RegExpExecArray | null;

	while ((match = pattern.exec(text)) !== null) {
		if (match.index > lastIndex) {
			parts.push({ text: text.slice(lastIndex, match.index) });
		}

		parts.push({ text: match[1], strong: true });
		lastIndex = pattern.lastIndex;
	}

	if (lastIndex < text.length) {
		parts.push({ text: text.slice(lastIndex) });
	}

	return parts.length > 0 ? parts : [{ text }];
};

export const stripInlineMarkdown = (text: string) => text.replace(/\*\*(.+?)\*\*/g, '$1');

const paragraphs = (node: MarkdownNode) => getParagraphStrings(node.lines).map(parseInlineStrong);

const plainParagraphs = (node: MarkdownNode) => getParagraphStrings(node.lines).map(stripInlineMarkdown);

const firstPlainParagraph = (node: MarkdownNode) => plainParagraphs(node)[0] ?? '';

const listItems = (node: MarkdownNode) =>
	node.lines
		.map((line) => line.trim())
		.map((line) => /^[-*+]\s+(.+)$/.exec(line)?.[1])
		.filter((item): item is string => Boolean(item))
		.map((item) => stripInlineMarkdown(item.trim()));

const quote = (node: MarkdownNode) =>
	node.lines
		.map((line) => line.trim())
		.find((line) => line.startsWith('> '))
		?.slice(2)
		.trim()
		.replace(/^"|"$/g, '') ?? '';

const keyValue = (node: MarkdownNode) => {
	const result: Record<string, string> = {};

	for (const line of node.lines) {
		const match = keyValueLinePattern.exec(line.trim());

		if (match) {
			result[match[1].toLowerCase().replace(/\s+/g, '')] = stripInlineMarkdown(match[2].trim());
		}
	}

	return result;
};

const cardsFromChildren = (node: MarkdownNode) =>
	node.children.map((child) => {
		const childParagraphs = paragraphs(child);
		return {
			title: child.title,
			paragraphs: childParagraphs,
			plainParagraphs: plainParagraphs(child),
		};
	});

export const parseAboutContent = (raw: string) => {
	const root = parseTree(raw);
	const page = findChild(root, 'About');

	const hero = findChild(page, 'Hero');
	const whyPhysicalSystems = findChild(page, 'Why Physical Systems');
	const howIGotHere = findChild(page, 'How I Got Here');
	const howIWork = findChild(page, 'How I Work');
	const beyondEngineering = findChild(page, 'Beyond Engineering');
	const exploreMore = findChild(page, 'Explore More of My Work');
	const connect = findChild(page, 'Let’s Connect');

	return {
		hero: {
			title: firstPlainParagraph(findChild(hero, 'Title')),
			paragraphs: hero.children.filter((child) => child.title !== 'Title').flatMap(paragraphs),
		},
		whyPhysicalSystems: {
			title: whyPhysicalSystems.title,
			paragraphs: paragraphs(whyPhysicalSystems),
		},
		howIGotHere: {
			title: howIGotHere.title,
			paragraphs: paragraphs(howIGotHere),
			quote: quote(howIGotHere),
		},
		howIWork: {
			title: howIWork.title,
			paragraphs: paragraphs(howIWork),
			quote: quote(howIWork),
		},
		beyondEngineering: {
			title: beyondEngineering.title,
			paragraphs: paragraphs(beyondEngineering),
		},
		exploreMore: {
			title: exploreMore.title,
			items: exploreMore.children.map((child) => {
				const meta = keyValue(child);
				return {
					title: child.title,
					description: firstPlainParagraph(child),
					linkText: meta.linktext,
				};
			}),
		},
		connect: {
			title: connect.title,
			paragraphs: paragraphs(connect),
		},
	};
};

export const parseWorkContent = (raw: string) => {
	const root = parseTree(raw);
	const page = findChild(root, 'Work');
	const hero = findChild(page, 'Hero');
	const domains = findChild(page, 'Applied Domains');
	const projects = findChild(page, 'Selected Work');
	const researchContext = findChild(page, 'Research, Patents & Publications Context');
	const validation = findChild(page, 'Validation Evidence');

	return {
		hero: {
			title: firstPlainParagraph(findChild(hero, 'Title')),
			paragraphs: hero.children.filter((child) => child.title !== 'Title').flatMap(paragraphs),
		},
		domains: {
			title: domains.title,
			intro: firstPlainParagraph(domains),
			items: domains.children.map((child) => ({
				title: child.title,
				context: keyValue(child).context,
				paragraphs: paragraphs(child).filter((item) => !item.some((part) => part.text.startsWith('Context:'))),
			})),
		},
		projects: {
			title: projects.title,
			intro: firstPlainParagraph(projects),
			items: projects.children.map((child) => {
				const meta = keyValue(child);
				return {
					title: child.title,
					role: meta.role,
					focus: meta.focus,
					proof: meta.proof,
					image: meta.image,
					imageAlt: meta.imagealt,
					paragraphs: paragraphs(child).filter((item) =>
						!item.some((part) => /^(Role|Focus|Proof|Image|Image alt):/.test(part.text))
					),
				};
			}),
		},
		researchContext: {
			title: researchContext.title,
			paragraphs: paragraphs(researchContext),
		},
		validation: {
			title: validation.title,
			items: listItems(validation),
		},
	};
};

export const parseCvContent = (raw: string) => {
	const root = parseTree(raw);
	const page = findChild(root, 'CV');

	const hero = findChild(page, 'Hero');
	const sections = {
		actions: findChild(page, 'Actions'),
		sectionNav: findChild(page, 'Section Navigation'),
		proofTiles: findChild(page, 'Proof Tiles'),
		relevantFor: findChild(page, 'Relevant For'),
		executiveSummary: findOptionalChild(page, 'Executive Summary'),
		expertise: findChild(page, 'Core Expertise'),
		impactHighlights: findChild(page, 'Engineering Outcomes'),
		experience: findChild(page, 'Experience'),
		earlierExperience: findChild(page, 'Earlier Experience'),
		caseStudies: findChild(page, 'Selected Case Studies'),
		research: findChild(page, 'Research, Patents & Publications'),
		education: findChild(page, 'Education'),
		tools: findChild(page, 'Tools, Methods, Standards, and Languages'),
		extendedTools: findChild(page, 'Extended Tools'),
		languages: findChild(page, 'Languages'),
		coursesAndRecognition: findChild(page, 'Courses & Recognition'),
		finalContact: findChild(page, "Let's Connect"),
	};

	return { hero, sections, findChild, findOptionalChild, firstPlainParagraph, plainParagraphs, listItems, keyValue };
};
