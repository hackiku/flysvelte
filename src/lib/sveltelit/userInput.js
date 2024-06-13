import { header, numberInput, paragraph, slider, image, metric, button, render } from '$lib/sveltelit/svelteLit.ts';

header(1, "Rocket Performance Calculator");

paragraph("This application helps you calculate the performance metrics of a rocket based on various inputs.");

header(2, "Inputs");

let totalMass = numberInput("Total Mass (kg)", 300, { min: 1, step: 5 });
let burnTime = numberInput("Burn Time (seconds)", 5, { min: 0.1, step: 0.1 });
let chamberPressure = slider("Chamber Pressure (bar)", 15, { min: 1, max: 100, step: 1 });
let throatArea = numberInput("Throat Area (mm²)", 200, { min: 0.1, step: 1 });
let thrustCoefficient = slider("Thrust Coefficient (Cf)", 1.5, { min: 0.1, max: 3, step: 0.1 });

header(2, "Results");

function calculateThrust(Pc, At, Cf) {
	return Pc * At * Cf;
}

let thrust = 200 / 2;
metric("Thrust", thrust, "N");

function calc(thrust) {
	const fake = 1000;
	let bigNum = fake + thrust;
	return bigNum;
}

let bigNum = calc(thrust);

// calc(thrust);
paragraph(bigNum);
paragraph("wow BigNum = ${bigNum} wow"); // This should be replaced with the value of bigNum

function calculate() {
	const thrust = calculateThrust(chamberPressure * 100000, throatArea / 1000000, thrustCoefficient);
	const acceleration = thrust / totalMass;
	const deltaV = 9.81 * Math.log(totalMass / (totalMass - (thrust * burnTime / (9.81 * 9.81))));

	// metric("Thrust", thrust, "N");
	// metric("Acceleration", acceleration, "m/s²");
	// metric("Delta-V", deltaV, "m/s");
}

button("Calculate", calculate);



image("sveltelit.png", "Rocket Diagram");

render();
