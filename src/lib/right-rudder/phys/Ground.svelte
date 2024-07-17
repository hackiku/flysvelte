<!-- $ $lib/right-rudder/phys/Ground.svelte -->

<script lang="ts">
  import { T } from '@threlte/core'
  import { RigidBody, AutoColliders } from '@threlte/rapier'

  const color = 'darkgreen'
</script>

<T.Group position={[0, -0.5, 0]}>
  <RigidBody type="fixed">
    <AutoColliders shape={'cuboid'}>
      <T.Mesh receiveShadow>
        <T.BoxGeometry args={[25, 1, 25]} />
        <T.MeshStandardMaterial
          color={color}
          opacity={0.7}
          transparent={true}
        />
      </T.Mesh>
    </AutoColliders>
  </RigidBody>
</T.Group>
