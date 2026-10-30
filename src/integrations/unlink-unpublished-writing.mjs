import { existsSync } from 'node:fs';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * After the build, removes links to /writing/ pages that were not built (draft articles), so that
 * project and other pages never send a visitor to a 404. The link text stays. A parenthesis that
 * only holds such links, for example "([Fault detection](...) · [virtual sensing](...))", is
 * removed as a whole. Once an article is published its page exists, and the link stays.
 */
const LINK = /<a\b[^>]*?\bhref="(\/writing\/[^"#?]*)[^"]*"[^>]*>([\s\S]*?)<\/a>/g;
const OPEN = '\u0002';
const CLOSE = '\u0003';
const CITATION_ONLY = new RegExp(`\\s*\\((?:\\s|·|&middot;|,|and|${OPEN}[^${CLOSE}]*${CLOSE})*\\)`, 'g');
const MARKED = new RegExp(`${OPEN}([^${CLOSE}]*)${CLOSE}`, 'g');

async function htmlFiles(dir) {
	const entries = await readdir(dir, { withFileTypes: true });
	const files = await Promise.all(
		entries.map((entry) => {
			const path = join(dir, entry.name);
			if (entry.isDirectory()) return htmlFiles(path);
			return entry.name.endsWith('.html') ? [path] : [];
		}),
	);
	return files.flat();
}

export default function unlinkUnpublishedWriting() {
	return {
		name: 'unlink-unpublished-writing',
		hooks: {
			'astro:build:done': async ({ dir, logger }) => {
				const root = fileURLToPath(dir);
				const isBuilt = (href) => existsSync(join(root, href, 'index.html')) || existsSync(join(root, `${href.replace(/\/$/, '')}.html`));
				let count = 0;

				for (const file of await htmlFiles(root)) {
					const html = await readFile(file, 'utf8');
					let changed = false;
					let result = html.replace(LINK, (link, href, text) => {
						if (isBuilt(href)) return link;
						changed = true;
						count += 1;
						return `${OPEN}${text}${CLOSE}`;
					});
					if (!changed) continue;
					result = result.replace(CITATION_ONLY, (group) => (group.includes(OPEN) ? '' : group)).replace(MARKED, '$1');
					await writeFile(file, result);
				}

				if (count) logger.info(`Removed ${count} link(s) to unpublished writing.`);
			},
		},
	};
}
