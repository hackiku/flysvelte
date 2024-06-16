// $lib/projects/rockie/rockie.js
import { header, numberInput, paragraph, slider, image, metric, button, columns, render } from '$lib/sveltelit/svelteLit';
import { writable, derived } from 'svelte/store';

// config

header(1, "Rockety");
paragraph("App-ly to fly.");

header(3, "Inputs");

let totalMass = numberInput("Total Mass (kg)", 300, { min: 1, step: 5 });
let flowRate = slider("Flow rate (kg/s)", 15, { min: 1, max: 100, step: 1 });

let chamberPressure = slider("Chamber Pressure (bar)", 15, { min: 1, max: 100, step: 1 });
let burnTime = writable(5);

header(2, "Col1 h2");
header(3, "Col2 h3");
paragraph("Col3 text");
columns(4);

header(2, "Results");

function calculateBurnTime(totalMass, flowRate) {
	return totalMass / flowRate;
}

// derived var
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
