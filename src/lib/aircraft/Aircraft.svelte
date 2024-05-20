<!-- $lib/aircraft/Aircraft.svelte -->

<script>
  import { onMount, onDestroy } from 'svelte';
  import { initThreeScene, THREE } from '$lib/scene';
  import { setupFlightDynamics, position, velocity, direction } from '$lib/flight';

  export let initialPosition = { x: 0, y: 5, z: 0 };
  export let initialVelocity = { x: 1, y: 0, z: 0 };
  export let initialDirection = { x: 1, y: 0, z: 0 };

  let container;
  let threeScene;

  onMount(() => {
    if (typeof window !== 'undefined') {
      threeScene = initThreeScene(container);
      setupFlightDynamics(initialPosition, initialVelocity, initialDirection);

      const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
      const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
      const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
      threeScene.scene.add(sphereMesh);

      function animate() {
        requestAnimationFrame(animate);

        // Sync Three.js mesh with Cannon.js body
        $: sphereMesh.position.set($position.x, $position.y, $position.z);

        threeScene.renderer.render(threeScene.scene, threeScene.camera);
      }

      animate();
    }
  });

  onDestroy(() => {
    // Proper cleanup if needed
  });
</script>

<div bind:this={container} class="w-screen h-screen"></div>
