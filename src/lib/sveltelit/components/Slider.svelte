<script>
  import { onDestroy } from 'svelte';
  import { writable } from 'svelte/store';
  export let label;
  export let value;
  export let min;
  export let max;
  export let step;
  export let store = writable(value);

  let unsubscribe;
  $: if (store.subscribe) {
    unsubscribe = store.subscribe(val => {
      value = val;
    });
  }

  onDestroy(() => {
    if (unsubscribe) unsubscribe();
  });
</script>

<div class="mb-4">
  <label class="block text-gray-400 mb-2">{label}</label>
  <input 
    type="range" 
    bind:value={$store} 
    min={min} 
    max={max} 
    step={step} 
    class="w-full" 
  />
  <span class="block text-gray-400 mt-2">{value}</span>
</div>
