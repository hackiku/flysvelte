// $lib/right-rudder/stores.ts

import { writable } from 'svelte/store';

// Physics
export const physicsEnabled = writable<boolean>(false);
export const thrust = writable<float>(55.247);
