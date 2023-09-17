<script lang="ts">
    import { roomCode } from "../../../store";

    export let data;
    let connection = data.connection;
    let playerNames : string[] = [];

    function getRoomDetails(roomId : string){
        connection.invoke("GetRoomDetails", roomId);
    }

    getRoomDetails($roomCode);

    connection.on("ReceiveRoomDetails", (getRoomDetailsResponse) => {
        console.log(getRoomDetailsResponse);
        if (getRoomDetailsResponse.success){
            playerNames = getRoomDetailsResponse.playerNames;
        }
    })
</script>

<main class="container mx-auto max-w-lg py-4">
    <h1 class="font-black text-xl">{$roomCode}</h1>

    <ol>
        {#each playerNames as name}
            <li>{name}</li>
        {/each}
    </ol>
</main>

<style>
    h1 {
        text-align: center;
    }
</style>
