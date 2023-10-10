import type { PageLoad } from '../../../../.svelte-kit/types/src/routes/lobby/[slug]/$types';

export const load: PageLoad = ({ params }) => {
	return {
		slug: params.slug
	};
};
