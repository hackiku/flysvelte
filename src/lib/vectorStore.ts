import { writable } from 'svelte/store';
import type { Vector3 } from './types';

export const createVectorStore = (initialValue: Vector3) => {
  const store = writable<Vector3>(initialValue);
  return store;
};
