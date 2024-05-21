<!-- lib/ui/OriginSelector.svelte -->

<script>
  import { writable } from 'svelte/store';

  export let options = ['Sea Level', 'Center of Gravity', 'Earth Center'];
  export let selectedOption = writable(options[0]);

  let dropdownOpen = writable(false);

  function selectOption(option) {
    selectedOption.set(option);
    dropdownOpen.set(false);
  }
</script>

<div class="absolute top-2 left-2 bg-gray-800 bg-opacity-60 text-white p-2 rounded-lg font-mono text-xs">
  <p class="text-[0.8em] opacity-40 mb-1">Origin</p>
  <div class="relative inline-block">
    <button 
      class="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none flex items-center" 
      on:click={() => dropdownOpen.update(open => !open)}
    >
      {#if $selectedOption}{ $selectedOption }{/if}
      <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>
    {#if $dropdownOpen}
      <ul class="absolute left-0 w-full bg-gray-700 bg-opacity-40 mt-1 rounded-md shadow-lg z-10">
        {#each options as option}
          <li 
            class="px-3 py-2 hover:bg-gray-800 bg-opacity-40 cursor-pointer text-gray-400" 
            class:text-white={$selectedOption === option} 
            on:click={() => selectOption(option)}
          >
            {option}
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
