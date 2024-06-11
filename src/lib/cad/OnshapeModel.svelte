<script>
  import { onMount } from 'svelte';
  let modelUrl = '';

  onMount(async () => {
    // Fetch model URL logic here
    modelUrl = await fetchModelUrl();
  });

  async function fetchModelUrl() {
    // Your logic to fetch the model URL from Onshape
  }
</script>

<main>
  {#if modelUrl}
    <iframe src={modelUrl} width="100%" height="600px"></iframe>
  {/if}
</main>
