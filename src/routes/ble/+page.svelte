<script>
  let roll = 0;
  let pitch = 0;
  let yaw = 0;

  async function connect() {
    try {
      // Request device
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['180A'] }] // Filter by service UUID
      });

      // Connect to GATT server
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService('180A');

      // Get characteristics
      const rollCharacteristic = await service.getCharacteristic('2A57');
      const pitchCharacteristic = await service.getCharacteristic('2A58');
      const yawCharacteristic = await service.getCharacteristic('2A59');

      // Start notifications
      await rollCharacteristic.startNotifications();
      await pitchCharacteristic.startNotifications();
      await yawCharacteristic.startNotifications();

      // Event listeners for characteristic changes
      rollCharacteristic.addEventListener('characteristicvaluechanged', event => {
        const dataView = event.target.value;
        roll = dataView.getFloat32(0, true);
      });

      pitchCharacteristic.addEventListener('characteristicvaluechanged', event => {
        const dataView = event.target.value;
        pitch = dataView.getFloat32(0, true);
      });

      yawCharacteristic.addEventListener('characteristicvaluechanged', event => {
        const dataView = event.target.value;
        yaw = dataView.getFloat32(0, true);
      });

      console.log('Connected to BLE device');
    } catch (error) {
      console.error('Error:', error);
    }
  }
</script>

<main class="text-center m-auto p-8">
  <h1 class="text-3xl mb-4">Arduino Nano 33 BLE Orientation</h1>
  <button class="bg-gray-800 text-white rounded-full px-4 py-2" on:click={connect}>Connect</button>
  <p class="mt-4">Roll: {roll.toFixed(2)}</p>
  <p>Pitch: {pitch.toFixed(2)}</p>
  <p>Yaw: {yaw.toFixed(2)}</p>
</main>

<style>
  main {
    text-align: center;
    margin: 0 auto;
    padding: 2rem;
		color: white; /* !!! */
		
  }
  button {
    margin: 1rem;
    padding: 1rem 2rem;
    font-size: 1.2rem;
  }
</style>
