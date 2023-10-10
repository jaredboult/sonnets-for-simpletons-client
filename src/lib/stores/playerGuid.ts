import { writable } from "svelte/store";
import { browser } from "$app/environment";

const key = "playerGuid";
const defaultValue = "";
const initialValue = browser ? window.localStorage.getItem(key) ?? defaultValue : defaultValue;

export const playerGuid = writable<string>(initialValue);

export function parsePlayerGuid(stringifiedJson: string): string {
    const parsedObject = JSON.parse(stringifiedJson);
    return parsedObject.id;
}

playerGuid.subscribe((value) => {
    if (browser){
        window.localStorage.setItem(key, value);
    }
});
