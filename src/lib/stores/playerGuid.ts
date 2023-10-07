import { writable } from "svelte/store";
import { browser } from "$app/environment";

const key = "playerGuid";
const defaultValue = "";
const initialValue = browser ? window.localStorage.getItem(key) ?? defaultValue : defaultValue;

export const playerGuid = writable<string>(initialValue);

playerGuid.subscribe((value) => {
    if (browser){
        window.localStorage.setItem(key, value);
    }
});
