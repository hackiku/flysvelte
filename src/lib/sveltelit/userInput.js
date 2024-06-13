// userInput.js
import { header, numberInput, paragraph, slider, image, metric, button, sidebar, render, columns } from '$lib/sveltelit/svelteLit';
import { writable, derived } from 'svelte/store';

header(1, "Rockety");

// Use columns to arrange the next 3 inputs
columns(3);

// Load Cases
header(1, "Col1 h1");
header(3, "Col2 h3");
paragraph("Col3 text");

paragraph("This application helps you fly.");

header(3, "Inputs");

let totalMass = numberInput("Total Mass (kg)", 300, { min: 1, step: 5 });
let flowRate = slider("Flow rate (kg/s)", 15, { min: 1, max: 100, step: 1 });

let chamberPressure = slider("Chamber Pressure (bar)", 15, { min: 1, max: 100, step: 1 });
let burnTime = writable(5);

sidebar(
	() => numberInput("Burn Time (seconds)", 5, { min: 0.1, step: 0.1 }),
	() => slider("Chamber Pressure (bar)", 15, { min: 1, max: 100, step: 1 }),
);

header(2, "Results");

function calculateBurnTime(totalMass, flowRate) {
	return totalMass / flowRate;
}

// Derived variable for burn time
const burnTimeDerived = derived([totalMass, flowRate], ([$totalMass, $flowRate]) => calculateBurnTime($totalMass, $flowRate));
paragraph(derived(burnTimeDerived, $burnTime => `Burn Time: ${$burnTime.toFixed(2)} seconds`));

function calculate() {
	const thrust = derived(
		[chamberPressure, totalMass, flowRate],
		([$chamberPressure, $totalMass, $flowRate]) => calculateBurnTime($totalMass, $flowRate) * $chamberPressure * 100
	);

	const acceleration = derived(thrust, $thrust => $thrust / totalMass);
	const deltaV = derived([thrust, totalMass, burnTime], ([$thrust, $totalMass, $burnTime]) => 9.81 * Math.log($totalMass / ($totalMass - ($thrust * $burnTime / (9.81 * 9.81)))));

	metric("Thrust", thrust, "N");
	metric("Acceleration", acceleration, "m/s²");
	metric("Delta-V", deltaV, "m/s");
}

button("Calculate", calculate);

image("sveltelit/streamlit.png", "Rocket Diagram");

render();
