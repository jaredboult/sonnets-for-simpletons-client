<script>
	import ShareIcon from "$lib/assets/share_icon.svelte";
	import { roomCode } from "../store";
</script>

<div class="navbar justify-between bg-base-100 pb-16">
	<div class="navbar-start w-0">
		<div class="dropdown">
			<button class="btn btn-ghost btn-circle">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
			</button>
			<ul class="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
				<li><a href="/">Home</a></li>
				<li><button>Settings</button></li>
				<li><button>About</button></li>
			</ul>
		</div>
	</div>

	<h1 class="text-4xl font-display break-normal text-center">Sonnets for Simpletons</h1>

	<div class="navbar-end w-0">
		{#if $roomCode === ""}
			<button class="btn md:btn-md btn-ghost btn-circle mx-2">
				<ShareIcon></ShareIcon>
			</button>
		{:else}
			<div class="flex flex-col justify-center items-center">
				<button class="btn btn-ghost btn-sm md:btn-md text-sm md:text-lg mx-2">
					<ShareIcon></ShareIcon>
				</button>
				<p class="font-bold text-center">{$roomCode}</p>
			</div>
		{/if}
	</div>
</div>

<style>
	button :global(svg){
		margin-left: -2px;
	}

	.btn-circle :global(svg){
		@media (max-width: 767px){
			height: 24px;
			width: 24px;
		}
	}
</style>
