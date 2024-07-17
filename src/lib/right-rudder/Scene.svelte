<!-- src/lib/right-rudder/Scene.svelte -->

<script lang="ts">
  import { T, useFrame } from '@threlte/core';
  import { Grid, OrbitControls } from '@threlte/extras';
  import { AutoColliders, Debug, RigidBody } from '@threlte/rapier';
  import { Vector3 } from 'three';

  // phys components
  import Ground from './phys/Ground.svelte';
  import Particle from './phys/Particle.svelte';
  import Player from './phys/Player.svelte';
  import Airplane from './phys/Airplane.svelte';
  import Virus from './models/virus.svelte';
  import Ribs from './models/Ribs.svelte';

  // svelte stores
  import { writable } from 'svelte/store';

  let airplaneMesh;

  let resetCounter = 0;
  export const reset = () => {
    resetCounter += 1;
  };

  let debugEnabled = false;
  export const toggleDebug = () => {
    debugEnabled = !debugEnabled;
  };

  // Thrust control store
  export const thrust = writable(0);

  let boxRigidBody;

  useFrame(() => {
    if (boxRigidBody) {
      // Get current thrust value
      let currentThrust;
      thrust.subscribe(value => currentThrust = value);

      // Apply thrust in the horizontal direction (X-axis)
      const horizontalForce = new Vector3(currentThrust, 0, 0);
      boxRigidBody.applyImpulse(horizontalForce, true);
    }
  });
</script>

<!-- Camera setup for 3rd person view -->
<T.PerspectiveCamera
  makeDefault
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
  <Airplane bind:airplaneMesh position={[0, 4, 0]} />
  <Player bind:airplaneMesh position={[4, 4, 0]} />

  <Virus
    position={[5, 8.0, 6]}
    rotation={[0.4, 2.0, 0]}
    gravityPosition={[0, 20.0, 0]}
    range={10}
    strength={1}
  />

  <Ribs
    position={[4, 1.0, -12]}
    rotation={[0, 2.5, 0]}
    scale={[0.5, 0.5, 0.5]}
  />

  <!-- Box -->
  <T.Group position={[4, 4, 0]} rotation={[0.5, 0.5, 0]} scale={[1, 1, 1]}>
    <RigidBody ref={node => boxRigidBody = node}>
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
  position.y={0.01}
  cellColor="#ffffff"
  sectionColor="#FE3D00"
  cellThickness={0.6}
  sectionThickness={1.2}
  fadeDistance={60}
  cellSize={2}
  gridSize={100}
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
