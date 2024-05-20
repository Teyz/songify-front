import { persisted } from 'svelte-persisted-store'

export const isLoading = persisted('isLoading', false)