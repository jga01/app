<script lang="ts">
    import { onDestroy } from "svelte";
    import { nationState } from "../lib/stores.js";
    import Countdown from "./countdown.svelte";

    const townEndpoint = "https://api.earthmc.net/v1/aurora/towns";
    const residentsEndpoint = "https://api.earthmc.net/v1/aurora/residents";

    let nationData: any;
    let mayorsData: any;
    let ascendSort: true;

    const unsubscribe = nationState.subscribe(({ state, isFetched }) => {
        if (isFetched) {
            nationData = state;
        }
    });

    const fetchTownData = async (town: string) => {
        const response = await fetch(`${townEndpoint}/${town}`);
        const data = await response.json();
        return data;
    };

    const fetchMayorData = async (mayor: string) => {
        const response = await fetch(`${residentsEndpoint}/${mayor}`);
        const data = await response.json();
        return data;
    };

    const fetchMayorsData = async () => {
        const nationTowns = nationData.towns;
        const townDataPromises = nationTowns.map((town: string) =>
            fetchTownData(town)
        );

        const townsData = await Promise.all(townDataPromises);

        const mayorNames = townsData.map((data) => data.strings.mayor);

        const mayorDataPromises = mayorNames.map((mayor: string) =>
            fetchMayorData(mayor)
        );

        const mayorsData = await Promise.all(mayorDataPromises);

        return mayorsData;
    };

    mayorsData = fetchMayorsData();

    onDestroy(unsubscribe);
</script>

<div class="overflow-x-auto overflow-y-scroll h-[49rem]">
    <table class="table table-pin-rows table-pin-cols">
        <!-- head -->
        <thead>
            <tr>
                <th>Town</th>
                <th>Mayor</th>
                <th>
                    Countdown to deletion
                    <label class="swap">
                        <input type="checkbox" bind:checked={ascendSort} />
                        <svg
                            class="swap-on fill-current w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            ><path d="M18 15l-6-6-6 6" /></svg
                        >
                        <svg
                            class="swap-off fill-current w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg
                        >
                    </label>
                </th>
            </tr>
        </thead>
        <tbody>
            {#await mayorsData then mayors}
                {#each mayors as mayor}
                    <!-- row 1 -->
                    <tr>
                        <th>{mayor.affiliation.town}</th>
                        <td>{mayor.strings.username}</td>
                        <td>
                            <Countdown
                                lastOnline={mayor.timestamps.lastOnline}
                            />
                        </td>
                    </tr>
                {/each}
            {/await}
        </tbody>
    </table>
</div>
