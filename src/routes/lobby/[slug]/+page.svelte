<script lang="ts">
	import { roomCode } from '$lib/stores/roomCode';
	import { goto } from '$app/navigation';
	import { playerGuid } from '$lib/stores/playerGuid';

	export let data;
	let { lobbyHub, slug } = data;
	let playerNames: string[] = [];

	async function getRoomDetails(): Promise<void> {
		if (!$roomCode) {
			roomCode.set(slug);
		}
		const getRoomDetailsResponse = await lobbyHub.invoke('GetRoomDetails', $roomCode);
		console.log(getRoomDetailsResponse);
		if (getRoomDetailsResponse.success) {
			playerNames = getRoomDetailsResponse.playerNames;
		} else {
			roomCode.set('');
			await goto('/');
		}
	}

	getRoomDetails();

	lobbyHub.on('UpdateRoomDetails', (updateRoomDetailsMessage) => {
		console.log(updateRoomDetailsMessage);
		playerNames = updateRoomDetailsMessage.playerNames;
	});

	lobbyHub.on('StartGame', async (gameHasStartedResponse) => {
		console.log(gameHasStartedResponse);
		if (gameHasStartedResponse.success) {
			await lobbyHub.stop();
			await goto('/play/' + $roomCode);
		}
	});

	async function startGame() {
		const startGameResponse = await lobbyHub.invoke('StartGameForRoom', $roomCode, $playerGuid);
		console.log(startGameResponse);
		if (startGameResponse.success) {
			await lobbyHub.stop();
			await goto('/play/' + $roomCode);
		}
	}
</script>

<main class="container py-4 flex flex-col">
	<h1 class="text-2xl font-bold">Players</h1>
	<ol class="pt-4 pb-12">
		{#each playerNames as name}
			<li class="text-lg">{name}</li>
		{/each}
	</ol>

	<div class="w-full flex justify-center">
		<button class="btn btn-primary btn-wide" on:click={startGame}> Start Game </button>
	</div>
</main>
