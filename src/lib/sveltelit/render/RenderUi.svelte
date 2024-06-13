<!-- ./components/RenderUi.svelte -->

<script>
  export let components;
</script>

<main class="flex flex-col space-y-6
		mt-12 mx-12 sm:mx-20 md:mx-44 lg:mx-56"
	>
  {#each components as { component: Component, props }}
    <Component {...props} />
  {/each}
</main>

<!-- <style>
	h1 {
		@apply text-red-300 p-44;
	}
</style> -->