<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { getRoutes } from '$lib/utils'; // Assuming utils.js is placed in the lib folder

  const menuOpen = writable(false);
  const routes = writable([]);

  onMount(async () => {
    const fetchedRoutes = await getRoutes();
    routes.set(fetchedRoutes);
  });

  function toggleMenu() {
    menuOpen.update(n => !n);
  }
</script>

<style>
  .menu {
    display: none;
  }

  .menu.open {
    display: block;
  }
</style>

<div 
  class="hamburger-menu" 
  style="z-index: 50; position: fixed; bottom: 1rem; right: 1rem; background-color: #2d3748; color: #ffffff; padding: 1rem; border-radius: 9999px; cursor: pointer;" 
  on:click={toggleMenu}
>
  &#9776;
</div>

<div 
  class="menu" 
  class:open={$menuOpen} 
  style="z-index: 50; position: fixed; bottom: 3rem; right: 1rem; background-color: #2d3748; color: #ffffff; padding: 1rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"
>
  {#each $routes as route}
    <div 
      class="menu-item" 
      style="padding: 0.5rem; border-radius: 0.25rem; cursor: pointer;"
    >
      <a href={route} target="_blank" style="color: #ffffff; text-decoration: none; display: block;">
        {route}
      </a>
    </div>
  {/each}
</div>
