import { writable } from 'svelte/store';
import NumberInput from '$lib/sveltelit/components/NumberInput.svelte';
import Header from '$lib/sveltelit/components/Header.svelte';
import Metric from '$lib/sveltelit/components/Metric.svelte';
import RenderUi from '$lib/sveltelit/render/RenderUi.svelte';
// import { writable } from 'svelte/store';
// import NumberInput from './components/NumberInput.svelte';
// import Header from './components/Header.svelte';
// import Metric from './components/Metric.svelte';
// import RenderUi from './render/RenderUi.svelte';

const components = [];

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

export function render() {
	new RenderUi({
		target: document.body,
		props: { components }
	});
}
