import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

const schema = z.object({
	text: z.string().min(1, { message: 'This field is required' })
});

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(schema));

	return {
		form
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schema));

		if (!form.valid) {
			return fail(400, { form });
		}

		if (Math.random() < 0.5) {
			await sleep(3000);
		}

		return { form };
	}
};

function sleep(ms: number) {
	return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
