<!-- +page.svelte -->

<script>
  import Terrain from '$lib/world/Terrain.svelte'
  import Aircraft from '$lib/aircraft/Aircraft.svelte'
  
</script>

<!-- <p>omf</p> -->
<main class="bg-black w-screen h-screen">

  <Terrain />
  <Aircraft />

</main>



<!-- ---------------------------- -->
<style>
  :global(body) {
    margin: 0;
    overflow: hidden;
  }
  :global(canvas) {
    display: block;
  }
</style>
