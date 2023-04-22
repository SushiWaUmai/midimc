<script lang="ts">
	import { onMount } from 'svelte';
	import { generateNBT } from '../utils/getNbt';
	import { Midi } from '@tonejs/midi';
	import { splitMidi } from '../utils/getMidi';
	import * as NBT from 'nbtify';

	let files: FileList;

	const download = (data: Uint8Array, filename: string, type: string) => {
		var file = new Blob([data], { type: type });
		// Others
		var a = document.createElement('a'),
			url = URL.createObjectURL(file);
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		setTimeout(function () {
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);
		}, 0);
	};

	const handleSubmit = async () => {
		if (!files || !files[0]) {
			console.log('No file was selected');
			return;
		}

		const buffer = await files[0].arrayBuffer();
		const midi = splitMidi(new Midi(buffer));
		const nbtData = generateNBT(midi);
		const nbtBuffer = await NBT.write(nbtData);
		download(nbtBuffer, "result.nbt", "wow");
	};

	onMount(async () => {
		console.log();
	});
</script>

<h1>Convert Midi files to Minecraft Schematic files</h1>
<input type="file" accept=".mid,.midi" bind:files />
<button on:click={handleSubmit}>Create</button>
