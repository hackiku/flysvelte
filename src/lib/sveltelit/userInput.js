import { numberInput, header, metric, render } from '$lib/sveltelit/svelteLit.ts';

header("Simple App");
let myNumber = numberInput("Enter a number", 10, { min: 0, step: 1 });

metric("Current Value", myNumber, "");

render();
