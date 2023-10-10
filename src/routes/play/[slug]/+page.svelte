<script lang="ts">
    import { roomCode } from "$lib/stores/roomCode";
    import { playerGuid, parsePlayerGuid } from "$lib/stores/playerGuid";

    export let data;
    let { gameHub, slug } = data;

    let question;

    async function getQuestion(): Promise<void> {
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
        const startGameResponse = await gameHub.invoke('StartGame', $roomCode, parsePlayerGuid($playerGuid));
        console.log(startGameResponse);
        if (startGameResponse.success) {
            await getQuestion();
        }
    }

    gameHub.on('UpdateQuestion', (updateQuestionMessage) => {
        console.log('TODO: update question', updateQuestionMessage);
    })

    startGame();
</script>

{JSON.stringify(question, null, 2)}