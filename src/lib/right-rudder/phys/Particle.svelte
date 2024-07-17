<!-- src/lib/right-rudder/phys/Particle.svelte -->

<script lang="ts">
  import { T } from '@threlte/core';
  import { Collider, RigidBody, AutoColliders } from '@threlte/rapier';
  import { SphereGeometry, MeshStandardMaterial, Vector3, Euler } from 'three';

  export let position: Parameters<Vector3['set']> = [0, 5, 0];
  export let rotation: Parameters<Euler['set']> = [0, 0, 0];

  const radius = 0.25; 
  const geometry = new SphereGeometry(radius); 
  const color = 'red'; 
</script>

<RigidBody type="dynamic">
  <AutoColliders shape="ball">
    <T.Mesh
      castShadow
      receiveShadow
      position={position}
      rotation={rotation}
      geometry={geometry}
    >
      <T.MeshStandardMaterial color={color} />
    </T.Mesh>
  </AutoColliders>
</RigidBody>
