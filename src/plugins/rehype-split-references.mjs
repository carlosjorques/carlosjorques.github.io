import { toHtml } from 'hast-util-to-html';

/**
 * Takes the "References" (or "Sources and further reading") section out of the article body, so
 * the article page can place it after the contact CTA. The section is the matching top-level h2
 * and everything after it up to the next h2. Its HTML reaches the page through
 * `remarkPluginFrontmatter.references` as `{ title, html }`.
 */
const TITLES = /^(references|sources and further reading)$/i;

const textOf = (node) =>
	node.type === 'text' ? node.value : (node.children ?? []).map(textOf).join('');

export default function rehypeSplitReferences() {
	return (tree, file) => {
		const children = tree.children;
		const start = children.findIndex(
			(node) => node.type === 'element' && node.tagName === 'h2' && TITLES.test(textOf(node).trim()),
		);
		if (start < 0) return;

		let end = children.length;
		for (let index = start + 1; index < children.length; index += 1) {
			const node = children[index];
			if (node.type === 'element' && node.tagName === 'h2') {
				end = index;
				break;
			}
		}

		const [heading, ...content] = children.splice(start, end - start);
		const html = toHtml({ type: 'root', children: content }).trim();
		if (!html) return;

		file.data.astro ??= {};
		file.data.astro.frontmatter ??= {};
		file.data.astro.frontmatter.references = { title: textOf(heading).trim(), html };
	};
}
