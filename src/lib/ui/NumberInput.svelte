<script lang="ts">
  import { writable } from 'svelte/store';

  export let label: string;
  export let unit: string = '';
  export let value: number;
  export let step: number = 1;
  export let min: number = 0;
  export let max: number = 100;
  export let format = (num: number) => num.toFixed(2);

  const internalValue = writable(value);

  internalValue.subscribe(newValue => {
    value = newValue;
  });

  function handleInput(event) {
    const newValue = parseFloat(event.target.value);
    if (!isNaN(newValue)) {
      internalValue.set(newValue);
    }
  }

  function handleSliderInput(event) {
    const newValue = parseFloat(event.target.value);
    if (!isNaN(newValue)) {
      internalValue.set(newValue);
    }
  }
</script>

<div class="input-field">
  <p class="text-[0.8em] opacity-40 mb-1">{label}</p>
  <div class="flex items-center mb-2">
    <input
      type="number"
      bind:value={value}
      step={step}
      min={min}
      max={max}
      on:input={handleInput}
      class="bg-transparent border border-gray-400 text-white rounded-md p-1 mr-2"
    />
    <span class="text-gray-400">{unit}</span>
  </div>
  <input
    type="range"
    bind:value={value}
    step={step}
    min={min}
    max={max}
    on:input={handleSliderInput}
    class="slider"
  />
</div>

<style>
  .input-field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 4px;
    background: #ddd;
    outline: none;
    opacity: 0.7;
    transition: opacity .2s;
  }
  .slider:hover {
    opacity: 1;
  }
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background: #4CAF50;
    cursor: pointer;
  }
  .slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: #4CAF50;
    cursor: pointer;
  }
</style>
