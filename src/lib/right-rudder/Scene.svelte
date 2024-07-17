<!-- src/lib/right-rudder/Scene.svelte -->

<script lang="ts">
  import { T, useFrame } from '@threlte/core';
  import { Grid, OrbitControls } from '@threlte/extras';
  
	
	import Model from './models/WING.svelte';
  import { physicsEnabled } from './stores';
  import * as CANNON from 'cannon-es';
  import { onMount } from 'svelte';
	
	// from tutorial
	import { PlaneGeometry, MeshStandardMaterial } from 'three'
  


	let world: CANNON.World;
  let boxBody: CANNON.Body;
  let boxMesh: THREE.Mesh;
  let groundBody: CANNON.Body;

  onMount(() => {
    // Initialize Cannon.js physics world
    world = new CANNON.World();
    world.gravity.set(0, -9.82, 0);

    // Create a box body and add it to the world
    const boxShape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
    boxBody = new CANNON.Body({ mass: 1 });
    boxBody.addShape(boxShape);
    boxBody.position.set(0, 5, 0);
    world.addBody(boxBody);

    // Create a ground plane
    const groundShape = new CANNON.Plane();
    groundBody = new CANNON.Body({ mass: 0 });
    groundBody.addShape(groundShape);
    groundBody.position.set(0, 0, 0);
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    world.addBody(groundBody);

    // Create a Three.js mesh to represent the box
    boxMesh = new T.Mesh(
      new T.BoxGeometry(2, 2, 2),
      new T.MeshStandardMaterial({ color: 0xff0000 })
    );
  });

  useFrame(() => {
    if ($physicsEnabled) {
      // Step the physics world
      world.step(1 / 60);

      // Synchronize the Three.js mesh with the Cannon.js body
      boxMesh.position.copy(boxBody.position);
      boxMesh.quaternion.copy(boxBody.quaternion);
    }
  });
</script>

<!-- Camera setup for 3rd person view -->
<T.PerspectiveCamera
  makeDefault
  position={[0, 5, 10]}
  fov={60}
>
  <OrbitControls
    enableZoom={true}
    enableDamping
    dampingFactor={0.1}
    rotateSpeed={0.5}
    minDistance={5}
    maxDistance={50}
  />
</T.PerspectiveCamera>

<!-- Lighting setup -->
<T.DirectionalLight intensity={0.8} position={[10, 10, 10]} />
<T.AmbientLight intensity={0.3} />

<!-- Ground grid -->
<Grid position.y={-0.01} cellColor="#ffffff" sectionColor="#ffffff" sectionThickness={1} fadeDistance={105} cellSize={2} />

<!-- Add the box mesh to the scene -->
<T.Mesh ref={boxMesh} />

<!-- Import and use the WING model -->
<Model position={[0, 1.2, 0]} scale={1} />
