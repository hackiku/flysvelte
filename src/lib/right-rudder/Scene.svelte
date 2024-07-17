<!-- src/lib/right-rudder/Scene.svelte -->

<script lang="ts">
  // import { DEG2RAD } from 'three/src/math/MathUtils.js'
	import { T } from '@threlte/core';
  import { Grid, OrbitControls } from '@threlte/extras';
	import { Collider, Debug, RigidBody } from '@threlte/rapier'
  import RAPIER from '@dimforge/rapier3d-compat'
	import { PlaneGeometry, BoxGeometry, MeshStandardMaterial } from 'three'
	
	// phys components
	import Ground from './phys/Ground.svelte';
	import Particle from './phys/Particle.svelte';
  import Model from './models/WING.svelte';
  
	// stores
	import { physicsEnabled } from './stores';
  let nsubdivs = 10
  let heights = []

	const geometry = new PlaneGeometry(10, 10, nsubdivs, nsubdivs)

	let resetCounter = 0
  export const reset = () => {
    resetCounter += 1
  }

  let debugEnabled = false
  export const toggleDebug = () => {
    debugEnabled = !debugEnabled
  }

</script>

<!-- Camera setup for 3rd person view -->
<T.PerspectiveCamera
  makeDefault
  position={[0, 10, 12]}
  fov={50}
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

<!-- Lighting -->
<T.DirectionalLight intensity={0.8} position={[10, 10, 10]} />
<T.AmbientLight intensity={0.3} />

{#key resetCounter}
	<Particle />
{/key}

<!-- grid -->
<Grid position.y={0.01} cellColor="#ffffff" sectionColor="#ffffff" sectionThickness={1} fadeDistance={105} cellSize={2} />


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

<Ground />

{#if debugEnabled === true}
  <Debug />
{/if}
