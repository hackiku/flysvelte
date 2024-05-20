

<!-- +page.svelte -->

<script>
  import Aircraft from '$lib/aircraft/Aircraft.svelte';
  import Terrain from '$lib/world/Terrain.svelte';
  import AxisArrows from '$lib/world/AxisArrows.svelte';
  import { position, velocity, direction } from '$lib/flight';
  import { initThreeScene } from '$lib/scene';

  let initialPosition = { x: 0, y: 5, z: 0 };
  let initialVelocity = { x: 1, y: 10, z: 0 };
  let initialDirection = { x: 1, y: 100, z: 0 };

  let cameraX = 10;
  let cameraY = 10;
  let cameraZ = 10;

  // Function to format numbers to 3 decimal places
  const format = (num) => num.toFixed(3);

  const updateCameraPosition = () => {
    initThreeScene(document.querySelector('#three-container'), cameraX, cameraY, cameraZ);
  };
</script>

<main class="bg-black w-screen h-screen">
  <div class="absolute top-2 right-2 bg-gray-800 bg-opacity-60 text-white p-4 font-mono text-xs">    <h2>Aircraft Status</h2>
    <div>
      <span>Position:</span>
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
    <div>
      <h3>Camera Position</h3>
      <label>
        X: <input type="number" bind:value={cameraX} class="ml-2 p-1 bg-gray-700 text-white">
      </label><br>
      <label>
        Y: <input type="number" bind:value={cameraY} class="ml-2 p-1 bg-gray-700 text-white">
      </label><br>
      <label>
        Z: <input type="number" bind:value={cameraZ} class="ml-2 p-1 bg-gray-700 text-white">
      </label><br>
      <button on:click={updateCameraPosition} class="mt-2 p-2 bg-blue-600 hover:bg-blue-700 text-white">Update Camera</button>
    </div>
  </div>

  <div id="three-container" class="w-screen h-screen">
    <Aircraft {initialPosition} {initialVelocity} {initialDirection} />
    <Terrain />
    <AxisArrows />
  </div>
</main>
