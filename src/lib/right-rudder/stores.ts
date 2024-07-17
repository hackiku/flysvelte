// $lib/right-rudder/stores.ts

import { writable } from 'svelte/store';

// Physics
export const physicsEnabled = writable<boolean>(false);
export const thrust = writable<float>(0.277);

export const followCamera = writable(false);
