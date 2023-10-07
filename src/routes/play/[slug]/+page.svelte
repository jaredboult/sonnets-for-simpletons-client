<script lang="ts">
	import { roomCode } from '$lib/stores/roomCode';
	import { goto } from '$app/navigation';

	export let data;
	let { connection, slug } = data;
	let playerNames: string[] = [];

	async function getRoomDetails(): Promise<void> {
		if (!$roomCode) {
			roomCode.set(slug);
		}
		const getRoomDetailsResponse = await connection.invoke('GetRoomDetails', $roomCode);
		console.log(getRoomDetailsResponse);
		if (getRoomDetailsResponse.success) {
			playerNames = getRoomDetailsResponse.playerNames;
		} else {
			roomCode.set('');
			await goto('/');
		}
	}

	getRoomDetails();

	connection.on('UpdateRoomDetails', (updateRoomDetailsMessage) => {
		console.log(updateRoomDetailsMessage);
		playerNames = updateRoomDetailsMessage.playerNames;
	});
</script>



<main class="container py-4 flex flex-col">
	<h1 class="text-2xl font-bold">Players</h1>
	<ol class="pt-4 pb-12">
		{#each playerNames as name}
			<li class="text-lg">{name}</li>
		{/each}
	</ol>

	<div class="w-full flex justify-center">
		<button class="btn btn-primary btn-wide">
			Start Game
		</button>
	</div>


</main>
