export const TAG_GROUPS = {
	'Control': ['control', 'modeling', 'control architecture', 'control algorithms', 'model-based development', 'closed-loop control', 'model predictive control', 'control allocation', 'thermal management', 'battery thermal management', 'control software'],
	'Electrification': ['electric trucks', 'heavy-duty vehicles', 'battery sizing', 'total cost of ownership', 'energy efficiency', 'fleet economics', 'vehicle design', 'sensitivity analysis'],
	'Embedded Software': ['embedded software', 'embedded control', 'real-time', 'real-time implementation', 'AUTOSAR', 'software architecture'],
	'Diagnostics': ['diagnostics', 'validation', 'fault detection', 'virtual sensing', 'sensing', 'signal processing'],
	'Software & AI': ['software-defined systems', 'software-defined vehicles', 'vehicle computing', 'AI', 'automotive software'],
	'Leadership': ['technical leadership', 'engineering organization', 'delivery', 'requirements', 'architecture'],
	'Research': ['research', 'PhD', 'patents', 'publications', 'thesis'],
} as const;

export const tagGroupFor = (tag: string) => {
	const normalized = tag.trim().toLowerCase();
	return Object.entries(TAG_GROUPS).find(([, tags]) => tags.some((candidate) => normalized === candidate.toLowerCase()))?.[0] ?? 'Research';
};
