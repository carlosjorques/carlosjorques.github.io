/**
 * Wraps Markdown tables in `<div class="comparison-table">`, so they take the article table style
 * and scroll sideways on narrow screens. Tables already inside that wrapper (written as HTML) are
 * left as they are.
 *
 * A table introduced by an italic caption paragraph (`*Table 1. ...*`) becomes a
 * `<figure class="article-table">` with that text as its `<figcaption>`, so tables and figures
 * share the same caption markup and style.
 */
const classes = (node) => [].concat(node.properties?.className ?? []);
const isWrapper = (node) => node.type === 'element' && classes(node).includes('comparison-table');
const isBlank = (node) => node.type === 'text' && !node.value.trim();
const element = (tagName, className, children) => ({ type: 'element', tagName, properties: className ? { className: [className] } : {}, children });

// The caption paragraph holds one <em> (and possibly whitespace) whose text starts with "Table N".
const captionOf = (node) => {
	if (node?.type !== 'element' || node.tagName !== 'p') return undefined;
	const content = node.children.filter((child) => !isBlank(child));
	const [em] = content;
	if (content.length !== 1 || em.type !== 'element' || em.tagName !== 'em') return undefined;
	const first = em.children[0];
	return first?.type === 'text' && /^Table\s+\d+/.test(first.value) ? em.children : undefined;
};

const wrap = (node) => {
	if (!node.children || isWrapper(node)) return;
	const result = [];
	for (const child of node.children) {
		if (child.type === 'element' && child.tagName === 'table') {
			const table = element('div', 'comparison-table', [child]);
			// Find the caption paragraph just before the table, skipping whitespace.
			let index = result.length - 1;
			while (index >= 0 && isBlank(result[index])) index -= 1;
			const caption = index >= 0 ? captionOf(result[index]) : undefined;
			if (caption) {
				result.splice(index);
				result.push(element('figure', 'article-table', [element('figcaption', undefined, caption), table]));
			} else {
				result.push(table);
			}
			continue;
		}
		wrap(child);
		result.push(child);
	}
	node.children = result;
};

export default function rehypeWrapTables() {
	return (tree) => wrap(tree);
}
