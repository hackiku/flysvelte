// $lib/flight.ts

import { aircraftPosition, aircraftVelocity, aircraftDirection, physicsEnabled } from './stores';
import * as CANNON from 'cannon-es';

let physicsWorld: CANNON.World;
let aircraftBody: CANNON.Body;
let animationFrameId: number;

export const setupFlightDynamics = (
  initialPosition: { x: number, y: number, z: number },
  initialVelocity: { x: number, y: number, z: number },
  initialDirection: { x: number, y: number, z: number }
) => {
  physicsWorld = new CANNON.World();
  physicsWorld.gravity.set(0, -9.82, 0);

  const sphereShape = new CANNON.Sphere(1);
  aircraftBody = new CANNON.Body({ mass: 1 });
  aircraftBody.addShape(sphereShape);
  aircraftBody.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
  aircraftBody.velocity.set(initialVelocity.x, initialVelocity.y, initialVelocity.z);
  physicsWorld.addBody(aircraftBody);

  aircraftDirection.set(initialDirection);

  let isPhysicsEnabled = false;
  const unsubscribe = physicsEnabled.subscribe(value => {
    isPhysicsEnabled = value;
  });

  function animate() {
    if (isPhysicsEnabled) {
      physicsWorld.step(1 / 60);

      aircraftPosition.set({
        x: aircraftBody.position.x,
        y: aircraftBody.position.y,
        z: aircraftBody.position.z
      });

      aircraftVelocity.set({
        x: aircraftBody.velocity.x,
        y: aircraftBody.velocity.y,
        z: aircraftBody.velocity.z
      });

      console.log('Updated position:', aircraftBody.position);
      console.log('Updated velocity:', aircraftBody.velocity);
    }
    animationFrameId = requestAnimationFrame(animate);
  }

  animate();

  return () => {
    cancelAnimationFrame(animationFrameId);
    unsubscribe();
  };
};

export const cleanupFlightDynamics = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
};

export { aircraftPosition, aircraftVelocity, aircraftDirection, physicsEnabled };
