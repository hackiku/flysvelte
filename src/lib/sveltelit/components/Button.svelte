<script>
  export let label;
  export let onClick;
</script>

<button 
  class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded" 
  on:click={onClick}
>
  {label}
</button>
