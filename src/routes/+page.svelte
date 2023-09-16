<script lang="ts">
    import { goto } from "$app/navigation";
    import { roomCode } from "../store";

    export let data;
    let connection = data.connection;
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

<main class="container mx-auto max-w-lg py-4">
    <div class="flex justify-center pb-4" id="new-game">
        <button class="btn btn-primary btn-large btn-wide" on:click={createRoom}>New game</button>
    </div>

    <div class="divider">OR</div>

    <div class="flex justify-center" id="join-game">
        <form class="form-control">
            <label
                    for="room-code"
                    class="label">
                <span class="label-text">Room code</span>
            </label>
            <input
                    id="room-code"
                    name="room-code"
                    class="input input-lg input-bordered w-full text-center"
                    autocomplete="off"
                    required
                    bind:value={roomId}>
            <button
                    class="btn btn-primary btn-large btn-block mt-4"
                    on:click={joinRoom}>
                Join Game
            </button>
        </form>
    </div>
</main>



