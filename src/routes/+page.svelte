<script lang="ts">
    import type { HubConnection } from "@microsoft/signalr";
    import * as signalR from "@microsoft/signalr";

    let messages : string[] = [];
    let roomId = "";
    function setUpSignalR () : HubConnection {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7155/connect")
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Information)
            .build();

        connection.on("ReceiveMessage", (message: string) => {
            messages = [...messages, message]
        });

        connection.on("CreateRoom", (createRoomResponse: string) => {
            const newMessage = JSON.stringify(createRoomResponse);
            messages = [...messages, newMessage];
        })

        connection.on("JoinRoom", (joinRoomResponse) => {
            const newMessage = JSON.stringify(joinRoomResponse);
            messages = [...messages, newMessage];
        });

        async function start() {
            try {
                await connection.start();
                console.log("SignalR Connected.")
            } catch (err) {
                console.log(err);
            }
        }

        start();

        return connection;
    }

    const connection = setUpSignalR();

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



