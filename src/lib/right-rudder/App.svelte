<!-- src/lib/right-rudder/App.svelte -->

<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
</script>

<Canvas>
	<Scene />
</Canvas>

<div class="absolute top-0 left-0 p-10 flex flex-col items-start space-y-2 text-white">
	<h1 class="text-md font-bold">right rudder</h1>
</div>

<div class="description">
	<p>
		Test in prod
	</p>
</div>


<style>
  div.description {
    position: absolute;
    bottom: 10px;
    left: 10px;
    /* z-index: 10; */
    color: #fe3d00;
  }

</style>
