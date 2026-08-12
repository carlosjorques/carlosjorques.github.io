export const TAG_GROUPS = {
	'Control & Modeling': ['control', 'modeling', 'control architecture', 'control algorithms', 'model-based development', 'closed-loop control'],
	'Embedded Software': ['embedded software', 'embedded control', 'real-time', 'real-time implementation', 'AUTOSAR', 'software architecture'],
	'Diagnostics & Validation': ['diagnostics', 'validation', 'fault detection', 'virtual sensing', 'sensing', 'signal processing'],
	'Software-Defined Systems': ['software-defined systems', 'vehicle computing', 'AI', 'automotive software'],
	'Engineering Organization': ['technical leadership', 'engineering organization', 'delivery', 'requirements', 'architecture'],
	'Research': ['research', 'PhD', 'patents', 'publications', 'thesis'],
} as const;

export const tagGroupFor = (tag: string) => {
	const normalized = tag.trim().toLowerCase();
	return Object.entries(TAG_GROUPS).find(([, tags]) => tags.some((candidate) => normalized === candidate.toLowerCase()))?.[0] ?? 'Research';
};
