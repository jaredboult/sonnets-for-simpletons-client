<script lang="ts">
	import { roomCode } from '$lib/stores/roomCode';
	import { playerGuid } from '$lib/stores/playerGuid';
	import QuestionCard from '../QuestionCard.svelte';
	import type Question from '../QuestionCard.svelte';
	import { teamName } from '$lib/stores/team';
	import { logResponse } from '$lib/connectToHub';
	import Timer from '../Timer.svelte';

	export let data;
	let { gameHub, slug } = data;

	let question: Question;

	async function getNewQuestion(): Promise<void> {
		const getQuestionResponse = await gameHub.invoke('GetQuestion', $roomCode);
		logResponse(getQuestionResponse);
		if (getQuestionResponse.success) {
			question = getQuestionResponse.answers;
		}
	}

	async function startGame(): Promise<void> {
		if (!$roomCode) {
			roomCode.set(slug);
		}
		const startGameResponse = await gameHub.invoke('StartGame', $roomCode, $playerGuid);
		logResponse(startGameResponse);
		if (startGameResponse.success) {
			await getNewQuestion();
		}
	}

	gameHub.on('UpdateQuestion', (updateQuestionMessage) => {
		logResponse(updateQuestionMessage);
		if (updateQuestionMessage.success) {
			question = updateQuestionMessage.answers;
		}
	});

	gameHub.on('NotifyTeam', (notifyTeamMessage) => {
		logResponse(notifyTeamMessage);
		if (notifyTeamMessage.success) {
			teamName.set(notifyTeamMessage.teamName);
		}
	});

	startGame();
</script>

<div class="flex justify-center">
	<Timer />
</div>

{#if question}
	<QuestionCard {question} on:click={getNewQuestion} />
{/if}
