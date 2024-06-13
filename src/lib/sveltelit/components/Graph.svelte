<script>
  import { onMount } from 'svelte';
  import { Chart, registerables } from 'chart.js';
  Chart.register(...registerables);

  export let type;
  export let data;
  export let options;

  let canvas;

  onMount(() => {
    new Chart(canvas, {
      type,
      data,
      options
    });
  });
</script>

<canvas bind:this={canvas}></canvas>
