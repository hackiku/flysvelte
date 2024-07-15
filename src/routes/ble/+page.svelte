<script>
  let roll = 0;
  let pitch = 0;
  let yaw = 0;

  async function connect() {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ name: 'Nano33BLE' }],
        optionalServices: ['180A']
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService('180A');

      const rollCharacteristic = await service.getCharacteristic('2A57');
      const pitchCharacteristic = await service.getCharacteristic('2A58');
      const yawCharacteristic = await service.getCharacteristic('2A59');

      rollCharacteristic.startNotifications();
      pitchCharacteristic.startNotifications();
      yawCharacteristic.startNotifications();

      rollCharacteristic.addEventListener('characteristicvaluechanged', (event) => {
        roll = event.target.value.getFloat32(0, true);
      });

      pitchCharacteristic.addEventListener('characteristicvaluechanged', (event) => {
        pitch = event.target.value.getFloat32(0, true);
      });

      yawCharacteristic.addEventListener('characteristicvaluechanged', (event) => {
        yaw = event.target.value.getFloat32(0, true);
      });
    } catch (error) {
      console.log(error);
    }
  }
</script>

<main class="text-center m-auto p-8">
  <h1 class="text-3xl mb-4">Arduino Nano 33 BLE Orientation</h1>
  <button class="bg-gray-800 text-2xl text-white rounded-full px-8 py-4" on:click={connect}>Connect</button>
  
	<div class="text-white">
		<p class="mt-4">Roll: {roll.toFixed(2)}</p>
			<p>Pitch: {pitch.toFixed(2)}</p>
			<p>Yaw: {yaw.toFixed(2)}</p>
	</div>

</main>
