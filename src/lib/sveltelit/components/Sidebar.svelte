<script>
  export let components = [];
</script>

<aside class="w-64 bg-gray-800 text-gray-100 p-4 flex-shrink-0">
  {#each components as { component: Component, props }}
    {#if Component}
      <Component {...props} />
    {/if}
  {/each}
</aside>
