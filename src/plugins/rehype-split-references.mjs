import { toHtml } from 'hast-util-to-html';

/**
 * Takes the back matter out of the article body, so the article page can place it after the
 * contact CTA:
 * - "References" (or "Sources and further reading") reaches the page as
 *   `remarkPluginFrontmatter.references`;
 * - a section whose title starts with "Appendix" reaches it as `remarkPluginFrontmatter.appendix`.
 * Each section is the matching top-level h2 and everything after it up to the next h2, and is
 * passed on as `{ title, html }`.
 */
const SECTIONS = [
	{ key: 'references', title: /^(references|sources and further reading)$/i },
	{ key: 'appendix', title: /^appendix\b/i },
];

const textOf = (node) =>
	node.type === 'text' ? node.value : (node.children ?? []).map(textOf).join('');

const isH2 = (node) => node.type === 'element' && node.tagName === 'h2';

export default function rehypeSplitReferences() {
	return (tree, file) => {
		const children = tree.children;
		for (const { key, title } of SECTIONS) {
			const start = children.findIndex((node) => isH2(node) && title.test(textOf(node).trim()));
			if (start < 0) continue;

			let end = children.length;
			for (let index = start + 1; index < children.length; index += 1) {
				if (isH2(children[index])) {
					end = index;
					break;
				}
			}

			const [heading, ...content] = children.splice(start, end - start);
			const html = toHtml({ type: 'root', children: content }).trim();
			if (!html) continue;

			file.data.astro ??= {};
			file.data.astro.frontmatter ??= {};
			file.data.astro.frontmatter[key] = { title: textOf(heading).trim(), html };
		}
	};
}
