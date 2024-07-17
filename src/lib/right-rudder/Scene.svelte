<!-- src/lib/right-rudder/Scene.svelte -->

<script lang="ts">
  import { T } from '@threlte/core';
  import { Grid, OrbitControls, useGltf } from '@threlte/extras';
  import { AutoColliders, Debug, RigidBody } from '@threlte/rapier';
  import RAPIER from '@dimforge/rapier3d-compat';
  import { PlaneGeometry, MeshStandardMaterial } from 'three';

  // phys components
  import Ground from './phys/Ground.svelte';
  import Particle from './phys/Particle.svelte';
  import Player from './phys/Player.svelte';
  import Airplane from './phys/Airplane.svelte';
  import Model from './models/WING.svelte';

  // svelte stores
  import { physicsEnabled } from './stores';
  import { derived } from 'svelte/store';

  let airplaneMesh;

  // Load the virus model
  const gltf = useGltf('models/virus.gltf');

  $: console.log('GLTF Loaded:', gltf);

  // Check if the GLTF model is loaded and extract nodes and materials
  const nodes = gltf?.nodes || {};
  const materials = gltf?.materials || {};

  // Log nodes to understand the structure
  $: console.log('GLTF Nodes:', nodes);

  // Derive the airplane mesh from the loaded GLTF
  const airplane = derived(gltf, (gltf) => {
    const nodeName = Object.keys(nodes).find((key) => key.toLowerCase().includes('virus'));
    if (!gltf || !nodeName) return null;
    return nodes[nodeName];
  });

  let nsubdivs = 100;
  let heights = [];

  const geometry = new PlaneGeometry(10, 10, nsubdivs, nsubdivs);

  let resetCounter = 0;
  export const reset = () => {
    resetCounter += 1;
  };

  let debugEnabled = false;
  export const toggleDebug = () => {
    debugEnabled = !debugEnabled;
  };
</script>

<!-- Camera setup for 3rd person view -->
<T.PerspectiveCamera
  makeDefault
  position={[0, 10, 12]}
  fov={50}
  on:create={({ ref }) => {
    ref.lookAt(10, 1, 100);
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

{#key resetCounter}
  <Particle position={[2, 5, 0]} rotation={[0, 0, 0]} />
  <Airplane bind:airplaneMesh position={[0, 4, 0]} />
{/key}

<!-- Grid -->
<Grid position.y={0.01} cellColor="#ffffff" sectionColor="#ffffff" sectionThickness={1} fadeDistance={105} cellSize={2} />

<!-- Box -->
<T.Mesh position={[1, 3, 0]} rotation={[0.5, 0.5, 0]} scale={[1, 1, 1]}>
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

<Model position={[3, 3, 7]} rotation={[-0.5, 0.5, 0]} scale={[1, 1, 1]} />

{#if debugEnabled}
  <Debug depthTest={true} depthWrite={true} />
{/if}

<T.Group position={[-2.5, 2, -2.5]} rotation={[0, 0, 0]}>
	<RigidBody>
		<AutoColliders shape="convexHull">
			<Model position={[0, 0, 0]} rotation={[0, 0, 0]} scale={2} />
		</AutoColliders>
	</RigidBody>
</T.Group>

<Ground />
