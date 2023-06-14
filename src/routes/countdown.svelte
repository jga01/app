<script lang="ts">
    import { onMount, onDestroy } from "svelte";

    export let lastOnline: any;

    let countdown: any;

    let seconds: number;
    let minutes: number;
    let hours: number;
    let days: number;

    function updateCountdown() {
        const lastTime = lastOnline / 1000;
        const time = 86400 * 42;
        const timeDifference = lastTime + time - Date.now() / 1000;

        if (timeDifference > 0) {
            seconds = timeDifference % 60;
            minutes = Math.floor((timeDifference / 60) % 60);
            hours = Math.floor((timeDifference / (60 * 60)) % 24);
            days = Math.floor(timeDifference / (60 * 60 * 24));
        }
    }

    onMount(() => {
        countdown = setInterval(updateCountdown, 1000);
    });

    onDestroy(() => {
        clearInterval(countdown);
    });
</script>

<div class="flex gap-5">
    <div>
        <span class="countdown font-mono text-4xl">
            <span style="--value:{days};" />
        </span>
        days
    </div>
    <div>
        <span class="countdown font-mono text-4xl">
            <span style="--value:{hours};" />
        </span>
        hours
    </div>
    <div>
        <span class="countdown font-mono text-4xl">
            <span style="--value:{minutes};" />
        </span>
        min
    </div>
    <div>
        <span class="countdown font-mono text-4xl">
            <span style="--value:{seconds};" />
        </span>
        sec
    </div>
</div>
