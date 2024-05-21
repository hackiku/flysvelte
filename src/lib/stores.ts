import { writable } from 'svelte/store';
import type { Vector3 } from './types';

// Generic vector store factory function
const createVectorStore = (initialValue: Vector3) => {
  const { subscribe, set, update } = writable<Vector3>(initialValue);

  return {
    subscribe,
    set,
    update,
    // Utility methods for vector operations
    add: (v: Vector3) => update(current => ({
      x: current.x + v.x,
      y: current.y + v.y,
      z: current.z + v.z,
    })),
    subtract: (v: Vector3) => update(current => ({
      x: current.x - v.x,
      y: current.y - v.y,
      z: current.z - v.z,
    })),
    // Reset to initial value
    reset: () => set(initialValue),
  };
};

// Aircraft Stores
export const aircraftPosition = createVectorStore({ x: 0, y: 5, z: 0 });
export const aircraftVelocity = createVectorStore({ x: 1, y: 0, z: 0 });
export const aircraftDirection = createVectorStore({ x: 1, y: 0, z: 0 });

// Camera Store
export const defaultCameraPosition: Vector3 = { x: 6, y: 20, z: 30 }; 
export const cameraPosition = createVectorStore(defaultCameraPosition);

// Physics Enabled Store
export const physicsEnabled = writable<boolean>(false);
