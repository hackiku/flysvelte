<!-- routes/right-rudder/+page.svelte -->

<script lang="ts">
  import App from '$lib/right-rudder/App.svelte';
</script>

<div class="app-container">
	<App />
</div>

<style>
  body {
    margin: 0;
    overflow: hidden;
  }

  .app-container {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: rgb(13, 19, 32);
    background: linear-gradient(180deg, rgba(13, 19, 32, 1) 0%, rgba(8, 12, 21, 1) 100%);
  }

</style>
