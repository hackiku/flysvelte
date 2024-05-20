<!-- $lib/aircraft/Aircraft.svelte -->

<script>
  import { onMount } from 'svelte';
  import { initThreeScene, THREE } from '$lib/scene';
  import { setupPhysicsWorld, CANNON } from '$lib/physics';

  let container;
  let threeScene;
  let physicsWorld;

  onMount(() => {
    threeScene = initThreeScene(container);
    physicsWorld = setupPhysicsWorld();

    // Create a ground plane
    const groundShape = new CANNON.Plane();
    const groundBody = new CANNON.Body({ mass: 0 });
    groundBody.addShape(groundShape);
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    physicsWorld.addBody(groundBody);

    const groundGeometry = new THREE.PlaneGeometry(1000, 1000);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x007700, wireframe: true });
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMesh.rotation.x = -Math.PI / 2;
    threeScene.scene.add(groundMesh);

    // Create a dynamic box
    const boxShape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
    const boxBody = new CANNON.Body({ mass: 1 });
    boxBody.addShape(boxShape);
    boxBody.position.set(0, 5, 0);
    physicsWorld.addBody(boxBody);

    const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
    const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    threeScene.scene.add(boxMesh);

    // Synchronize Three.js and Cannon.js
    function animate() {
      requestAnimationFrame(animate);

      // Update physics world
      physicsWorld.step(1 / 60);

      // Sync Three.js mesh with Cannon.js body
      boxMesh.position.copy(boxBody.position);
      boxMesh.quaternion.copy(boxBody.quaternion);

      threeScene.renderer.render(threeScene.scene, threeScene.camera);
    }

    animate();
  });
</script>

<style>
  :global(body) {
    margin: 0;
    overflow: hidden;
  }
  :global(canvas) {
    display: block;
  }
</style>

<div bind:this={container} class="w-screen h-screen"></div>
