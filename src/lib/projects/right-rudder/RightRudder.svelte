<script>
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

  let scene, camera, renderer, controls;
  let airplaneMesh;

  const init = () => {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const loader = new STLLoader();
    loader.load('/spitfire.stl', (geometry) => {
      const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
      airplaneMesh = new THREE.Mesh(geometry, material);
      airplaneMesh.scale.set(0.1, 0.1, 0.1);
      airplaneMesh.rotation.x = -Math.PI / 2;
      scene.add(airplaneMesh);
    });

    const terrain = createTerrain();
    scene.add(terrain);

    window.addEventListener('resize', onWindowResize, false);

    animate();
  };

  const createTerrain = () => {
    const geometry = new THREE.PlaneGeometry(200, 200);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI / 2;
    return plane;
  };

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  const animate = () => {
    requestAnimationFrame(animate);
    if (airplaneMesh) {
      airplaneMesh.position.x += 0.05; // Simulate level flight
    }
    controls.update();
    renderer.render(scene, camera);
  };

  onMount(() => {
    init();
  });
</script>

<style>
  canvas {
    display: block;
  }
</style>

<canvas />
