<script>
  import { onMount } from 'svelte';
  import { initCannonWorld } from '$lib/sveltelit/projects/cannonTest.js';

  onMount(() => {
    initCannonWorld();
  });
</script>

<main class="p-4 bg-gray-900 min-h-screen flex">
  <div id="cannon-container" class="flex-grow">
    <h1 class="text-white">Cannon.js Physics Simulation</h1>
  </div>
</main>
