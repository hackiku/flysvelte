// $lib/stores.js
import { writable } from 'svelte/store';

export const cameraX = writable(100);
export const cameraY = writable(20);
export const cameraZ = writable(10);
