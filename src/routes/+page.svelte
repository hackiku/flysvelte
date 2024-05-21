<!-- +page.svelte -->

<script>
  import Aircraft from '$lib/aircraft/Aircraft.svelte';
  import Terrain from '$lib/world/Terrain.svelte';
  import CoordinateLines from '$lib/world/CoordinateLines.svelte';
  import AxisArrows from '$lib/world/AxisArrows.svelte';
  import VectorArrow from '$lib/ui/VectorArrow.svelte';
  import OriginSelector from '$lib/ui/OriginSelector.svelte';
  import { position, velocity, direction } from '$lib/flight';
  import { initThreeScene } from '$lib/scene';
  import { writable } from 'svelte/store';

  let initialPosition = { x: 0, y: 5, z: 0 };
  let initialVelocity = { x: 1, y: 10, z: 0 };
  let initialDirection = { x: 1, y: 100, z: 0 };

  let cameraX = 10;
  let cameraY = 200;
  let cameraZ = 10;

  const format = (num) => num.toFixed(3);
  const updateCameraPosition = () => {
    initThreeScene(document.querySelector('#three-container'), cameraX, cameraY, cameraZ);
  };

  let options = ['Sea Level', 'Center of Gravity', 'Earth Center'];
  let selectedOption = writable(options[0]);
</script>

<main class="bg-black w-screen h-screen">
  <!-- origin selector -->
  <OriginSelector {options} {selectedOption} />

  <div class="absolute top-2 right-2 bg-gray-800 bg-opacity-60 text-white p-4 font-mono text-xs">
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
  
  <AxisArrows />
  <div id="three-container" class="w-screen h-screen">
    <Aircraft {initialPosition} {initialVelocity} {initialDirection} />
    <Terrain />
    <CoordinateLines />
    <VectorArrow color={0x00ff00} text="Velocity" origin={initialPosition} direction={initialVelocity} />
  </div>
</main>
