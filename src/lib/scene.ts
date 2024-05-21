// $lib/scene.ts
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const threeSceneContext = 'threeSceneContext';

let scene, camera, renderer, controls;

export const initThreeScene = (container, cameraX = 10, cameraY = 10, cameraZ = 10) => {
  console.log('Initializing Three.js scene');

  if (!scene) {
    scene = new THREE.Scene();
  }

  if (!camera) {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // Set the initial camera position
    camera.position.set(cameraX, cameraY, cameraZ);
    camera.lookAt(new THREE.Vector3(0, 0, 0));  // Adjust the target point as needed
  }

  if (!renderer) {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  if (!controls) {
    controls = new OrbitControls(camera, renderer.domElement);
  }

  return { scene, camera, renderer, controls };
};

export const updateCameraPosition = (cameraX, cameraY, cameraZ) => {
  if (camera) {
    camera.position.set(cameraX, cameraY, cameraZ);
    camera.lookAt(new THREE.Vector3(0, 0, 0));  // Ensure the camera looks at the target
    console.log(`Camera Position - X: ${cameraX}, Y: ${cameraY}, Z: ${cameraZ}`);
    if (controls) {
      controls.update();
    }
  }
};

export const cleanupThreeScene = () => {
  console.log('Cleaning up Three.js scene');
  
  if (renderer) {
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.context = null;
    renderer.domElement = null;
  }
  if (controls) {
    controls.dispose();
  }
  scene = null;
  camera = null;
  renderer = null;
  controls = null;
};

export { THREE };
