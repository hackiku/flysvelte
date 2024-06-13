<script>
  export let label;
  export let value;
  export let min;
  export let step;
  export let store;

  $: store.set(value);
</script>

<div>
  <label>{label}</label>
  <input type="number" bind:value={$store} min={min} step={step} />
  <span>{value}</span>
</div>
