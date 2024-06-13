<script>
  export let components;
</script>

<main>
  {#each components as { component: Component, props }}
    <Component {...props} />
  {/each}
</main>
