<script lang="ts">
	import { roomCode } from '../../../store';
	import { goto } from '$app/navigation';

	export let data;
	let { connection, slug } = data;
	let playerNames: string[] = [];

	function getRoomDetails(): void {
		if (!$roomCode) {
			roomCode.set(slug);
		}
		console.log();
		connection.invoke('GetRoomDetails', $roomCode);
	}

	connection.on('ReceiveRoomDetails', (getRoomDetailsResponse) => {
		console.log(getRoomDetailsResponse);
		if (getRoomDetailsResponse.success) {
			playerNames = getRoomDetailsResponse.playerNames;
		} else {
			roomCode.set('');
			goto('/');
		}
	});

	getRoomDetails();
</script>

<main class="container mx-auto max-w-lg py-4">
	<h1 class="font-black text-xl">{$roomCode}</h1>

	<ol>
		{#each playerNames as name}
			<li>{name}</li>
		{/each}
	</ol>
</main>

<style>
	h1 {
		text-align: center;
	}
</style>
