<!-- $ $lib/right-rudder/phys/Ground.svelte -->

<script lang="ts">
  import { T } from '@threlte/core'
  import { AutoColliders } from '@threlte/rapier'

	const color = 'darkgreen'

</script>

<T.Group position={[0, -0.5, 0]}>
  <AutoColliders shape={'cuboid'}>
    <T.Mesh receiveShadow>
      <T.BoxGeometry args={[15, 1, 15]} />
      <T.MeshStandardMaterial
				color={color}
				opacity={0.7}
        transparent={true}
			/>
    </T.Mesh>
  </AutoColliders>
</T.Group>

