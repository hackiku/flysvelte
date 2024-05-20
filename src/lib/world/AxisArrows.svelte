<!-- $lib/world/AxisLines.svelte -->

<script>
  import { onMount, onDestroy } from 'svelte';
  import { THREE } from '$lib/scene';
  import { getContext } from 'svelte';
  import { threeSceneContext } from '$lib/scene';

  let container;
  let renderer, camera;
  let scene = new THREE.Scene();
  const mainScene = getContext(threeSceneContext);

  function createArrowHelper(direction, color) {
    const length = 0.5;
    const origin = new THREE.Vector3(0, 0, 0);
    const arrowHelper = new THREE.ArrowHelper(direction, origin, length, color);
    scene.add(arrowHelper);
    return arrowHelper;
  }

  onMount(() => {
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.set(0, 0, 2);

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(200, 200); // Adjust the size as needed
    renderer.setPixelRatio(window.devicePixelRatio); // Ensure sharp rendering
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.bottom = '2rem';
    renderer.domElement.style.left = '2rem';
    container.appendChild(renderer.domElement);

    createArrowHelper(new THREE.Vector3(1, 0, 0), 0xff0000);
    createArrowHelper(new THREE.Vector3(0, 1, 0), 0x00ff00);
    createArrowHelper(new THREE.Vector3(0, 0, 1), 0x0000ff);

    animate();
  });

  function animate() {
    requestAnimationFrame(animate);

    // Sync rotation with main camera
    if (mainScene && mainScene.camera) {
      camera.quaternion.copy(mainScene.camera.quaternion);
    }

    renderer.render(scene, camera);
  }

  onDestroy(() => {
    if (container && renderer) {
      container.removeChild(renderer.domElement);
    }
  });
</script>

<div class="fixed bottom-2 left-2" bind:this={container}></div>

<style>
  div {
    pointer-events: none; /* Make sure it doesn't interfere with other UI elements */
  }
</style>
