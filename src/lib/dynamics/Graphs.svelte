<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js';

  let chart;

  onMount(() => {
    const ctx = document.getElementById('myChart').getContext('2d');
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [/* Labels */],
        datasets: [{
          label: 'Dataset',
          data: [/* Data */],
        }]
      },
    });
  });
</script>

<main>
  <canvas id="myChart" width="400" height="400"></canvas>
</main>