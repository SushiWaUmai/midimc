<script lang="ts">
	import { Midi } from "@tonejs/midi";
	import { generateNBT } from "$lib/utils/getNbt";
	import { splitMidi } from "$lib/utils/getMidi";
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

		const fileName = file.name.split(".")[0];

		const buffer = await file.arrayBuffer();
		const midi = splitMidi(new Midi(buffer));
		const nbtData = generateNBT(midi);
		const nbtBuffer = await NBT.write(nbtData);
		download(new Uint8Array(gzip.zip(nbtBuffer)), `${fileName}.schem`);
	};
</script>

<div class="mx-auto container">
	<div class="my-8">
		<h1 class="text-4xl">Create Schematic File</h1>

		<br />
		<div class="grid content-center space-y-8">
			<label
				for="file"
				class="inline-block border-dashed border-2 border-bistre cursor-pointer p-2 text-center bg-tea"
			>
				<div class="text-4xl">
					{#if file === undefined}
						Upload a file
					{:else}
						{file.name}
					{/if}
				</div>
				<input id="file" type="file" accept=".mid,.midi" bind:files hidden />
			</label>

			{#if file !== undefined}
				<div class="text-center">
					<button
						class="px-4 py-2 bg-perlwinkle rounded text-2xl shadow-bistre shadow-sm"
						on:click={handleSubmit}
						disabled={!file}
					>
						Create
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>
