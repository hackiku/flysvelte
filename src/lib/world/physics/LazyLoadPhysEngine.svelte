<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  let CannonEngine;
  let engineLoaded = writable(false);

  async function loadEngine() {
    CannonEngine = await import('./CannonEngine.svelte');
    engineLoaded.set(true);
  }

  onMount(() => {
    // Load the engine only when needed
  });
</script>

<button on:click={loadEngine}>
  Load Cannon.js Engine
</button>

{#if $engineLoaded}
  <svelte:component this={CannonEngine.default} />
{:else}
  <p>Engine not loaded</p>
{/if}
