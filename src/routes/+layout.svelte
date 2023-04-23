<script lang="ts">
	import "../app.css";
	import Header from "$lib/components/Header.svelte";
</script>

<svelte:head>
	<base href={process.env.BASE_PATH} />
</svelte:head>

<div class="absolute inset-0 flex flex-col bg-parchment text-bistre">
	<Header />
	<main class="flex-grow"><slot /></main>
</div>
