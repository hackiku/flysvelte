<script>
  import { onMount } from 'svelte';
  import { initThreeScene, THREE } from '$lib/scene';
  import 'three.terrain.js/build/THREE.Terrain.js';
  // import 'three.terrain.js';

  let container;
  let threeScene;

  onMount(() => {
    threeScene = initThreeScene(container);

    // Ensure THREE.Terrain is available
    if (typeof THREE.Terrain === 'undefined') {
      console.error('THREE.Terrain is not defined');
      return;
    }

    // Generate the terrain
    const terrain = THREE.Terrain({
      easing: THREE.Terrain.Linear,
      frequency: 2.5,
      heightmap: THREE.Terrain.DiamondSquare,
      material: new THREE.MeshBasicMaterial({ color: 0x5566aa }),
      maxHeight: 100,
      minHeight: -100,
      steps: 1,
      xSegments: 63,
      xSize: 1024,
      ySegments: 63,
      ySize: 1024,
    });

    threeScene.scene.add(terrain);

    // Add a light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5);
    threeScene.scene.add(light);
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
