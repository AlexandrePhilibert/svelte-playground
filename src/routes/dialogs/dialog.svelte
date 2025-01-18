<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title: string;
		open?: boolean;
		trigger?: Snippet<[{ dialog: HTMLDialogElement }]>;
		children: Snippet<[{ dialog: HTMLDialogElement }]>;
		onclose?: () => void;
	};

	let { id, title, open = $bindable(), trigger, children, onclose }: Props = $props();

	let dialogElement = $state<HTMLDialogElement>();

	$effect(() => {
		if (open) {
			dialogElement?.showModal();
		} else {
			dialogElement?.close();
		}
	});
</script>

{#if trigger}
	{@render trigger({ dialog: dialogElement! })}
{/if}

<dialog
	class="rounded-md border p-4"
	bind:this={dialogElement}
	onclose={() => {
		open = false;
		onclose?.();
	}}
>
	<div class="flex items-start justify-between">
		<div class="text-lg font-semibold">{title}</div>
		<button type="button" onclick={() => (open = false)}>X</button>
	</div>
	{@render children({ dialog: dialogElement! })}
</dialog>
