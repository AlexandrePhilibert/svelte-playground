<script>
	import { enhance } from '$app/forms';
	import Dialog from './dialog.svelte';
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	const {
		form,
		errors,
		delayed,
		reset,
		enhance: sfEnhance
	} = superForm(data.form, {
		delayMs: 500
	});
</script>

<div class="flex flex-col items-start gap-4">
	<Dialog title="Basic dialog">
		{#snippet trigger({ dialog })}
			<button onclick={() => dialog.show()} class="rounded-md bg-neutral-300 p-1"
				>Basic dialog</button
			>
		{/snippet}
		{#snippet children({ dialog })}
			<div class="flex flex-col">
				<p>This is the content of the dialog</p>
				<div class="mt-4 flex justify-end gap-2">
					<button class="bg-neutral-300 p-1" onclick={() => dialog.close()}>Cancel</button>
					<button
						class="bg-neutral-300 p-1"
						onclick={() => {
							dialog.close();
							alert('confirmed!');
						}}>Confirm</button
					>
				</div>
			</div>
		{/snippet}
	</Dialog>

	<Dialog title="Basic modal">
		{#snippet trigger({ dialog })}
			<button onclick={() => dialog.showModal()} class="rounded-md bg-neutral-300 p-1"
				>Basic modal</button
			>
		{/snippet}
		{#snippet children({ dialog })}
			<div class="flex flex-col">
				<p>This is the content of the modal</p>
				<div class="mt-4 flex justify-end gap-2">
					<button class="bg-neutral-300 p-1" onclick={() => dialog.close()}>Cancel</button>
					<button
						class="bg-neutral-300 p-1"
						onclick={() => {
							dialog.close();
							alert('confirmed!');
						}}>Confirm</button
					>
				</div>
			</div>
		{/snippet}
	</Dialog>

	<Dialog title="Form modal" onclose={reset}>
		{#snippet trigger({ dialog })}
			<button onclick={() => dialog.showModal()} class="rounded-md bg-neutral-300 p-1"
				>svelte form modal</button
			>
		{/snippet}
		{#snippet children({ dialog })}
			<form
				class="flex flex-col"
				method="POST"
				use:enhance={() => {
					alert('here');

					return async ({ result }) => {
						if (result.type === 'success') {
							dialog.close();
						}
					};
				}}
			>
				<p>This is the content of the modal</p>
				<!-- svelte-ignore a11y_autofocus -->
				<!-- We shouldn't get an a11y error inside a dialog -->
				<input
					type="text"
					placeholder="text"
					id="text"
					name="text"
					class="rounded-md border p-1"
					autofocus
					bind:value={$form.text}
				/>
				{#if $errors.text}
					<div class="text-red-600">{$errors.text.join(',')}</div>
				{/if}
				<div class="mt-4 flex justify-end gap-2">
					<button class="bg-neutral-300 p-1" formmethod="dialog">Cancel</button>
					<button class="bg-neutral-300 p-1">
						{#if $delayed}
							...
						{/if}
						<span>Send</span>
					</button>
				</div>
			</form>
		{/snippet}
	</Dialog>

	<Dialog title="Form modal" onclose={reset}>
		{#snippet trigger({ dialog })}
			<button onclick={() => dialog.showModal()} class="rounded-md bg-neutral-300 p-1"
				>sveltekit-superforms form modal</button
			>
		{/snippet}
		{#snippet children({ dialog })}
			<form
				class="flex flex-col"
				method="POST"
				use:sfEnhance={{
					onUpdated: () => {
						dialog.close();
					}
				}}
			>
				<p>This is the content of the modal</p>
				<!-- svelte-ignore a11y_autofocus -->
				<!-- We shouldn't get an a11y error inside a dialog -->
				<input
					type="text"
					placeholder="text"
					id="text"
					name="text"
					class="rounded-md border p-1"
					autofocus
					bind:value={$form.text}
				/>
				{#if $errors.text}
					<div class="text-red-600">{$errors.text.join(',')}</div>
				{/if}
				<div class="mt-4 flex justify-end gap-2">
					<button class="bg-neutral-300 p-1" formmethod="dialog">Cancel</button>
					<button class="bg-neutral-300 p-1">
						{#if $delayed}
							...
						{/if}
						<span>Send</span>
					</button>
				</div>
			</form>
		{/snippet}
	</Dialog>
</div>
