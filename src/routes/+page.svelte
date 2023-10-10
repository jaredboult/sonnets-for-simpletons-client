<script lang="ts">
	import { goto } from '$app/navigation';
	import { roomCode } from '$lib/stores/roomCode';
	import { playerGuid } from "$lib/stores/playerGuid";

	export let data;
	let lobbyHub = data.lobbyHub;
	let roomId = '';
	roomCode.set('');

	async function createRoom(): Promise<void> {
		const createRoomResponse = await lobbyHub.invoke('CreateRoom');
		console.log(createRoomResponse);
		if (createRoomResponse.success) {
			roomCode.set(createRoomResponse.roomId);
			await goto('/name');
		}
	}

	async function joinRoom(): Promise<void> {
		const joinRoomResponse = await lobbyHub.invoke('JoinRoom', roomId.toUpperCase());
		if (joinRoomResponse.success) {
			roomCode.set(joinRoomResponse.roomId);
			await goto('/name');
		}
	}

	lobbyHub.on('SavePlayerId', (savePlayerIdMessage) => {
		console.log(savePlayerIdMessage);
		if (savePlayerIdMessage.success){
			const value = {
				id: savePlayerIdMessage.id,
				timestamp: Date.now()
			}
			playerGuid.set(JSON.stringify(value));
		}
	});
</script>

<main class="container py-4">
	<div class="flex justify-center pb-4" id="new-game">
		<button class="btn btn-primary btn-large btn-wide" on:click={createRoom}>New game</button>
	</div>

	<div class="divider">OR</div>

	<div class="flex justify-center" id="join-game">
		<form class="form-control">
			<label for="room-code" class="label">
				<span class="label-text">Room code</span>
			</label>
			<input
				id="room-code"
				name="room-code"
				class="input input-lg input-bordered w-full text-center"
				autocomplete="off"
				required
				bind:value={roomId}
			/>
			<button class="btn btn-primary btn-large btn-block mt-4" on:click={joinRoom}>
				Join Game
			</button>
		</form>
	</div>
</main>
