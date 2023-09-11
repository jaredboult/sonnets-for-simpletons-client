<script lang="ts">
    export let data;
    let connection = data.connection;
    let name = "";
    let response : boolean;
    let fullResponse: string;

    connection.on("UpdatePlayerNameResponse", (message : any) => {
        // gross :X
        response = message.success;
        fullResponse = JSON.stringify(message, null, 2);
    })

    function assignName(): void {
        connection.invoke("UpdatePlayerName", name);
    }
</script>

{#if response === undefined}
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
{:else if response}
    <p>Success</p>
    <p>{fullResponse}</p>
{:else}
    <p>Fail</p>
    <p>{fullResponse}</p>
{/if}

