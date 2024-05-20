import { writable } from 'svelte/store';

const loadingStore = writable(false);

export default loadingStore;