// $lib/scene.ts
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let scene, camera, renderer, controls;

export const initThreeScene = (container, cameraX = 10, cameraY = 10, cameraZ = 10) => {
  console.log('Initializing Three.js scene');
  
  if (!scene || !camera || !renderer || !controls) {
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // Set the initial camera position
    camera.position.set(cameraX, cameraY, cameraZ);
    
    // Optionally set the camera to look at a specific point
    camera.lookAt(new THREE.Vector3(0, 0, 0));  // Adjust the target point as needed

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  } else {
    console.log('Reusing existing Three.js components');
  }

  return { scene, camera, renderer, controls };
};

export const cleanupThreeScene = () => {
  console.log('Cleaning up Three.js scene');
  
  if (renderer) {
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.context = null;
    renderer.domElement = null;
    scene = null;
    camera = null;
    renderer = null;
    controls = null;
  }
};

export { THREE };
