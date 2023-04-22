<script lang="ts">
	import { generateNBT } from "../utils/getNbt";
	import { Midi } from "@tonejs/midi";
	import { splitMidi } from "../utils/getMidi";
	import * as NBT from "nbtify";
	import gzip from "gzip-js";

	let files: FileList;
	$: file = files && files[0];

	const download = (data: Uint8Array, filename: string) => {
		const blob = new Blob([data]);
		const a = document.createElement("a");
		const url = URL.createObjectURL(blob);

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
		if (!file) {
			console.log("No file was selected");
			return;
		}

		const buffer = await file.arrayBuffer();
		const midi = splitMidi(new Midi(buffer));
		const nbtData = generateNBT(midi);
		const nbtBuffer = await NBT.write(nbtData);
		download(new Uint8Array(gzip.zip(nbtBuffer)), "result.schem");
	};
</script>

<h1>Convert Midi files to Minecraft Schematic files</h1>
<input type="file" accept=".mid,.midi" bind:files />
<button on:click={handleSubmit}>Create</button>
