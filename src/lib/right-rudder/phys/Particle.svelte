<!-- src/lib/right-rudder/phys/Particle.svelte -->

<script lang="ts">
  import { T } from '@threlte/core';
  import { Collider, RigidBody } from '@threlte/rapier';
  import { SphereGeometry, MeshStandardMaterial, Vector3 } from 'three';

  export let position: Vector3 = new Vector3(0, 5, 0); // Start above the ground

  const geometry = new SphereGeometry(0.5, 32, 32); // Sphere with radius 0.5
  const material = new MeshStandardMaterial({ color: 'red' }); // Red material
</script>

<RigidBody type="dynamic">
  <Collider shape="ball" args={[0.5]} /> <!-- Collider with radius 0.5 -->
  <T.Mesh position={position.toArray()} geometry={geometry} material={material} />
</RigidBody>
