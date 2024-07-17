<!-- src/lib/right-rudder/Scene.svelte -->

<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core';
  import { Grid, OrbitControls, useGltf } from '@threlte/extras';
  import { AutoColliders, CollisionGroups, Debug, RigidBody } from '@threlte/rapier';
  import RAPIER from '@dimforge/rapier3d-compat';
  import { PlaneGeometry, BoxGeometry, Mesh, MeshStandardMaterial, Vector3 } from 'three';

  // phys components
  import Ground from './phys/Ground.svelte';
  import Particle from './phys/Particle.svelte';
  import Player from './phys/Player.svelte';
  import Airplane from './phys/Airplane.svelte';
  import Virus from './models/virus.svelte';
  import Ribs from './models/Ribs.svelte';
  import Flyer from './models/Ribs.svelte';

  // svelte stores
  import { physicsEnabled } from './stores';
  import { derived } from 'svelte/store';
  import { spring } from 'svelte/motion';

  let airplaneMesh: Mesh;

  let resetCounter = 0;
  export const reset = () => {
    resetCounter += 1;
  };

  let debugEnabled = false;
  export const toggleDebug = () => {
    debugEnabled = !debugEnabled;
  };


</script>

<!-- <Flyer /> -->

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

<!-- Box -->
<T.Group position={[1, 3, 0]} rotation={[0.5, 0.5, 0]} scale={[1, 1, 1]}>
  <RigidBody>
    <AutoColliders shape="cuboid">
      <T.Mesh>
        <T.BoxGeometry args={[1, 1, 1]} />
        <T.MeshStandardMaterial
          color="#00ff00"
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
