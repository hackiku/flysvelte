<!-- +page.svelte -->

<script>
  import { onMount } from 'svelte';
  import Terrain from '$lib/world/Terrain.svelte'
  import Aircraft from '$lib/aircraft/Aircraft.svelte'
  
  // import TerrainLibrary from '$lib/world/TerrainLibrary.svelte'
</script>

<!-- <p>omf</p> -->
<main class="bg-black w-screen h-screen">

  <Terrain />
  <Aircraft />

</main>
