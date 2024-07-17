// src/lib/right-rudder/math/flight.ts

import { Vector3 } from 'three';
import { get } from 'svelte/store';
import { thrust } from '../stores';

/**
 * Calculate the linear and angular velocities based on thrust.
 * @param initialLinearVelocity Initial linear velocity as a Vector3.
 * @param initialAngularVelocity Initial angular velocity as a Vector3.
 * @returns An object containing updated linear and angular velocities as arrays.
 */
export function calculateVelocity(
	initialLinearVelocity: Vector3,
	initialAngularVelocity: Vector3
): { linearVelocity: [number, number, number]; angularVelocity: [number, number, number] } {
	const currentThrust = get(thrust);

	// Calculate new linear velocity based on thrust
	const linearVelocity = initialLinearVelocity.clone().add(new Vector3(currentThrust, 0, 0));

	// For simplicity, we'll keep the angular velocity constant for now.
	// You can add more complex calculations here if needed.
	const angularVelocity = initialAngularVelocity.clone();

	return {
		linearVelocity: [linearVelocity.x, linearVelocity.y, linearVelocity.z],
		angularVelocity: [angularVelocity.x, angularVelocity.y, angularVelocity.z]
	};
}
