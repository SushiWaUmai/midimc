<script lang="ts">
	import { base } from "$app/paths";
</script>

<svelte:head>
	<title>MidiMC</title>
</svelte:head>

<div class="mx-auto container">
	<div
		class="bg-tea border-2 border-bistre shadow-bistre shadow-sm my-8 h-96 grid content-center place-items-center gap-y-4"
	>
		<div class="text-center space-y-4">
			<h1 class="text-6xl">MidiMC</h1>
			<p class="text-2xl">
				Create beautiful Minecraft Noteblock Schematics from MIDI files
				effortlessly.
			</p>
		</div>
		<a
			class="px-4 py-2 bg-perlwinkle rounded text-2xl shadow-bistre shadow-sm"
			href="{base}/create/">Start Creating Now</a
		>
	</div>
</div>
