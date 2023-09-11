<script lang="ts">
    import {goto} from "$app/navigation";

    export let data;
    let connection = data.connection;
    let messages : string[] = [];
    let roomId = "";

    connection.on("ReceiveMessage", (message: string) => {
        messages = [...messages, message]
    });

    connection.on("CreateRoomResponse", (createRoomResponse: string) => {
        const newMessage = JSON.stringify(createRoomResponse);
        messages = [...messages, newMessage];
    })

    connection.on("JoinRoomResponse", (joinRoomResponse) => {
        const newMessage = JSON.stringify(joinRoomResponse);
        messages = [...messages, newMessage];
    });

    function joinRoom(): void {
        connection.invoke("JoinRoom", roomId);
        goto('/name');
    }

    function createRoom(): void {
        connection.invoke("CreateRoom");
        goto('/name');
    }
</script>

<main class="container">
    {#each messages as message}
        <p>{message}</p>
    {/each}

    <div class="home-page-action" id="new-game">
        <button on:click={createRoom}>New game</button>
    </div>

    <div class="home-page-action" id="join-game">
        <form>
            <label for="room-code">Room code</label>
            <input
                    id="room-code"
                    name="room-code"
                    autocomplete="off"
                    required
                    bind:value={roomId}>
            <button on:click={joinRoom}>Join</button>
        </form>
    </div>
</main>



