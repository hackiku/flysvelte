<!-- $lib/world/Terrain.svelte -->

<script>
  import { onMount, onDestroy } from 'svelte';
  import { initThreeScene, cleanupThreeScene, THREE } from '$lib/scene';

  let container;
  let threeScene;

  onMount(() => {
    console.log('Mounting Terrain component');
    
    threeScene = initThreeScene(container);

    const geometry = new THREE.PlaneGeometry(1000, 1000, 100, 100);
    const material = new THREE.MeshStandardMaterial({ color: 0x007700, wireframe: true });
    const terrain = new THREE.Mesh(geometry, material);
    terrain.rotation.x = -Math.PI / 2;
    threeScene.scene.add(terrain);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7.5);
    threeScene.scene.add(light);

    animate();
  });

  const animate = () => {
    requestAnimationFrame(animate);
    threeScene.controls.update(); // Update controls
    threeScene.renderer.render(threeScene.scene, threeScene.camera);
  };

  onDestroy(() => {
    console.log('Destroying Terrain component');
    cleanupThreeScene();
  });
</script>

<div bind:this={container} class="w-screen h-screen"></div>
