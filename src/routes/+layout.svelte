<script lang="ts">
    import '@fontsource/chelsea-market';
    import Header from "./Header.svelte";
    import '@picocss/pico';
    import type { LayoutData } from "../../.svelte-kit/types/src/routes/$types";

    export let data : LayoutData;
</script>

<svelte:head>
    <title>Sonnets for Simpletons</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Sonnets for Simpletons is a party game web app by Jared Boult">
</svelte:head>

<Header/>
<slot/>
