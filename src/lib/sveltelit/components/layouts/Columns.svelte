<!-- Columns.svelte -->
<script>
  export let numColumns = 2;
  export let components = [];

  // Split the components into the specified number of columns
  const columns = [];
  for (let i = 0; i < numColumns; i++) {
    columns.push([]);
  }

  components.forEach((component, index) => {
    columns[index % numColumns].push(component);
  });
</script>

<div class="flex">
  {#each columns as column}
    <div class="flex-1 p-2">
      {#each column as { component, props }}
        <svelte:component this={component} {...props} />
      {/each}
    </div>
  {/each}
</div>
