<script lang="ts">
    import { goto } from "$app/navigation";
    import { roomCode } from "../../store";

    export let data;
    let connection = data.connection;
    let name = "";

    connection.on("UpdatePlayerName", (message) => {
        if(message.success && $roomCode !== ""){
            goto('/play/' + $roomCode)
        }
    })

    function assignName(): void {
        connection.invoke("UpdatePlayerName", name);
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
                bind:value={name}>
        <button
                class="btn btn-primary btn-large btn-block mt-4"
                on:click={assignName}>
            Choose name
        </button>
    </form>
</main>


