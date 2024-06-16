<script>
  import { onMount } from 'svelte';
  import * as THREE from 'three';

  onMount(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('three-container').appendChild(renderer.domElement);

    // Create the red ball at the origin
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // Create axes lines
    const createAxis = (color, start, end) => {
      const material = new THREE.LineBasicMaterial({ color });
      const points = [];
      points.push(new THREE.Vector3(...start));
      points.push(new THREE.Vector3(...end));

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, material);
      return line;
    };

    const xAxis = createAxis(0xff0000, [-5, 0, 0], [5, 0, 0]);
    const yAxis = createAxis(0x00ff00, [0, -5, 0], [0, 5, 0]);
    const zAxis = createAxis(0x0000ff, [0, 0, -5], [0, 0, 5]);

    scene.add(xAxis);
    scene.add(yAxis);
    scene.add(zAxis);

    camera.position.z = 10;

    const animate = function () {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return () => {
      document.getElementById('three-container').removeChild(renderer.domElement);
    };
  });
</script>

<style>
  canvas {
    display: block;
  }
</style>

<div id="three-container" class="w-screen h-screen flex justify-center items-center">
  <!-- Three.js canvas will be appended here -->
</div>
