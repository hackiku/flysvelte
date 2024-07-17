// $lib/right-rudder/stores.ts

import { writable } from 'svelte/store';

// Physics Enabled Store
export const physicsEnabled = writable<boolean>(false);
