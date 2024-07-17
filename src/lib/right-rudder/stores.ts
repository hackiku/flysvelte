// $lib/right-rudder/stores.ts

import { writable } from 'svelte/store';

// Physics
export const physicsEnabled = writable<boolean>(false);
export const thrust = writable<number>(0.000);

export const aircraftState = writable({
	position: { x: 0, y: 0, z: 0 },
	linearVelocity: { x: 0, y: 0, z: 0 },
	angularVelocity: { x: 0.0, y: 0.0, z: 0.0 }
});

export const followCamera = writable(false);
