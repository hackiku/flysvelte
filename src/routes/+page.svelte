<!-- +page.svelte -->

<script>
  import Aircraft from '$lib/aircraft/Aircraft.svelte';
  import Terrain from '$lib/world/Terrain.svelte';
  import CoordinateLines from '$lib/world/CoordinateLines.svelte';
  import AxisArrows from '$lib/world/AxisArrows.svelte';
  import VectorArrow from '$lib/ui/VectorArrow.svelte';
  import OriginSelector from '$lib/ui/OriginSelector.svelte';
  import { position, velocity, direction, physicsEnabled, setupFlightDynamics, cleanupFlightDynamics } from '$lib/flight';
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

  function restartSimulation() {
    if (cleanupFlightDynamics) cleanupFlightDynamics();
    setupFlightDynamics(initialPosition, initialVelocity, initialDirection);
  }
</script>

<main class="bg-black w-screen h-screen">
  <!-- origin selector -->
  <OriginSelector {options} {selectedOption} />

  <!-- Physics Toggle and Restart Button -->
  <div class="absolute flex flex-col top-2 left-2 bg-gray-800 bg-opacity-30 text-white p-2 font-mono text-[0.6em] rounded-lg mt-16">
    <p class="text-[0.8em] opacity-40 mb-1">Physics</p>
    <button
      class="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 bg-opacity-30 focus:outline-none"
      on:click={() => physicsEnabled.update(enabled => !enabled)}
    >
      Physics: {$physicsEnabled ? 'ON' : 'OFF'}
    </button>
    <button
      class="bg-gray-700 text-white bg-opacity-30 px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none mt-2"
      on:click={restartSimulation}
    >
      Restart Simulation
    </button>
  </div>

  <!-- Aircraft Status -->
  <div class="absolute top-2 right-2 bg-gray-800 bg-opacity-30 text-white p-2 font-mono text-xs rounded-lg status-container">
    <div class="status-box">
      <p class="text-[0.8em] opacity-40 mb-1">Position</p>
      <div>
        <span>X: {format($position.x)}</span><br>
        <span>Y: {format($position.y)}</span><br>
        <span>Z: {format($position.z)}</span>
      </div>
    </div>
    <div class="status-box">
      <p class="text-[0.8em] opacity-40 mb-1">Velocity</p>
      <div>
        <span>X: {format($velocity.x)}</span><br>
        <span>Y: {format($velocity.y)}</span><br>
        <span>Z: {format($velocity.z)}</span>
      </div>
    </div>
    <div class="status-box">
      <p class="text-[0.8em] opacity-40 mb-1">Direction</p>
      <div>
        <span>X: {format($direction.x)}</span><br>
        <span>Y: {format($direction.y)}</span><br>
        <span>Z: {format($direction.z)}</span>
      </div>
    </div>
    <div class="status-box">
      <p class="text-[0.8em] opacity-40 mb-1">Camera Position</p>
      <label>
        X: <input type="number" bind:value={cameraX} class="ml-2 p-1 bg-gray-700 text-white rounded-md">
      </label><br>
      <label>
        Y: <input type="number" bind:value={cameraY} class="ml-2 p-1 bg-gray-700 text-white rounded-md">
      </label><br>
      <label>
        Z: <input type="number" bind:value={cameraZ} class="ml-2 p-1 bg-gray-700 text-white rounded-md">
      </label><br>
      <button on:click={updateCameraPosition} class="mt-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">Update Camera</button>
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

<style>
  .status-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .status-box {
    background-color: rgba(31, 41, 55, 0.3); /* bg-gray-800 with opacity */
    padding: 0.5rem;
    border-radius: 0.375rem; /* rounded-md */
  }
</style>
