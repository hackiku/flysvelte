<!-- src/routes/dynamics/+page.svelte -->
<script>
  import AircraftData from '$lib/dynamics/AircraftData.svelte';
  import StabilityAnalysis from '$lib/dynamics/StabilityAnalysis.svelte';
  import Graphs from '$lib/dynamics/Graphs.svelte';
  import DatcomInput from '$lib/dynamics/DatcomInput.svelte';
</script>

<main>
  <h1>Dynamics Project</h1>
  <AircraftData />
  <StabilityAnalysis />
  <Graphs />
  <DatcomInput />
</main>
