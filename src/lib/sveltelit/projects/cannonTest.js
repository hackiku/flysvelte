// cannonTest.js
import * as CANNON from 'cannon-es'; // Importing cannon-es which is a maintained version of cannon.js

export function initCannonWorld() {
	// Create a world
	const world = new CANNON.World();
	world.gravity.set(0, -9.82, 0); // Earth gravity in m/s²

	// Create a ground plane
	const groundBody = new CANNON.Body({
		mass: 0, // mass == 0 makes the body static
	});
	const groundShape = new CANNON.Plane();
	groundBody.addShape(groundShape);
	world.addBody(groundBody);

	// Create a box
	const boxShape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
	const boxBody = new CANNON.Body({
		mass: 1,
	});
	boxBody.addShape(boxShape);
	boxBody.position.set(0, 5, 0); // position box above ground
	world.addBody(boxBody);

	// Time step
	const timeStep = 1 / 60; // seconds

	// Create a loop to step the world
	function animate() {
		world.step(timeStep);

		// Log box position for demonstration
		console.log(`Box position: ${boxBody.position.y}`);

		requestAnimationFrame(animate);
	}

	animate();
}
