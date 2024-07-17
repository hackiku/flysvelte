<!-- routes/+page.svelte -->

<script lang="ts">
	import Nav from '$lib/ui/Nav.svelte';
  import Aircraft from '$lib/aircraft/Aircraft.svelte';
  import Terrain from '$lib/world/Terrain.svelte';
	
  import CoordinateLines from '$lib/world/CoordinateLines.svelte';
  import AxisArrows from '$lib/world/AxisArrows.svelte';
  import VectorArrow from '$lib/ui/VectorArrow.svelte';
  import OriginSelector from '$lib/ui/OriginSelector.svelte';
  import NumberInput from '$lib/ui/NumberInput.svelte';
  import { aircraftPosition, aircraftVelocity, aircraftDirection, physicsEnabled, cameraPosition, defaultCameraPosition } from '$lib/stores';
  import { initThreeScene, cleanupThreeScene } from '$lib/scene';
  import { setupFlightDynamics, cleanupFlightDynamics } from '$lib/flight';
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';

  const format = (num: number) => num.toFixed(3);

  const initialAircraftPosition = { x: 0, y: 5, z: 0 };
  const initialAircraftVelocity = { x: 1, y: 10, z: 0 };
  const initialAircraftDirection = { x: 1, y: 10, z: 0 };

  onMount(() => {
    const container = document.querySelector('#three-container');
    if (container) {
      initThreeScene(container);
      setupFlightDynamics(initialAircraftPosition, initialAircraftVelocity, initialAircraftDirection);
      cameraPosition.set(defaultCameraPosition);
    }
  });

  const resetCameraPosition = () => {
    cameraPosition.set(defaultCameraPosition);
  };

  let options = ['Sea Level', 'Center of Gravity', 'Earth Center'];
  let selectedOption = writable(options[0]);

  const isPaused = writable(false);

  function restartSimulation() {
    cleanupFlightDynamics();

    // Reset aircraft position, velocity, and direction
    aircraftPosition.set(initialAircraftPosition);
    aircraftVelocity.set(initialAircraftVelocity);
    aircraftDirection.set(initialAircraftDirection);

    setupFlightDynamics(initialAircraftPosition, initialAircraftVelocity, initialAircraftDirection);
  }

  function pauseSimulation() {
    isPaused.update(value => !value);
    physicsEnabled.update(enabled => !enabled);
  }
</script>

<Nav />

<main class="bg-black w-screen h-screen overflow-hidden">
  <OriginSelector {options} {selectedOption} />

  <!-- Physics Toggle, Pause, and Restart Button -->
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
      on:click={pauseSimulation}
    >
      {$isPaused ? 'Resume Simulation' : 'Pause Simulation'}
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
      <NumberInput label="Position X" unit="[m]" step={0.1} min={-1000} max={1000} bind:value={$aircraftPosition.x} />
      <NumberInput label="Position Y" unit="[m]" step={0.1} min={-1000} max={1000} bind:value={$aircraftPosition.y} />
      <NumberInput label="Position Z" unit="[m]" step={0.1} min={-1000} max={1000} bind:value={$aircraftPosition.z} />
    </div>
    <div class="status-box">
      <NumberInput label="Velocity X" unit="[m/s]" step={0.1} min={-100} max={100} bind:value={$aircraftVelocity.x} />
      <NumberInput label="Velocity Y" unit="[m/s]" step={0.1} min={-100} max={100} bind:value={$aircraftVelocity.y} />
      <NumberInput label="Velocity Z" unit="[m/s]" step={0.1} min={-100} max={100} bind:value={$aircraftVelocity.z} />
    </div>
    <div class="status-box">
      <NumberInput label="Direction X" unit="[deg]" step={1} min={0} max={360} bind:value={$aircraftDirection.x} />
      <NumberInput label="Direction Y" unit="[deg]" step={1} min={0} max={360} bind:value={$aircraftDirection.y} />
      <NumberInput label="Direction Z" unit="[deg]" step={1} min={0} max={360} bind:value={$aircraftDirection.z} />
    </div>

    <div class="status-box">
      <p class="text-[0.8em] opacity-40 mb-1">Camera Position</p>
      <NumberInput label="Camera X" unit="[m]" step={1} min={-1000} max={1000} bind:value={$cameraPosition.x} />
      <NumberInput label="Camera Y" unit="[m]" step={1} min={-1000} max={1000} bind:value={$cameraPosition.y} />
      <NumberInput label="Camera Z" unit="[m]" step={1} min={-1000} max={1000} bind:value={$cameraPosition.z} />

      <button on:click={resetCameraPosition} class="mt-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">Return to Default</button>
    </div>
  </div>

  
  <AxisArrows />
  <div id="three-container" class="w-screen h-screen">
    <Aircraft />
    <Terrain />
    <CoordinateLines />
    <VectorArrow color={0x00ff00} text="Velocity" origin={$aircraftPosition} direction={$aircraftVelocity} />
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
