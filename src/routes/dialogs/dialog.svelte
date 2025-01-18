<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title: string;
		trigger: Snippet<[{ dialog: HTMLDialogElement }]>;
		children: Snippet<[{ dialog: HTMLDialogElement }]>;
		onclose?: () => void;
	};

	let { title, trigger, children, onclose }: Props = $props();

	let dialogElement = $state<HTMLDialogElement>();
</script>

{@render trigger({ dialog: dialogElement! })}

<dialog class="rounded-md border p-4" bind:this={dialogElement} {onclose}>
	<div class="flex items-start justify-between">
		<div class="text-lg font-semibold">{title}</div>
		<button type="button" onclick={() => dialogElement?.close()}>X</button>
	</div>
	{@render children({ dialog: dialogElement! })}
</dialog>
