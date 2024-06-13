<script>
  import { onDestroy } from 'svelte';
  export let text;

  let unsubscribe;
  $: if (text.subscribe) {
    unsubscribe = text.subscribe(value => {
      text = value;
    });
  }

  onDestroy(() => {
    if (unsubscribe) unsubscribe();
  });
</script>

<p class="text-gray-300 text-lg">{text}</p>
