// $lib/projects/rockie/rockie.js

import { header, numberInput, paragraph, slider, metric, render, columns } from '$lib/sveltelit/svelteLit';
import { writable, derived } from 'svelte/store';

// Simple Calculation Example
header(2, "Simple Calculation Example");

// Create inputs
let sliderValue = slider("Slider Value", 50, { min: 0, max: 100, step: 1 });
let inputValue = numberInput("Input Value", 100, { min: 0, step: 1 });

// Perform a simple calculation: sum of inputValue and sliderValue
let calculatedResult = derived([inputValue, sliderValue], ([$inputValue, $sliderValue]) => $inputValue + $sliderValue);

columns(2);
// Display the result
metric("metric Result", calculatedResult, "");

// Render the UI
render();
