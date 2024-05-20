import * as CANNON from 'cannon-es';

export const setupPhysicsWorld = () => {
  const world = new CANNON.World();
  world.gravity.set(0, -9.82, 0); // Standard gravity

  return world;
};

export { CANNON };