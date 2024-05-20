<!-- +page.svelte -->

<script>
  import { onMount } from 'svelte';
  import { initThreeScene } from '$lib/scene';
  import Terrain from '$lib/world/Terrain.svelte'
</script>

<main class="bg-black w-screen h-screen">

  <Terrain />

</main>


<style>
  h1 {
    color: azure;
  }
</style>
