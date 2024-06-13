<script>
  import { onDestroy } from 'svelte';
  export let label;
  export let value;
  export let unit;

  let unsubscribe;
  $: if (value.subscribe) {
    unsubscribe = value.subscribe(v => {
      value = v;
    });
  }

  onDestroy(() => {
    if (unsubscribe) unsubscribe();
  });
</script>

<div class="mb-4">
  <h3 class="text-gray-400 text-xl">{label}</h3>
  <p class="text-gray-300 text-lg">{value} {unit}</p>
</div>
