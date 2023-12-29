import type { PageLoad } from '../../../../.svelte-kit/types/src/routes/play/[slug]/$types';
import { connectToHub } from '$lib/connectToHub';

export const load: PageLoad = async ({ params }) => {
	return {
		slug: params.slug,
		gameHub: await connectToHub('game')
	};
};
