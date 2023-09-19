import type { HubConnection } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import type { LayoutLoad } from '../../.svelte-kit/types/src/routes/$types';

export const ssr = false;

async function setUpSignalR(): Promise<HubConnection> {
	const connection = new signalR.HubConnectionBuilder()
		.withUrl('https://localhost:7155/connect')
		.withAutomaticReconnect()
		.configureLogging(signalR.LogLevel.Information)
		.build();

	async function start() {
		try {
			return await connection.start();
		} catch (err) {
			console.log(err);
			return;
		}
	}
	await start();
	return connection;
}

export const load: LayoutLoad = async () => {
	return {
		connection: await setUpSignalR()
	};
};
