<!-- $ $lib/right-rudder/phys/Ground.svelte -->

<script lang="ts">
  import { T } from '@threlte/core'
  import { AutoColliders } from '@threlte/rapier'

	const color = 'gray'

</script>

<T.Group position={[0, -0.5, 0]}>
  <AutoColliders shape={'cuboid'}>
    <T.Mesh receiveShadow>
      <T.BoxGeometry args={[10, 1, 10]} />
      <T.MeshStandardMaterial color={color} />
    </T.Mesh>
  </AutoColliders>
</T.Group>

