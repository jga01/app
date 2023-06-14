<script lang="ts">
    import { onMount } from "svelte";
    import { nationState } from "../lib/stores.js";

    export let nationName: any;
    let nationInfo: any;
    let isLoading: boolean = false;

    onMount(async () => {
        const unsubscribe = nationState.subscribe(({ state, isFetched }) => {
            if (isFetched) {
                nationInfo = state;
            }
        });

        unsubscribe();
    });

    export function getNation() {
        isLoading = true;

        fetch(`https://api.earthmc.net/v1/aurora/nations/${nationName}`)
            .then((response) => response.json())
            .then((data) => {
                nationInfo = data;
                isLoading = false;
                nationState.set({ state: nationInfo, isFetched: true });
            });
    }
</script>

<div class="grid place-items-center">
    {#if isLoading}
        <span class="loading loading-spinner loading-lg" />
    {:else if nationInfo}
        <div class="flex flex-col w-full">
            <div
                class="grid h-40 card bg-base-300 rounded-box place-items-center"
            >
                <div class="stats shadow">
                    <div class="stat">
                        <div class="stat-figure text-accent">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                class="inline-block w-8 h-8 stroke-current"
                                ><path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                /></svg
                            >
                        </div>
                        <div class="stat-title">King</div>
                        <div class="stat-value">
                            {nationInfo.strings.king}
                        </div>
                    </div>

                    <div class="stat">
                        <div class="stat-figure text-accent">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                class="inline-block w-8 h-8 stroke-current"
                                ><path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                /></svg
                            >
                        </div>
                        <div class="stat-title">Capital</div>
                        <div class="stat-value">
                            {nationInfo.strings.capital}
                        </div>
                    </div>
                </div>
            </div>
            <div class="divider" />
            <div
                class="grid h-40 card bg-base-300 rounded-box place-items-center"
            >
                <div class="stats shadow">
                    <div class="stat">
                        <div class="stat-figure text-accent">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                class="inline-block w-8 h-8 stroke-current"
                                ><path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                /></svg
                            >
                        </div>
                        <div class="stat-title">Towns</div>
                        <div class="stat-value">
                            {nationInfo.stats.numTowns}
                        </div>
                        <div class="stat-desc">Jan 1st - Feb 1st</div>
                    </div>

                    <div class="stat">
                        <div class="stat-figure text-accent">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                class="inline-block w-8 h-8 stroke-current"
                                ><path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                /></svg
                            >
                        </div>
                        <div class="stat-title">Town Blocks</div>
                        <div class="stat-value">
                            {nationInfo.stats.numTownBlocks}
                        </div>
                        <div class="stat-desc">Jan 1st - Feb 1st</div>
                    </div>

                    <div class="stat">
                        <div class="stat-figure text-accent">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                class="inline-block w-8 h-8 stroke-current"
                                ><path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                                /></svg
                            >
                        </div>
                        <div class="stat-title">Residents</div>
                        <div class="stat-value">
                            {nationInfo.stats.numResidents}
                        </div>
                        <div class="stat-desc">↗︎ 400 (22%)</div>
                    </div>

                    <div class="stat">
                        <div class="stat-figure text-accent">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                class="inline-block w-8 h-8 stroke-current"
                                ><path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                                /></svg
                            >
                        </div>
                        <div class="stat-title">Balance</div>
                        <div class="stat-value">
                            {nationInfo.stats.balance}
                        </div>
                        <div class="stat-desc">↘︎ 90 (14%)</div>
                    </div>
                </div>
            </div>
            <div class="divider" />
            <div
                class="grid h-80 card bg-base-300 rounded-box place-items-center"
            >
                <div class="overflow-x-auto">
                    <ul>
                        {#each nationInfo.ranks.Chancellor as chancellor, i}
                            <li>
                                <p>{chancellor}</p>
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>
        </div>
    {/if}
</div>
