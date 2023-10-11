<script lang="ts">
    export let question: Question;

</script>

<script lang="ts" context="module">
    export type Question = {
        [key: string]: string
    }
</script>

<div class="flex justify-center items-center">
    <div class="card w-96 bg-base-200 shadow-xl">
        <div class="card-body">
            {#each Object.entries(question) as [points, text]}
                <h2 class="card-title">
                    <div class="badge badge-secondary">{points}</div>
                    {text}
                </h2>
            {/each}
            <div class="card-actions justify-end">
                <button on:click class="btn btn-primary">Next</button>
            </div>
        </div>
    </div>
</div>
