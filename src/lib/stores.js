import { writable } from 'svelte/store';

export const nationState = writable({
    state: null,
    isFetched: false
});