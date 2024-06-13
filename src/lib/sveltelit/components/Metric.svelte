<script>
  export let label;
  export let value;
  export let unit;
</script>

<div class="mb-4">
	<h3 class="text-indigo-800 text-xs">METRIC</h3>
	<h3 class="text-gray-400 text-xl">{label}</h3>
  <p class="text-gray-300 text-lg">{value} {unit}</p>
</div>
