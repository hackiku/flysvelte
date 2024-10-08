<!-- src/lib/right-rudder/Scene.svelte -->

<script lang="ts">
  import { T, useFrame } from '@threlte/core';
  import { Grid, OrbitControls, TransformControls } from '@threlte/extras';
  import { AutoColliders, Debug, RigidBody } from '@threlte/rapier';
  import { Mesh, Vector3 } from 'three';

  // phys components
  import Ground from './phys/Ground.svelte';
  import Particle from './phys/Particle.svelte';
  // import Player from './phys/Player.svelte';
  import Airplane from './phys/Airplane.svelte';
  import Virus from './models/virus.svelte';
  import Ribs from './models/Ribs.svelte';

  // svelte stores
  import { writable } from 'svelte/store';
  import { thrust, followCamera, aircraftState } from './stores';
  import { get } from 'svelte/store';

  let airplaneMesh: Mesh;
  let camera;

  let resetCounter = 0;
  export const reset = () => {
    resetCounter += 1;
  };

  let debugEnabled = false;
  export const toggleDebug = () => {
    debugEnabled = !debugEnabled;
  };

  let boxRigidBody;

  useFrame(() => {
    if (boxRigidBody) {
      thrust.subscribe(value => {
        // Apply thrust in the horizontal direction (X-axis)
        const horizontalForce = new Vector3(value, 0, 0);
        boxRigidBody.applyImpulse(horizontalForce, true);
      });

      const position = boxRigidBody.translation();

      aircraftState.update(state => ({
        ...state,
        position: { x: position.x, y: position.y, z: position.z }
      }));

      if (camera && get(followCamera)) {
        camera.position.set(position.x + 10, position.y + 10, position.z + 10);
        camera.lookAt(position.x, position.y, position.z);
      }
    }
  });
</script>

<!-- Camera setup for 3rd person view -->
<T.PerspectiveCamera
  makeDefault
  bind:this={camera}
  position={[18, 15, 10]}
  fov={50}
  on:create={({ ref }) => {
    ref.lookAt(20, 1, 100);
  }}
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

<!-- ===================================================== -->
<!-- ======================= RESET ======================= -->
 
{#key resetCounter}
  <Particle position={[2, 5, 0]} rotation={[0, 0, 0]} />
  <Airplane bind:airplaneMesh position={[-4, 5, 7]} />
  <!-- <Player bind:airplaneMesh position={[4, 4, 0]} /> -->

  <Virus
    position={[0.0, 1.0, 0.0]}
    rotation={[0.0, 0.0, 0.0]}
	/>
    <!-- position={[3, 1.0, 6]}
    rotation={[0.2, -1.6, 0.3]} -->

  <Ribs
    position={[4, 1.0, -12]}
    rotation={[0, 2.5, 0]}
    scale={[0.5, 0.5, 0.5]}
  />

  <!-- Box -->
  <T.Group position={[4, 14, 0]} rotation={[0.5, 0.5, 0]} scale={[1, 1, 1]}>
    <!-- <RigidBody ref={node => boxRigidBody = node}> -->
    <RigidBody>
      <AutoColliders shape="cuboid">
        <T.Mesh>
          <T.BoxGeometry args={[1, 1, 1]} />
          <T.MeshStandardMaterial
            color="yellow"
            metalness={0.7}
            roughness={0.2}
            emissive="#0000ff"
            emissiveIntensity={0.9}
            opacity={0.8}
            transparent={true}
          />
        </T.Mesh>
      </AutoColliders>
    </RigidBody>
  </T.Group>
{/key}

<!-- Grid -->
<Grid
infiniteGrid
  position.y={0.01}
  cellColor="#ffffff"
  sectionColor="#FE3D00"
  cellThickness={0.6}
  sectionThickness={1.2}
  fadeDistance={60}
  cellSize={2}
  gridSize={100}
/>

<!-- Transform Controls -->
<TransformControls 
	translationSnap={1}
	position={[5, 0, 5]}
	
/>

<!-- OLD BOX -->
<T.Group position={[6, 3, -3]} rotation={[0.5, 0.5, 0]} scale={[1, 1, 1]}>
  <RigidBody>
    <AutoColliders shape="cuboid">
      <T.Mesh>
        <T.BoxGeometry args={[3, 1, 1]} />
        <T.MeshStandardMaterial
          color="#00fc00"
          metalness={0.7}
          roughness={0.2}
          emissive="#0000ff"
          emissiveIntensity={0.5}
          opacity={0.8}
          transparent={true}
        />
      </T.Mesh>
    </AutoColliders>
  </RigidBody>
</T.Group>

{#if debugEnabled}
  <Debug depthTest={true} depthWrite={true} />
{/if}

<Ground />
