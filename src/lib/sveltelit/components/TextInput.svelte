<script>
  export let label;
  export let value;
  export let store;

  $: store.set(value);
</script>

<div class="mb-4">
  <label class="block text-gray-400 mb-2">{label}</label>
  <input 
    type="text" 
    bind:value={$store} 
    class="w-full p-2 border border-gray-600 rounded bg-gray-800 text-gray-200" 
  />
  <span class="block text-gray-400 mt-2">{value}</span>
</div>
