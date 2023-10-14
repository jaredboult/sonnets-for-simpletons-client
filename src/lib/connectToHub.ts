import type { HubConnection } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import { dev } from '$app/environment';

export async function connectToHub(path: string): Promise<HubConnection> {
	const connection = new signalR.HubConnectionBuilder()
		.withUrl(`https://localhost:7155/${path}`)
		.withAutomaticReconnect()
		.configureLogging(dev ? signalR.LogLevel.Warning : signalR.LogLevel.None)
		.build();

	async function start() {
		try {
			logResponse(`Connecting to hub: ${path}`);
			return await connection.start();
		} catch (err) {
			console.log(err);
			return;
		}
	}
	await start();
	return connection;
}

export function logResponse(response: any) {
	if (dev) console.log(response);
}
