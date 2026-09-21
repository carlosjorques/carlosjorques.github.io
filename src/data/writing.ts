/**
 * During local development every article is rendered as if it were published,
 * so the site can be reviewed with the full writing collection in place.
 * Production builds keep honouring the `draft` flag for the staged rollout.
 */
export const SHOW_DRAFT_WRITING = import.meta.env.DEV;

export const isVisibleWriting = ({ draft }: { draft: boolean }) => SHOW_DRAFT_WRITING || !draft;
