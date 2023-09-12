<script lang="ts">
    import { goto } from "$app/navigation";
    import { roomCode } from "../store";

    export let data;
    let connection = data.connection;
    let messages : string[] = [];
    let roomId = "";

    connection.on("CreateRoom", (createRoomResponse) => {
       console.log(JSON.stringify(createRoomResponse));
       if (createRoomResponse.success){
           roomCode.set(createRoomResponse.roomId);
           goto('/name');
       }
    })

    connection.on("JoinRoom", (joinRoomResponse) => {
        console.log(JSON.stringify(joinRoomResponse));
        if(joinRoomResponse.success){
            roomCode.set(joinRoomResponse.roomId);
            goto('/name');
        }
    });

    function joinRoom(): void {
        connection.invoke("JoinRoom", roomId);
    }

    function createRoom(): void {
        connection.invoke("CreateRoom");
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



