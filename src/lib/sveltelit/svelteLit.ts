import { writable } from 'svelte/store';
import NumberInput from './components/NumberInput.svelte';
import Header from './components/Header.svelte';
import Metric from './components/Metric.svelte';
import RenderUi from './render/RenderUi.svelte';

let components = [];

export function numberInput(label, value, options) {
	const store = writable(value);
	components.push({
		component: NumberInput,
		props: { label, value, ...options, store }
	});
	return store;
}

export function header(text) {
	components.push({
		component: Header,
		props: { text }
	});
}

export function metric(label, value, unit) {
	components.push({
		component: Metric,
		props: { label, value, unit }
	});
}

function clearComponents() {
	const renderContainer = document.getElementById('render-container');
	if (renderContainer) {
		renderContainer.innerHTML = '';
	}
}

export function render() {
	if (typeof document !== 'undefined') {
		clearComponents();
		const renderContainer = document.getElementById('render-container') || document.createElement('div');
		renderContainer.id = 'render-container';
		document.body.appendChild(renderContainer);

		new RenderUi({
			target: renderContainer,
			props: { components }
		});

		// Clear components array for next render
		components = [];
	} else {
		console.error("render() can only be called in a browser environment.");
	}
}
