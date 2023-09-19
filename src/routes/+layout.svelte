<script lang="ts">
	import '@fontsource/chelsea-market';
	import '../app.css';
	import Header from './Header.svelte';
	import { onNavigate } from '$app/navigation';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<title>Sonnets for Simpletons</title>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta
		name="description"
		content="Sonnets for Simpletons is a party game web app by Jared Boult"
	/>
</svelte:head>

<Header />
<slot />
