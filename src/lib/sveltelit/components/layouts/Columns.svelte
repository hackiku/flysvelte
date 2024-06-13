<!-- Columns.svelte -->
<script>
  export let numColumns = 1;
  export let components = [];

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  let chunks = chunkArray(components, numColumns);
</script>

<div class="flex -mx-2">
  {#each chunks as chunk}
    <div class="flex-1 mx-2">
      {#each chunk as { component: Component, props }}
        <Component {...props} />
      {/each}
    </div>
  {/each}
</div>
