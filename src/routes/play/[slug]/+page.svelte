<script lang="ts">
	import { roomCode } from '$lib/stores/roomCode';
	import { playerGuid, parsePlayerGuid } from '$lib/stores/playerGuid';
	import QuestionCard from '../QuestionCard.svelte';
	import type Question from '../QuestionCard.svelte';
	import { teamName } from '$lib/stores/team';

	export let data;
	let { gameHub, slug } = data;

	let question: Question;

	async function getNewQuestion(): Promise<void> {
		const getQuestionResponse = await gameHub.invoke('GetQuestion', $roomCode);
		console.log(getQuestionResponse);
		if (getQuestionResponse.success) {
			question = getQuestionResponse.answers;
		}
	}

	async function startGame(): Promise<void> {
		if (!$roomCode) {
			roomCode.set(slug);
		}
		const startGameResponse = await gameHub.invoke(
			'StartGame',
			$roomCode,
			parsePlayerGuid($playerGuid)
		);
		console.log(startGameResponse);
		if (startGameResponse.success) {
			await getNewQuestion();
		}
	}

	gameHub.on('UpdateQuestion', (updateQuestionMessage) => {
		console.log(updateQuestionMessage);
		if (updateQuestionMessage.success) {
			question = updateQuestionMessage.answers;
		}
	});

	gameHub.on('NotifyTeam', (notifyTeamMessage) => {
		console.log(notifyTeamMessage);
		if (notifyTeamMessage.success) {
			teamName.set(notifyTeamMessage.teamName);
		}
	});

	startGame();
</script>

{#if question}
	<QuestionCard {question} on:click={getNewQuestion} />
{/if}
