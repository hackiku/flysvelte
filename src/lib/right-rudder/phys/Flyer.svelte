<!-- $ $lib/right-rudder/phys/Flyer.svelte -->

<script>
  import { RigidBody, AutoColliders, Attractor } from '@threlte/rapier'
  import Virus from '../models/Virus.svelte'

  export let position = [0, 0, 0]
  export let rotation = [0, 0, 0]
  export let gravityType = 'linear'
  export let gravityPosition = [0, 100, 0]
  export let range = 10
  export let strength = 1
</script>

<RigidBody>
  <AutoColliders shape="trimesh">
    <Virus position={position} rotation={rotation} />
  </AutoColliders>
  <Attractor
    range={range}
    strength={strength}
    gravityType={gravityType}
    position={gravityPosition}
  />
</RigidBody>
