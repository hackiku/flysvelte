<!-- src/lib/right-rudder/ui/HUD.svelte -->

<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  export let playerSpeed = writable(0);
  export let playerPosition = writable({ x: 0, y: 0, z: 0 });

  let speed;
  let position;

  onMount(() => {
    $: speed = $playerSpeed;
    $: position = $playerPosition;
  });
</script>

<div class="hud">
  <div class="info">
    <p>v = {$playerSpeed}</p>
    <p>x={$playerPosition.x.toFixed(2)}, y={$playerPosition.y.toFixed(2)}, z={$playerPosition.z.toFixed(2)}</p>
  </div>
</div>

<style>
  .hud {
    top: 10px;
    left: 10px;
    color: white;
    font-family: Arial, sans-serif;
    background: rgba(0, 0, 0, 0.5);
    padding: 10px;
    border-radius: 5px;
  }
  .info {
    display: flex;
    flex-direction: column;
  }
</style>
