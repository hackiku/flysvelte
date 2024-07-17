<!-- src/lib/right-rudder/Scene.svelte -->
<script lang="ts">
  import { T } from '@threlte/core';
  import { Grid, OrbitControls } from '@threlte/extras';
  import Model from './models/WING.svelte';
  import { physicsEnabled } from './stores';
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

<!-- Import and use the WING model -->
<Model position={[0, 1.2, 0]} scale={1} />
