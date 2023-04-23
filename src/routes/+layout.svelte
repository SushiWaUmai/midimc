<script lang="ts">
	import "../app.css";
	import Header from "$lib/components/Header.svelte";
</script>

<div class="absolute inset-0 flex flex-col bg-parchment text-bistre">
	<Header />
	<main class="flex-grow"><slot /></main>
</div>
