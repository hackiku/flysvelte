<!-- src/lib/right-rudder/phys/Particle.svelte -->

<script lang="ts">
  import { T } from '@threlte/core';
  import { Collider, RigidBody, AutoColliders } from '@threlte/rapier';
  import { SphereGeometry, MeshStandardMaterial, Vector3 } from 'three';

  const radius = 0.25; 
  const position = new Vector3(0, 5, 0); 
  const geometry = new SphereGeometry(radius); 
  const color = 'red'; 
</script>

<RigidBody type="dynamic">
  <AutoColliders shape="ball">
    <T.Mesh castShadow receiveShadow position={position.toArray()} geometry={geometry}>
      <T.MeshStandardMaterial color={color} />
    </T.Mesh>
  </AutoColliders>
</RigidBody>
