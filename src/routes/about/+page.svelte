<script lang="ts">
	import LogoGithub from "carbon-icons-svelte/lib/LogoGithub.svelte";
</script>

<svelte:head>
	<title>MidiMC | About</title>
</svelte:head>

<div class="mx-auto container">
	<div class="my-8">
		<h1 class="text-4xl">About</h1>
		<br />

		<a
			href="https://github.com/SushiWaUmai/midimc"
			target="_blank"
			rel="noreferrer"
		>
			<div
				class="inline-flex items-center gap-4 bg-black text-white rounded px-4 py-2 text-2xl shadow-black shadow"
			>
				<span>Github</span>
				<LogoGithub class="w-8 h-8" />
			</div>
		</a>
	</div>
</div>
