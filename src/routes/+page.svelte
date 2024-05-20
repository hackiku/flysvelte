<!-- +page.svelte -->

<script>
  import Aircraft from '$lib/aircraft/Aircraft.svelte';
  import Terrain from '$lib/world/Terrain.svelte';
  import { position, velocity, direction } from '$lib/flight';

  let initialPosition = { x: 100, y: 5, z: 0 };
  let initialVelocity = { x: 1, y: 10, z: 0 };
  let initialDirection = { x: 1, y: 10, z: 0 };

  // Function to format numbers to 3 decimal places
  const format = (num) => num.toFixed(3);
</script>


<main class="bg-black w-screen h-screen">
  <div class="absolute top-2 right-2 bg-gray-800 bg-opacity-75 text-white p-4 font-mono">
    <h2>Aircraft Status</h2>
    <div>
      <span>Positison:</span>
      <div class="ml-2">
        <span>X: {format($position.x)}</span><br>
        <span>Y: {format($position.y)}</span><br>
        <span>Z: {format($position.z)}</span>
      </div>
    </div>
    <div>
      <span>Velocity:</span>
      <div class="ml-2">
        <span>X: {format($velocity.x)}</span><br>
        <span>Y: {format($velocity.y)}</span><br>
        <span>Z: {format($velocity.z)}</span>
      </div>
    </div>
    <div>
      <span>Direction:</span>
      <div class="ml-2">
        <span>X: {format($direction.x)}</span><br>
        <span>Y: {format($direction.y)}</span><br>
        <span>Z: {format($direction.z)}</span>
      </div>
    </div>
  </div>

  <Aircraft {initialPosition} {initialVelocity} {initialDirection} />
  <Terrain />
</main>
