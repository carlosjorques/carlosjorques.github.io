/**
 * Adds one contact line to articles with at least MIN_SECTIONS sections. It goes before
 * the middle h2 unless the article marks a natural pause with <!-- article-mid-note -->.
 * Run after rehype-split-references, so the appendix and references do not count.
 */
const MIN_SECTIONS = 6;

const isH2 = (node) => node.type === 'element' && node.tagName === 'h2';

export default function rehypeMidArticleNote() {
	return (tree, file) => {
		const sections = tree.children.filter(isH2);
		if (sections.length < MIN_SECTIONS) return;

		const custom = file?.data?.astro?.frontmatter?.midNote;
		const marker = tree.children.find(
			(node) => (node.type === 'comment' && node.value.trim() === 'article-mid-note')
				|| (['raw', 'html'].includes(node.type) && node.value.trim() === '<!-- article-mid-note -->'),
		);
		const target = marker ?? sections[Math.floor(sections.length / 2)];
		const makeLink = (label, href, id) => ({
			type: 'element',
			tagName: 'a',
			properties: {
				href,
				dataAnalyticsEvent: 'cta_click',
				dataCtaId: id,
				dataCtaPlacement: 'writing-article-mid',
				dataCtaIntent: href.startsWith('/contact') ? 'contact' : 'proof',
				dataSourceSection: 'writing-article',
			},
			children: [{ type: 'text', value: label }],
		});
		const actions = [];
		(custom?.links ?? []).forEach((link, index) => {
			actions.push(makeLink(link.label, link.href, `writing-article-mid-link-${index + 1}`), { type: 'text', value: ' · ' });
		});
		actions.push(makeLink('Send me a message →', '/contact/?context=technical&source=writing-mid#message-title', 'writing-article-mid-contact'));
		const p = (className, children) => ({ type: 'element', tagName: 'p', properties: { className: [className] }, children });
		const note = {
			type: 'element',
			tagName: 'aside',
			properties: { className: ['article-note'], ariaLabel: 'Contact' },
			children: [
				p('article-note__label', [{ type: 'text', value: 'Work with me' }]),
				p('article-note__text', [{ type: 'text', value: custom?.text ?? 'I lead the development of embedded control software for complex dynamic systems, such as electric vehicles and autonomous machines.' }]),
				p('article-note__action', actions),
			],
		};
		tree.children.splice(tree.children.indexOf(target), marker ? 1 : 0, note);
	};
}
