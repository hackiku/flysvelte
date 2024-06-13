import { numberInput, header, metric, button, textInput, render } from '$lib/sveltelit/svelteLit.ts';

header("Simple App");

let myNumber = numberInput("Enter a number", 10, { min: 0, step: 1 });
let myText = textInput("Enter some text", "Hello, World!");

button("Click Me", () => {
	alert("Button clicked!");
});

metric("Current Value", myNumber, "");
metric("Entered Text", myText, "");

render();
