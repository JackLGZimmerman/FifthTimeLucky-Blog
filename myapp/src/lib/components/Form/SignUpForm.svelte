<script lang="ts">
	import zod from 'zod';
	import { CloseCircleSolid, CheckCircleSolid } from 'flowbite-svelte-icons';
	import { signUp } from '$lib/features/auth/authService';

	const schema = zod
		.object({
			username: zod
				.string()
				.min(3, { message: 'Username must contain at least 3 characters' })
				.max(20, { message: 'Username must contain at most 20 characters' }),
			password: zod
				.string()
				.min(8, { message: 'Password must contain at least 8 characters' })
				.max(20, { message: 'Password must contain at most 20 characters' }),
			confirmPassword: zod.string(),
			email: zod.string().email({ message: 'Email is invalid' }),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: 'Passwords do not match',
			path: ['confirmPassword'],
		});

	// Form fields - changed to lowercase
	let fields = $state({
		username: '',
		password: '',
		confirmPassword: '',
		email: '',
	});

	// Derived state
	let notEmpty = $derived(
		fields.username && fields.password && fields.confirmPassword && fields.email
	);
	let result = $derived(schema.safeParse(fields));
	let formState = $state({
		errorMessage: '',
		isSubmitting: false,
		success: false,
	});

	async function _signUp(event: Event) {
		event.preventDefault();
		if (!result.success) return;

		try {
			formState.isSubmitting = true;
			formState.errorMessage = '';

			const response = await signUp(fields.username, fields.password, fields.email);

			if (response.success) {
				formState.success = true;
			} else {
				formState.errorMessage =
					response.errors.length > 0 ? response.errors[0].message : 'Signup failed';
			}
		} catch (error) {
			formState.errorMessage = error instanceof Error ? error.message : 'An error occurred';
		} finally {
			formState.isSubmitting = false;
		}
	}
</script>

<form
	class="font-spiegel flex w-80 flex-col space-y-2 rounded-xl bg-white p-8 text-[10px]"
	onsubmit={_signUp}
>
	<section class="flex flex-col items-center">
		<h1 class="flex text-lg font-bold">Welcome!</h1>
		<h3 class="flex text-center text-xs">You seem new, let's get you through the portal!</h3>
	</section>

	{#if !result.success && notEmpty}
		<div class="flex w-full flex-col rounded-md border border-red-500 bg-red-50 p-2">
			{#each result.error.errors as { message }, idx (idx)}
				<section class="flex gap-1">
					<CloseCircleSolid size="xs" class="mt-[2px] text-red-500" />
					<p class="text-red-500">{message}</p>
				</section>
			{/each}
		</div>
	{/if}
	{#if formState.success}
		<div class="flex w-full flex-col rounded-md border border-green-500 bg-green-50 p-2">
			<section class="flex gap-1">
				<CheckCircleSolid size="xs" class="mt-[2px] text-green-500" />
				<p class="text-green-500">Successfully signed up!</p>
			</section>
		</div>
	{/if}
	{#if formState.errorMessage}
		<div class="flex w-full flex-col rounded-md border border-red-500 bg-red-50 p-2">
			<section class="flex gap-1">
				<CloseCircleSolid size="xs" class="mt-[2px] text-red-500" />
				<p class="text-red-500">{formState.errorMessage}</p>
			</section>
		</div>
	{/if}

	<!-- Keep capitalized labels/placeholders but use lowercase field names -->
	<label for="username">Username</label>
	<input
		type="text"
		id="username"
		name="username"
		placeholder="Username"
		class="w-full rounded-sm border border-gray-300 p-2"
		bind:value={fields.username}
	/>
	<label for="password">Password</label>
	<input
		type="password"
		id="password"
		name="password"
		placeholder="Password"
		class="w-full rounded-sm border border-gray-300 p-2"
		bind:value={fields.password}
	/>
	<label for="confirmPassword">Confirm Password</label>
	<input
		type="password"
		id="confirmPassword"
		name="confirmPassword"
		placeholder="Confirm Password"
		class="w-full rounded-sm border border-gray-300 p-2"
		bind:value={fields.confirmPassword}
	/>
	<label for="email">Email</label>
	<input
		type="email"
		id="email"
		name="email"
		placeholder="Email"
		class="w-full rounded-sm border border-gray-300 p-2"
		bind:value={fields.email}
	/>

	<!-- Add submit button -->
	<button
		type="submit"
		class="mt-4 rounded-md bg-blue-600 py-2 text-center font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
		disabled={!result.success || formState.isSubmitting}
	>
		{formState.isSubmitting ? 'Signing up...' : 'Sign Up'}
	</button>
</form>
