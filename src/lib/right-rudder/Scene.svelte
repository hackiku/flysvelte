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
  import Model from './models/WING.svelte';
  import Virus from './models/virus.svelte';
  import Ribs from './models/Ribs.svelte';

  // svelte stores
  import { physicsEnabled } from './stores';
  import { derived } from 'svelte/store';
  import { spring } from 'svelte/motion';

  let airplaneMesh: Mesh;
  let positionHasBeenSet = false;
  const smoothPlayerPosX = spring(0);
  const smoothPlayerPosZ = spring(0);
  const t3 = new Vector3();

  // Load the virus model
  const gltf = useGltf('models/virus-transformed.glb', { useDraco: true })

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

  let resetCounter = 0;
  export const reset = () => {
    resetCounter += 1;
  };

  let debugEnabled = false;
  export const toggleDebug = () => {
    debugEnabled = !debugEnabled;
  };

  useTask(() => {
    if (!airplaneMesh) return;
    airplaneMesh.getWorldPosition(t3);
    smoothPlayerPosX.set(t3.x, {
      hard: !positionHasBeenSet
    });
    smoothPlayerPosZ.set(t3.z, {
      hard: !positionHasBeenSet
    });
    if (!positionHasBeenSet) positionHasBeenSet = true;
  });
  const { size } = useThrelte();
  $: zoom = $size.width / 8;
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

<!-- ----------- RESET ---------------- -->
{#key resetCounter}
  <Particle position={[2, 5, 0]} rotation={[0, 0, 0]} />
  <Airplane bind:airplaneMesh position={[0, 4, 0]} />
  <Player bind:airplaneMesh position={[4, 4, 0]} />

  <!-- Model with Cuboid Collider -->
  <T.Group position={[1.5, 0, 2.5]} rotation={[2.4, 0, 0]}>
    <RigidBody>
      <AutoColliders shape="cuboid">
        <Model position={[0, 0, 0]} rotation={[0.2, 1.2, 0]} scale={1.1} />
      </AutoColliders>
    </RigidBody>
  </T.Group>
{/key}

<!-- Grid -->
<Grid
	position.y={0.01}
	cellColor="#ffffff"
	sectionColor="#FE3D00"
	sectionThickness={1.5}
	fadeDistance={105}
	cellSize={2}
	gridSize={50}
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

<!-- Display the airplane model or fallback to the Model component -->
{#if $airplane}
  <T.Group position={[-2.5, 2, 2.5]} rotation={[1.500, 0, 0]}>
    <RigidBody>
      <AutoColliders shape="convexHull">
        <T.Mesh
          castShadow
          geometry={$airplane.geometry}
          material={$airplane.material}
        />
      </AutoColliders>
    </RigidBody>
  </T.Group>
{:else}
  <T.Group position={[-2.5, 2, 2.5]} rotation={[0, 0, 0]} scale={[1, 1, 1]}>
    <RigidBody>
      <AutoColliders shape="cuboid">
        <T.Mesh>
          <T.BoxGeometry args={[1, 1, 1]} />
          <T.MeshStandardMaterial
            color="orange"
            metalness={0.7}
            roughness={0.2}
            emissive="#cf6600"
            emissiveIntensity={0.5}
            opacity={0.8}
            transparent={true}
          />
        </T.Mesh>
      </AutoColliders>
    </RigidBody>
  </T.Group>
{/if}


<Virus
	position={[0, 6.0, 0]}
	rotation={[0, 2.0, 0]}
/>

<Ribs
	position={[3, 4.0, 7]}
	rotation={[0, 2.5, 0]}
	scale={[0.5, 0.5, 0.5]}
/>

<!-- <T.Mesh geometry={$gltf.nodes.virus.geometry}>
	<T.MeshPhysicalMaterial color="hotpink" />
</T.Mesh> -->
	



<Ground />
