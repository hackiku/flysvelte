<!-- $lib/aircraft/Aircraft.svelte -->

<script>
  import { onMount } from 'svelte';
  import { initThreeScene, THREE } from '$lib/scene';
  import { setupPhysicsWorld, CANNON } from '$lib/physics';

  let container;
  let threeScene;
  let physicsWorld;
  let aircraftBody;

  onMount(() => {
    if (typeof window !== 'undefined') {
      threeScene = initThreeScene(container);
      physicsWorld = setupPhysicsWorld();

      // Create a simple sphere to represent the aircraft
      const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
      const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
      const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
      threeScene.scene.add(sphereMesh);

      // Log for debugging
      console.log("Sphere Mesh Added:", sphereMesh);

      // Create a corresponding physics body
      const sphereShape = new CANNON.Sphere(1);
      aircraftBody = new CANNON.Body({ mass: 1 });
      aircraftBody.addShape(sphereShape);
      aircraftBody.position.set(0, 40, 0);
      physicsWorld.addBody(aircraftBody);

      // Log for debugging
      console.log("Aircraft Body Added:", aircraftBody);

      // Set initial velocity
      aircraftBody.velocity.set(1, 0, 0); // Move along the x-axis

      // Synchronize Three.js and Cannon.js
      function animate() {
        requestAnimationFrame(animate);

        // Update physics world
        physicsWorld.step(1 / 60);

        // Sync Three.js mesh with Cannon.js body
        sphereMesh.position.copy(aircraftBody.position);
        sphereMesh.quaternion.copy(aircraftBody.quaternion);

        threeScene.renderer.render(threeScene.scene, threeScene.camera);
      }

      animate();
    }
  });
</script>


<div bind:this={container} class="w-screen h-screen"></div>
