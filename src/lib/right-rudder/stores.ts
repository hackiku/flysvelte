// $lib/right-rudder/stores.ts

import { writable } from 'svelte/store';

// Physics
export const physicsEnabled = writable<boolean>(false);
export const thrust = writable<float>(1.000);

export const aircraftPosition = writable<Object>({});
export const aircraftOrientation = writable<Object>({});
export const linearVelocity = writable<Object>({});
export const angularVelocity = writable<Object>({});

export const aircraftState = writable({
	position: { x: 0, y: 0, z: 0 },
	linearVelocity: { x: 0, y: 0, z: 0 },
	angularVelocity: { x: 0.1, y: 0.2, z: 0.3 }
});

export const followCamera = writable(false);
