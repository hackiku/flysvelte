<!-- src/lib/dynamics/Graphs.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { dynamicsStore } from '$lib/stores/dynamicsStores';
  // import { Line } from 'svelte-chartjs';
  import { writable } from 'svelte/store';
  // import 'chart.js/auto';

  let graphData = writable({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: 'Dataset 1',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
        hoverBorderColor: 'rgba(255, 99, 132, 1)',
        data: [65, 59, 80, 81, 56, 55, 40],
      }
    ]
  });

  onMount(() => {
    dynamicsStore.subscribe((store) => {
      // Update graph data based on the store
      graphData.update(data => {
        data.datasets[0].data = [store.mass, store.span, store.mass, store.span, 56, 55, 40];
        return data;
      });
    });
  });
</script>

<div class="graph-container bg-white rounded p-4">
  <!-- <Line {graphData} /> -->
</div>

<style>
  .graph-container {
    height: 400px;
  }
</style>
