<script lang="ts">
	let runTimer = true;
	let totalTime = 5;
	$: minutes = Math.floor(totalTime / 60);
	$: seconds = Math.floor(totalTime - minutes * 60);

	setInterval(() => {
		if (runTimer && totalTime >= 0) {
			totalTime--;
		}
	}, 1000);
</script>

{#if totalTime >= 0}
	<span class="countdown font-mono text-2xl p-4">
		<span style="--value:{minutes};" />:
		<span style="--value:{seconds};" />
	</span>
{:else}
	<h1 class="text-xl p-4">Time's up!</h1>
{/if}
