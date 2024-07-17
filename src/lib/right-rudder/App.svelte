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
  <h1 class="text-md font-bold">right rudder</h1>
</div>

{#if $showControls}
  <!-- Left Segment -->
  <div class="segment left-segment bg-gray-800 bg-opacity-30 rounded-lg p-4 m-4 hidden md:block">
    <!-- Left Segment Content -->
  </div>
  <!-- Right Segment-->
  <div class="segment right-segment bg-gray-800 bg-opacity-30 rounded-lg p-4 m-4 hidden md:block">
    <!-- Right Segment Content -->
  </div>
  <!-- Bottom Segment -->
  <div class="segment bottom-segment bg-gray-800 bg-opacity-30 rounded-lg p-4 m-4 w-full md:w-2/3 lg:w-1/2">
    <StartStopButton on:toggle={handleToggle} />
  </div>
{/if}

<button on:click={toggleControls} class="toggle-button">
  Toggle Controls
</button>

<style>
  .segment {
    background-color: rgba(55, 65, 81, 0.1);
  }

  .left-segment,
  .right-segment {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 15vh;
    height: 60vh;
  }

  .left-segment {
    left: 0;
  }

  .right-segment {
    right: 0;
  }

  .bottom-segment {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .toggle-button {
    position: absolute;
    bottom: 10px;
    right: 10px;
    padding: 10px 20px;
    background-color: gray;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .toggle-button:active {
    background-color: darkgray;
  }
</style>
