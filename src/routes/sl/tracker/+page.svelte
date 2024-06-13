<script>
  import AircraftTracker from '$lib/components/AircraftTracker.svelte';
</script>

<main>
  <h1>Live Aircraft Tracker</h1>
  <AircraftTracker />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #000;
    color: #fff;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
</style>
