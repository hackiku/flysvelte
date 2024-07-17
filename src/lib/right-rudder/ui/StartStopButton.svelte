<!-- src/lib/right-rudder/ui/StartStopButton.svelte -->
<script lang="ts">
  let isPressed = false;

  function togglePress() {
    isPressed = !isPressed;
  }
</script>

<button 
  on:click={togglePress} 
  class="px-4 py-2 bg-gray-700 text-white text-lg rounded-md cursor-pointer hover:bg-gray-600 active:bg-gray-800 transition">
  {isPressed ? 'Pressed' : 'Not Pressed'}
</button>
