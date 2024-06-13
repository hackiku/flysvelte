<script>
  import { onMount } from 'svelte';
  import { initGraph } from '$lib/projects/graphTest.js';

  onMount(() => {
    initGraph();
  });
</script>

<main class="p-4 bg-gray-900 min-h-screen flex flex-col items-center">
<h1 class="text-white mb-4">Title here ahh</h1>
<canvas id="myChart" width="400" height="400"></canvas>
</main>
