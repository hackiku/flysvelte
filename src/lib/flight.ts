// $lib/flight.ts

import { writable } from 'svelte/store';
import * as CANNON from 'cannon-es';

export const position = writable({ x: 0, y: 5, z: 0 });
export const velocity = writable({ x: 1, y: 0, z: 0 });
export const direction = writable({ x: 1, y: 0, z: 0 });

let physicsWorld: CANNON.World;
let aircraftBody: CANNON.Body;

export const setupFlightDynamics = (initialPosition: { x: number, y: number, z: number }, initialVelocity: { x: number, y: number, z: number }, initialDirection: { x: number, y: number, z: number }) => {
  physicsWorld = new CANNON.World();
  physicsWorld.gravity.set(0, -9.82, 0);

  const sphereShape = new CANNON.Sphere(1);
  aircraftBody = new CANNON.Body({ mass: 1 });
  aircraftBody.addShape(sphereShape);
  aircraftBody.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
  aircraftBody.velocity.set(initialVelocity.x, initialVelocity.y, initialVelocity.z);
  physicsWorld.addBody(aircraftBody);

  direction.set(initialDirection);

  function animate() {
    requestAnimationFrame(animate);
    physicsWorld.step(1 / 60);

    position.set({
      x: aircraftBody.position.x,
      y: aircraftBody.position.y,
      z: aircraftBody.position.z
    });

    velocity.set({
      x: aircraftBody.velocity.x,
      y: aircraftBody.velocity.y,
      z: aircraftBody.velocity.z
    });
  }

  animate();
};
