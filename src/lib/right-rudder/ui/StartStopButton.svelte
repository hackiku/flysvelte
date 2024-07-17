<!-- src/lib/right-rudder/ui/StartStopButton.svelte -->
<script lang="ts">
  let isPressed = false;

  function togglePress() {
    isPressed = !isPressed;
  }
</script>

<style>
  .start-stop-button {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    background-color: gray;
    color: white;
    font-size: 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .start-stop-button:active {
    background-color: darkgray;
  }
</style>

<button class="start-stop-button" on:click={togglePress}>
  {isPressed ? 'Pressed' : 'Not Pressed'}
</button>
