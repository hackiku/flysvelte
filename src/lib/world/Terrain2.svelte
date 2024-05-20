<!-- $lib/world/Terrain.svelte -->
<script>
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
  import Terrain from 'three.terrain.js';

  let scene, camera, renderer;

  onMount(() => {
    // Ensure THREE is available globally
    window.THREE = THREE;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const terrain = Terrain({
      easing: Terrain.Linear,
      frequency: 2.5,
      heightmap: Terrain.DiamondSquare,
      material: new THREE.MeshBasicMaterial({ color: 0x5566aa }),
      maxHeight: 100,
      minHeight: -100,
      steps: 1,
      xSegments: 63,
      xSize: 1024,
      ySegments: 63,
      ySize: 1024,
    });

    scene.add(terrain);
    camera.position.z = 100;

    const controls = new OrbitControls(camera, renderer.domElement);

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    animate();
  });
</script>

<h1 class="bg-red-300">aasdasd</h1>

<style>
  body {
    margin: 0;
    overflow: hidden;
  }
</style>
