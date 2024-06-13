// materials.js
export const materials = [
	{
		name: 'Carbon Fiber',
		density: 1600, // kg/m³
		youngsModulus: 70, // GPa
		poissonRatio: 0.3,
		tensileStrength: 600, // MPa
		compressiveStrength: 550, // MPa
	},
	{
		name: 'Kevlar',
		density: 1440, // kg/m³
		youngsModulus: 83, // GPa
		poissonRatio: 0.36,
		tensileStrength: 3620, // MPa
		compressiveStrength: 3100, // MPa
	},
	{
		name: 'Glass Fiber',
		density: 2500, // kg/m³
		youngsModulus: 85, // GPa
		poissonRatio: 0.22,
		tensileStrength: 3450, // MPa
		compressiveStrength: 2200, // MPa
	}
];

// Function to get material properties by name
export function getMaterialProperties(materialName) {
	return materials.find(material => material.name === materialName);
}
