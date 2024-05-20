<!-- $lib/world/CoordinateLines.svelte -->

<script>
  import { onMount, onDestroy } from 'svelte';
  import { initThreeScene, cleanupThreeScene, THREE } from '$lib/scene';

  let container;
  let threeScene;

  onMount(() => {
    console.log('Mounting CoordinateLines component');

    if (typeof window !== 'undefined') {
      threeScene = initThreeScene(container);

      const material = new THREE.LineBasicMaterial({ color: 0x888888 });

      const points = [];
      points.push(new THREE.Vector3(-1000, 0, 0));
      points.push(new THREE.Vector3(1000, 0, 0));

      points.push(new THREE.Vector3(0, -1000, 0));
      points.push(new THREE.Vector3(0, 1000, 0));

      points.push(new THREE.Vector3(0, 0, -1000));
      points.push(new THREE.Vector3(0, 0, 1000));

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.LineSegments(geometry, material);
      threeScene.scene.add(line);

      function animate() {
        requestAnimationFrame(animate);
        threeScene.controls.update(); // Update controls
        threeScene.renderer.render(threeScene.scene, threeScene.camera);
      }

      animate();
    }
  });

  onDestroy(() => {
    console.log('Destroying CoordinateLines component');
    cleanupThreeScene();
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
