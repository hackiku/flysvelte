<!-- src/routes/dynamics/+page.svelte -->
<!-- src/routes/(dynamics)/dynamics/+page.svelte -->

<script lang="ts">
  import App from '$lib/right-rudder/App.svelte';
  import { onMount } from 'svelte';
  
  let calculateLift: (density: number, velocity: number, wingArea: number, liftCoefficient: number) => number;
  let calculateDrag: (density: number, velocity: number, dragCoefficient: number, referenceArea: number) => number;
  
  let controlsEnabled = false;

  onMount(async () => {
    const dynamicsModule = await import('$lib/right-rudder/math/dynamics');
    calculateLift = dynamicsModule.calculateLift;
    calculateDrag = dynamicsModule.calculateDrag;
    
    // Enable controls after a short delay
    setTimeout(() => {
      controlsEnabled = true;
    }, 2000);
  });
</script>

<div class="min-h-screen bg-gray-900 text-gray-100">
  <!-- Hero Section -->
  <section class="py-20">
    <div class="container mx-auto px-4">
      <h1 class="text-5xl font-bold mb-4">Aircraft Dynamics Analysis</h1>
      <p class="text-xl">Exploring the stability and performance of the AMX aircraft</p>
    </div>
  </section>

  <!-- Flight Simulator Section -->
  <section class="py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-semibold mb-8">Interactive Flight Simulator</h2>
      <div class="w-full h-[600px] bg-gray-800 rounded-lg overflow-hidden">
        <App {controlsEnabled} />
      </div>
    </div>
  </section>

  <!-- 1. Geometric Characteristics Section -->
  <section class="py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-semibold mb-8">1. Geometric Characteristics</h2>
      
      <div class="mb-8">
        <h3 class="text-2xl font-semibold mb-4">a) Dimensional Characteristics</h3>
        <ul class="list-disc list-inside">
          <li>Length: 13.23m</li>
          <li>Wingspan: 8.87m</li>
          <li>Height: 4.55m</li>
          <li>Wing Area: 21.0m²</li>
        </ul>
      </div>
      
      <div class="mb-8">
        <h3 class="text-2xl font-semibold mb-4">b) Fuselage Characteristics</h3>
        <div class="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center">
          [Placeholder for Fuselage Model/Diagram]
        </div>
      </div>
      
      <div class="mb-8">
        <h3 class="text-2xl font-semibold mb-4">c) Wing Characteristics</h3>
        <div class="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center">
          [Placeholder for Wing Model/Diagram]
        </div>
      </div>
      
      <div class="mb-8">
        <h3 class="text-2xl font-semibold mb-4">d) Horizontal Tail Characteristics</h3>
        <div class="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center">
          [Placeholder for Horizontal Tail Model/Diagram]
        </div>
      </div>
      
      <div class="mb-8">
        <h3 class="text-2xl font-semibold mb-4">e) Vertical Tail Characteristics</h3>
        <div class="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center">
          [Placeholder for Vertical Tail Model/Diagram]
        </div>
      </div>
    </div>
  </section>

  <!-- 2. Aerodynamic Characteristics Section -->
  <section class="py-16 bg-gray-800">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-semibold mb-8">2. Aerodynamic Characteristics</h2>
      
      <div class="mb-8">
        <h3 class="text-2xl font-semibold mb-4">a) Mean Aerodynamic Chord</h3>
        <p>Calculation and diagram of the mean aerodynamic chord...</p>
      </div>
      
      <div class="mb-8">
        <h3 class="text-2xl font-semibold mb-4">b) Flight Regime Data</h3>
        <p>Details on cruise conditions, altitude, speed, etc...</p>
      </div>
      
      <div class="mb-8">
        <h3 class="text-2xl font-semibold mb-4">c) Airfoil Profiles</h3>
        <p>Information on the airfoils used for various aircraft components...</p>
      </div>
      
      <div class="mb-8">
        <h3 class="text-2xl font-semibold mb-4">d) Lift Curve and Polar Diagrams</h3>
        <div class="w-full h-64 bg-gray-700 rounded-lg flex items-center justify-center">
          [Placeholder for Lift Curve and Polar Diagrams]
        </div>
      </div>
    </div>
  </section>

  <!-- 3. Longitudinal Stability Section -->
  <section class="py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-semibold mb-8">3. Longitudinal Stability with Fixed Control</h2>
      
      <div class="mb-8">
        <h3 class="text-2xl font-semibold mb-4">3.1 Wing Contribution to Longitudinal Static Stability</h3>
        <p>Analysis of how the wing affects the aircraft's stability...</p>
      </div>
      
      <div class="mb-8">
        <h3 class="text-2xl font-semibold mb-4">3.2 Horizontal Tail Contribution to Longitudinal Static Stability</h3>
        <p>Examination of the horizontal tail's role in stability...</p>
      </div>
      
      <div class="mb-8">
        <h3 class="text-2xl font-semibold mb-4">3.3 Fuselage Contribution to Longitudinal Static Stability</h3>
        <p>How the fuselage impacts the overall stability of the aircraft...</p>
      </div>
      
      <div class="mb-8">
        <h3 class="text-2xl font-semibold mb-4">3.4 Neutral Point and Static Stability Reserve in Unpowered Flight</h3>
        <p>Calculations and analysis for unpowered flight conditions...</p>
      </div>
      
      <div class="mb-8">
        <h3 class="text-2xl font-semibold mb-4">3.5 Propulsion Group Contribution to Longitudinal Static Stability</h3>
        <p>How the engines and propulsion system affect stability...</p>
      </div>
      
      <div class="mb-8">
        <h3 class="text-2xl font-semibold mb-4">3.6 Neutral Point and Static Stability Reserve in Powered Flight</h3>
        <p>Calculations and analysis for powered flight conditions...</p>
      </div>
    </div>
  </section>

  <!-- 4. DATCOM Section -->
  <section class="py-16 bg-gray-800">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-semibold mb-8">4. DATCOM Integration</h2>
      <p>Details on how DATCOM is integrated and used in the analysis...</p>
      <div class="w-full h-64 bg-gray-700 rounded-lg flex items-center justify-center mt-8">
        [Placeholder for DATCOM Integration Diagram/Interface]
      </div>
    </div>
  </section>

  <!-- 5. Stability Calculations Section -->
  <section class="py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-semibold mb-8">5. Stability Calculations</h2>
      <p>Detailed stability calculations and analysis...</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div>
          <h3 class="text-2xl font-semibold mb-4">Static Margin</h3>
          <div class="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center">
            [Placeholder for Static Margin Calculations]
          </div>
        </div>
        <div>
          <h3 class="text-2xl font-semibold mb-4">Neutral Point</h3>
          <div class="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center">
            [Placeholder for Neutral Point Calculations]
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Conclusion Section -->
  <section class="py-16 bg-gray-800">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-semibold mb-8">Conclusion</h2>
      <p class="text-lg">
        Based on the analysis, the AMX aircraft demonstrates stable characteristics at 20% MAC (Mean Aerodynamic Chord) 
        center of gravity position. However, stability decreases at 35% and 50% MAC positions. The power reserve in 
        stable CG positions aligns with recommendations for fighter aircraft.
      </p>
    </div>
  </section>
</div>