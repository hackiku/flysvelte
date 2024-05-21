<!-- $lib/aircraft/Aircraft.svelte -->

<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { initThreeScene, cleanupThreeScene, THREE } from '$lib/scene';
  import { aircraftPosition, aircraftVelocity, aircraftDirection, setupFlightDynamics, cleanupFlightDynamics } from '$lib/flight';

  let initialPosition = { x: 0, y: 5, z: 0 };
  let initialVelocity = { x: 1, y: 0, z: 0 };
  let initialDirection = { x: 1, y: 0, z: 0 };

  let container;
  let threeScene;
  let cleanupDynamics;

  onMount(() => {
    console.log('Mounting Aircraft component');
    
    if (typeof window !== 'undefined') {
      threeScene = initThreeScene(container);
      cleanupDynamics = setupFlightDynamics(initialPosition, initialVelocity, initialDirection);

      const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
      const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
      const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
      threeScene.scene.add(sphereMesh);

      function animate() {
        requestAnimationFrame(animate);
        $: sphereMesh.position.set($aircraftPosition.x, $aircraftPosition.y, $aircraftPosition.z);
        threeScene.controls.update(); // Update controls
        threeScene.renderer.render(threeScene.scene, threeScene.camera);
      }

      animate();
    }
  });

  onDestroy(() => {
    console.log('Destroying Aircraft component');
    cleanupThreeScene();
    if (cleanupDynamics) cleanupDynamics();
  });
</script>

<div bind:this={container} class="w-screen h-screen"></div>
