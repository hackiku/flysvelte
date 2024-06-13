// compositeWing.js
import { header, numberInput, paragraph, slider, button, columns, render } from '$lib/sveltelit/svelteLit';
import { writable, derived } from 'svelte/store';

header(1, "Composite Wing Design");

// Material Properties
header(2, "Material Properties");
let materialDensity = numberInput("Material Density (kg/m³)", 1600, { min: 1000, max: 2500, step: 10 });

// Geometry Definition
header(2, "Geometry Definition");
let wingSpan = numberInput("Wing Span (m)", 10, { min: 5, max: 50, step: 0.1 });
let rootChord = numberInput("Root Chord (m)", 2, { min: 0.5, max: 5, step: 0.1 });
let tipChord = numberInput("Tip Chord (m)", 1, { min: 0.1, max: 3, step: 0.1 });
let sweepAngle = numberInput("Sweep Angle (degrees)", 15, { min: 0, max: 45, step: 1 });

// Use columns to arrange the next 3 inputs
columns(3);

// Load Cases
header(1, "Col1 h1");
header(3, "Col2 h3");
paragraph("Col3 text");

let loadFactor = numberInput("Load Factor", 2.5, { min: 1, max: 6, step: 0.1 });
let wingLoading = numberInput("Wing Loading (N/m²)", 5000, { min: 2000, max: 10000, step: 100 });

// Derived Calculation
const wingArea = derived([wingSpan, rootChord, tipChord], ([$wingSpan, $rootChord, $tipChord]) => {
	return ($rootChord + $tipChord) * $wingSpan / 2; // Simplified trapezoidal area calculation
});

const wingWeight = derived([wingArea, materialDensity, loadFactor], ([$wingArea, $materialDensity, $loadFactor]) => {
	return $wingArea * $materialDensity * $loadFactor; // Simplified weight calculation
});

// Display Results
header(2, "Results");
paragraph(derived(wingArea, $wingArea => `Wing Area: ${$wingArea.toFixed(2)} m²`));
paragraph(derived(wingWeight, $wingWeight => `Wing Weight: ${$wingWeight.toFixed(2)} N`));

// Run Calculations
function runCalculations() {
	// Here you can add more complex calculations or function calls
	console.log('Running calculations...');
}

button("Run Calculations", runCalculations);

render();
