<script>
  import { onMount, onDestroy } from 'svelte';
  import { initThreeScene, cleanupThreeScene, THREE } from '$lib/scene';

  export let color = 0xff0000;
  export let text = '';
  export let origin = { x: 0, y: 0, z: 0 };
  export let direction = { x: 1, y: 0, z: 0 };
  export let length = 1;
  export let headLength = 0.2;
  export let headWidth = 0.2;

  let container;
  let threeScene;

  function createTextTexture(text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = '48px Arial';
    context.fillStyle = 'rgba(255, 255, 255, 1)';
    context.fillText(text, 0, 48);
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  onMount(() => {
    console.log('Mounting VectorArrow component');

    if (typeof window !== 'undefined') {
      threeScene = initThreeScene(container);

      const dir = new THREE.Vector3(direction.x, direction.y, direction.z).normalize();
      const orig = new THREE.Vector3(origin.x, origin.y, origin.z);
      const arrowHelper = new THREE.ArrowHelper(dir, orig, length, color, headLength, headWidth);
      threeScene.scene.add(arrowHelper);

      if (text) {
        const spriteMaterial = new THREE.SpriteMaterial({ 
          map: createTextTexture(text), 
          transparent: true 
        });
        const textSprite = new THREE.Sprite(spriteMaterial);
        textSprite.position.copy(orig.clone().add(dir.multiplyScalar(length + headLength)));
        threeScene.scene.add(textSprite);
      }

      function animate() {
        requestAnimationFrame(animate);
        threeScene.controls.update(); // Update controls
        threeScene.renderer.render(threeScene.scene, threeScene.camera);
      }

      animate();
    }
  });

  onDestroy(() => {
    console.log('Destroying VectorArrow component');
    cleanupThreeScene();
  });
</script>

<div bind:this={container} class="w-screen h-screen"></div>
