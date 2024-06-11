// src/lib/stores.ts
import { writable } from 'svelte/store';

export const aircraftStore = writable({
	name: 'P-51 Mustang',
	manufacturer: 'North American Aviation',
	mass: 5489,
	wingspan: 11.286,
	// Additional properties...
});

export const dynamicsStore = writable({
	// State related to dynamics calculations
});
