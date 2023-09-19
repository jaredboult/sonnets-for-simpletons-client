import type { HubConnection } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import type { LayoutLoad } from '../../.svelte-kit/types/src/routes/$types';

export const ssr = false;

function setUpSignalR(): HubConnection {
	const connection = new signalR.HubConnectionBuilder()
		.withUrl('https://localhost:7155/connect')
		.withAutomaticReconnect()
		.configureLogging(signalR.LogLevel.Information)
		.build();

	async function start() {
		try {
			await connection.start();
			console.log('SignalR Connected.');
		} catch (err) {
			console.log(err);
		}
	}
	start();
	return connection;
}

export const load: LayoutLoad = async () => {
	return {
		connection: setUpSignalR()
	};
};
