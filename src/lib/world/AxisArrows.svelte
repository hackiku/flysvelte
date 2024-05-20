<!-- $lib/world/AxisArrows.svelte -->

<script>
  import { onMount, onDestroy } from 'svelte';
  import { initThreeScene, cleanupThreeScene, THREE } from '$lib/scene';

  export let screenPosition = { x: 50, y: 50 };

  let container;
  let threeScene;
  let arrowX, arrowY, arrowZ;

  const createArrow = (color) => {
    const material = new THREE.MeshBasicMaterial({ color });
    const geometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 12);
    const arrow = new THREE.Mesh(geometry, material);
    return arrow;
  };

  onMount(() => {
    console.log('Mounting AxisArrows component');

    if (typeof window !== 'undefined') {
      threeScene = initThreeScene(container);

      arrowX = createArrow(0xff0000);
      arrowY = createArrow(0x00ff00);
      arrowZ = createArrow(0x0000ff);

      arrowX.rotation.z = -Math.PI / 2;
      arrowZ.rotation.x = Math.PI / 2;

      threeScene.scene.add(arrowX);
      threeScene.scene.add(arrowY);
      threeScene.scene.add(arrowZ);

      function animate() {
        requestAnimationFrame(animate);

        arrowX.quaternion.copy(threeScene.camera.quaternion);
        arrowY.quaternion.copy(threeScene.camera.quaternion);
        arrowZ.quaternion.copy(threeScene.camera.quaternion);

        threeScene.controls.update();
        threeScene.renderer.render(threeScene.scene, threeScene.camera);
      }

      animate();
    }
  });

  onDestroy(() => {
    console.log('Destroying AxisArrows component');
    cleanupThreeScene();
  });
</script>

<div class="fixed left-2 bottom-2" bind:this={container}></div>
