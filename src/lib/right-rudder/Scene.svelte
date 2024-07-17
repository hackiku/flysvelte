<!-- src/lib/right-rudder/Scene.svelte -->

<script lang="ts">
  // import { PlaneGeometry, MeshStandardMaterial } from 'three'
  // import { DEG2RAD } from 'three/src/math/MathUtils.js'
	import { T } from '@threlte/core';
  import { Grid, OrbitControls } from '@threlte/extras';
	import { Collider, Debug, RigidBody } from '@threlte/rapier'
  import RAPIER from '@dimforge/rapier3d-compat'
	import { BoxGeometry, MeshStandardMaterial } from 'three'
	
	// sim components
	import Ground from './phys/Ground.svelte';
	import Particle from './phys/Particle.svelte';
  import Model from './models/WING.svelte';
  import { World, RigidBodyDesc, ColliderDesc } from '@dimforge/rapier3d-compat';
  
	import { physicsEnabled } from './stores';

  // $: rotationCasted = rotation?.toArray() as [x: number, y: number, z: number]
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

<!-- Lighting setup -->
<T.DirectionalLight intensity={0.8} position={[10, 10, 10]} />
<T.AmbientLight intensity={0.3} />

<!-- grid -->
<Grid position.y={-0.0} cellColor="#ffffff" sectionColor="#ffffff" sectionThickness={1} fadeDistance={105} cellSize={2} />

<!-- <T.Mesh ref={boxMesh}> -->
<T.Mesh>
  <T.MeshStandardMaterial
    color="teal"
    opacity="0.9"
    transparent
  />
</T.Mesh>
<Model position={[0, 1.2, 0]} scale={1} />

<Ground />

<Particle />

<Debug />
