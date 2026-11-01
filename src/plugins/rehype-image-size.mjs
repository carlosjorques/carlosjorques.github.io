/**
 * Adds width and height to local article images (files under public/) that do not set them, so
 * the browser reserves their space and the text does not jump while they load. It covers images
 * written in Markdown, <img> tags written as inline HTML, and <video> tags (sized from their
 * poster). CSS still scales them to the column width with `height: auto`. Every image also gets
 * `decoding="async"`.
 */
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = fileURLToPath(new URL('../../public/', import.meta.url));
const cache = new Map();

const sizeOf = (src) => {
	if (!cache.has(src)) {
		const file = path.join(publicDir, decodeURIComponent(src.split(/[?#]/)[0]).replace(/^\/+/, ''));
		cache.set(src, sharp(file).metadata().then(({ width, height }) => (width && height ? { width, height } : undefined), () => undefined));
	}
	return cache.get(src);
};

const images = (node, found = []) => {
	if (node.type === 'element' && node.tagName === 'img') found.push(node);
	node.children?.forEach((child) => images(child, found));
	return found;
};

const rawNodes = (node, found = []) => {
	if (node.type === 'raw' && /<(img|video)\b/i.test(node.value)) found.push(node);
	node.children?.forEach((child) => rawNodes(child, found));
	return found;
};

// Inline HTML in Markdown reaches rehype as raw text, so its <img> tags are completed as text.
// A <video> takes the size of its poster image.
const sizeRawImages = async (node) => {
	const tags = [...node.value.matchAll(/<(img|video)\b[^>]*>/gi)].map((match) => match[0]);
	const replacements = await Promise.all(tags.map(async (tag) => {
		const [, name] = tag.match(/^<(\w+)/);
		const isImg = name.toLowerCase() === 'img';
		let result = tag;
		if (isImg && !/\sdecoding=/i.test(result)) result = result.replace(/^<img\b/i, '<img decoding="async"');
		const src = tag.match(isImg ? /\ssrc="([^"]+)"/i : /\sposter="([^"]+)"/i)?.[1] ?? '';
		if (!src.startsWith('/') || src.startsWith('//') || /\s(width|height)=/i.test(tag)) return result;
		const size = await sizeOf(src);
		return size ? result.replace(new RegExp(`^<${name}\\b`), `<${name} width="${size.width}" height="${size.height}"`) : result;
	}));
	tags.forEach((tag, index) => { node.value = node.value.replace(tag, replacements[index]); });
};

export default function rehypeImageSize() {
	return async (tree) => {
		await Promise.all(rawNodes(tree).map(sizeRawImages));
		await Promise.all(images(tree).map(async (img) => {
			const props = img.properties ?? (img.properties = {});
			props.decoding ??= 'async';
			const src = typeof props.src === 'string' ? props.src : '';
			if (!src.startsWith('/') || src.startsWith('//') || (props.width && props.height)) return;
			const size = await sizeOf(src);
			if (!size) return;
			props.width = size.width;
			props.height = size.height;
		}));
	};
}
