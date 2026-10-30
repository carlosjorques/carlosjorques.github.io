/**
 * Adds one short contact line half-way through long articles, so a reader who is already
 * convinced does not have to scroll to the end. It is inserted before the middle h2 of the body
 * when the body has at least MIN_SECTIONS h2 sections. Run it after rehype-split-references, so
 * the appendix and references do not count.
 */
const MIN_SECTIONS = 6;

const isH2 = (node) => node.type === 'element' && node.tagName === 'h2';

export default function rehypeMidArticleNote() {
	return (tree) => {
		const sections = tree.children.filter(isH2);
		if (sections.length < MIN_SECTIONS) return;

		const target = sections[Math.floor(sections.length / 2)];
		const link = {
			type: 'element',
			tagName: 'a',
			properties: {
				href: '/contact/?context=technical&source=writing-mid#message-title',
				dataAnalyticsEvent: 'cta_click',
				dataCtaId: 'writing-article-mid-contact',
				dataCtaPlacement: 'writing-article-mid',
				dataCtaIntent: 'contact',
				dataSourceSection: 'writing-article',
			},
			children: [{ type: 'text', value: 'Send me a message →' }],
		};
		const p = (className, children) => ({ type: 'element', tagName: 'p', properties: { className: [className] }, children });
		const note = {
			type: 'element',
			tagName: 'aside',
			properties: { className: ['article-note'], ariaLabel: 'Contact' },
			children: [
				p('article-note__label', [{ type: 'text', value: 'Work with me' }]),
				p('article-note__text', [{ type: 'text', value: 'I lead the development of embedded control software for complex dynamic systems, such as electric vehicles and autonomous machines.' }]),
				p('article-note__action', [link]),
			],
		};
		tree.children.splice(tree.children.indexOf(target), 0, note);
	};
}
