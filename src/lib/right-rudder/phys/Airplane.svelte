<!-- $ $lib/right-rudder/phys/Airplane.svelte -->

<script lang="ts">
  import type { RigidBody as RapierRigidBody } from '@dimforge/rapier3d-compat'
  import { T, useTask } from '@threlte/core'
  import { AutoColliders, BasicPlayerController, RigidBody } from '@threlte/rapier'
  import { ConeGeometry, CapsuleGeometry, Mesh, MeshStandardMaterial, SphereGeometry, Vector3 } from 'three'

  export let position: Parameters<Vector3['set']> | undefined = undefined

  export let airplaneMesh: Mesh

  let rigidBody: RapierRigidBody

  const playerPos = new Vector3()
  const ballPos = new Vector3()
  const maxF = 0.05
  const min = new Vector3(-maxF, 0, -maxF)
  const max = new Vector3(maxF, 0, maxF)

  useTask(() => {
    if (!airplaneMesh || !rigidBody) return

    airplaneMesh.getWorldPosition(playerPos)
    airplaneMesh.getWorldPosition(ballPos)

    const diff = playerPos.sub(ballPos).divideScalar(2000)
    diff.y = 0

    const f = diff.clamp(min, max)

    rigidBody.applyImpulse(f, true)
  })
</script>

<!-- To detect the groundedness of the player, a collider on group 15 is used -->
<BasicPlayerController
  {position}
  speed={3}
  radius={0.78}
  height={1.8}
  jumpStrength={2}
  groundCollisionGroups={[15]}
  playerCollisionGroups={[0]}
>
  <T.Mesh
    bind:ref={airplaneMesh}
    position.y={1}
    receiveShadow
    castShadow
		geometry={new ConeGeometry(0.8, 2.5)}
    material={new MeshStandardMaterial()}
		/>
	</BasicPlayerController>
	
	<!-- geometry={new CapsuleGeometry(0.5, -3, 12)} -->


