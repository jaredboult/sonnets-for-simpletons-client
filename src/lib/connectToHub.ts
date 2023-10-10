import type { HubConnection } from "@microsoft/signalr";
import * as signalR from "@microsoft/signalr";

export async function connectToHub(subdirectory: string): Promise<HubConnection> {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl(`https://localhost:7155/${subdirectory}`)
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();

    async function start() {
        try {
            console.log(`Connecting to hub: ${subdirectory}`);
            return await connection.start();
        } catch (err) {
            console.log(err);
            return;
        }
    }
    await start();
    return connection;
}