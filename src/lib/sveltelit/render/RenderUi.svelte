<script>
  export let components;
</script>

<main>
  {#each components as { component: Component, props }}
    <Component {...props} />
  {/each}
</main>

<style>
	main {
		@apply flex flex-col items-center justify-center p-12 w-full;
	}
</style>