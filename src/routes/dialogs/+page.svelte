<script>
	import Dialog from './dialog.svelte';
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	const { form, errors, delayed, reset, enhance } = superForm(data.form, {
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
				>form modal</button
			>
		{/snippet}
		{#snippet children({ dialog })}
			<form
				class="flex flex-col"
				method="POST"
				use:enhance={{
					onUpdated: () => {
						dialog.close();
					}
				}}
			>
				<p>This is the content of the modal</p>
				<input
					type="text"
					placeholder="text"
					id="text"
					name="text"
					class="rounded-md border p-1"
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
