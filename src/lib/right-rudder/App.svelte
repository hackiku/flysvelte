<!-- src/lib/right-rudder/App.svelte -->

<script lang="ts">
  import { Canvas } from '@threlte/core';
  import Scene from './Scene.svelte';
  import StartStopButton from './ui/StartStopButton.svelte';
  import { writable } from 'svelte/store';

  let isSimulating = false;
  let showControls = writable(true);

  function handleToggle(event: CustomEvent) {
    isSimulating = event.detail.isSimulating;
    console.log(`Simulation ${isSimulating ? 'started' : 'stopped'}`);
  }

  function toggleControls() {
    showControls.update(n => !n);
  }
</script>

<Canvas>
  <Scene />
</Canvas>

<div class="absolute top-0 left-0 p-4 text-white">
  <h1 class="text-2xl">right rudder</h1>
</div>

{#if $showControls}
  <!-- Left Segment -->
  <div class="flex flex-col items-start bg-gray-800 bg-opacity-30 rounded-lg p-4 m-4 absolute top-1/2 transform -translate-y-1/2 left-0 w-20vh h-60vh">
    <div>airspeed = </div>
    <div>foo = </div>
  </div>

  <!-- Right Segment -->
  <div class="flex flex-col items-start bg-gray-800 bg-opacity-30 rounded-lg p-4 m-4 absolute top-1/2 transform -translate-y-1/2 right-0 w-20vh h-60vh">
    <!-- Right Segment Content -->
  </div>
	
  <!-- Bottom Segment -->
  <div class="flex items-center justify-center bg-gray-800 bg-opacity-30 rounded-lg p-4 m-4 w-full md:w-2/3 lg:w-1/2 absolute bottom-0 left-1/2 transform -translate-x-1/2">
    <StartStopButton on:toggle={handleToggle} />
  </div>
{/if}

<button on:click={toggleControls} class="absolute bottom-10 right-10 p-4 bg-gray-700 text-white rounded-lg">
  Toggle Controls
</button>

<style>

	div {
		@apply text-white;
	}

  h1 {
		@apply text-2xl;
	}

	p {
		@apply text-sm text-white;
	}
	
</style>
