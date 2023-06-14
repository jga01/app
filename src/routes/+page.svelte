<script lang="ts">
    import { onMount } from "svelte";
    import { themeChange } from "theme-change";
    import Generalstats from "./generalstats.svelte";
    import Playeractivity from "./playeractivity.svelte";
    import Townsinrisk from "./townsinrisk.svelte";

    onMount(() => {
        themeChange(false);
    });

    let nationName: string = "";
    let selectedOption = "generalStats";
    let generalStats: any;

    function handleOptionClick(option: any) {
        selectedOption = option;
    }

    function onSubmit() {
        generalStats.getNation();
    }
</script>

<body>
    <div class="flex h-screen">
        <!-- Sidebar -->
        <aside>
            <div class="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                <div
                    class="drawer-content flex flex-col items-center justify-center"
                >
                    <!-- Page content here -->
                    <label
                        for="my-drawer-2"
                        class="btn btn-primary drawer-button lg:hidden"
                        >Open drawer</label
                    >
                </div>
                <div class="drawer-side">
                    <label for="my-drawer-2" class="drawer-overlay" />
                    <ul
                        class="menu p-4 w-80 h-full bg-base-200 text-base-content"
                    >
                        <!-- Sidebar content here -->
                        <li>
                            <button
                                on:click={() =>
                                    handleOptionClick("generalStats")}
                                >General Stats</button
                            >
                        </li>
                        <li>
                            <button
                                on:click={() =>
                                    handleOptionClick("playerActivity")}
                                >Player Activity</button
                            >
                        </li>
                        <li>
                            <button
                                on:click={() =>
                                    handleOptionClick("townsInRisk")}
                                >Towns in Risk</button
                            >
                        </li>
                    </ul>
                </div>
            </div>
        </aside>

        <!-- Main content -->
        <main class="flex flex-col flex-grow">
            <!-- Page header -->
            <header class="flex mb-4">
                <div class="navbar bg-base-100">
                    <div class="flex-1">
                        <a
                            href="http://localhost:5173/"
                            class="btn btn-ghost normal-case text-xl">InfoEMC</a
                        >
                    </div>
                    <div class="flex-none gap-2">
                        <div class="form-control">
                            <form on:submit|preventDefault={onSubmit}>
                                <input
                                    bind:value={nationName}
                                    type="text"
                                    placeholder="Fortaleza"
                                    class="input input-bordered w-24 md:w-auto"
                                />
                            </form>
                        </div>
                    </div>
                    <div class="divider divider-horizontal" />
                    <label class="swap swap-rotate">
                        <input
                            type="checkbox"
                            data-toggle-theme="light, dark"
                            data-act-class="ACTIVECLASS"
                        />
                        <svg
                            class="swap-on fill-current w-10 h-10"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            ><path
                                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
                            /></svg
                        >
                        <svg
                            class="swap-off fill-current w-10 h-10"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            ><path
                                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
                            /></svg
                        >
                    </label>
                </div>
            </header>

            <!-- Content area -->
            <div class="flex flex-col flex-grow rounded-lg p-4">
                {#if selectedOption == "generalStats"}
                    <Generalstats {nationName} bind:this={generalStats} />
                {:else if selectedOption == "playerActivity"}
                    <Playeractivity />
                {:else if selectedOption == "townsInRisk"}
                    <Townsinrisk />
                {/if}
            </div>

            <!-- Footer -->
            <!-- <footer
                class="footer footer-center p-4 bg-base-300 text-base-content"
            >
                <div>
                    <p>
                        Copyright © {new Date().getFullYear()} - All right reserved
                        by Jamestiago#8977
                    </p>
                </div>
            </footer> -->
        </main>
    </div>
</body>
