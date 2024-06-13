import { header, numberInput, paragraph, slider, image, metric, button, sidebar, render } from '$lib/sveltelit/svelteLit';
import { writable, derived } from 'svelte/store';

header(1, "Rocket Performance Calculator");

paragraph("This application helps you calculate the performance metrics of a rocket based on various inputs.");

header(3, "Inputs");

let totalMass = numberInput("Total Mass (kg)", 300, { min: 1, step: 5 });
let burnTime = numberInput("Burn Time (seconds)", 5, { min: 0.1, step: 0.1 });
let chamberPressure = slider("Chamber Pressure (bar)", 15, { min: 1, max: 100, step: 1 });
let throatArea = numberInput("Throat Area (mm²)", 200, { min: 0.1, step: 1 });
let thrustCoefficient = slider("Thrust Coefficient (Cf)", 1.5, { min: 0.1, max: 3, step: 0.1 });

sidebar(
	// () => paragraph("Sidebar test: ${testt}"), 
	// () => header(3, "Sidebar Inputs"),
	// () => numberInput("Total Mass (kg)", 300, { min: 1, step: 5 }),
	() => numberInput("Burn Time (seconds)", 5, { min: 0.1, step: 0.1 }),
	() => slider("Chamber Pressure (bar)", 15, { min: 1, max: 100, step: 1 }),
	() => numberInput("Throat Area (mm²)", 200, { min: 0.1, step: 1 }),
	() => slider("Thrust Coefficient (Cf)", {thrustCoefficient}, { min: 0.1, max: 3, step: 0.1 })
);



header(2, "Results");

function calculateThrust(Pc, At, Cf) {
	return Pc * At * Cf;
	}
	
	const thrust = derived(
		[chamberPressure, throatArea, thrustCoefficient],
		([$chamberPressure, $throatArea, $thrustCoefficient]) => calculateThrust($chamberPressure * 100000, $throatArea / 1000000, $thrustCoefficient)
		);
		metric("Thrust", thrust, "N");
		
		const bigNum = derived(thrust, $thrust => $thrust + 1000);
		paragraph(bigNum);
		paragraph(derived(bigNum, $bigNum => `wow BigNum = ${$bigNum} wow`));
		
		function calculate() {
			const acceleration = derived([thrust, totalMass], ([$thrust, $totalMass]) => $thrust / $totalMass);
			const deltaV = derived([thrust, totalMass, burnTime], ([$thrust, $totalMass, $burnTime]) => 9.81 * Math.log($totalMass / ($totalMass - ($thrust * $burnTime / (9.81 * 9.81)))));
			
			metric("Acceleration", acceleration, "m/s²");
			metric("Delta-V", deltaV, "m/s");
			}
			
			button("Calculate", calculate);
			
			image("sveltelit/streamlit.png", "Rocket Diagram");
			
			render();
			