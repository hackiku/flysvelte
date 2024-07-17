<!-- src/lib/right-rudder/App.svelte -->

<script lang="ts">
  import { Canvas } from '@threlte/core';
	import { World } from '@threlte/rapier';	
  import Scene from './Scene.svelte';
  import FallbackScene from './phys/FallbackScene.svelte'

  import StartStopButton from './ui/StartStopButton.svelte';
	import { HTML } from '@threlte/extras'

  import { writable } from 'svelte/store';
  import { physicsEnabled } from './stores';

  let reset: () => any | undefined;
  let toggleDebug: () => any | undefined


  let showControls = writable(true);

  function toggleControls() {
    showControls.update(n => !n);
  }

  $: console.log(`Physics Enabled: ${$physicsEnabled}`);
</script>

<div class="w-screen h-screen">
  <Canvas>
    <World>
      <!-- <Scene /> -->
			<Scene
        bind:reset
        bind:toggleDebug
      />

				<HTML>
					<div class="w-[120px]">
						<p class="text-sm opacity-40">|</p>
					</div>
				</HTML>
	    <FallbackScene slot="fallback" />
    </World>
  </Canvas>
</div>


<div class="absolute top-0 left-0 p-4">
  <h1 class="text-md font-mono opacity-30">right rudder</h1>
</div>

{#if $showControls} 
	
	<!-- left -->
  <div class="flex flex-col items-start bg-gray-800 bg-opacity-10 rounded-lg p-4 m-4 absolute top-1/2 transform -translate-y-1/2 left-0 w-20vh h-60vh">
    <p>airspeed = </p>
  </div>

  <!-- right  -->
  <div class="flex flex-col items-start bg-gray-800 bg-opacity-10 rounded-lg p-4 m-4 absolute top-1/2 transform -translate-y-1/2 right-0 w-20vh h-60vh">
		<button on:click={toggleDebug} class="border border-gray-700 text-white rounded-lg p-3">Toggle Debug</button>
  </div>

  <!-- bottom -->
  <div class="flex items-center justify-center space-x-4
		bg-gray-800 bg-opacity-10 rounded-lg p-4 m-4 w-full md:w-2/3 lg:w-1/2 absolute bottom-0 left-1/2 transform -translate-x-1/2">
    <StartStopButton/>
		<button on:click={reset} class="border border-gray-700 text-white rounded-lg p-3">Reset</button>
    <label class="flex items-center ml-4">
      <input type="checkbox" bind:checked={$physicsEnabled} class="mr-2">
      <span>Physics</span>
    </label>
  </div>
{/if}

<button on:click={toggleControls} class="absolute bottom-10 right-10 p-4 bg-gray-700 text-white rounded-lg">
  Toggle Controls
</button>

<style>
	h1, h2, h3, h4, h5, p, div {
    @apply text-white;
  }
</style>
