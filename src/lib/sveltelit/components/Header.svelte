<script>
  export let level;
  export let text;

  const Tag = level === 1 ? 'h1' : level === 2 ? 'h2' : level === 3 ? 'h3' : level === 4 ? 'h4' : level === 5 ? 'h5' : 'h6';
</script>

<svelte:element this={Tag} class="text-gray-300 text-2xl font-bold">
  {text}
</svelte:element>
