<!-- src/lib/right-rudder/App.svelte -->

<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { World } from '@threlte/rapier'
  import type { GravityType } from '@threlte/rapier'
  import Scene from './Scene.svelte'
  import FallbackScene from './phys/FallbackScene.svelte'
  import { HTML } from '@threlte/extras'
  // stores
  import { writable } from 'svelte/store'
  import { physicsEnabled } from './stores'
  // ui
	import { Pane, Slider, TabGroup, TabPage, Checkbox, Button } from 'svelte-tweakpane-ui'

  import StartStopButton from './ui/StartStopButton.svelte'
  import HUD from './ui/HUD.svelte'

  let reset: () => any | undefined;
  let toggleDebug: () => any | undefined

  // gravity
  const gravityTypes: GravityType[] = ['static', 'linear', 'newtonian']
  let gravityType: GravityType = gravityTypes[0]

	let range = 1
	let strength = 1

  let showControls = writable(true)
  let playerSpeed = writable(0);
  let playerPosition = writable({ x: 0, y: 0, z: 0 })

  function toggleControls() {
    showControls.update(n => !n);
  }

</script>

<div class="w-screen h-screen">
  <Canvas>
    <World gravityType={gravityType}>
      <!-- <Scene /> -->
      <Scene
        bind:reset
        bind:toggleDebug
        gravityType={gravityType}
        range={range}
        strength={strength}
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
  
  <!-- 👈 left -->
  <div class="flex flex-col space-y-4 items-start bg-gray-800 bg-opacity-20 rounded-lg p-4 m-4 absolute top-1/2 transform -translate-y-1/2 left-0 w-[30vh] h-[60vh]">
    <label for="gravity-select" class="text-sm opacity-40 mt-4">Select Gravity Type:</label>
    <select id="gravity-select" bind:value={gravityType} class="mt-2 p-2 bg-gray-700 text-white rounded">
      {#each gravityTypes as gravity}
        <option value={gravity}>{gravity}</option>
      {/each}
    </select>

		<Slider
			bind:value={strength}
			label="strength"
			min={-5}
      max={5}
    />
		<Slider
			bind:value={range}
			label="range"
			min={-5}
      max={5}
    />
    <!-- <HUD {playerSpeed} {playerPosition} /> -->
  </div>

  <!-- 👉 right  -->
  <div class="flex flex-col items-start bg-gray-800 bg-opacity-10 rounded-lg p-4 m-4 absolute top-1/2 transform -translate-y-1/2 right-0 w-20vh h-60vh">
    <button on:click={toggleDebug} class="border border-gray-700 text-white rounded-lg p-3">Toggle Debug</button>
  </div>

  <!-- 👇 bottom -->
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
