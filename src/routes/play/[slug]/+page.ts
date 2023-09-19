import type { PageLoad } from '../../../../.svelte-kit/types/src/routes/play/[slug]/$types';

export const load: PageLoad = ({ params }) => {
	return {
		slug: params.slug
	};
};
