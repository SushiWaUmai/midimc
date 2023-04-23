<script lang="ts">
	import { base } from "$app/paths";
</script>

<header class="p-2 bg-tea shadow-bistre shadow-sm">
	<div class="flex justify-between container px-2 mx-auto text-xl">
		<nav class="flex gap-x-4">
			<a href="{base}/about">About</a>
		</nav>
		<span class="text-2xl">
			<a href={base}>MidiMC</a>
		</span>
		<span>
			<a href="{base}/create">Create</a>
		</span>
	</div>
</header>
