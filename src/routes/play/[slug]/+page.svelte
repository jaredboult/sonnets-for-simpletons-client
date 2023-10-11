<script lang="ts">
	import { roomCode } from '$lib/stores/roomCode';
	import { playerGuid, parsePlayerGuid } from '$lib/stores/playerGuid';
	import QuestionCard from '../QuestionCard.svelte';
	import type Question from '../QuestionCard.svelte';

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
		console.log('TODO: update question', updateQuestionMessage);
	});

	startGame();
</script>

{#if question}
	<QuestionCard {question} on:click={getNewQuestion} />
{/if}
