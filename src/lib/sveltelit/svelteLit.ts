import { writable, derived } from 'svelte/store';
import Header from './components/Header.svelte';
import NumberInput from './components/NumberInput.svelte';
import Metric from './components/Metric.svelte';
import Paragraph from './components/Paragraph.svelte';
import Slider from './components/Slider.svelte';
import Image from './components/Image.svelte';
import Button from './components/Button.svelte';
import Sidebar from './components/Sidebar.svelte';
import RenderUi from './render/RenderUi.svelte';

let components = [];
let sidebarComponents = [];

export function header(level, text) {
	components.push({
		component: Header,
		props: { level, text }
	});
}

export function numberInput(label, value, options) {
	const store = writable(value);
	components.push({
		component: NumberInput,
		props: { label, value, ...options, store }
	});
	return store;
}

export function paragraph(text) {
	const store = writable(text);
	components.push({
		component: Paragraph,
		props: { text: store }
	});
	return store;
}

export function slider(label, value, options) {
	const store = writable(value);
	components.push({
		component: Slider,
		props: { label, value, ...options, store }
	});
	return store;
}

export function image(src, alt) {
	components.push({
		component: Image,
		props: { src, alt }
	});
}

export function metric(label, value, unit) {
	const store = writable(value);
	components.push({
		component: Metric,
		props: { label, value: store, unit }
	});
	return store;
}

export function button(label, onClick) {
	components.push({
		component: Button,
		props: { label, onClick }
	});
}

export function sidebar(...content) {
	sidebarComponents = content.map(item => (typeof item === 'function' ? item() : item));
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

		if (sidebarComponents.length > 0) {
			components.unshift({
				component: Sidebar,
				props: { components: sidebarComponents }
			});
		}

		new RenderUi({
			target: renderContainer,
			props: { components }
		});

		// Clear components array for next render
		components = [];
		sidebarComponents = [];
	} else {
		console.error("render() can only be called in a browser environment.");
	}
}
