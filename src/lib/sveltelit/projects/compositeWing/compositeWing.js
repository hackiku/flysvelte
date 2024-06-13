// compositeWing.js
import { header, numberInput, textInput, paragraph, slider, button, render } from '$lib/sveltelit/svelteLit';
import { writable, derived } from 'svelte/store';
import { getMaterialProperties } from './materials';
import { generateCADModel } from './cad';
import { runFEMAnalysis } from './femap';

header(1, "Composite Wing Design");

paragraph("Design and optimize a composite wing structure with real-time calculations and visualizations.");

header(2, "Material Properties");

const selectedMaterial = textInput("Material", "Carbon Fiber");
const materialProperties = derived(selectedMaterial, $selectedMaterial => getMaterialProperties($selectedMaterial));

const density = derived(materialProperties, props => props?.density || 0);
const youngsModulus = derived(materialProperties, props => props?.youngsModulus || 0);
const poissonRatio = derived(materialProperties, props => props?.poissonRatio || 0);

header(2, "Geometry Definition");

const wingSpan = numberInput("Wing Span (m)", 10, { min: 5, max: 50, step: 0.1 });
const rootChord = numberInput("Root Chord (m)", 2, { min: 0.5, max: 5, step: 0.1 });
const tipChord = numberInput("Tip Chord (m)", 1, { min: 0.1, max: 3, step: 0.1 });
const sweepAngle = numberInput("Sweep Angle (degrees)", 15, { min: 0, max: 45, step: 1 });

header(2, "Load Cases");

const loadFactor = numberInput("Load Factor", 2.5, { min: 1, max: 6, step: 0.1 });
const wingLoading = numberInput("Wing Loading (N/m²)", 5000, { min: 2000, max: 10000, step: 100 });

header(2, "Results");

const wingParameters = derived(
	[density, youngsModulus, poissonRatio, wingSpan, rootChord, tipChord, sweepAngle, loadFactor, wingLoading],
	([$density, $youngsModulus, $poissonRatio, $wingSpan, $rootChord, $tipChord, $sweepAngle, $loadFactor, $wingLoading]) => ({
		density: $density,
		modulus: $youngsModulus,
		poisson: $poissonRatio,
		span: $wingSpan,
		rootChord: $rootChord,
		tipChord: $tipChord,
		sweep: $sweepAngle,
		loadFactor: $loadFactor,
		wingLoading: $wingLoading
	})
);

function runCalculations() {
	const cadModel = generateCADModel(wingParameters);
	const femResults = runFEMAnalysis(wingParameters);

	console.log('CAD Model:', cadModel);
	console.log('FEM Results:', femResults);

	// Display results in the UI
	paragraph(`CAD Model URL: ${cadModel.url}`);
	paragraph(`FEM Results: ${JSON.stringify(femResults)}`);
}

button("Run Calculations", runCalculations);

render();
