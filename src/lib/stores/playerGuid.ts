import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const key = 'playerGuid';
const defaultValue = '';
const initialValue = getInitialValue();

export interface PlayerGuid {
	id: string;
	timestamp: number;
}

export const playerGuid = writable<string>(initialValue);

function getInitialValue(): string {
	if (browser) {
		const json = window.localStorage.getItem(key);
		if (json) {
			const data: PlayerGuid = JSON.parse(json);
			if (isGuidValid(data)) {
				return data.id;
			}
		}
	}
	return defaultValue;
}

function isGuidValid(data: PlayerGuid): boolean {
	const recordedDate = new Date(data.timestamp);
	const oneDayAgoDate = new Date();
	oneDayAgoDate.setDate(oneDayAgoDate.getDate() - 1);
	return recordedDate < oneDayAgoDate;
}

playerGuid.subscribe((value) => {
	if (browser) {
		const object: PlayerGuid = {
			id: value,
			timestamp: Date.now()
		};
		const stringified = JSON.stringify(object);
		window.localStorage.setItem(key, stringified);
	}
});
