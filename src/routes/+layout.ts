import type { LayoutLoad } from '../../.svelte-kit/types/src/routes/$types';
import { connectToHub } from '$lib/connectToHub';

export const ssr = false;

export const load: LayoutLoad = async () => {
	return {
		lobbyHub: await connectToHub('lobby')
	};
};
