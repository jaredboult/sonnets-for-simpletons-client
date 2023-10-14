<script lang="ts">
	import { goto } from '$app/navigation';
	import { roomCode } from '$lib/stores/roomCode';
	import { playerGuid } from '$lib/stores/playerGuid';

	if (!$roomCode) {
		goto('/');
	}

	export let data;
	let lobbyHub = data.lobbyHub;
	let name = '';

	lobbyHub.on('SavePlayerId', (savePlayerIdMessage) => {
		console.log(savePlayerIdMessage);
		if (savePlayerIdMessage.success) {
			playerGuid.set(savePlayerIdMessage.id);
		}
	});

	async function assignName(): Promise<void> {
		const assignNameResponse = await lobbyHub.invoke(
			'UpdatePlayerName',
			name,
			$roomCode,
			$playerGuid
		);
		console.log(assignNameResponse);
		if (assignNameResponse.success && $roomCode !== '') {
			await goto('/lobby/' + $roomCode);
		}
	}
</script>

<main class="container mx-auto max-w-lg py-4">
	<form class="form-control">
		<label for="Name" class="label">
			<span class="label-text">Name</span>
		</label>
		<input
			id="player-name"
			name="player-name"
			class="input input-lg input-bordered w-full text-center"
			autocomplete="off"
			required
			bind:value={name}
		/>
		<button class="btn btn-primary btn-large btn-block mt-4" on:click={assignName}>
			Choose name
		</button>
	</form>
</main>
