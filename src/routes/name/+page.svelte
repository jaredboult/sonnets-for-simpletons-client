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

<main class="container">
    <form>
        <label for="Name">Name</label>
        <input
                id="player-name"
                name="player-name"
                autocomplete="off"
                required
                bind:value={name}>
        <button on:click={assignName}>Submit</button>
    </form>
</main>


